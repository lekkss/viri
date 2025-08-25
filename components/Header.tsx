import { icons } from "@/constants";
import React from "react";
import { Image, View } from "react-native";

const Header = () => {
  return (
    <View className="flex-row items-center justify-between px-4 mt-5">
      <Image
        source={icons.chatPlus}
        className=""
        resizeMode="contain"
        tintColor="white"
      />
      <Image
        source={icons.viri}
        className="size-12"
        resizeMode="contain"
        tintColor="white"
      />
      <Image
        source={icons.share}
        className=""
        resizeMode="contain"
        tintColor="white"
      />
    </View>
  );
};

export default Header;
