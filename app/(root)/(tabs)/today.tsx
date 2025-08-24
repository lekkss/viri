import AIInput from "@/components/AIInput";
import ChatCard from "@/components/ChatCard";
import ChatLoading from "@/components/ChatLoading";
import EmptyChat from "@/components/EmptyChat";
import Header from "@/components/Header";
import ScreenContainer from "@/components/ScreenContainer";
import { chat } from "@/utils/chat";
import React from "react";
import { FlatList, View } from "react-native";

const Today = () => {
  const isLoading = false;
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
            keyExtractor={(item) => item.createdAt.toString()}
            contentContainerStyle={{
              paddingTop: 20,
              gap: 10,
            }}
            ListFooterComponent={() =>
              isLoading && (
                <View className="flex-1 flex justify-center items-start">
                  <ChatLoading />
                </View>
              )
            }
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
