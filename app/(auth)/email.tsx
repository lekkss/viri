import BackgroundView from "@/components/BackgroundView";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

const Email = () => {
  const [email, setEmail] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Check if email is valid (basic validation)
  const isEmailValid =
    email.includes("@") && email.includes(".") && email.length > 5;

  return (
    <BackgroundView>
      <SafeAreaView className="flex h-full items-center">
        <View className="flex-1 mt-32 px-4 gap-3 w-full">
          <Text className="text-2xl font-inter-medium text-white text-center">
            Whats your email?
          </Text>
          <Text className="font-inter-regular text-greyText text-center max-w-[250px] mx-auto">
            We will send a code to this email to verify your sign in
          </Text>
          <InputField
            labelStyle="text-white"
            inputStyle="text-black"
            placeholder="name@example.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
        </View>
        <CustomButton
          title="Continue"
          onPress={() => {}}
          className={`${!isInputFocused ? "mb-8" : "mb-[350px]"} w-11/12`}
          bgVariant={isEmailValid ? "primary" : "ghost"}
          textVariant={isEmailValid ? "primary" : "secondary"}
        />
      </SafeAreaView>
    </BackgroundView>
  );
};

export default Email;
