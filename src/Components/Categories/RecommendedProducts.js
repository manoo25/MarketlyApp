import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const recommendedProductsData = [
  {
    id: "1",
    title: "شعيرية سريعة التحضير",
    price: "10.0 EGP",
    image: require("../../../assets/products/noodle.png"),
  },
  {
    id: "2",
    title: "مشروب غازى",
    price: "15.0 EGP",
    image: require("../../../assets/products/cute-cartoon-cola-drink-vector-Photoroom.png"),
  },
  {
    id: "3",
    title: "شيبسى",
    price: "10.0 EGP",
    image: require("../../../assets/products/CHIPS_006-Photoroom.png"),
  },
  {
    id: "4",
    title: "خبز",
    price: "10.0 EGP",
    image: require("../../../assets/products/81d97f939dc5d0c3ad370eea66cbb3cb-flat-bakery-bread-image.webp"),
  },
  {
    id: "5",
    title: "خبز",
    price: "10.0 EGP",
    image: require("../../../assets/products/81d97f939dc5d0c3ad370eea66cbb3cb-flat-bakery-bread-image.webp"),
  },
  {
    id: "6",
    title: "خبز",
    price: "10.0 EGP",
    image: require("../../../assets/products/81d97f939dc5d0c3ad370eea66cbb3cb-flat-bakery-bread-image.webp"),
  },
  {
    id: "7",
    title: "خبز",
    price: "10.0 EGP",
    image: require("../../../assets/products/81d97f939dc5d0c3ad370eea66cbb3cb-flat-bakery-bread-image.webp"),
  },
  {
    id: "8",
    title: "خبز",
    price: "10.0 EGP",
    image: require("../../../assets/products/81d97f939dc5d0c3ad370eea66cbb3cb-flat-bakery-bread-image.webp"),
  },
];

const ProductCard = ({ item }) => (
  <View style={componentStyles.cardContainer}>
    <View style={componentStyles.imageContainer}>
      <Image source={item.image} style={componentStyles.image} />
      <TouchableOpacity style={componentStyles.addButton}>
        <AntDesign name="plus" size={20} color="blue" />
      </TouchableOpacity>
    </View>
    <View style={componentStyles.infoContainer}>
      <Text style={componentStyles.titleText}>{item.title}</Text>
      <Text style={componentStyles.priceText}>{item.price}</Text>
    </View>
  </View>
);

function RecommendedProducts() {
  return (
    <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 16 }}>
      <FlatList
        data={recommendedProductsData}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const cardWidth = (Dimensions.get("window").width - 16 * 2 - 12) / 2;

const componentStyles = StyleSheet.create({
  cardContainer: {
    width: cardWidth,
    marginBottom: 20,
  },
  imageContainer: {
    height: 150,
    borderRadius: 16,
    backgroundColor: "#EBF2FF",
    overflow: "hidden",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 16,
    resizeMode: "contain", // أو "cover" حسب الشكل اللي تفضله
    alignSelf: "center", // علشان تبقى في النص لو الصورة صغيرة
  },
  addButton: {
    position: "absolute",
    left: 10,
    bottom: 10,
    backgroundColor: "white",
    borderRadius: 20,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  infoContainer: {
    marginTop: 8,
    alignItems: "flex-end",
  },
  titleText: {
    textAlign: "right",
    fontSize: 14,
    fontWeight: "500",
  },
  priceText: {
    textAlign: "right",
    marginTop: 4,
    color: "#666",
    fontSize: 13,
  },
});

export default RecommendedProducts;
