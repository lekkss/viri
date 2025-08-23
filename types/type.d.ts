import { TouchableOpacityProps } from "react-native";

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
