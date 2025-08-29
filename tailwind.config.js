/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        white: "#E6E6E6",
        greyText: "#B3B3B3",
        darkText: "#070A00",
        green: "#D0FF5B",
      },
      fontFamily: {
        inter: ["Inter_400Regular"],
        "inter-thin": ["Inter_100Thin"],
        "inter-extralight": ["Inter_200ExtraLight"],
        "inter-light": ["Inter_300Light"],
        "inter-regular": ["Inter_400Regular"],
        "inter-medium": ["Inter_500Medium"],
        "inter-semibold": ["Inter_600SemiBold"],
        "inter-bold": ["Inter_700Bold"],
        "inter-extrabold": ["Inter_800ExtraBold"],
        "inter-black": ["Inter_900Black"],
        "inter-thin-italic": ["Inter_100Thin_Italic"],
        "inter-extralight-italic": ["Inter_200ExtraLight_Italic"],
        "inter-light-italic": ["Inter_300Light_Italic"],
        "inter-regular-italic": ["Inter_400Regular_Italic"],
        "inter-medium-italic": ["Inter_500Medium_Italic"],
        "inter-semibold-italic": ["Inter_600SemiBold_Italic"],
        "inter-bold-italic": ["Inter_700Bold_Italic"],
        "inter-extrabold-italic": ["Inter_800ExtraBold_Italic"],
        "inter-black-italic": ["Inter_900Black_Italic"],
      },
    },
  },
  plugins: [],
};
