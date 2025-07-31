import React, { useEffect, useState } from "react";
import { Edit } from "iconsax-react-nativejs";
import Entypo from '@expo/vector-icons/Entypo';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { colors, styles } from "../../../styles";
import HeaderPages from "../../Components/GlobalComponents/HeaderPages";
import { deleteOrderItem, fetchOrderItems, updateOrderItem } from "../../Redux/Slices/OrderItems";
import { SafeAreaView } from "react-native-safe-area-context";
import GoBack from "../../Components/GlobalComponents/GoBack";

const RenderItem = ({ item, EditMode, setOrderItemsArr, OrderItemsArr }) => {
  const dispatch = useDispatch();
  
function IncreaseQuantity(ItemID) {
  const CloneArr = [...OrderItemsArr];
  const Index = CloneArr.findIndex((item) => item.id === ItemID);
  
  if (Index !== -1) {
    const productPrice = CloneArr[Index].product?.endPrice || CloneArr[Index].product_id?.endPrice || 0;
    const newQuantity = CloneArr[Index].quantity + 1;
    const newPrice = productPrice * newQuantity;
    
    const updatedItem = { 
      ...CloneArr[Index], 
      quantity: newQuantity,
      price: newPrice
    };
    
    CloneArr[Index] = updatedItem;
    setOrderItemsArr(CloneArr);
    
    dispatch(updateOrderItem({
      id: ItemID,
      updates: {
        quantity: newQuantity,
        price: newPrice
      }
    })).then((action) => {
      if (updateOrderItem.fulfilled.match(action)) {
        // تحديث الحالة مع البيانات الجديدة
        const newArr = [...OrderItemsArr];
        const updatedIndex = newArr.findIndex(item => item.id === ItemID);
        if (updatedIndex !== -1) {
          newArr[updatedIndex] = action.payload;
          setOrderItemsArr(newArr);
        }
      }
    });
  }
}

function DecreaseQuantity(ItemID) {
  const CloneArr = [...OrderItemsArr];
  const Index = CloneArr.findIndex((item) => item.id === ItemID);
  
  if (Index !== -1) {
    const productPrice = CloneArr[Index].product?.endPrice || CloneArr[Index].product_id?.endPrice || 0;
    const newQuantity = CloneArr[Index].quantity - 1;
    
    if (newQuantity <= 0) {
      const deletedItemId = CloneArr[Index].id;
      CloneArr.splice(Index, 1);
      dispatch(deleteOrderItem(deletedItemId));
    } else {
      const newPrice = productPrice * newQuantity;
      const updatedItem = {
        ...CloneArr[Index],
        quantity: newQuantity,
        price: newPrice
      };
      CloneArr[Index] = updatedItem;
      
      dispatch(updateOrderItem({
        id: ItemID,
        updates: {
          quantity: newQuantity,
          price: newPrice
        }
      })).then((action) => {
        if (updateOrderItem.fulfilled.match(action)) {
          const newArr = [...OrderItemsArr];
          const updatedIndex = newArr.findIndex(item => item.id === ItemID);
          if (updatedIndex !== -1) {
            newArr[updatedIndex] = action.payload;
            setOrderItemsArr(newArr);
          }
        }
      });
    }
    
    setOrderItemsArr(CloneArr);
  }
}
  
  return (
    <View style={style.productItem}>
      <View style={style.productRow}>
        <View style={style.imageContainer}>
          <Image
            source={{ uri: item.product_id?.image }}
            style={style.productImage}
            resizeMode="cover"
          />
        </View>
        <View style={style.productDetails}>
          <Text style={[styles.h2, style.productName]}>
            {item.product_id?.name ?? "اسم المنتج غير متوفر"}
          </Text>
          <View style={style.productMeta}>
            <Text style={[styles.h3, style.productQuantity]}>
              الكمية: {item.quantity}
            </Text>
            <Text style={[styles.h3, style.productPrice]}>
              {item.product_id?.endPrice}
              جنيه /{item.product_id?.unit}
            </Text>
          </View>
        </View>
        <View style={{gap:8}}>
          <View style={style.productTotal}>
            <Text style={style.totalPrice}>{item.price} جنيه</Text>
          </View>
          {EditMode &&
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => IncreaseQuantity(item.id)}
                style={styles.quantityButton}>
                <AntDesign name="plus" size={16} color="#327AFF" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => DecreaseQuantity(item.id)}
                style={styles.quantityButton}>
                <AntDesign name="minus" size={16} color="#327AFF" />
              </TouchableOpacity>
            </View>
          }
        </View>
      </View>
    </View>
  )
};

