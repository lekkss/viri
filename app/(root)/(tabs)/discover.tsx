import BlogCard from "@/components/BlogCard";
import CategoryCard from "@/components/CategoryCard";
import Header from "@/components/Header";
import ScreenContainer from "@/components/ScreenContainer";
import { blogs, categories } from "@/utils/discover";
import { BlurView } from "expo-blur";
import React, { useMemo, useRef, useState } from "react";
import { Animated, FlatList, View } from "react-native";

const Discover = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
  const headerBlurOpacity = useMemo(
    () =>
      scrollY.interpolate({
        inputRange: [0, 40, 120],
        outputRange: [0, 0.4, 1],
        extrapolate: "clamp",
      }),
    [scrollY]
  );
  return (
    <ScreenContainer
      roundedBottom
      roundedBottomRadius={30}
      useImage={true}
      safeArea
    >
      <View className="flex-1" style={{ position: "relative" }}>
        {/* Blur effect only, no children inside */}
        <AnimatedBlurView
          pointerEvents="none"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 150,
            zIndex: 10,
            opacity: headerBlurOpacity,
          }}
          intensity={20}
          tint="dark"
        />

        {/* Foreground header & categories (not blurred) */}
        <View style={{ position: "absolute", left: 0, right: 0, zIndex: 11 }}>
          <View className="px-6">
            <Header title="Discover" />
          </View>
          <View className="mt-8 pl-6">
            <FlatList
              horizontal
              data={categories}
              renderItem={({ item }) => (
                <CategoryCard
                  category={item}
                  isActive={activeCategory === item.id}
                  onPress={() => setActiveCategory(item.id)}
                />
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10 }}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>

        <Animated.FlatList
          data={blogs}
          renderItem={({ item }) => <BlogCard blog={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            gap: 10,
            paddingTop: 160,
            paddingHorizontal: 24,
          }}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        />
      </View>
    </ScreenContainer>
  );
};

export default Discover;
