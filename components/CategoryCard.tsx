import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CategoryCardProps = {
  category: {
    id: string;
    name: string;
  };
  isActive: boolean;
  onPress: () => void;
};

const CategoryCard = ({ category, isActive, onPress }: CategoryCardProps) => {
  if (isActive) {
    return (
      <TouchableOpacity
        onPress={onPress}
        className="w-fit h-[40px] rounded-full p-3 items-center justify-center px-6 bg-green"
      >
        <Text className="font-inter-medium text-darkText">{category.name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.inactiveWrapper}>
      <LinearGradient
        pointerEvents="none"
        colors={["#FFFFFF14", "#FFFFFF00"]}
        locations={[0, 1]}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        style={styles.insetOverlay}
      />
      <TouchableOpacity
        onPress={onPress}
        className="w-fit h-[40px] rounded-full p-3 items-center justify-center px-6 bg-[#EBEBEB33]"
      >
        <Text className="font-inter-medium text-darkText">{category.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  inactiveWrapper: {
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "#FFFFFF4D",
    position: "relative",
    overflow: "hidden",
    alignSelf: "flex-start",
  },
  insetOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 9999,
  },
});
