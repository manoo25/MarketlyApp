import React, { useEffect } from "react";
import { Wallet3 } from 'iconsax-react-nativejs';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";

import { styles } from "../../styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderItems } from "../Redux/Slices/OrderItems";
import { MaterialIcons } from "@expo/vector-icons";
import GoBack from "../Components/GlobalComponents/GoBack";
import HeaderPages from "../Components/GlobalComponents/HeaderPages";

const RenderItem = ({ item }) => (
  <View style={style.productItem}>
    <View style={style.productRow}>
      <View style={style.imageContainer}>
        <Image
          source={{ uri: item.product?.image }}
          style={style.productImage}
          resizeMode="cover"
        />
      </View>
      <View style={style.productDetails}>
        <Text style={[styles.h2,style.productName]}>{item.product?.name ?? 'اسم المنتج غير متوفر'}</Text>
        <View style={style.productMeta}>
          <Text style={[styles.h3,style.productQuantity]}>الكمية: {item.quantity}</Text>
          <Text style={[styles.h3,style.productPrice]}>
            {item.product?.endPrice} 
            جنيه
             / 
             {item.product?.unit}
          </Text>
        </View>
      </View>
      <View style={style.productTotal}>
        <Text style={style.totalPrice}>{item.price} جنيه</Text>
      </View>
    </View>
  </View>
);

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderItems } = useSelector((state) => state.OrderItems);
  const navigation = useNavigation();
  const route = useRoute();
  const { OrderData } = route.params;
  useEffect(() => {
    dispatch(fetchOrderItems(OrderData.id));
    
  }, [dispatch, OrderData.id]);

  return (
    <View style={style.container}>
     <HeaderPages title={'تفاصيل الطلب'} />
    

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
                  {new Date(OrderData.created_at).toLocaleDateString("ar-EG")} -{" "}
                  {new Date(OrderData.created_at).toLocaleTimeString("ar-EG", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
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
              <Text style={style.customerText}>{OrderData.user_id.phone}</Text>
            </View>
            <View style={style.customerRow}>
              <MaterialIcons name="location-on" size={20} color="#666" />
              <Text style={style.customerText}>{OrderData.user_id.location}</Text>
            </View>
          </View>
        </View>

        {/* المنتجات المطلوبة */}
        <View style={style.section}>
          <Text style={[styles.h2,style.sectionTitle]}>المنتجات المطلوبة</Text>
          <FlatList
            data={orderItems}
             keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
            renderItem={RenderItem}
            scrollEnabled={false}
          />
        </View>

        {/* ملخص الفاتورة */}
        <View style={style.section}>
          <Text style={[styles.h2,style.sectionTitle]}>ملخص الفاتورة</Text>
          <View style={style.billSummary}>
            <View style={style.billRow}>
              <Text style={[styles.h3,style.billLabel]}>المجموع الفرعي</Text>
              <Text style={[styles.h2,style.billValue]}>{OrderData.total} جنيه</Text>
            </View>
            <View style={style.billRow}>
              <Text style={[styles.h3,style.billLabel]}>رسوم التوصيل</Text>
              <Text style={[styles.h2,style.billValue]}>{0} جنيه</Text>
            </View>
            <View style={style.billRow}>
              <Text style={[styles.h3,style.billLabel]}>الضرائب</Text>
              <Text style={[styles.h2,style.billValue]}>{0} جنيه</Text>
            </View>
            <View style={style.divider} />
            <View style={[style.billRow, style.totalRow]}>
              <Text style={[styles.h2,style.totalLabel]}>المجموع الكلي</Text>
              <Text style={[styles.h2,style.totalValue]}>{OrderData.total} جنيه</Text>
            </View>
          </View>
        </View>

        {/* طريقة الدفع */}
        <View style={style.section}>
          <Text style={[styles.h2,style.sectionTitle]}>طريقة الدفع</Text>
          <View style={style.paymentMethod}>
           <Wallet3 size={24} color="#000" variant="regular" />
            <Text style={[styles.h3,style.paymentText]}>عند الإستلام</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};


const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 16,
    paddingHorizontal: 16,
  },

  headerTitle: {
    textAlign: "right",
    marginRight: 8,
  marginTop:10
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
    marginBottom: 12,
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
    backgroundColor: '#EBF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  productImage: {
    width: '100%',
    height: '100%',
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
     marginTop:5
     
  },
  productPrice: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
    marginTop:8
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
    backgroundColor: '#F5F5F5',
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
export default OrderDetails;
