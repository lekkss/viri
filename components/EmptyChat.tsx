import { icons } from "@/constants";
import React from "react";
import { Image, Text, View } from "react-native";

const EmptyChat = () => {
  return (
    <View className="flex-1 flex flex-col justify-center">
      <View className="flex flex-col gap-5">
        <View className="flex-row items-center gap-3">
          <Image source={icons.sun} className="" resizeMode="contain" />
          <Text className="text-white text-s font-inter-regular">
            Good morning Lekkss,
          </Text>
        </View>
        <Text className="text-white text-4xl font-inter-semibold max-w-[300px]">
          Where would you like to begin?
        </Text>
      </View>
    </View>
  );
};

export default EmptyChat;
