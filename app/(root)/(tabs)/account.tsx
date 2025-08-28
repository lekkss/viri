import ScreenContainer from "@/components/ScreenContainer";
import { useAuth } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Account = () => {
  const { signOut } = useAuth();

  const clearStorage = async () => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.clear();

      // Clear FileSystem cache directory
      const cacheDir = FileSystem.cacheDirectory;
      if (cacheDir) {
        const files = await FileSystem.readDirectoryAsync(cacheDir);
        for (const file of files) {
          try {
            await FileSystem.deleteAsync(`${cacheDir}${file}`);
          } catch (error) {
            console.log(`Could not delete file: ${file}`, error);
          }
        }
      }

      // Clear ImagePicker cache
      const imagePickerDir = `${FileSystem.cacheDirectory}ImagePicker/`;
      try {
        await FileSystem.deleteAsync(imagePickerDir, { idempotent: true });
      } catch (error) {
        console.log("ImagePicker cache clear error:", error);
      }

      // Clear DocumentPicker cache
      const documentPickerDir = `${FileSystem.cacheDirectory}DocumentPicker/`;
      try {
        await FileSystem.deleteAsync(documentPickerDir, { idempotent: true });
      } catch (error) {
        console.log("DocumentPicker cache clear error:", error);
      }
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  };

  const handleLogout = async () => {
    try {
      // Clear all storage first
      await clearStorage();

      // Then sign out
      await signOut();
    } catch (error) {
      console.error("Logout error:", error);
      // Still try to sign out even if storage clearing fails
      await signOut();
    }
    router.replace("/(auth)/welcome");
  };

  return (
    <ScreenContainer useImage>
      <View className="flex-1 justify-center items-center">
        <TouchableOpacity
          className="bg-red-500 p-2 rounded-md"
          onPress={handleLogout}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

export default Account;
