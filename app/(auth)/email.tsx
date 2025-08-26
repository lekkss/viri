import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import ScreenContainer from "@/components/ScreenContainer";
import { useSignUpStore } from "@/store";
import { useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";

const Email = () => {
  const { verification, setVerification, setUser, setLoading, isLoading } =
    useSignUpStore();
  const [email, setEmail] = useState("");
  const { signUp, isLoaded } = useSignUp();

  // Check if email is valid (basic validation)
  const isEmailValid =
    email.includes("@") && email.includes(".") && email.length > 5;

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      // Store email in store
      setUser({ email });

      // Start sign-up process using email and password provided
      await signUp.create({
        emailAddress: email,
        password: process.env.EXPO_PUBLIC_PASSWORD!,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({ ...verification, state: "pending" });
      router.push("/confirm-email");
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage || "Sign up failed");
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

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
          title={isLoading ? "Loading..." : "Continue"}
          onPress={onSignUpPress}
          className={`w-11/12`}
          bgVariant={isEmailValid && !isLoading ? "primary" : "ghost"}
          textVariant={isEmailValid && !isLoading ? "primary" : "secondary"}
          disabled={isLoading}
        />
      </SafeAreaView>
    </ScreenContainer>
  );
};

export default Email;
