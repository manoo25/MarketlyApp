import React, { useEffect, useState } from "react";
import {
  View,
  Text,FlatList,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomAppBar from "../../Components/Categories/CustomAppBar";
import useFetchCompanies from "../../Components/Categories/useFetchCompanies";
import SortFilterModal from "../../Components/Categories/SortFilterModal";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchTraderProducts } from "../../Redux/Slices/productsSlice";
import { Building } from "iconsax-react-nativejs";
import DelegatorListAddToCart from "../../Components/Categories/delegatorListAddToCart";


const CompanyCard = ({ company, isSelected, onPress }) => (
  <View style={styles.companyItem}>
    <TouchableOpacity
      onPress={onPress}
      style={[styles.imageWrapper, isSelected && styles.selected]}
    >
      <Image
        source={{ uri: company.image }}
        style={styles.image}
        resizeMode="contain"
      />
    </TouchableOpacity>
    <Text style={styles.name}>{company.name}</Text>
  </View>
);

const AllCompaniesCard = ({ isSelected, onPress }) => (
  <View style={styles.companyItem}>
    <TouchableOpacity
      onPress={onPress}
      style={[styles.imageWrapper, isSelected && styles.selected]}
    >
      <Building size="25" color="#424047"/>
    </TouchableOpacity>
    <Text style={styles.name}>جميع{"\n"}الشركات</Text>
  </View>
);


const DelegatorAddToCart = ({ route, navigation }) => {
  const { TraderID } = route.params;
  const { OrderID } = route.params;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedSortOption, setSelectedSortOption] = useState("highToLow");
  const [appliedSortOption, setAppliedSortOption] = useState("highToLow");
  const { companies } = useFetchCompanies();

const dispatch=useDispatch();
    const allProducts=useSelector((state)=>state.products.traderProducts);
   
    useEffect(()=>{
dispatch(fetchTraderProducts(TraderID));
    },[TraderID]);
 
 
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
        .map((product) => product.company_id)
    )
  );

  const filteredCompanies = (companies || []).filter((company) =>
    companiesInThisCategory.includes(company.id)
  );

  const filteredProducts = (allProducts || []).filter((product) => {
    const matchesCompany =
      selectedCompanyId === null || product.company_id === selectedCompanyId;
    const matchesSearch =
      searchQuery.trim() === "" ||
      product.name?.toLowerCase().includes(searchQuery.trim().toLowerCase());

    return  matchesCompany && matchesSearch;
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
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
      <CustomAppBar
        title={'منتجات التاجر'}
        onBack={() => navigation.goBack()}
        showSearch={true}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchClose={() => setSearchQuery("")}
      />

      {/* ✅ الشركات */}
      {/* <View> */}
        <View style={{ marginTop: 10 }}>
          <FlatList
            data={[...filteredCompanies.slice().reverse(), { id: "all" }]}
            horizontal
            inverted
            keyExtractor={(item) => item.id?.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: "row-reverse",
              paddingHorizontal: 12,
              paddingVertical: 2,
            }}
            renderItem={({ item }) =>
              item.id === "all" ? (
                <AllCompaniesCard
                  isSelected={selectedCompanyId === null}
                  onPress={() => handleSelectCompany(null)}
                />
              ) : (
                <CompanyCard
                  company={item}
                  isSelected={selectedCompanyId === item.id}
                  onPress={() => handleSelectCompany(item.id)}
                />
              )
            }
          />
        </View>
      {/* </View> */}

      {/* ✅ مودال الفلترة */}
      <SortFilterModal
        selectedOption={selectedSortOption}
        onChangeOption={setSelectedSortOption}
        onApply={handleApplySort}
      />

      {/* ✅ المنتجات */}
      <DelegatorListAddToCart products={sortedProducts}  order_id={OrderID}/>
    </View>
    </SafeAreaView>
  );
};

export default DelegatorAddToCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  companyItem: {
    // marginTop: 10,
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
