import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import DiscountBadge from "./DiscountBadge";
import { useDispatch } from "react-redux";
import { addOrUpdateCartItem } from "../../Redux/Slices/CartItems";
import { colors, componentStyles, styles } from "../../../styles";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PATHS } from "../../routes/Paths";

const OffersList = ({
  data,
  isSearching,
  hasResults,
  searchQuery,
  isDebouncing,
}) => {
  const {navigate} = useNavigation();
  const dispatch=useDispatch();
     function AddToCart(ProId,traderID) {
     
     dispatch(addOrUpdateCartItem({ product_id: ProId,traderID:traderID, quantity: 1, navigate: navigate }));
     }
const renderItem = ({ item }) => {
  const hasDiscount = item.traderprice > item.endPrice;
  const discountPercent = hasDiscount
    ? ((item.traderprice - item.endPrice) / item.traderprice) * 100
    : 0;

  return (
    <View style={[componentStyles.cardContainer, { paddingRight: 0 }]}>
      <TouchableOpacity onPress={()=>navigate(PATHS.ProductDetails,{ProductId:item.id})}>
        <View style={componentStyles.imageContainer}>
          {hasDiscount && <DiscountBadge discount={discountPercent} />}
          <Image
            source={
              typeof item.image === "string" ? { uri: item.image } : item.image
            }
            style={componentStyles.image}
          />

          <TouchableOpacity
             onPress={() => AddToCart(item.id,item.trader_id)}
            style={componentStyles.addButton}
          >
            <AntDesign name="plus" size={24} color="blue" />
          </TouchableOpacity>
        </View>

        <View style={componentStyles.infoContainer}>
          <Text
            style={[styles.h3, componentStyles.titleText]}
            numberOfLines={2}
          >
            {item.name}
          </Text>

          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "flex-end",
              marginTop: 6,
              flexWrap: "wrap",
              gap: 4,
            }}
          >
            <Text style={[styles.h3, { fontSize: 14, color: colors.BtnsColor }]}>
              {item.endPrice ?? item.traderprice} ج
            </Text>

            {hasDiscount && (
              <Text
                style={[
                  styles.h3,
                  {
                    fontSize: 14,
                    color: "#7B7686",
                    textDecorationLine: "line-through",
                  },
                ]}
              >
                {item.traderprice} ج
              </Text>
            )}

            {item.unit && (
              <Text style={[styles.h3, { fontSize: 14 }]}>/{item.unit}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};


  const renderEmptyComponent = () => {
    if (isSearching && isDebouncing) {
      return (
        <ActivityIndicator
          size="small"
          color="#327AFF"
          style={{ marginTop: 30 }}
        />
      );
    }
    if (
      isSearching &&
      !isDebouncing &&
      data.length === 0 &&
      searchQuery.trim() !== ""
    ) {
      return (
        <Text style={{ textAlign: "center", color: "#666", marginTop: 20 }}>
          لا توجد منتجات بهذا الاسم
        </Text>
      );
    }
    if (!isSearching && data.length === 0) {
      return (
        <Text style={{ textAlign: "center", color: "#666", marginTop: 20 }}>
          لا توجد عروض متاحة حالياً.
        </Text>
      );
    }
    return null;
  };

  return (
    <FlatList
      key={"offers-2columns"}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListEmptyComponent={renderEmptyComponent}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          paddingHorizontal: 10,
      }}
    
    />
  );
};

export default OffersList;
