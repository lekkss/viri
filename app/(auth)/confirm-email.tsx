import CustomButton from "@/components/CustomButton";
import OtpInputField from "@/components/OtpInputField";
import ScreenContainer from "@/components/ScreenContainer";
import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

const ConfirmEmail = () => {
  const [otp, setOtp] = useState("");

  // Check if email is valid (basic validation)
  const isOtpValid = otp.length === 6;

  return (
    <ScreenContainer useImage>
      <SafeAreaView className="flex h-full items-center">
        <View className="flex-1 mt-32 px-4 gap-3 w-full">
          <Text className="text-2xl font-inter-medium text-white text-center">
            Confirm your email
          </Text>
          <Text className="font-inter-regular text-greyText text-center max-w-[250px] mx-auto">
            Please enter the code we sent to
          </Text>
          <Text className="font-inter-medium text-white text-center max-w-[250px] mx-auto">
            sam@gmail.com
          </Text>
          <OtpInputField
            containerStyle="mt-4"
            labelStyle="text-white"
            inputStyle="text-black"
            keyboardType="numeric"
            value={otp}
            onChangeText={setOtp}
          />
        </View>
        <CustomButton
          title="Continue"
          onPress={() => router.push("/name")}
          className={`w-11/12 `}
          bgVariant={isOtpValid ? "primary" : "ghost"}
          textVariant={isOtpValid ? "primary" : "secondary"}
        />
      </SafeAreaView>
    </ScreenContainer>
  );
};

export default ConfirmEmail;
