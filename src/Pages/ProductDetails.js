import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import { colors, styles } from "../../styles";
import RecommendedProducts from "../Components/ProductDeatailsComponents/RecommendedProducts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fetchSpecificProducts } from "../Redux/Slices/productsSlice";
import {
  addOrUpdateCartItem,
  deleteCartItem,
  fetchSpecificCartItems,
  updateCartItem,
} from "../Redux/Slices/CartItems";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowRight2 } from "iconsax-react-nativejs";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import SectionHeader from "../Components/GlobalComponents/SectionHeader";
import GoBack from "../Components/GlobalComponents/GoBack";
import CartIcon from "../Components/GlobalComponents/CartIcon";
import { PATHS } from "../routes/Paths";

function ProductDetails() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { specificProduct } = useSelector((state) => state.products);
  const { specificCartItem,cartItems } = useSelector((state) => state.CartItems);
  const [SpecificCartItemQty, SetSpecificCartItemQty] = useState(0);

  const route = useRoute();
  const { ProductId } = route.params;


  useEffect(() => {
    dispatch(fetchSpecificProducts(ProductId));
    dispatch(fetchSpecificCartItems(ProductId));
  }, [dispatch, ProductId]);

  useEffect(() => {
    if (specificCartItem.length > 0) {
      SetSpecificCartItemQty(specificCartItem[0].quantity);
    } else {
      SetSpecificCartItemQty(0);
    }
  }, [specificCartItem]);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchSpecificCartItems(ProductId));
    }, [])
  );

  function IncreseQuantity() {
    const newQty = SpecificCartItemQty + 1;
    SetSpecificCartItemQty(newQty);

    if (specificCartItem.length > 0) {
      dispatch(
        updateCartItem({
          id: specificCartItem[0].id,
          quantity: newQty,
        })
      );
    }
  }

  function DecreseQuantity() {
    if (SpecificCartItemQty > 0) {
      const newQty = SpecificCartItemQty - 1;
      SetSpecificCartItemQty(newQty);

      if (newQty === 0 && specificCartItem.length > 0) {
        dispatch(deleteCartItem(specificCartItem[0].id));
        dispatch(fetchSpecificCartItems(ProductId));
      } else if (specificCartItem.length > 0) {
        dispatch(
          updateCartItem({
            id: specificCartItem[0].id,
            quantity: newQty,
          })
        );
      }
    }
  }

  async function AddToCart(ProId,traderID) {
    await dispatch(addOrUpdateCartItem({ product_id: ProId,traderID:traderID, quantity: 1, navigate:navigation.navigate }));
    dispatch(fetchSpecificCartItems(ProductId));
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, backgroundColor: "#FFFF" }}>
          <View style={{ alignItems: "center" }}>
           {cartItems.length>0 &&
          
             <View style={{ position: 'absolute', top: 20, left: 20, zIndex: 999 }}>
  <TouchableOpacity onPress={() => navigation.navigate(PATHS.CartScreen)}>
    <CartIcon />
  </TouchableOpacity>
</View>
          
           }
           
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                backgroundColor: "#FFFF",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                top: 20,
                right: 20,
                zIndex: 1,
              }}
            >
              
             <GoBack/>
            </View>

            <View
              style={{
                width: "100%",
                height: 180,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
                overflow: "hidden",
                paddingHorizontal: 5,
              }}
            >
              <Image
                resizeMode="contain"
                source={{ uri: specificProduct[0]?.image }}
                style={{ width: "100%", height: "100%" }}
              />

              {specificProduct[0]?.onSale && (
                <Text
                  style={[
                    styles.h3,
                    {
                      fontSize: 19,
                      color: colors.primary,
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      borderRadius: 8,
                      textAlign: "center",
                      backgroundColor: "#327AFF1A",
                      alignSelf: "flex-start",
                      fontWeight: "600",
                      position: "absolute",
                      bottom: 10,
                      right: 30,
                    },
                  ]}
                >
                  وفر{" "}
                 {Math.round((specificProduct[0].traderprice-specificProduct[0].endPrice)*(100/specificProduct[0].traderprice))
               
                 }
               %
                </Text>
              )}
            </View>
          </View>

          <View style={[style.top, styles.paddingView, { marginTop: 5 }]}>
            <View style={{ paddingHorizontal: 10 }}>
              <Text style={[styles.h3, { textAlign: "right", marginTop: 10 }]}>
                {specificProduct[0]?.name}
              </Text>

              <View style={styles.priceContainer}>
                {specificProduct[0]?.onSale && (
                  <Text
                    style={[
                      styles.h3,
                      {
                        textAlign: "right",
                        marginTop: 10,
                        marginStart: 8,
                        fontSize: 20,
                        color: "#7B7686",
                        textDecorationLine: "line-through",
                      },
                    ]}
                  >
                    {specificProduct[0]?.traderprice} ج.م
                  </Text>
                )}

                <Text
                  style={[
                    styles.h3,
                    {
                      textAlign: "right",
                      marginTop: 10,
                      fontSize: 20,
                      color: colors.primary,
                    },
                  ]}
                >
                  {specificProduct[0]?.endPrice}
                </Text>
                <Text
                  style={[
                    styles.h3,
                    {
                      textAlign: "right",
                      marginTop: 10,
                      fontSize: 20,
                      color: colors.primary,
                    },
                  ]}
                >
                  ج.م /
                </Text>
                <Text
                  style={[
                    styles.h3,
                    {
                      textAlign: "right",
                      marginTop: 10,
                      fontSize: 20,
                      color: colors.primary,
                    },
                  ]}
                >
                  {specificProduct[0]?.unit}
                </Text>
              </View>
            </View>

            <View style={styles.dividerLine} />
            {/* <Text style={[{ marginTop: 5, marginBottom: 4 }, styles.h3]}>
              منتجات هذا التاجر
            </Text> */}
           
            <RecommendedProducts  TraderID={specificProduct[0]?.trader_id}/>
            <View style={styles.dividerLine} />

            <View
              style={{
                flex: 1,
                alignSelf: "stretch",
                paddingBottom: 15,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row-reverse",
              }}
            >
              <View style={{ marginRight: 10 }}>
                <View style={styles.priceContainer}>
                  <Text
                    style={[styles.h2, { color: colors.primary, fontSize: 20 }]}
                  >
                    الإجمالى:
                  </Text>
                  {specificCartItem?.length > 0 ? (
                    <Text
                      style={[
                        styles.h2,
                        { color: colors.primary, fontSize: 20 },
                      ]}
                    >
                      {specificProduct[0]?.endPrice * SpecificCartItemQty}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        styles.h2,
                        { color: colors.primary, fontSize: 20 },
                      ]}
                    >
                      {specificProduct[0]?.endPrice}
                    </Text>
                  )}
                  <Text
                    style={[styles.h2, { color: colors.primary, fontSize: 20 }]}
                  >
                    ج.م
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {specificCartItem?.length > 0 && (
                  <View
                    style={[
                      styles.quantityContainer,
                      {
                        width: 175,
                        height: 60,
                        borderRadius: 12,
                        backgroundColor: "#FAFAFA",
                        borderColor: "#EFECF3",
                        borderWidth: 0.2,
                      },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={IncreseQuantity}
                      style={styles.quantityButton}
                    >
                      <AntDesign name="plus" size={25} color="#327AFF" />
                    </TouchableOpacity>
                    <Text
                      style={[styles.quantityText, styles.h3, { fontSize: 20 }]}
                    >
                      {SpecificCartItemQty}
                    </Text>
                    <TouchableOpacity
                      disabled={SpecificCartItemQty === 1}
                      onPress={DecreseQuantity}
                      style={styles.quantityButton}
                    >
                      <AntDesign
                        name="minus"
                        size={25}
                        color={SpecificCartItemQty === 1 ? "gray" : "#327AFF"}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {specificCartItem?.length == 0 && (
                <TouchableOpacity
                  onPress={() => AddToCart(specificProduct[0]?.id,specificProduct[0]?.trader_id)}
                  style={{
                    backgroundColor: colors.BtnsColor,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 175,
                    height: 60,
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={[
                      styles.h3,
                      {
                        textAlign: "right",
                        fontSize: 20,
                        color: colors.white,
                      },
                    ]}
                  >
                    اضافة الى العربة
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  top: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default ProductDetails;
