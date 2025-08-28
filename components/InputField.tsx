import { InputFieldProps } from "@/types/type";
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const InputField = ({
  label,
  labelStyle,
  icon,
  secureTextEntry,
  value,
  onChangeText,
  inputStyle,
  iconStyle,
  containerStyle,
  className,
  placeholder,
  ...props
}: InputFieldProps) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="my-2 w-full">
        {label && (
          <Text className={`text-lg font-inter-medium mb-3 ${labelStyle}`}>
            {label}
          </Text>
        )}
        <View
          className={`flex flex-row items-center justify-start relative bg-[#E6E6E61A] rounded-full border border-[#E6E6E61A]/50 focus:border-primary-500 ${containerStyle}`}
        >
          {icon && (
            <Image
              source={icon}
              className={`w-6 h-6 ml-4 ${iconStyle}`}
              resizeMode="contain"
            />
          )}
          <TextInput
            className={`rounded-full p-4  flex-1 font-inter-medium ${inputStyle} text-center text-white`}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderTextColor="#B3B3B3"
            {...props}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InputField;
