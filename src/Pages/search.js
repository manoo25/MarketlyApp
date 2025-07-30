import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/Slices/productsSlice";
import SearchResults from "./SearchResults";
import { PATHS } from "../routes/Paths";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearchChange = (text) => {
    setSearchText(text);
    if (text.trim() === "") {
      setFilteredProducts([]);
    } else {
      const searchTerm = text.toLowerCase();
      const filtered = products.filter((product) => {
        const productName = product?.name?.toLowerCase() || "";
        const companyName = product?.company?.name?.toLowerCase() || "";
        const categoryName = product?.category?.name?.toLowerCase() || "";
        return (
          productName.includes(searchTerm) ||
          companyName.includes(searchTerm) ||
          categoryName.includes(searchTerm)
        );
      });
      setFilteredProducts(filtered);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View style={styles.searchHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate(PATHS.Home)}
        >
          <Ionicons name="arrow-forward" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <AntDesign
            name="search1"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            value={searchText}
            onChangeText={handleSearchChange}
            placeholder="ابحث عن منتج"
            placeholderTextColor="#7B7686"
            style={[styles.searchInput, { fontFamily: "Tajawal-Regular" }]}
            keyboardType="default"
            autoCapitalize="none"
            textAlign="right"
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchText("");
                setFilteredProducts([]);
              }}
              style={styles.clearButton}
            >
              <AntDesign name="closecircle" size={16} color="#888" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <SearchResults
        searchText={searchText}
        filteredProducts={filteredProducts}
        products={products}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#f5f5f5",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: "right",
  },
  clearButton: {
    padding: 5,
  },
});

export default Search;
