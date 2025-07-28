import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, styles } from "../../../styles";
import SectionHeader from "../GlobalComponents/SectionHeader";
import { fetchCompanies } from "../../Redux/Slices/companiesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native"; // ✅ أضفنا useNavigation

const ProductCard = ({ item, onPress }) => (
  <View style={componentStyles.cardContainer}>
    <TouchableOpacity onPress={onPress}>
      <View style={componentStyles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={componentStyles.image}
          resizeMode="contain"
        />
      </View>
      <View style={componentStyles.infoContainer}>
        <Text style={[styles.h3, componentStyles.titleText]}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

function CompaniesSlide({ sectionName }) {
  const { companies } = useSelector((state) => state.companies);
  const dispatch = useDispatch();
  const navigation = useNavigation(); // ✅ استخدمنا hook بدل البروب

  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);

  const limitedCompanies = companies.slice(0, 10);

  const handleCompanyPress = (item) => {
    navigation.navigate("CompanyProductsScreen", { company: item });
  };

  return (
    <View style={{ marginTop: 15, paddingBottom: 25 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 25,
          marginBottom: 5,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("AllCompaniesScreen")}
        >
          <Text
            style={[
              styles.h3,
              {
                fontSize: 15,
                color: colors.primary,
                padding: 8,
                borderRadius: 10,
                backgroundColor: "#327AFF1A",
              },
            ]}
          >
            المزيد
          </Text>
        </TouchableOpacity>
        <SectionHeader text={sectionName} />
      </View>

      <FlatList
        horizontal
        inverted
        showsHorizontalScrollIndicator={false}
        data={limitedCompanies}
        renderItem={({ item }) => (
          <ProductCard item={item} onPress={() => handleCompanyPress(item)} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={componentStyles.listContentContainer}
      />
    </View>
  );
}

const componentStyles = StyleSheet.create({
  cardContainer: {
    width: 130,
    marginTop: 12,
    marginRight: 15,
    paddingRight: 15,
  },
  imageContainer: {
    height: 70,
    width: 130,
    borderRadius: 20,
    backgroundColor: "#EBF2FF",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  infoContainer: {
    paddingRight: 10,
  },
  titleText: {
    textAlign: "right",
    fontSize: 13,
    marginTop: 8,
    color: "#424047",
  },
  listContentContainer: {
    paddingHorizontal: 16,
  },
});

export default CompaniesSlide;
