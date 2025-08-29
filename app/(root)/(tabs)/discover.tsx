import BlogCard from "@/components/BlogCard";
import CategoryCard from "@/components/CategoryCard";
import Header from "@/components/Header";
import ScreenContainer from "@/components/ScreenContainer";
import { blogs, categories } from "@/utils/discover";
import React, { useState } from "react";
import { FlatList, View } from "react-native";

const Discover = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  return (
    <ScreenContainer
      roundedBottom
      roundedBottomRadius={30}
      useImage={true}
      safeArea
    >
      <View className="flex-1 flex flex-col">
        {/* Top section */}
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
            contentContainerStyle={{
              gap: 10,
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View className="mt-8 px-6 flex-1">
          <FlatList
            data={blogs}
            renderItem={({ item }) => <BlogCard blog={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              gap: 10,
            }}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default Discover;
