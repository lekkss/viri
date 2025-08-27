import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import ScreenContainer from "@/components/ScreenContainer";
import { fetchAPI } from "@/lib/fetch";
import { useSignUpStore } from "@/store";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";

const Name = () => {
  const [name, setName] = useState("");
  const { user, setUser, setLoading, isLoading } = useSignUpStore();

  // Check if name is valid (basic validation)
  const isNameValid = name.length > 2;

  const onNameChange = async (text: string) => {
    if (!user.email) {
      Alert.alert("Error", "Email not found. Please try again.");
      return;
    }

    setLoading(true);
    try {
      await fetchAPI("/(api)/user", {
        method: "PATCH",
        body: JSON.stringify({
          email: user.email,
          name: text,
        }),
      });

      setUser({ name: text });
      router.push("/(root)/(tabs)/today");
    } catch (error) {
      console.error("Error updating name:", error);
      Alert.alert("Error", "Failed to update name. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer useImage>
      <SafeAreaView className="flex h-full items-center">
        <View className="flex-1 mt-32 px-4 gap-3 w-full">
          <Text className="text-2xl font-inter-medium text-white text-center">
            What should Viri call you?
          </Text>
          <Text className="font-inter-regular text-greyText text-center max-w-[250px] mx-auto">
            This would be the name that you would be known by
          </Text>
          <InputField
            containerStyle="mt-4"
            labelStyle="text-white"
            inputStyle="text-black"
            placeholder="name"
            keyboardType="default"
            value={name}
            onChangeText={setName}
          />
        </View>
        <CustomButton
          title={isLoading ? "Updating..." : "Let's go"}
          onPress={() => onNameChange(name)}
          className={`w-[90%]`}
          bgVariant={isNameValid && !isLoading ? "primary" : "ghost"}
          textVariant={isNameValid && !isLoading ? "primary" : "secondary"}
          disabled={isLoading}
        />
      </SafeAreaView>
    </ScreenContainer>
  );
};

export default Name;
