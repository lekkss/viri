import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import ScreenContainer from "@/components/ScreenContainer";
import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

const Email = () => {
  const [email, setEmail] = useState("");

  // Check if email is valid (basic validation)
  const isEmailValid =
    email.includes("@") && email.includes(".") && email.length > 5;

  return (
    <ScreenContainer useImage>
      <SafeAreaView className="flex-1 h-full items-center">
        <View className="flex-1 mt-32 px-4 gap-3 w-full">
          <Text className="text-2xl font-inter-medium text-white text-center">
            Whats your email?
          </Text>
          <Text className="font-inter-regular text-greyText text-center max-w-[250px] mx-auto">
            We will send a code to this email to verify your sign in
          </Text>
          <InputField
            containerStyle="mt-4"
            labelStyle="text-white"
            inputStyle="text-black"
            placeholder="name@example.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <CustomButton
          title="Continue"
          onPress={() => router.push("/confirm-email")}
          className={`w-11/12 mb-8`}
          bgVariant={isEmailValid ? "primary" : "ghost"}
          textVariant={isEmailValid ? "primary" : "secondary"}
        />
      </SafeAreaView>
    </ScreenContainer>
  );
};

export default Email;
