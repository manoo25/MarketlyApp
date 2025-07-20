import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";

export const useAppFonts = () =>
  useFonts({
    "Tajawal-ExtraLight": require("./assets/fonts/Tajawal-ExtraLight.ttf"),
    "Tajawal-Light": require("./assets/fonts/Tajawal-Light.ttf"),
    "Tajawal-Regular": require("./assets/fonts/Tajawal-Regular.ttf"),
    "Tajawal-Medium": require("./assets/fonts/Tajawal-Medium.ttf"),
    "Tajawal-Bold": require("./assets/fonts/Tajawal-Bold.ttf"),
    "Tajawal-ExtraBold": require("./assets/fonts/Tajawal-ExtraBold.ttf"),
    "Tajawal-Black": require("./assets/fonts/Tajawal-Black.ttf"),
  });


export const colors = {
  primary: "#0077FF",
  secondary: "#FF6F61",
  text: "#333333",
  background: "#F5F7FA",
  border: "#E0E0E0",
  white: "#FFFFFF",
  black: "#000000",
  gray: "#888888",
};

export const styles = StyleSheet.create({
 
  h1: {
    fontFamily: "Tajawal-Bold",
    fontSize: 32,
    color: colors.text,
  },
  h2: {
    fontFamily: "Tajawal-Bold",
    fontSize: 28,
    color: colors.text,
  },
  h3: {
    fontFamily: "Tajawal-Regular",
    fontSize: 24,
    color: colors.text,
  },
  h4: {
    fontFamily: "Tajawal-Regular",
    fontSize: 20,
    color: colors.text,
  },
  h5: {
    fontFamily: "Tajawal-Light",
    fontSize: 16,
    color: colors.text,
  },

  text: {
    fontFamily: "Tajawal-Regular",
    fontSize: 22,
    color: colors.text,
  },

  paragraph: {
    fontFamily: "Tajawal-Light",
    fontSize: 14,
    color: colors.gray,
    lineHeight: 22,
  },

  introContainer: {
    flex: 1,
    justifyContent:'center',
    alignItems:"center",
  },
});
