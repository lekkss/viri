import { icons } from "@/constants";
import React from "react";
import { Image, Text, View } from "react-native";

const Header = () => {
  return (
    <View className="flex-row items-center justify-between px-4 mt-5">
      <View className="rounded-full bg-white size-10 items-center justify-center">
        <Text className="text-black text-xl">L</Text>
      </View>
      <Image
        source={icons.viri}
        className="size-12"
        resizeMode="contain"
        tintColor="white"
      />
      <Image
        source={icons.share}
        className="size-10"
        resizeMode="contain"
        tintColor="white"
      />
    </View>
  );
};

export default Header;
