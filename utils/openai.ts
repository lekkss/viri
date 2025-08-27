import { useEffect, useState } from "react";
import OpenAI from "react-native-openai";

// Create OpenAI instance only when needed
let openaiInstance: OpenAI | null = null;

export const getOpenAI = () => {
  if (!openaiInstance) {
    openaiInstance = new OpenAI({
      apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY || "",
      organization: process.env.EXPO_PUBLIC_OPENAI_ORGANIZATION || "",
    });
  }
  return openaiInstance;
};

// Hook for streaming chat
export const useStreamingChat = () => {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const openAI = getOpenAI();

    // Listen for messages
    const listener = (payload: any) => {
      setResult((message) => {
        const newMessage = payload.choices[0]?.delta?.content;
        if (newMessage) {
          return message + newMessage;
        }
        return message;
      });
    };

    openAI.chat.addListener("onChatMessageReceived", listener);

    // Note: Listener cleanup might need to be handled differently
    // depending on the react-native-openai implementation
  }, []);

  const sendStreamingMessage = async (message: string) => {
    try {
      setIsLoading(true);
      setResult(""); // Clear previous result

      const openAI = getOpenAI();

      // Send a streaming message
      await openAI.chat.stream({
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
        model: "gpt-3.5-turbo",
      });
    } catch (error) {
      console.error("OpenAI streaming error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (message: string) => {
    try {
      setIsLoading(true);

      const openAI = getOpenAI();

      // Use the create method for non-streaming
      const response = await openAI.chat.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
        maxTokens: 1000,
        temperature: 0.7,
      });

      const content = response.choices[0]?.message?.content || "No response";
      setResult(content);
      return content;
    } catch (error) {
      console.error("OpenAI API error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    result,
    isLoading,
    sendStreamingMessage,
    sendMessage,
    clearResult: () => setResult(""),
  };
};

// Legacy function for simple message sending
export const sendMessage = async (message: string) => {
  try {
    const openAI = getOpenAI();

    // Use the create method for non-streaming
    const response = await openAI.chat.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      maxTokens: 1000,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || "No response";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw error;
  }
};
