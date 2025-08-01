import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import debounce from "lodash.debounce";
import OffersSearch from "../Components/OffersComponents/OffersSearch";
import { fetchProducts } from "../Redux/Slices/productsSlice";
import OffersList from "../Components/OffersComponents/OffersList";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";
import { colors, styles } from "../../styles";
import CategoryTabs from "../Components/OffersComponents/CategoryTabs";
import SortFilter from "../Components/OffersComponents/useSortedProducts";
import HeaderPages from "../Components/GlobalComponents/HeaderPages";
import SkeletonBox from "../Components/GlobalComponents/SkeletonBox.js";

export default function OffersPage() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { products, loading } = useSelector((state) => state.products);

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("الكل");
  const [selectedSortOption, setSelectedSortOption] = useState("default");
  const [showSortModal, setShowSortModal] = useState(false);

  const handleSearchRef = useRef();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    handleSearchRef.current = debounce((text, offers) => {
      setIsDebouncing(false);
      if (text.trim() === "") return setSearchedData([]);

      const result = offers.filter((product) =>
        product?.name?.toLowerCase().includes(text.toLowerCase())
      );
      setSearchedData(result);
    }, 300);

    return () => handleSearchRef.current?.cancel();
  }, []);

  const offersProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];
    return products.filter(
      (item) => item?.onSale === true || item?.onSale === "true"
    );
  }, [products]);

  const handleSearchChange = useCallback(
    (text) => {
      setSearchQuery(text);
      setIsDebouncing(true);
      handleSearchRef.current?.(text, offersProducts);
    },
    [offersProducts]
  );

  const filteredOffers = useMemo(() => {
    if (categoryFilter === "الكل") return offersProducts;
    return offersProducts.filter(
      (item) => item.category?.name === categoryFilter
    );
  }, [offersProducts, categoryFilter]);

  const getProductPrice = (product) =>
    parseFloat(product?.endPrice ?? product?.traderprice ?? 0);

  const displayData = useMemo(() => {
    const baseData =
      searchQuery.trim() === ""
        ? filteredOffers
        : searchedData.length > 0
          ? searchedData
          : [];

    if (selectedSortOption === "highToLow") {
      return [...baseData].sort(
        (a, b) => getProductPrice(b) - getProductPrice(a)
      );
    } else if (selectedSortOption === "lowToHigh") {
      return [...baseData].sort(
        (a, b) => getProductPrice(a) - getProductPrice(b)
      );
    }

    return baseData;
  }, [searchQuery, searchedData, filteredOffers, selectedSortOption]);

  const offerCategories = useMemo(() => {
    const categorySet = new Set();
    offersProducts.forEach((product) => {
      if (product.category?.name) {
        categorySet.add(product.category.name);
      }
    });
    return Array.from(categorySet);
  }, [offersProducts]);

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <View style={style.container}>
          {/* Header */}
          <View style={{ alignItems: 'center', marginTop: 60, marginBottom: 16 }}>
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row-reverse' }}>
              <HeaderPages title={'العروض'} navigate={() => navigation.navigate("Home")} />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={style.searchIconContainer}
                  onPress={() => setShowSearch((prev) => !prev)}
                >
                  <Ionicons name="search" size={24} color="#424047" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>
        <View style={style.skContainer}>
          <FlatList
            data={[...Array(6)]}
            keyExtractor={(_, index) => index.toString()}
            numColumns={2}
            columnWrapperStyle={style.column}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View key={index} style={style.gridItem}>
                <SkeletonBox style={style.imageSkeleton} />
                <SkeletonBox style={style.textSkeleton} />
                <SkeletonBox style={style.priceSkeleton} />
              </View>
            )}
          />
        </View>



      </View>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setShowSearch(false);
        setSearchQuery("");
        Keyboard.dismiss();
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={style.container}>
          {/* Header */}
          <View style={{ alignItems: 'center', marginTop: 60, marginBottom: 16 }}>
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row-reverse' }}>
              <HeaderPages title={'العروض'} navigate={() => navigation.navigate("Home")} />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={style.searchIconContainer}
                  onPress={() => setShowSearch((prev) => !prev)}
                >
                  <Ionicons name="search" size={24} color="#424047" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Search Input */}
          {showSearch && (
            <OffersSearch
              query={searchQuery}
              onChange={handleSearchChange}
              onClose={() => {
                setSearchQuery("");
                setShowSearch(false);
              }}
            />
          )}

          <CategoryTabs
            categories={offerCategories}
            onCategoryChange={setCategoryFilter}
          />

          <SortFilter
            selectedOption={selectedSortOption}
            onSelect={(option) => setSelectedSortOption(option)}
          />

          <OffersList
            data={displayData}
            isSearching={searchQuery.trim() !== ""}
            hasResults={displayData.length > 0}
            searchQuery={searchQuery}
            isDebouncing={isDebouncing}

          />
        </View>

        <Modal
          isVisible={showSortModal}
          onBackdropPress={() => setShowSortModal(false)}
          style={{ justifyContent: "flex-end", margin: 0 }}
        >
          <View style={style.modalContainer}>
            <Text style={style.modalTitle}>رتب حسب</Text>
            {[
              { label: "السعر من الأعلى", value: "highToLow" },
              { label: "السعر من الأقل", value: "lowToHigh" },
              { label: "بدون ترتيب", value: "default" },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => {
                  setSelectedSortOption(option.value);
                  setShowSortModal(false);
                }}
                style={style.modalOption}
              >
                <Text
                  style={{
                    color:
                      selectedSortOption === option.value
                        ? "#327AFF"
                        : "#333",
                  }}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    writingDirection: "rtl",
  },
  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    height: 90
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#FAFAFA",
    borderRadius: 105,
    borderWidth: 1,
    borderColor: "#EFECF3",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "flex-end",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    alignSelf: "flex-end",
  },
  modalOption: {
    paddingVertical: 12,
  },
  skContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
    backgroundColor: '#fff',
  },

  column: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  gridItem: {
    width: '48%',
    borderRadius: 12,
    backgroundColor: '#F7F7F7',
    padding: 8,
    alignItems: 'center',
  },

  imageSkeleton: {
    width: '100%',
    height: 130,
    borderRadius: 10,
    marginBottom: 10,
  },

  textSkeleton: {
    width: '80%',
    height: 14,
    borderRadius: 6,
    marginBottom: 6,
  },

  priceSkeleton: {
    width: '60%',
    height: 12,
    borderRadius: 6,
  },

});
