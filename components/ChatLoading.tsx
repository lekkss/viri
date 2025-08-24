/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

const SIZE = 8;
const MARGIN = 5;
const BG = "rgb(172, 172, 172)";
const ACTIVE_BG = "#808184";
const dots = [1, 2, 3];
const INTERVAL = 300;
const ANIMATION_DURATION = 400;
const ANIMATION_SCALE = 1.8;

interface DotProps {
  active: boolean;
  size?: number;
  background?: string;
  activeBackground?: string;
  dotMargin?: number;
  animationDuration?: number;
  animationScale?: number;
}

const Dot = ({
  active,
  size = SIZE,
  background = BG,
  activeBackground = ACTIVE_BG,
  dotMargin = MARGIN,
  animationDuration = ANIMATION_DURATION,
  animationScale = ANIMATION_SCALE,
}: DotProps) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (active) {
      scaleUp();
    }
  }, [active]);

  useEffect(() => {
    if (active) {
      scaleUp();
    } else {
      scaleDown();
    }
  }, [active]);

  const scaleDown = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  const scaleUp = () => {
    Animated.timing(scale, {
      toValue: animationScale,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  const style = {
    height: size,
    width: size,
    borderRadius: size / 2,
    marginHorizontal: dotMargin,
    backgroundColor: active ? activeBackground : background,
  };

  return <Animated.View style={[style, { transform: [{ scale }] }]} />;
};

const ThreeDotsLoader = () => {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev > 2 ? 1 : prev + 1));
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.main}>
      {dots.map((i) => (
        <Dot key={i} active={i === active} />
      ))}
    </View>
  );
};

const ChatLoading = () => {
  return (
    <View className="flex-row items-center justify-start mb-4">
      <View className="bg-[#E6E6E680] rounded-full  py-2 max-w-[200px]">
        <ThreeDotsLoader />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatLoading;
