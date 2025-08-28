import { OtpInputFieldProps } from "@/types/type";
import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const OtpInputField = ({
  label,
  labelStyle,
  containerStyle,
  inputStyle,
  className,
  value,
  onChangeText,
  onComplete,
  length = 6,
  autoFocus = true,
  keyboardType = "number-pad",
}: OtpInputFieldProps) => {
  const inputRefs = useRef<TextInput[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (value.length === length && onComplete) {
      onComplete(value);
    }
  }, [value, length, onComplete]);

  const handleInputChange = (text: string, index: number) => {
    if (text.length > 1) {
      // Handle paste or multiple character input
      const pastedText = text.slice(0, length);
      const newValue =
        value.slice(0, index) +
        pastedText +
        value.slice(index + pastedText.length);
      onChangeText(newValue.slice(0, length));

      // Focus the next empty input or the last one
      const nextIndex = Math.min(index + pastedText.length, length - 1);
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
        setFocusedIndex(nextIndex);
      }
    } else {
      // Handle single character input
      const newValue = value.slice(0, index) + text + value.slice(index + 1);
      onChangeText(newValue.slice(0, length));

      // Move to next input if character was entered
      if (text && index < length - 1) {
        if (inputRefs.current[index + 1]) {
          inputRefs.current[index + 1].focus();
          setFocusedIndex(index + 1);
        }
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !value[index] && index > 0) {
      // Move to previous input on backspace if current input is empty
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
        setFocusedIndex(index - 1);
      }
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < length; i++) {
      inputs.push(
        <TextInput
          key={i}
          ref={(ref) => {
            if (ref) inputRefs.current[i] = ref;
          }}
          className={`w-14 h-14 text-center text-xl font-inter-bold border-2 rounded-xl mx-1 text-[#E6E6E6]  border-[#E6E6E61A]/10 bg-[#E6E6E61A]/10
           ${inputStyle}`}
          value={value[i] || ""}
          onChangeText={(text) => handleInputChange(text, i)}
          onKeyPress={(e) => handleKeyPress(e, i)}
          onFocus={() => handleFocus(i)}
          keyboardType={keyboardType}
          maxLength={1}
          selectTextOnFocus
          selectionColor="#E6E6E6"
        />
      );
    }
    return inputs;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className={`my-2 w-full ${className}`}>
          {label && (
            <Text className={`text-lg font-inter-medium mb-3 ${labelStyle}`}>
              {label}
            </Text>
          )}
          <View
            className={`flex flex-row items-center justify-center ${containerStyle}`}
          >
            {renderInputs()}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default OtpInputField;
