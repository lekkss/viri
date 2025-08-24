import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import ScreenContainer from "@/components/ScreenContainer";
import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

const Name = () => {
  const [name, setName] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Check if email is valid (basic validation)
  const isNameValid = name.length > 2;

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
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
        </View>
        <CustomButton
          title="Let's go"
          onPress={() => router.push("/(root)/(tabs)/today")}
          className={`w-11/12 `}
          bgVariant={isNameValid ? "primary" : "ghost"}
          textVariant={isNameValid ? "primary" : "secondary"}
        />
      </SafeAreaView>
    </ScreenContainer>
  );
};

export default Name;
