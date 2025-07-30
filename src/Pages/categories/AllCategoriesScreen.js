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
import { fetchcategories } from "../../Redux/Slices/Categories";
import CustomAppBar from "../../Components/Categories/CustomAppBar";
import { useNavigation } from "@react-navigation/native";

// ✅ استيراد الاستايلات العامة
import { styles as globalStyles, colors } from "../../../styles";

const AllCategoriesScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { categories } = useSelector((state) => state.Categories);

  useEffect(() => {
    dispatch(fetchcategories());
  }, []);

  const handlePress = (item) => {
    navigation.navigate("CategoryProducts", { category: item });
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={localStyles.cardContainer}
      onPress={() => handlePress(item)}
    >
      <View style={localStyles.imageContainer}>
        <Image
          source={{ uri: item.img }}
          style={localStyles.image}
          resizeMode="contain"
        />
      </View>

      {/* ✅ استخدام الخط الموحد */}
      <Text style={globalStyles.titleNavegator}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.white}}>
      <CustomAppBar
        title="كل الأقسام"
        onBack={() => navigation.goBack()}
        showSearch={true}
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        onSearchClose={() => setSearchQuery("")}
      />

    <FlatList
  data={filteredCategories}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  numColumns={4}
  key={4} 
  columnWrapperStyle={{
     flexDirection: 'row-reverse',
    paddingBottom: 12,
  }}
  contentContainerStyle={localStyles.listContent}
/>

    </View>
  );
};

export default AllCategoriesScreen;

// ✅ استايلات محلية خاصة بالصفحة دي فقط
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
