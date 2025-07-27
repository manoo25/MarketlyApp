// AllCategoriesScreen.js
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchcategories } from "../../Redux/Slices/Categories";
import CustomAppBar from "../../Components/Categories/CustomAppBar";
import { useNavigation } from "@react-navigation/native";

const AllCategoriesScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { categories } = useSelector((state) => state.Categories);

  useEffect(() => {
    dispatch(fetchcategories());
  }, []);

  const handlePress = (item) => {
    navigation.navigate("CategoryProducts", { category: item }); // هنكملها بعدين
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
      style={styles.cardContainer}
      onPress={() => handlePress(item)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.img }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={[styles.titleText]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "space-around",
          paddingBottom: 12,
        }}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default AllCategoriesScreen;

const styles = StyleSheet.create({
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
    backgroundColor: "#327AFF1A",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  titleText: {
    fontSize: 11,
    textAlign: "center",
    marginTop: 6,
  },
});
