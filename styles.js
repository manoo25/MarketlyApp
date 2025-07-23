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
  primary: "#46B8F0",
  BtnsColor: "#327AFF",
  secondary: "#FF6F61",
  text: "#333333",
  background: "#F5F7FA",
  border: "#E0E0E0",
  white: "#FFFFFF",
  black: "#000000",
  gray: "#7B7686",
};

export const styles = StyleSheet.create({
 
  dividerLine: {
    height: 1,
    width: "100%",
    backgroundColor: "#aeaeae",
    marginVertical: 15,
  }
  ,h1: {
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
    fontFamily: "Tajawal-Medium",
    fontWeight:500,
    fontSize: 26,
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
     textAlign: 'right'
  },

  introContainer: {
    flex: 1,
    justifyContent:'center',
    alignItems:"center",
  },
paddingView: {
  paddingTop: 25,
  backgroundColor:'#FFFFFF',
  flex: 1,
  paddingHorizontal: 16,
  alignItems: 'flex-end',
},
LoginLogo: {
 width: 133,
height: 67.23076629638672,
}
,
  container: {
    padding: 15,
    width:'100%',
     textAlign: 'right'
  },
inputWrapper: {
  flexDirection: 'row-reverse',
  alignItems: 'center',
  backgroundColor: '#FAFAFA',
  borderWidth: 1,                   
  borderColor: '#EFECF3',           
  paddingHorizontal: 10,
  marginTop:15,
  height:52,
borderRadius:15,

}
,
  input: {
    flex: 1,
    paddingHorizontal: 0,
    textAlign: 'right',
    marginTop:5
  },
  icon: {
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    textAlign: 'right',
    marginTop:5
  },
  Btn:{
    flex:1,
    backgroundColor:colors.BtnsColor,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:12,
    paddingVertical:16,
    borderRadius:12,
  
  }
});
