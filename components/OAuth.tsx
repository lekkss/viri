import { icons } from "@/constants";
import React from "react";
import { Image } from "react-native";
import CustomButton from "./CustomButton";

const OAuth = () => {
  return (
    <CustomButton
      title="Continue with Google"
      className="mt-4"
      IconLeft={() => <Image source={icons.google} className="w-6 h-6 mr-2" />}
      textVariant="primary"
      onPress={() => {}}
    />
  );
};

export default OAuth;
