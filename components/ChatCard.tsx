import { Chat } from "@/types/type";
import React from "react";
import { Text, View } from "react-native";

interface ChatCardProps {
  chat: Chat;
}
const ChatCard = ({ chat }: ChatCardProps) => {
  return (
    <View
      className={`p-4 max-w-[80%] ${chat.isUser ? "self-end bg-white/20 rounded-2xl" : "self-start px-0"}`}
    >
      <Text className="text-white font-inter-regular text-lg">
        {chat.message}
      </Text>
    </View>
  );
};

export default ChatCard;
