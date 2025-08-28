import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import ScreenContainer from "@/components/ScreenContainer";
import { useSignUpStore } from "@/store";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";

const Email = () => {
  const { verification, setVerification, setUser, setLoading, isLoading } =
    useSignUpStore();

  const [email, setEmail] = useState("");

  const { signUp, isLoaded: isSignUpLoaded } = useSignUp();
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();

  const isEmailValid =
    email.includes("@") && email.includes(".") && email.length > 5;

  const onContinuePress = async () => {
    if (!isSignUpLoaded || !isSignInLoaded) return;

    setLoading(true);
    try {
      // Store email in store
      setUser({ email });

      // Try to create a new account
      await signUp.create({
        emailAddress: email,
        password: process.env.EXPO_PUBLIC_PASSWORD!, // default/fallback password
      });

      // Send email verification
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({ ...verification, state: "pending" });
      router.push("/confirm-email");
    } catch (err: any) {
      const errCode = err?.errors?.[0]?.code;

      // If account already exists -> start sign-in flow
      if (errCode === "form_identifier_exists") {
        try {
          const signInAttempt = await signIn.create({
            identifier: email,
          });

          // Get the email address ID from the supported first factors
          const emailFactor = signInAttempt?.supportedFirstFactors?.find(
            (factor: any) => factor.strategy === "email_code"
          ) as any;
          const emailAddressId = emailFactor?.emailAddressId;

          if (emailAddressId) {
            // Send OTP for sign-in
            await signIn.prepareFirstFactor({
              strategy: "email_code",
              emailAddressId: emailAddressId,
            });

            setVerification({ ...verification, state: "pending" });
            router.push("/confirm-email");
          } else {
            Alert.alert(
              "Error",
              "Could not find email address for verification"
            );
          }
        } catch (signInErr: any) {
          Alert.alert(
            "Error",
            signInErr?.errors?.[0]?.longMessage || "Sign-in failed"
          );
          console.error("Sign-in error:", JSON.stringify(signInErr, null, 2));
        }
      } else {
        Alert.alert("Error", err?.errors?.[0]?.longMessage || "Sign-up failed");
        console.error("Sign-up error:", JSON.stringify(err, null, 2));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer useImage>
      <SafeAreaView className="flex-1 h-full items-center">
        <View className="flex-1 mt-32 px-4 gap-3 w-full">
          <Text className="text-2xl font-inter-medium text-white text-center">
            What’s your email?
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
          onPress={onContinuePress}
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
