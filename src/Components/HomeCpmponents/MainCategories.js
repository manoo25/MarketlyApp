import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import SectionHeader from "../GlobalComponents/SectionHeader";
import { useDispatch, useSelector } from "react-redux";
import { fetchcategories } from "../../Redux/Slices/Categories";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { PATHS } from "../../routes/Paths";
import { styles } from "../../../styles";

const MoreObj = { id: '6', name: 'المزيد', img: require("../../../assets/HomeSlide/more.png") };

const CategoryCard = ({ item, onPress }) => (
  <View style={componentStyles.cardContainer}>
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={componentStyles.imageContainer}>
        {item.id == "6" ? (
          <Image source={item.img} style={componentStyles.image} resizeMode="contain" />
        ) : (
          <Image source={{ uri: item.img }} style={componentStyles.image} resizeMode="contain" />
        )}
      </View>
      <Text style={[componentStyles.titleText, styles.h2, { fontSize: 11 }]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  </View>
);

function MainCategories() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.Categories);
  const [displayCategories, setDisplayCategories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchcategories());
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      const initialCategories = categories.slice(0, 5);
      setDisplayCategories([...initialCategories, MoreObj]);
    }
  }, [categories]);

  const handleCategoryPress = (item) => {
    if (item.id === "6") {
      navigation.navigate(PATHS.AllCategories);
    } else {
      navigation.navigate(PATHS.CategoryProducts, { category: item });
    }
  };

  return (
    <View style={componentStyles.container}>
      <SectionHeader text="الأقسام" />
      
      <FlatList
        data={displayCategories}
        renderItem={({ item }) => (
          <CategoryCard item={item} onPress={() => handleCategoryPress(item)} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={4} 
        columnWrapperStyle={componentStyles.columnWrapper}
        contentContainerStyle={componentStyles.listContentContainer}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const componentStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  listContentContainer: {
    paddingTop: 10,
  },
  columnWrapper: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  cardContainer: {
    width: 77,
    height: 82,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  imageContainer: {
    height: 60,
    width: 60,
    borderRadius: 10,
    backgroundColor: '#327AFF1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  titleText: {
    textAlign: 'center',
    marginTop: 6,
    color: '#424047',
  },
});

export default MainCategories;