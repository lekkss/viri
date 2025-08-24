import { images } from "@/constants";
import React from "react";
import { ImageBackground, View } from "react-native";

interface BackgroundViewProps {
  children: React.ReactNode;
  roundedBottom?: boolean;
  roundedBottomRadius?: number;
  backgroundColor?: string;
  useImage?: boolean;
}

const BackgroundView = ({
  children,
  roundedBottom = false,
  roundedBottomRadius = 30,
  backgroundColor = "#ffffff",
  useImage = true,
}: BackgroundViewProps) => {
  if (useImage) {
    return (
      <ImageBackground
        source={images.bg}
        className="flex-1 w-full"
        resizeMode="cover"
      >
        <View
          className={`flex-1 ${roundedBottom ? "rounded-b-3xl" : ""}`}
          style={
            roundedBottom
              ? {
                  borderBottomLeftRadius: roundedBottomRadius,
                  borderBottomRightRadius: roundedBottomRadius,
                }
              : {}
          }
        >
          {children}
        </View>
      </ImageBackground>
    );
  }

  return (
    <View
      className={`flex-1 w-full ${roundedBottom ? "rounded-b-3xl" : ""}`}
      style={[
        { backgroundColor },
        roundedBottom
          ? {
              borderBottomLeftRadius: roundedBottomRadius,
              borderBottomRightRadius: roundedBottomRadius,
            }
          : {},
      ]}
    >
      {children}
    </View>
  );
};

export default BackgroundView;
