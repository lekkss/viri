import BackgroundView from "@/components/BackgroundView";
import { icons, images } from "@/constants";
import CustomButton from "@/constants/CustomButton";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Welcome() {
  return (
    <BackgroundView>
      <SafeAreaView className="flex h-full px-4">
        <View className="flex-1 justify-center items-center">
          <Image
            source={images.logo}
            className="w-20 h-20 mb-4"
            resizeMode="contain"
          />
          <Text className="font-inter-bold text-3xl text-white mb-1">
            Welcome to Viri
          </Text>
          <Text className="font-inter-regular text-greyText">
            Where curiosity meets direction.
          </Text>
        </View>

        <View className="w-full flex flex-col pb-6">
          <CustomButton
            title="Continue with Google"
            className="mt-4"
            IconLeft={() => (
              <Image source={icons.google} className="w-6 h-6 mr-2" />
            )}
            textVariant="primary"
            onPress={() => {}}
          />
          <CustomButton
            title="Continue with Email"
            className="mt-4"
            textVariant="secondary"
            bgVariant="outline"
            onPress={() => {}}
          />
          <Text className="font-inter-regular text-greyText text-sm text-center mt-2 max-w-[250px] mx-auto">
            By tapping continue, you agree to our{" "}
            <Text className="text-white">Terms</Text> and{" "}
            <Text className="text-white">Privacy Policy</Text>
          </Text>
        </View>
      </SafeAreaView>
    </BackgroundView>
  );
}
