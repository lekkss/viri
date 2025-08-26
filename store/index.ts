import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface VerificationState {
  state: "default" | "pending" | "success" | "error";
  error: string;
  code: string;
}

interface UserState {
  email: string;
  clerkId: string;
  name: string;
}

interface Message {
  id: string;
  isUser: boolean;
  message: string;
  createdAt: Date;
  imageUrl?: string;
}

interface MessagesState {
  messages: Message[];
  isLoading: boolean;
  addMessage: (message: Omit<Message, "id" | "createdAt">) => void;
  addUserMessage: (content: string) => void;
  addAssistantMessage: (content: string) => void;
  clearMessages: () => void;
  setLoading: (loading: boolean) => void;
}

interface SignUpStore {
  verification: VerificationState;
  user: UserState;
  isLoading: boolean;
  setVerification: (verification: Partial<VerificationState>) => void;
  setUser: (user: Partial<UserState>) => void;
  setLoading: (loading: boolean) => void;
}

export const useSignUpStore = create<SignUpStore>()(
  persist(
    (set) => ({
      verification: {
        state: "default",
        error: "",
        code: "",
      },
      user: {
        email: "",
        clerkId: "",
        name: "",
      },
      isLoading: false,
      setVerification: (verification) =>
        set((state) => ({
          verification: { ...state.verification, ...verification },
        })),
      setUser: (user) =>
        set((state) => ({
          user: { ...state.user, ...user },
        })),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "signup-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useMessagesStore = create<MessagesState>()(
  persist(
    (set, get) => ({
      messages: [],
      isLoading: false,

      addMessage: (message) => {
        const newMessage: Message = {
          ...message,
          id: Date.now().toString(),
          createdAt: new Date(),
        };
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      },

      addUserMessage: (content) => {
        get().addMessage({
          isUser: true,
          message: content,
        });
      },

      addAssistantMessage: (content) => {
        get().addMessage({
          isUser: false,
          message: content,
        });
      },

      clearMessages: () => {
        set({ messages: [] });
      },

      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "messages-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
