import { images } from "@/constants";
import React from "react";
import { ImageBackground } from "react-native";

const BackgroundView = ({ children }: { children: React.ReactNode }) => {
  return (
    <ImageBackground
      source={images.bg}
      className="flex-1 w-full"
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
};

export default BackgroundView;
