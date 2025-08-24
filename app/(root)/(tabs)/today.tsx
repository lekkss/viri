import AIInput from "@/components/AIInput";
import ChatCard from "@/components/ChatCard";
import EmptyChat from "@/components/EmptyChat";
import Header from "@/components/Header";
import ScreenContainer from "@/components/ScreenContainer";
import { chat } from "@/utils/chat";
import React from "react";
import { FlatList, View } from "react-native";

const Today = () => {
  return (
    <ScreenContainer
      roundedBottom
      roundedBottomRadius={30}
      useImage={true}
      safeArea
    >
      <View className="flex-1 flex flex-col px-4">
        {/* Top section */}
        <View>
          <Header />
        </View>

        {/* Center section */}
        {chat.length === 0 ? (
          <EmptyChat />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={chat}
            renderItem={({ item }) => <ChatCard chat={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
              paddingTop: 20,
              gap: 10,
            }}
          />
        )}

        {/* Bottom section */}
        <View className="w-full pb-6 ">
          <AIInput />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default Today;
