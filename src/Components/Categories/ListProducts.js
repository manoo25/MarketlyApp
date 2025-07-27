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
import { colors, styles } from "../../../styles";

const ProductCard = ({ item }) => (
  <View style={componentStyles.cardContainer}>
    <TouchableOpacity onPress={() => console.log("Card pressed")}>
      <View style={componentStyles.imageContainer}>
        <Image
          source={
            typeof item.image === "string" ? { uri: item.image } : item.image // fallback لو صورة محلية
          }
          style={componentStyles.image}
        />
        <TouchableOpacity
          onPress={() => console.log("Add button pressed")}
          style={componentStyles.addButton}
        >
          <AntDesign name="plus" size={24} color="blue" />
        </TouchableOpacity>
      </View>
      <View style={componentStyles.infoContainer}>
        <Text style={[styles.h3, componentStyles.titleText]}>{item.name}</Text>
        <Text style={[styles.h3, componentStyles.priceText]}>
          {item.endPrice ?? item.traderprice} EGP
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

function ListProducts({ products }) {
  if (!products || products.length === 0) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ textAlign: "center", color: "#666" }}>
          لا توجد منتجات لعرضها
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 16 }}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
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
    height: 188,
    width: 155,
    marginTop: 12,
    paddingRight: 15,
  },
  imageContainer: {
    height: 130,
    width: "100%",
    borderRadius: 20,
    backgroundColor: "#EBF2FF",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  addButton: {
    position: "absolute",
    left: 10,
    bottom: 10,
    backgroundColor: "#EBF2FF",
    borderRadius: 25,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  infoContainer: {
    paddingRight: 10,
  },
  titleText: {
    textAlign: "right",
    fontSize: 13,
    marginTop: 8,
    color: "#424047",
  },
  priceText: {
    textAlign: "right",
    fontSize: 13,
    marginTop: 8,
    color: "#424047",
  },
});

export default ListProducts;
