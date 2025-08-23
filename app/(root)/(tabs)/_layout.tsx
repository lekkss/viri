import { icons } from "@/constants";
import { Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

const TabIcon = ({
  focused,
  icon,
  name,
}: {
  focused: boolean;
  icon: any;
  name: string;
}) => {
  return (
    <View className="items-center w-[100px] gap-2">
      <Image
        tintColor={focused ? "#D0FF5B" : "#a3a3a3"}
        source={icon}
        className="size-8"
        resizeMode="contain"
      />
      <Text className={`${focused ? "text-white" : "text-[#a3a3a3]"}`}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#a3a3a3",
        tabBarStyle: {
          backgroundColor: "black",
          height: 100,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 15,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Inter-Regular",
        },
      }}
    >
      <Tabs.Screen
        name="today"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.today} name="Today" />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.explore} name="Discover" />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.library} name="Library" />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.account} name="Account" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
