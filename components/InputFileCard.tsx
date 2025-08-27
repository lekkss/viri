import { icons } from "@/constants";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type InputFileCardProps = {
  file: any;
  title?: string;
  description?: string;
  onRemove: () => void;
};

const InputFileCard = ({
  file,
  title,
  description,
  onRemove,
}: InputFileCardProps) => {
  const { name, mimeType, uri, size } = file;

  // Extract file name from URI as fallback
  const getFileNameFromUri = (uri: string) => {
    if (!uri) return "Unknown File";
    const parts = uri.split("/");
    return parts[parts.length - 1] || "Unknown File";
  };

  // Get file extension and type from mimeType or filename
  const getFileType = () => {
    if (mimeType) {
      // Extract type from mimeType (e.g., "application/pdf" -> "PDF")
      const type = mimeType.split("/")[1]?.toUpperCase() || "Unknown";
      return type;
    }

    // Fallback to extracting from filename
    const fileName = name || getFileNameFromUri(uri);
    const extension = fileName.split(".").pop()?.toUpperCase() || "Unknown";
    return extension;
  };

  // Generate a display name for the file
  const getDisplayName = () => {
    if (title) return title;
    if (name) return name;
    if (uri) return getFileNameFromUri(uri);
    return "File";
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (!bytes || bytes === 0) return "";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <TouchableOpacity className="flex-row items-start justify-between bg-white/10 rounded-2xl p-3 mb-2 w-[250px]">
      <View className="flex-1 flex-row items-center gap-2 w-full">
        <Image source={icons.plaintext} className="" />
        <View className="flex-1 flex-col">
          <Text className="text-white font-semibold text-sm" numberOfLines={1}>
            {getDisplayName()}
          </Text>
          <Text className="text-white/70 text-xs">
            {getFileType()} • {size && `${formatFileSize(size)}`}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={onRemove}
        className="bg-red-500/20 rounded-full p-2 ml-2"
      >
        <Image source={icons.x} className="" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default InputFileCard;
