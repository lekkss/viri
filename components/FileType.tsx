import { icons } from "@/constants";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CameraScreen from "./CameraScreen";

type FileTypeProps = {
  onFileSelected: (file: any) => void;
  onImageSelected: (image: any) => void;
  onCancel: () => void;
  onClose: () => void;
};

const FileType = ({
  onFileSelected,
  onImageSelected,
  onClose,
}: FileTypeProps) => {
  const [showCamera, setShowCamera] = useState(false);

  const fileTypes = [
    {
      name: "Camera",
      icon: icons.camera,
      type: "image/*",
    },
    {
      name: "Photo Library",
      icon: icons.photo,
      type: "image/*",
    },
    {
      name: "File",
      icon: icons.file,
      type: "application/pdf",
    },
  ];

  const renderFileType = (item: any, index: number) => {
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 1,
        allowsMultipleSelection: true,
      });
      if (!result.canceled) {
        console.log("----->result", result);
        onImageSelected(result.assets);
        onClose();
      }
    };

    const handleFilePicker = async () => {
      let result = await DocumentPicker.getDocumentAsync({
        type: item.type, // type is different for different file types
        multiple: true,
      });
      // Check if user closed without selecting the document
      if (!result.canceled) {
        console.log("----->result", result);
        onFileSelected(result.assets);
        onClose();
      }
    };

    const handleCamera = async () => {
      // setShowCamera(true);
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        alert("Camera permission required");
        return;
      }

      const result = await ImagePicker.launchCameraAsync();

      if (!result.canceled) {
        console.log(result.assets[0].uri); // captured image URI
        onImageSelected(result.assets);
        onClose();
      }
    };

    return (
      <TouchableOpacity
        key={index}
        className={`p-3 ${index === fileTypes.length - 1 ? "" : "border-b"} border-gray-200 flex-row items-center justify-between`}
        onPress={
          item.name === "File"
            ? handleFilePicker
            : item.name === "Camera"
              ? handleCamera
              : pickImage
        }
      >
        <Text className="text-[17px] text-black">{item.name}</Text>
        <Image source={item.icon} resizeMode="contain" />
      </TouchableOpacity>
    );
  };

  if (showCamera) {
    return (
      <CameraScreen
        onClose={() => {
          setShowCamera(false);
          onClose();
        }}
        onCapture={(image) => {
          onImageSelected([{ uri: image, type: "image" }]);
          setShowCamera(false);
          onClose();
        }}
      />
    );
  }

  return (
    <View className="rounded-2xl bg-[#F8F8F8] shadow-lg w-[75%]">
      {fileTypes.map((item, index) => renderFileType(item, index))}
    </View>
  );
};

export default FileType;
