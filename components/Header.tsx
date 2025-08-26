import { icons } from "@/constants";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

const Header = () => {
  return (
    <View className="flex-row items-center justify-between px-4 mt-5">
      <TouchableOpacity>
        <Image
          tintColor="#D0FF5B"
          source={icons.chatPlus}
          className=""
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Image
        source={icons.viri}
        className="size-12"
        resizeMode="contain"
        tintColor="white"
      />
      <TouchableOpacity>
        <Image
          source={icons.share}
          className=""
          resizeMode="contain"
          tintColor="white"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
