import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?:
    | "primary"
    | "secondary"
    | "danger"
    | "outline"
    | "success"
    | "default";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface InputFieldProps extends TextInputProps {
  label?: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
  placeholder?: string;
}
declare interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

declare interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

declare interface NavigationProps {
  navigation: any;
  route: any;
}

declare interface OtpInputFieldProps {
  label?: string;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  className?: string;
  value: string;
  onChangeText: (text: string) => void;
  onComplete?: (code: string) => void;
  length?: number;
  autoFocus?: boolean;
  keyboardType?: "number-pad" | "numeric";
}

declare interface Chat {
  id: number;
  isUser: boolean;
  message: string;
  createdAt: Date;
}
