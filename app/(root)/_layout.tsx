import { Stack } from "expo-router";
import React from "react";

const Layput = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layput;
