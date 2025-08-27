import { icons } from "@/constants";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";

type CameraScreenProps = {
  onClose: () => void;
  onCapture: (image: string) => void;
};

const CameraScreen = ({ onClose, onCapture }: CameraScreenProps) => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        onCapture(photo.uri);
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex-1 justify-center bg-black">
        <Text className="text-center pb-2 text-white">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <CameraView
        ref={cameraRef}
        className="flex-1"
        facing={facing}
        style={{ flex: 1 }}
      />

      {/* Camera Controls */}
      <View className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
        <View className="flex-row items-center justify-between">
          {/* Close Button */}
          <TouchableOpacity
            onPress={onClose}
            className="bg-white/20 rounded-full p-3"
          >
            <Image source={icons.x} className="w-6 h-6" />
          </TouchableOpacity>

          {/* Capture Button */}
          <TouchableOpacity
            onPress={takePicture}
            className="bg-white rounded-full p-4 w-16 h-16 items-center justify-center"
          >
            <View className="bg-white rounded-full w-12 h-12 border-4 border-gray-300" />
          </TouchableOpacity>

          {/* Flip Camera Button */}
          <TouchableOpacity
            onPress={toggleCameraFacing}
            className="bg-white/20 rounded-full p-3"
          >
            <Text className="text-white text-sm">Flip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CameraScreen;