const DelegatorOrderDetails = () => {
  const dispatch = useDispatch();
  const [EditMode, setEditMode] = useState(false);
  const { orderItems } = useSelector((state) => state.OrderItems);
  const [OrderItemsArr, setOrderItemsArr] = useState([]);
  const route = useRoute();
  const { OrderData } = route.params;
  
  // حساب المجموع الكلي بناءً على العناصر المعدلة
  const calculateTotal = () => {
    return OrderItemsArr.reduce((sum, item) => sum + item.price, 0);
  };

  useEffect(() => {
    dispatch(fetchOrderItems(OrderData.id));
  }, [dispatch, OrderData.id]);

  useEffect(() => {
    if (orderItems.length > 0) {
      setOrderItemsArr(orderItems);
    }
  }, [orderItems]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={[style.container]}>
        <View style={{ paddingVertical: 15, paddingHorizontal: 18 }}>
          <View style={styles.headerContent}>
            <View style={styles.headerRow}>
              <GoBack />
              <Text style={[styles.h3, styles.headerTitle]}>تفاصيل الطلب</Text>
            </View>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {/* معلومات الطلب */}
          <View style={style.section}>
            <View style={style.orderHeader}>
              <View style={style.statusContainer}>
                <View
                  style={[
                    style.deliveryStatusRow,
                    {
                      backgroundColor:
                        OrderData.status === "done"
                          ? "#D4EDDA"
                          : OrderData.status === "inprogress"
                          ? "#E3F0FF"
                          : OrderData.status === "pending"
                          ? "#FFF4E5"
                          : OrderData.status === "returns"
                          ? "#F8D7DA"
                          : "#F0F0F0",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.h2,
                      style.deliveryTextRow,
                      {
                        color:
                          OrderData.status === "done"
                            ? "green"
                            : OrderData.status === "inprogress"
                            ? "#327AFF"
                            : OrderData.status === "pending"
                            ? "#e2980eff"
                            : OrderData.status === "returns"
                            ? "red"
                            : "#327AFF",
                      },
                    ]}
                  >
                    {OrderData.status === "done" && "تم التوصيل"}
                    {OrderData.status === "inprogress" && "قيد التنفيذ"}
                    {OrderData.status === "pending" && "معلق"}
                    {OrderData.status === "returns" && "ملغى"}
                  </Text>
                </View>
                <View style={style.orderInfo}>
                  <Text style={[styles.h2, style.orderNumber]}>
                    طلب رقم: {OrderData.id}
                  </Text>
                  <Text style={[styles.h2, style.orderDate]}>
                    {new Date(OrderData.created_at).toLocaleDateString("ar-EG")}{" "}
                    -{" "}
                    {new Date(OrderData.created_at).toLocaleTimeString(
                      "ar-EG",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* بيانات العميل */}
          <View style={style.section}>
            <Text style={style.sectionTitle}>معلومات العميل</Text>
            <View style={style.customerInfo}>
              <View style={style.customerRow}>
                <MaterialIcons name="person" size={20} color="#666" />
                <Text style={style.customerText}>{OrderData.user_id.name}</Text>
              </View>
              <View style={style.customerRow}>
                <MaterialIcons name="phone" size={20} color="#666" />
                <Text style={style.customerText}>
                  {OrderData.user_id.phone}
                </Text>
              </View>
              <View style={style.customerRow}>
                <MaterialIcons name="location-on" size={20} color="#666" />
                <Text style={style.customerText}>
                  {OrderData.user_id.location}
                </Text>
              </View>
            </View>
          </View>

          {/* المنتجات المطلوبة */}
          <View style={style.section}>
            <View style={{
              height:40,
              marginBottom:10,
              flexDirection:'row-reverse',
              justifyContent:'space-between',
              alignItems:'center',
            }}>
              <Text style={[styles.h2, style.sectionTitle]}>
                المنتجات المطلوبة
              </Text>

              {EditMode ? (
                <TouchableOpacity onPress={() => setEditMode(false)}>
                  <Entypo name="save" size={35} color="#0cad34f3" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setEditMode(true)}>
                  <Edit size="35" color="#327AFF" variant="Bulk" />
                </TouchableOpacity>
              )}
            </View>
            
            <FlatList
              data={OrderItemsArr}
              keyExtractor={(item, index) =>
                item.id ? item.id.toString() : index.toString()
              }
              renderItem={({ item }) => (
                <RenderItem 
                  item={item} 
                  EditMode={EditMode}
                  setOrderItemsArr={setOrderItemsArr}
                  OrderItemsArr={OrderItemsArr}
                />
              )}
              scrollEnabled={false}
            />
          </View>

          {/* ملخص الفاتورة */}
          <View style={style.section}>
            <Text style={[styles.h2, style.sectionTitle]}>ملخص الفاتورة</Text>
            <View style={style.billSummary}>
              <View style={style.billRow}>
                <Text style={[styles.h3, style.billLabel]}>المجموع الفرعي</Text>
                <Text style={[styles.h2, style.billValue]}>
                  {calculateTotal()} جنيه
                </Text>
              </View>
              <View style={style.billRow}>
                <Text style={[styles.h3, style.billLabel]}>رسوم التوصيل</Text>
                <Text style={[styles.h2, style.billValue]}>{0} جنيه</Text>
              </View>
              <View style={style.billRow}>
                <Text style={[styles.h3, style.billLabel]}>الضرائب</Text>
                <Text style={[styles.h2, style.billValue]}>{0} جنيه</Text>
              </View>
              <View style={style.divider} />
              <View style={[style.billRow, style.totalRow]}>
                <Text style={[styles.h2, style.totalLabel]}>المجموع الكلي</Text>
                <Text style={[styles.h2, style.totalValue]}>
                  {calculateTotal()} جنيه
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              alignSelf: "stretch",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row-reverse",
              height: 100,
              paddingHorizontal: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#EBF2FF",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 175,
                  height: 60,
                  borderRadius: 16,
                }}
                onPress={() =>
                  navigate(PATHS.TraderProducts, {
                    TraderID: OrderItemsArr[0]?.product.trader_id,
                  })
                }
              >
                <Text
                  style={[
                    styles.h3,
                    {
                      textAlign: "right",
                      fontSize: 20,
                      color: colors.BtnsColor,
                    },
                  ]}
                >
                  اضافة المزيد
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                // onPress={CompleteOrder}
                style={{
                  backgroundColor: colors.BtnsColor,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 175,
                  height: 60,
                  borderRadius: 16,
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
                  اكتمال الطلب
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 0,
  },
  header: {
    alignItems: "center",
    marginTop: 0,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    textAlign: "right",
    marginRight: 8,
    marginTop: 10,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    color: "#333",
  },
  orderHeader: {
    marginBottom: 8,
  },
  statusContainer: {
    alignItems: "flex-end",
  },
  deliveryStatusRow: {
    backgroundColor: "#E3F0FF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 8,
  },
  deliveryTextRow: {
    color: "#327AFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  orderInfo: {
    alignItems: "flex-end",
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "right",
    marginTop: 10,
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
    marginTop: 10,
  },
  customerInfo: {
    gap: 12,
  },
  customerRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
  },
  customerText: {
    fontSize: 16,
    color: "#333",
    textAlign: "right",
  },
  productItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  productRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  imageContainer: {
    height: 80,
    width: 80,
    borderRadius: 12,
    backgroundColor: "#EBF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    alignItems: "flex-end",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "right",
    marginBottom: 4,
  },
  productMeta: {
    alignItems: "flex-end",
  },
  productQuantity: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
    marginTop: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
    marginTop: 8,
  },
  productTotal: {
    alignItems: "center",
    marginLeft: 12,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#327AFF",
  },
  billSummary: {
    gap: 8,
  },
  billRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  billLabel: {
    fontSize: 16,
    color: "#666",
    textAlign: "right",
  },
  billValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 8,
  },
  totalRow: {
    paddingTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "right",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#327AFF",
  },
  paymentMethod: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
  },
  paymentText: {
    fontSize: 16,
    color: "#333",
    textAlign: "right",
  },
  actionButtons: {
    marginHorizontal: 16,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#327AFF",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingFooter: {
    backgroundColor: "#F5F5F5",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 32,
    borderRadius: 12,
    paddingVertical: 16,
  },
  ratingFooterText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#888",
    textAlign: "center",
  },
});

export default DelegatorOrderDetails;