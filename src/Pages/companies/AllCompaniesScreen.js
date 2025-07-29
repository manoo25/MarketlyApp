import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../Redux/Slices/companiesSlice";
import CustomAppBar from "../../Components/Categories/CustomAppBar";
import { useNavigation } from "@react-navigation/native";

// استايلات عامة
import { styles as globalStyles, colors } from "../../../styles";

const AllCompaniesScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { companies } = useSelector((state) => state.companies);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePress = (item) => {
    navigation.navigate("CompanyProductsScreen", { company: item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={localStyles.cardContainer}
      onPress={() => handlePress(item)}
    >
      <View style={localStyles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={localStyles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={globalStyles.titleNavegator}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <CustomAppBar
        title="كل الشركات"
        onBack={() => navigation.goBack()}
        showSearch={true}
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        onSearchClose={() => setSearchQuery("")}
      />

      <FlatList
  data={filteredCompanies}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  numColumns={4}
  key={4} 
  columnWrapperStyle={{

    paddingBottom: 12,
  }}
  contentContainerStyle={[
    localStyles.listContent,
    { direction: "rtl" }, 
  ]}
/>

    </View>
  );
};

export default AllCompaniesScreen;

// استايلات خاصة بالصفحة دي فقط
const localStyles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  cardContainer: {
    width: 100,
    height: 110,
    alignItems: "center",
    marginBottom: 10,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: colors.LightBtnsColor,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
