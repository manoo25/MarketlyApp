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

const OffersList = ({
  data,
  isSearching,
  hasResults,
  searchQuery,
  isDebouncing,
}) => {
  const dispatch = useDispatch();
  const renderItem = ({ item }) => (
    <View
      style={{
        width: "48%",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 12,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 160,
          borderRadius: 14,
          overflow: "hidden",
          marginBottom: 10,
          position: "relative",
          backgroundColor: "#EBF2FF",
        }}
      >
        {item.traderprice > item.endPrice && (
          <DiscountBadge
            discount={
              ((item.traderprice - item.endPrice) / item.traderprice) * 100
            }
          />
        )}

        <Image
          source={{ uri: item.image }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 14,
          }}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 8,
            left: 8,
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: "#EBF2FF",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 1 },
            elevation: 2,
          }}
          onPress={() => {
            dispatch(addOrUpdateCartItem({ product_id: item.id, quantity: 1 }));
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#327AFF",
              fontWeight: "600",
              marginTop: -1,
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontSize: 15,
          color: "#1A1A1A",
          fontWeight: "500",
          textAlign: "left",
          marginBottom: 6,
        }}
        numberOfLines={2}
      >
        {item.name}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 14, color: "#327AFF", fontWeight: "600" }}>
          {item.endPrice} EGP
        </Text>
        {item.traderprice > item.endPrice && (
          <Text
            style={{
              fontSize: 12,
              color: "#7B7686",
              textDecorationLine: "line-through",
              marginLeft: 6,
            }}
          >
            {item.traderprice} EGP
          </Text>
        )}
      </View>
    </View>
  );

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
      columnWrapperStyle={{
          flexDirection: "row",
          paddingHorizontal: 16,
       justifyContent:
  data.length % 2 === 1 ? "flex-start" : "space-between",
      }}
      contentContainerStyle={{
        paddingBottom: 40,
        flexGrow: 1,
        paddingTop: 12,
         direction: "rtl",
         
      }}
    />
  );
};

export default OffersList;
