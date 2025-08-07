import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import CustomAppBar from "../../Components/Categories/CustomAppBar";
import ListProducts from "../../Components/Categories/ListProducts";
import SortFilterModal from "../../Components/Categories/SortFilterModal";
import BottomCartIcon from "../../Components/GlobalComponents/bottomCartIcon";

const CompanyProductsScreen = ({ route, navigation }) => {
  const { company } = route.params;
  const allProducts = useSelector((state) => state.products.products); 
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("highToLow");
  const [appliedSortOption, setAppliedSortOption] = useState("highToLow");

 const handleApplySort = (option) => {
   setAppliedSortOption(option);
 };


  const getFilteredProducts = () => {
    return (allProducts || []).filter((product) => {
      const belongsToCompany = product.company_id === company.id;
      const matchesSearch =
        searchQuery.trim() === "" ||
        product.name?.toLowerCase().includes(searchQuery.trim().toLowerCase());

      return belongsToCompany && matchesSearch;
    });
  };

  const getProductPrice = (product) =>
    parseFloat(product.endPrice ?? product.traderprice ?? 0);

  const getSortedProducts = (products) => {
    const sorted = [...products];

    if (appliedSortOption === "highToLow") {
      sorted.sort((a, b) => getProductPrice(b) - getProductPrice(a));
    } else if (appliedSortOption === "lowToHigh") {
      sorted.sort((a, b) => getProductPrice(a) - getProductPrice(b));
    }

    return sorted;
  };

  const filteredProducts = getFilteredProducts();
  const sortedProducts = getSortedProducts(filteredProducts);

  return (
    <View style={styles.container}>
       <BottomCartIcon />
          <View style={{marginTop: 10}}>
      <CustomAppBar
        title={company.name}
        onBack={() => navigation.goBack()}
        showSearch={true}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchClose={() => setSearchQuery("")}
      />
</View>
      <SortFilterModal
        selectedOption={selectedSortOption}
        onChangeOption={setSelectedSortOption}
        onApply={handleApplySort}
      />

      <ListProducts products={sortedProducts} />
    </View>
  );
};

export default CompanyProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
