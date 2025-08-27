import { icons } from "@/constants";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const RecordingView = ({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  return (
    <View className="flex-1 flex-row items-center justify-between rounded-full bg-black/20 p-3 h-[55px]">
      <TouchableOpacity
        onPress={onCancel}
        className="w-10 h-10 shadow-md rounded-full items-center justify-center bg-greyText/20"
      >
        <Image source={icons.x} className="" resizeMode="contain" />
      </TouchableOpacity>
      <View className="flex-1 flex-row items-center justify-center gap-2">
        <Image source={icons.audio} className="size-5" />
        <Text className="text-white text-base font-inter-medium">
          Listening
        </Text>
      </View>
      <TouchableOpacity
        onPress={onConfirm}
        className="w-10 h-10 bg-greyText rounded-full items-center justify-center"
      >
        <Image source={icons.check} className="" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

const AIInput = ({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("idle");
  const [audioPermission, setAudioPermission] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage(""); // Clear the input after sending
    }
  };

  const stopRecording = useCallback(
    async (recording: Audio.Recording): Promise<string | null> => {
      try {
        if (recordingStatus === "recording") {
          console.log("Stopping Recording");
          await recording?.stopAndUnloadAsync();
          const recordingUri = recording?.getURI();

          // Create a file name for the recording
          const fileName = `recording-${Date.now()}.caf`;

          // Move the recording to the new directory with the new file name
          await FileSystem.makeDirectoryAsync(
            FileSystem.documentDirectory + "recordings/",
            { intermediates: true }
          );
          const finalUri =
            FileSystem.documentDirectory + "recordings/" + `${fileName}`;
          await FileSystem.moveAsync({
            from: recordingUri || "",
            to: finalUri,
          });

          // This is for simply playing the sound back
          const playbackObject = new Audio.Sound();
          await playbackObject.loadAsync({
            uri: finalUri,
          });
          await playbackObject.playAsync();

          // reset our states to record again
          setRecording(null);
          setRecordingStatus("stopped");

          return finalUri;
        }
        return null;
      } catch (error) {
        console.error("Failed to stop recording", error);
        return null;
      }
    },
    [recordingStatus]
  );

  useEffect(() => {
    // Simply get recording permission upon first render
    async function getPermission() {
      await Audio.requestPermissionsAsync()
        .then((permission) => {
          console.log("Permission Granted: " + permission.granted);
          setAudioPermission(permission.granted);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // Call function to get permission
    getPermission();
    // Cleanup upon first render
    return () => {
      if (recording) {
        stopRecording(recording);
      }
    };
  }, [recording, stopRecording]);

  async function startRecording() {
    try {
      // needed for IoS
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
      }

      const newRecording = new Audio.Recording();
      console.log("Starting Recording");
      await newRecording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus("recording");
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  }

  async function handleRecordButtonPress() {
    if (recording) {
      const audioUri = await stopRecording(recording);
      if (audioUri) {
        console.log("Saved audio file to", audioUri);
      }
    } else {
      await startRecording();
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 flex flex-row items-end gap-3">
          {recordingStatus === "recording" ? (
            <RecordingView
              onCancel={() => setRecordingStatus("idle")}
              onConfirm={() => setRecordingStatus("idle")}
            />
          ) : (
            <>
              <View className="relative flex-1 flex-row items-center rounded-[30px] bg-white/20 min-h-[50px] py-2">
                <TextInput
                  className="flex-1 text-base text-white text-wrap min-h-[30px] px-4 ml-2 mr-10"
                  placeholder="Tap to type or just talk"
                  placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  multiline
                  numberOfLines={10}
                  value={message}
                  onChangeText={setMessage}
                />
                {!message.trim() ? (
                  <TouchableOpacity
                    onPress={handleRecordButtonPress}
                    className="mr-2"
                  >
                    <Image
                      source={icons.mic}
                      className="size-9"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={handleSendMessage}
                    className="absolute bottom-4 right-4"
                  >
                    <Image source={icons.sendRd} resizeMode="contain" />
                  </TouchableOpacity>
                )}
              </View>
              <View className="size-[50px] bg-white/20 rounded-full items-center justify-center">
                <TouchableOpacity>
                  <Image
                    source={icons.share}
                    className=""
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AIInput;
