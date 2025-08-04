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
  LightBtnsColor: "#327AFF1A",
  secondary: "#FF6F61",
  text: "#333333",
  background: "#F5F7FA",
  border: "#E0E0E0",
  white: "#FFFFFF",
  black: "#000000",
  gray: "#7B7686",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  dividerLine: {
    height: 1,
    width: "100%",
    backgroundColor: "#aeaeae4b",
    marginVertical: 15,
  }
  , h1: {
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
    fontWeight: 500,
    fontSize: 26,
    color: colors.text,
  },
  h4: {
    fontFamily: "Tajawal-Regular",
    fontSize: 20,
    color: colors.text,
  },
  titleNavegator: {
    fontFamily: "Tajawal-Medium",
    fontSize: 11,
    marginTop: 4
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
    justifyContent: 'center',
    alignItems: "center",
  },
  paddingView: {
    paddingTop: 25,
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingHorizontal: 15,
    alignItems: 'flex-end',
  },
  LoginLogo: {
    width: 200,
    height: 200,
  }
  ,
  container: {
    paddingVertical: 15,
    width: '100%',
    textAlign: 'right'
  },
  inputWrapper: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#EFECF3',
    paddingHorizontal: 10,
    marginTop: 15,
    height: 52,
    borderRadius: 15,


  }
  ,
  input: {
    flex: 1,
    paddingHorizontal: 0,
    textAlign: 'right',
    marginTop: 5,

  },
  icon: {
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    textAlign: 'right',
    marginTop: 4
  },
  Btn: {
    flex: 1,
    backgroundColor: colors.BtnsColor,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 12,

  },
  picker: {
    height: 150,
    color: "#000",
    backgroundColor: 'lightgray',
    zIndex: 2000,
    top: 0
  },
  priceContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 5
  },
  headerContent: {
    width: "100%",
    alignItems: "flex-end",
  },
  headerRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    position: 'relative',
  },
  headerTitle: {
    textAlign: "right",
    marginRight: 8,
    marginTop: 10
  },
  header: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F9FB',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 90,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: 10,
  },
  quantityButton: {
    borderRadius: 8,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  quantityText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    minWidth: 24,
  },
});

export const componentStyles = StyleSheet.create({

  cardContainer: {
    height: 188,
    width: 165,
    marginTop: 12,
    paddingRight: 15,
    //    backgroundColor:'green'

  },
  h2: {
    fontFamily: "Tajawal-Bold",
    fontSize: 28,
    color: colors.text,
  },
  h3: {
    fontFamily: "Tajawal-Medium",
    fontWeight: 500,
    fontSize: 26,
    color: colors.text,
  },
  imageContainer: {
    height: 130,
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#EBF2FF',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  addButton: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    backgroundColor: '#EBF2FF',
    borderRadius: 25,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  infoContainer: {

    paddingRight: 10,
  },
  titleText: {
    textAlign: 'right',
    fontSize: 13,
    marginTop: 8,
    color: '#424047'
  },
  priceText: {
    textAlign: 'right',
    fontSize: 13,
    marginTop: 8,
    color: '#424047'
  },
});

export const Sortstyles = StyleSheet.create({
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: "flex-start",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#424047",
    // paddingBottom: 5,
    fontFamily: "Tajawal-Medium",
  },
  iconButton: {
    padding: 2,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
    marginHorizontal: 4,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 10,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  closeButton: {
    width: 26,
    marginLeft: -3,
    height: 26,
    borderWidth: 2,
    borderColor: "#424047",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    color: "#424047",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    marginRight: 0,
    textAlign: "right",
    fontFamily: "Tajawal-Bold",
  },
  radioRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#666",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  selectedDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  radioLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#424047",
    fontFamily: "Tajawal-Regular",
    flexShrink: 1,
  },
  applyButton: {
    backgroundColor: "#007bff",
    borderRadius: 15,
    paddingVertical: 12,
    marginTop: 20,
  },
  applyButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Tajawal-Regular",
  },
});
