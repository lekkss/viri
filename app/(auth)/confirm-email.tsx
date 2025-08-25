import { fetchAPI } from "@/assets/lib/fetch";
import CustomButton from "@/components/CustomButton";
import OtpInputField from "@/components/OtpInputField";
import ScreenContainer from "@/components/ScreenContainer";
import { useSignUpStore } from "@/store";
import { useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";

const ConfirmEmail = () => {
  const { signUp, setActive, isLoaded } = useSignUp();
  const [otp, setOtp] = useState("");
  const {
    verification,
    setVerification,
    setUser,
    user,
    setLoading,
    isLoading,
  } = useSignUpStore();

  // Check if email is valid (basic validation)
  const isOtpValid = otp.length === 6;

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: otp,
      });

      if (signUpAttempt.status === "complete") {
        // Create user in database without name initially
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            email: signUpAttempt.emailAddress,
            clerkId: signUpAttempt.createdUserId,
            name: signUpAttempt.emailAddress,
          }),
        });

        // Store user data in store
        setUser({
          email: signUpAttempt.emailAddress || "",
          clerkId: signUpAttempt.createdUserId || "",
        });

        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: "success" });
        router.push("/name");
      } else {
        setVerification({
          ...verification,
          state: "error",
          error: signUpAttempt.status || "Verification failed",
        });
        Alert.alert("Error", "Verification failed. Please try again.");
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: "error",
        error: err.errors[0].longMessage || "Verification failed",
      });
      Alert.alert("Error", err.errors[0].longMessage || "Verification failed");
      console.error(JSON.stringify(err, null, 2));
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
