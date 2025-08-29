import { icons } from "@/constants";
import { Blog } from "@/utils/discover";
import { formatDate } from "@/utils/formatDate";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

type BlogCardProps = {
  blog: Blog;
};

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <View style={styles.linearGradient}>
      <LinearGradient
        pointerEvents="none"
        colors={["#FFFFFF14", "#FFFFFF00"]}
        locations={[0, 1]}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        style={styles.insetOverlay}
      />
      <View style={styles.innerContainer}>
        <View className="h-[180px] w-full rounded-lg overflow-hidden">
          <Image
            source={blog.image as ImageSourcePropType}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <View className=" flex-1 justify-evenly gap-2">
          <Text
            className="text-[#FFFFFF] font-inter-regular text-base"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {blog.description}
          </Text>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Text className="text-[#FFFFFF] font-inter-light text-sm">
                {formatDate(blog.createdAt)}
              </Text>
              <View className="h-1 w-1 bg-white rounded-full" />
              <Text className="text-[#FFFFFF] font-inter-light text-sm">
                {blog.timeToRead} read
              </Text>
            </View>
            <Image source={icons.save} className="w-6 h-6" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    height: 300,
    width: "100%",
    borderRadius: 12, // <-- Outer Border Radius
    position: "relative",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FFFFFF4D",
  },
  insetOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
  },
  innerContainer: {
    borderRadius: 15, // <-- Inner Border Radius
    flex: 1,
    margin: 5, // <-- Border Width
    backgroundColor: "transparent",
    justifyContent: "center",
  },
});

export default BlogCard;
