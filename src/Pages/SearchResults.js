import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SearchResults = ({ searchText, filteredProducts, products = [] }) => {
  const navigation = useNavigation();
  const foodCategories = ["عصائر", "شيبس", "ألبان", "جبن معلبة", "كيكات"];
  const mostSearchedItems = [
    { name: "شيبسى", icon: "chevron-left" },
    { name: "راني", icon: "chevron-left" },
    { name: "جبنة", icon: "chevron-left" },
    { name: "عصير", icon: "chevron-left" },
    { name: "بسكويت", icon: "chevron-left" },
    { name: "سيفن أب", icon: "chevron-left" },
  ];

  const renderProductItem = ({ item }) => (
    <>
      <TouchableOpacity
        style={styles.productItem}
        onPress={() =>
          navigation.navigate("ProductDetails", { ProductId:item.id })
        }
      >
        <View style={styles.productImageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.productContent}>
          <View style={styles.productInfo}>
            <View style={styles.headerRow}>
              <Text style={styles.productName}>{item.name}</Text>
            </View>

            <Text style={styles.productCompany}>{item.company.name}</Text>

            <View style={styles.ratingRow}>
              <View style={styles.ratingContainer}>
                <AntDesign name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>5.0</Text>
                <Text style={styles.reviewCount}>(20)</Text>
              </View>
            </View>

            <View style={styles.deliveryRow}>
              <AntDesign
                name="clockcircleo"
                size={14}
                color="#555"
                style={{ marginLeft: 4 }}
              />
              <Text style={styles.deliveryText}> ٥٥ دقيقة </Text>
              <Feather
                name="truck"
                size={15}
                style={{ marginLeft: 8, marginRight: 2 }}
              />
              <Text style={styles.deliveryText}>مجاني</Text>
            </View>

            {item.onSale && (
              <View style={styles.saleTag}>
                <Text style={styles.saleTagText}>
                  {" "}
                  خصم {item.sale}% علي بعض المنتجات{" "}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.heartIconCenter}>
          <AntDesign name="hearto" size={22} />
        </View>
      </TouchableOpacity>
      <View style={styles.productSeparator} />
    </>
  );

  if (filteredProducts.length > 0) {
    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>
          نتائج البحث ({filteredProducts.length})
        </Text>
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>
    );
  }

  if (searchText) {
    return (
      <View style={styles.noResults}>
        <Text style={styles.noResultsText}>
          لا توجد نتائج لـ "{searchText}"
        </Text>
      </View>
    );
  }

  return (
    <>
      <Text style={styles.sectionTitle}>ماذا تشتهي اليوم؟</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.foodCategories}
        contentContainerStyle={styles.foodCategoriesContent}
      >
        {foodCategories.map((food) => {
          const product = products.find((p) => p?.category?.name === food);
          return (
            <View key={food} style={styles.foodCircleContainer}>
              <View style={styles.foodImageCircle}>
                <Image
                  source={{
                    uri: product?.image || "https://via.placeholder.com/80",
                  }}
                  style={styles.foodImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.foodCategoryText}>{food}</Text>
            </View>
          );
        })}
      </ScrollView>

      <Text style={styles.sectionTitle}>الأكثر بحثاً</Text>

      <View style={styles.mostSearchedContainer}>
        {[0, 1].map((rowIndex) => (
          <View key={rowIndex} style={styles.mostSearchedRow}>
            {mostSearchedItems
              .slice(rowIndex * 3, rowIndex * 3 + 3)
              .map((item, index) => (
                <View key={index} style={styles.mostSearchedItem}>
                  <View style={styles.mostSearchedItemContent}>
                    <Text style={styles.mostSearchedItemText}>{item.name}</Text>
                    <Feather name={item.icon} size={18} color="#adb5bd" />
                  </View>
                </View>
              ))}
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    marginBottom: 20,
  },
  resultsTitle: {
    textAlign: "right",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  noResults: {
    padding: 20,
    alignItems: "center",
  },
  noResultsText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
  },
  productItem: {
    flexDirection: "row-reverse",
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  productImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: "hidden",
    marginLeft: 10,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productContent: {
    flex: 1,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  productName: {
    textAlign: "right",
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  productCompany: {
    textAlign: "right",
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  ratingRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    color: "#333",
    marginLeft: 2,
  },
  reviewCount: {
    fontSize: 12,
    color: "#888",
    marginRight: 4,
  },
  deliveryRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginTop: 4,
  },
  deliveryText: {
    fontSize: 12,
    color: "#555",
    marginLeft: 8,
  },
  freeDelivery: {
    fontSize: 12,
    color: "#28a745",
    fontWeight: "bold",
  },
  heartIconCenter: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  productSeparator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 8,
    marginHorizontal: 18,
    borderRadius: 1,
  },
  sectionTitle: {
    textAlign: "right",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  foodCategories: {
    marginBottom: 40,
  },
  foodCategoriesContent: {
    paddingHorizontal: 5,
  },
  foodCircleContainer: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  foodImageCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
  },
  foodImage: {
    width: "70%",
    height: "70%",
  },
  foodCategoryText: {
    textAlign: "center",
    color: "#333",
    fontSize: 14,
    fontWeight: "500",
  },
  mostSearchedContainer: {
    marginBottom: 20,
  },
  mostSearchedRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  mostSearchedItem: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 10,
    flex: 0.32,
    minHeight: 45,
    borderWidth: 1,
    borderColor: "#dee3ed",
    elevation: 2,
    shadowColor: "#adb5bd",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  mostSearchedItemContent: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mostSearchedItemText: {
    color: "#495057",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
    marginRight: 8,
  },

  saleTag: {
     backgroundColor: '#EBF2FF',
     paddingHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  saleTagText: {
    color: "#327AFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default SearchResults;
