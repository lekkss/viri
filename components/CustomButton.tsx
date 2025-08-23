import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
  bgVariant?:
    | "primary"
    | "secondary"
    | "danger"
    | "outline"
    | "success"
    | "ghost";
  textVariant?: "primary" | "secondary" | "danger" | "success";
  IconLeft?: () => React.ReactNode;
  IconRight?: () => React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const bgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "primary":
      return "bg-white";
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "outline":
      return "bg-transparent";
    case "success":
      return "bg-green-500";
    case "ghost":
      return "bg-black/10";
    default:
      return "bg-red-500";
  }
};

const textVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-darkText";
    case "secondary":
      return "text-white";
    case "danger":
      return "text-red-500";
    case "success":
      return "text-green-500";
    default:
      return "text-white";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "primary",
  IconLeft,
  IconRight,
  className,
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`w-full p-4 rounded-full flex flex-row items-center shadow-md shadow-black/20 justify-center ${
        disabled ? "opacity-50" : "active:opacity-80"
      } ${bgVariantStyle(bgVariant)} ${className}`}
      {...props}
    >
      {/* Left Icon */}
      {IconLeft && <IconLeft />}

      {/* Text */}
      <Text
        className={`text-lg font-inter-medium ${textVariantStyle(textVariant)}`}
      >
        {title}
      </Text>

      {/* Right Icon */}
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
