import { icons } from "@/constants";
import { Image, TouchableOpacity, View } from "react-native";

type InputImageCardProps = {
  image: any;
  onRemove: () => void;
};

const InputImageCard = ({ image, onRemove }: InputImageCardProps) => {
  const { uri } = image;
  return (
    <TouchableOpacity className="relative flex-row items-center justify-between bg-white/10 rounded-2xl overflow-hidden mb-2 w-[75px] h-[100px]">
      <View className="flex-row items-center flex-1">
        <Image
          source={{ uri }}
          className="w-[75px] h-[100px]"
          resizeMode="cover"
        />
      </View>
      <TouchableOpacity
        onPress={onRemove}
        className="bg-red-500/50 rounded-full p-2 ml-2 absolute top-1 right-1"
      >
        <Image source={icons.x} className="" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default InputImageCard;
