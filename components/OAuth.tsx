import { googleOAuth } from "@/assets/lib/auth";
import { icons } from "@/constants";
import { useSSO } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { Image } from "react-native";
import CustomButton from "./CustomButton";

const OAuth = () => {
  const { startSSOFlow } = useSSO();

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await googleOAuth(startSSOFlow);
      if (result.success === false && result.error?.code === "session_exists") {
        router.push("/(root)/(tabs)/today");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);
  return (
    <CustomButton
      title="Continue with Google"
      className="mt-4"
      IconLeft={() => <Image source={icons.google} className="w-6 h-6 mr-2" />}
      textVariant="primary"
      onPress={handleGoogleSignIn}
    />
  );
};

export default OAuth;
