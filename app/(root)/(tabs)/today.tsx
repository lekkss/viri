import { fetchAPI } from "@/assets/lib/fetch";
import { sendMessageToOpenAI } from "@/assets/lib/openai";
import AIInput from "@/components/AIInput";
import ChatCard from "@/components/ChatCard";
import ChatLoading from "@/components/ChatLoading";
import EmptyChat from "@/components/EmptyChat";
import Header from "@/components/Header";
import ScreenContainer from "@/components/ScreenContainer";
import { useMessagesStore } from "@/store";
import { Chat } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import React, { useState } from "react";
import { FlatList, View } from "react-native";

const Today = () => {
  const {
    messages,
    isLoading,
    addUserMessage,
    addAssistantMessage,
    setLoading,
  } = useMessagesStore();

  const [conversationId, setConversationId] = useState<string | null>(null);
  const { user } = useUser();

  const createConversation = async () => {
    try {
      // You'll need to get the actual user_id from your auth context
      const user_id = user?.id; // Replace with actual user ID
      console.log("Creating conversation for user:", user_id);

      const response = await fetchAPI("/(api)/conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          title: "New Chat", // You can make this dynamic based on first message
        }),
      });

      console.log("Conversation created:", response);
      return response.conversation.id;
    } catch (error) {
      console.error("Error creating conversation:", error);
      return null;
    }
  };

  const saveMessage = async (
    role: "user" | "assistant",
    content: string,
    convId?: string
  ) => {
    const conversationIdToUse = convId || conversationId;
    if (!conversationIdToUse) return;

    try {
      const user_id = user?.id;

      await fetchAPI("/(api)/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation_id: conversationIdToUse,
          user_id,
          role,
          content,
          model_used: role === "assistant" ? "gpt-3.5-turbo" : null,
        }),
      });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    try {
      setLoading(true);
      addUserMessage(message);

      let currentConversationId = conversationId;

      // Create conversation if this is the first message
      if (!currentConversationId && messages.length === 0) {
        const newConversationId = await createConversation();
        console.log(newConversationId, "newConversationId");
        setConversationId(newConversationId);
        currentConversationId = newConversationId;
      }

      const content = await sendMessageToOpenAI(message);
      addAssistantMessage(content);

      // Save messages to database using the current conversation ID
      if (currentConversationId) {
        await saveMessage("user", message, currentConversationId);
        await saveMessage("assistant", content, currentConversationId);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      addAssistantMessage(
        error instanceof Error && error.message.includes("Rate limit")
          ? "I'm a bit busy right now. Please wait a moment and try again."
          : "Sorry, I'm having trouble responding right now. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer
      roundedBottom
      roundedBottomRadius={30}
      useImage={true}
      safeArea
    >
      <View className="flex-1 flex flex-col px-6">
        {/* Top section */}
        <View>
          <Header />
        </View>

        {/* Center section */}
        {messages.length === 0 ? (
          <EmptyChat />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={messages}
            renderItem={({ item }) => <ChatCard chat={item as Chat} />}
            keyExtractor={(item) => item.id.toString()}
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
          <AIInput onSendMessage={handleSendMessage} />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default Today;
