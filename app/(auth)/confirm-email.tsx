import CustomButton from "@/components/CustomButton";
import OtpInputField from "@/components/OtpInputField";
import ScreenContainer from "@/components/ScreenContainer";
import { fetchAPI } from "@/lib/fetch";
import { useSignUpStore } from "@/store";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";

const ConfirmEmail = () => {
  const { signUp, setActive, isLoaded: isSignUpLoaded } = useSignUp();
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();

  const [otp, setOtp] = useState("");
  const {
    verification,
    setVerification,
    setUser,
    user,
    setLoading,
    isLoading,
  } = useSignUpStore();

  const isOtpValid = otp.length === 6;

  const onVerifyPress = async () => {
    if (!isSignUpLoaded || !isSignInLoaded) return;
    setLoading(true);

    try {
      // Try sign-up email verification first
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: otp,
      });

      if (signUpAttempt.status === "complete") {
        // Create user in DB if new
        await fetchAPI("/(api)/user/create", {
          method: "POST",
          body: JSON.stringify({
            email: signUpAttempt.emailAddress,
            clerkId: signUpAttempt.createdUserId,
            name: signUpAttempt.emailAddress,
          }),
        });

        setUser({
          email: signUpAttempt.emailAddress || "",
          clerkId: signUpAttempt.createdUserId || "",
        });

        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: "success" });
        router.push("/name");
        return;
      }

      throw new Error("Unexpected sign-up state");
    } catch (err: any) {
      console.error("Sign-up verification error:", err);

      // If sign-up fails, try sign-in verification
      try {
        // Attempt to verify sign-in with the OTP
        const signInAttempt = await signIn.attemptFirstFactor({
          strategy: "email_code",
          code: otp,
        });

        if (signInAttempt.status === "complete") {
          await setActive({ session: signInAttempt.createdSessionId });

          setUser({
            email: user.email, // Use the email from store
            clerkId: signInAttempt.createdSessionId || "",
          });

          setVerification({ ...verification, state: "success" });
          router.push("/(root)/(tabs)/today"); // Existing users go to main app
          return;
        } else {
          throw new Error("Sign-in verification failed");
        }
      } catch (signInErr: any) {
        console.error("Sign-in verification error:", signInErr);
        Alert.alert("Error", "Invalid verification code. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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
            {user.email}
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
          title={isLoading ? "Verifying..." : "Continue"}
          onPress={onVerifyPress}
          className={`w-[90%]`}
          bgVariant={isOtpValid && !isLoading ? "primary" : "ghost"}
          textVariant={isOtpValid && !isLoading ? "primary" : "secondary"}
          disabled={isLoading}
        />
      </SafeAreaView>
    </ScreenContainer>
  );
};

export default ConfirmEmail;
