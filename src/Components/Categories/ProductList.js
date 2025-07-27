import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const ProductCard = ({ item }) => (
  <View style={styles.cardContainer}>
    <View style={styles.imageContainer}>
      <Image
        source={
          item.image
            ? { uri: item.image } // supabase url
            : require("../../../assets/products/noodle.png") // fallback
        }
        style={styles.image}
      />
      <TouchableOpacity style={styles.addButton}>
        <AntDesign name="plus" size={20} color="blue" />
      </TouchableOpacity>
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.titleText}>{item.name}</Text>
      <Text style={styles.priceText}>{item.price} EGP</Text>
    </View>
  </View>
);

export default function ProductList({ products = [] }) {
  return (
    <View style={{ height: 270, marginTop: 16 }}>
      <FlatList
        horizontal
        inverted
        showsHorizontalScrollIndicator={false}
        data={products}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 188,
    width: 155,
    marginTop: 16,
    marginBottom: 10,
    marginLeft: 15,
  },
  imageContainer: {
    height: 150,
    width: 160,
    borderRadius: 20,
    backgroundColor: "#EBF2FF",
  },
  image: {
    width: 160,
    height: 150,
    borderRadius: 20,
  },
  addButton: {
    position: "absolute",
    left: 10,
    bottom: 10,
    backgroundColor: "white",
    borderRadius: 25,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  infoContainer: {
    marginTop: 8,
    marginLeft: 16,
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "flex-end",
  },
  titleText: {
    textAlign: "right",
    marginTop: 8,
  },
  priceText: {
    textAlign: "right",
    marginTop: 14,
  },
});
