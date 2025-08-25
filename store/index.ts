import { create } from "zustand";

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

interface SignUpStore {
  verification: VerificationState;
  user: UserState;
  isLoading: boolean;
  setVerification: (verification: Partial<VerificationState>) => void;
  setUser: (user: Partial<UserState>) => void;
  setLoading: (loading: boolean) => void;
}

export const useSignUpStore = create<SignUpStore>((set) => ({
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
}));
