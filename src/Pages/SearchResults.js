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
import { PATHS } from "../routes/Paths";
const SearchResults = ({ searchText, filteredProducts, products = [] }) => {
  const navigation = useNavigation();

  // استخراج الفئات الفريدة من المنتجات
 const getUniqueCategories = () => {
  const unique = new Map();

  products.forEach((product) => {
    const cat = product?.category;
    if (cat && !unique.has(cat.id)) {
      unique.set(cat.id, { id: cat.id, name: cat.name });
    }
  });

  return Array.from(unique.values());
};


  const foodCategories = getUniqueCategories();

  // دالة لتقسيم الفئات إلى صفوف كل منها يحتوي على 3 عناصر
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const categoriesChunks = chunkArray(foodCategories, 3);

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

            <View style={styles.deliveryRow}>
              <AntDesign
                name="clockcircleo"
                size={14}
                color="#555"
                style={{ marginLeft: 4 }}
              />
              <Text style={styles.deliveryText}>24 ساعة</Text>
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
                  خصم {(item.traderprice-item.endPrice)*(100/item.traderprice)}% علي بعض المنتجات
                </Text>
              </View>
            )}
          </View>
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
     

<FlatList
  data={foodCategories}
  horizontal
  showsHorizontalScrollIndicator={false}
 keyExtractor={(item) => item.id.toString()}
inverted
  contentContainerStyle={styles.foodCategoriesContent}
  style={styles.foodCategories}
  renderItem={({ item: category }) => {
    const product = products.find((p) => p?.category?.name === category.name);
    return (
      <TouchableOpacity 
      onPress={()=> navigation.navigate("ProductDetails", { ProductId:product.id })}
      >
        <View style={styles.foodCircleContainer}>
        <View style={styles.foodImageCircle}>
          <Image
            source={{
              uri: product?.image || "https://via.placeholder.com/80",
            }}
            style={styles.foodImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.foodCategoryText}>{category.name}</Text>
      </View>
      </TouchableOpacity>
    );
  }}
/>


{foodCategories.length > 0 && (
  <>
    <Text style={styles.sectionTitle}>الأكثر بحثاً</Text>
    <FlatList
      data={foodCategories}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      scrollEnabled={false}
      contentContainerStyle={styles.mostSearchedContainer}
      columnWrapperStyle={styles.mostSearchedRow}
      renderItem={({ item: category, index }) => (
        <TouchableOpacity
          style={[
            styles.mostSearchedItem,
            index % 3 === 0 && { marginLeft: 0 },
            index % 3 === 2 && { marginRight: 0 },
          ]}
          onPress={() => {
            navigation.navigate(PATHS.CategoryProducts, {
              category: category,
            });
           
          }}
        >
          <View style={styles.mostSearchedItemContent}>
            <Text style={styles.mostSearchedItemText}>{category.name}</Text>
            <Feather name="chevron-left" size={18} color="#adb5bd" />
          </View>
        </TouchableOpacity>
      )}
    />
  </>
)}


    </>
  );
};

// بقية الأنماط تبقى كما هي
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
    fontFamily: "Tajawal-Regular",
  },
  noResults: {
    padding: 20,
    alignItems: "center",
  },
  noResultsText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    fontFamily: "Tajawal-Regular",
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
    fontFamily: "Tajawal-Regular",
  },
  productCompany: {
    textAlign: "right",
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
    fontFamily: "Tajawal-Regular",
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
    fontFamily: "Tajawal-Regular",
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
    fontFamily: "Tajawal-Regular",
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
    fontFamily: "Tajawal-Regular",
  },
  mostSearchedContainer: {
    marginBottom: 20,
  },
  mostSearchedRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 0, // إزالة الحشو الأفقي
  },
  mostSearchedItem: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 10,
    flex: 1, // جعل جميع العناصر متساوية في العرض
    minHeight: 45,
    borderWidth: 1,
    borderColor: "#dee3ed",
    elevation: 2,
    shadowColor: "#adb5bd",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    marginHorizontal: 4, // تقليل المسافة بين العناصر
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
    fontFamily: "Tajawal-Regular",
  },
  saleTag: {
    backgroundColor: "#EBF2FF",
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  saleTagText: {
    color: "#327AFF",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Tajawal-Regular",
    textAlign:'right',
    paddingHorizontal:5
  },
});

export default SearchResults;
