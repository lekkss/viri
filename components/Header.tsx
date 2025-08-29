import { icons } from "@/constants";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type HeaderProps = {
  title?: string;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <View className="flex-row items-center justify-between mt-5">
      <TouchableOpacity>
        <Image
          tintColor="#D0FF5B"
          source={icons.chatPlus}
          className=""
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View className="min-h-12">
        {title ? (
          <Text className="font-inter-regular text-2xl text-[#FFFFFF] mt-3">
            {title}
          </Text>
        ) : (
          <Image
            source={icons.viri}
            className="size-12"
            resizeMode="contain"
            tintColor="white"
          />
        )}
      </View>

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
