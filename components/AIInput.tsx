import { icons } from "@/constants";
import React from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const AIInput = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 flex flex-row items-center gap-3">
          <View className="flex-1 flex-row items-center rounded-full bg-white/20 p-3 h-[50px]">
            <TextInput
              className="flex-1 text-base text-white"
              placeholder="Tap to type or just talk"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
            />
            <Image source={icons.mic} className="size-9" resizeMode="contain" />
          </View>
          <View className="size-[50px] bg-white/20 rounded-full items-center justify-center">
            <Image source={icons.attach} resizeMode="contain" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AIInput;
