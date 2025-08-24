import { images } from "@/constants";
import React from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  View,
  ViewStyle,
} from "react-native";

interface ScreenContainerProps {
  children: React.ReactNode;
  roundedBottom?: boolean;
  roundedBottomRadius?: number;
  backgroundColor?: string;
  useImage?: boolean;
  style?: ViewStyle;
  className?: string;
  safeArea?: boolean;
}

const ScreenContainer = ({
  children,
  roundedBottom = false,
  roundedBottomRadius = 30,
  backgroundColor = "#ffffff",
  useImage = false,
  style,
  className = "",
  safeArea = true,
}: ScreenContainerProps) => {
  const containerStyle = [
    {
      flex: 1,
      backgroundColor: useImage ? "transparent" : backgroundColor,
    },
    roundedBottom && {
      borderBottomLeftRadius: roundedBottomRadius,
      borderBottomRightRadius: roundedBottomRadius,
    },
    style,
  ];

  if (useImage) {
    return (
      <ImageBackground
        source={roundedBottom ? images.bgRounded : images.bg}
        className="flex-1 w-full bg-black"
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <View
            className={`flex-1 ${safeArea ? "pt-12" : ""} ${className}`}
            style={containerStyle}
          >
            {children}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }

  return (
    <View
      className={`flex-1 ${safeArea ? "pt-12" : ""} ${className}`}
      style={containerStyle}
    >
      {children}
    </View>
  );
};

export default ScreenContainer;
