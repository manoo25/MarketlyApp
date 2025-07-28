import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  I18nManager,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import CustomAppBar from "../../Components/Categories/CustomAppBar";
import useFetchCompanies from "../../Components/Categories/useFetchCompanies";
import ListProducts from "../../Components/Categories/ListProducts";
import SortFilterModal from "../../Components/Categories/SortFilterModal";

const CategoryProductsPage = ({ route, navigation }) => {
  const { category } = route.params;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedSortOption, setSelectedSortOption] = useState("highToLow");
  const [appliedSortOption, setAppliedSortOption] = useState("highToLow");

  const { companies } = useFetchCompanies();
  const allProducts = useSelector((state) => state.products.products);

  const handleSelectCompany = (id) => {
    setSelectedCompanyId(id);
  };

  const handleApplySort = (option) => {
    setSelectedSortOption(option); // مجرد مزامنة
    setAppliedSortOption(option); // ده المهم
  };

  const companiesInThisCategory = Array.from(
    new Set(
      (allProducts || [])
        .filter((product) => product.category_id === category.id)
        .map((product) => product.company_id)
    )
  );

  const filteredCompanies = (companies || []).filter((company) =>
    companiesInThisCategory.includes(company.id)
  );

  const filteredProducts = (allProducts || []).filter((product) => {
    const belongsToCategory = product.category_id === category.id;
    const matchesCompany =
      selectedCompanyId === null || product.company_id === selectedCompanyId;
    const matchesSearch =
      searchQuery.trim() === "" ||
      product.name?.toLowerCase().includes(searchQuery.trim().toLowerCase());

    return belongsToCategory && matchesCompany && matchesSearch;
  });

  const getProductPrice = (product) =>
    parseFloat(product.endPrice ?? product.traderprice ?? 0);

  const sortedProducts = filteredProducts.slice();

  if (appliedSortOption === "highToLow") {
    sortedProducts.sort((a, b) => getProductPrice(b) - getProductPrice(a));
  } else if (appliedSortOption === "lowToHigh") {
    sortedProducts.sort((a, b) => getProductPrice(a) - getProductPrice(b));
  }

  return (
    <View style={styles.container}>
      <CustomAppBar
        title={category.name}
        onBack={() => navigation.goBack()}
        showSearch={true}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchClose={() => setSearchQuery("")}
      />

      {/* ✅ الشركات */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ direction: "rtl" }}
          contentContainerStyle={{
            flexDirection: "row-reverse",
            paddingHorizontal: 12,
            paddingVertical: 10,
          }}
        >
          {filteredCompanies
            .slice()
            .reverse()
            .map((company) => (
              <View key={company.id} style={styles.companyItem}>
                <TouchableOpacity
                  onPress={() => handleSelectCompany(company.id)}
                  style={[
                    styles.imageWrapper,
                    selectedCompanyId === company.id && styles.selected,
                  ]}
                >
                  <Image
                    source={{ uri: company.image }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text style={styles.name}>{company.name}</Text>
              </View>
            ))}

          {/* زر "جميع الشركات" */}
          <View style={styles.companyItem}>
            <TouchableOpacity
              onPress={() => handleSelectCompany(null)}
              style={[
                styles.imageWrapper,
                selectedCompanyId === null && styles.selected,
              ]}
            >
              <Image
                source={require("../../../assets/imgs/company-icon.png")}
                style={styles.image}
              />
            </TouchableOpacity>
            <Text style={styles.name}>جميع{"\n"}الشركات</Text>
          </View>
        </ScrollView>
      </View>

      {/* ✅ مودال الفلترة */}
      <SortFilterModal
        selectedOption={selectedSortOption}
        onChangeOption={setSelectedSortOption}
        onApply={handleApplySort}
      />

      {/* ✅ المنتجات */}
      <ListProducts products={sortedProducts} />
    </View>
  );
};

export default CategoryProductsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  companyItem: {
    marginTop: 10,
    alignItems: "center",
    marginHorizontal: 6,
  },
  imageWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 8,
    backgroundColor: "#FAFAFA",
    width: 48,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    borderColor: "black",
    borderWidth: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  name: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: "500",
    textAlign: "center",
    color: "#7B7686",
    fontFamily: "Tajawal-Regular",
  },
});
