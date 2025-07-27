import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../../styles";

// بيانات تفاصيل الطلب
const orderDetails = {
  id: "87475ac7-7c7d-4ddd-b356-d33cb44f044c",
  order_number: "12345687",
  status: "done",
  created_at: "2025-07-19T16:46:27.04369",
  total: 320,
  delivery_fee: 15,
  tax: 5,
  subtotal: 300,
  user: {
    name: "ahmed gaafer",
    phone: "+20 123 456 7890",
    location: "شبين الكوم, المنوفية, 32732, مصر",
  },
  payment_method: "نقدي عند الاستلام",
  items: [
    {
      id: 1,
      name: "شعرية سرعة التوصيل",
      quantity: 2,
      price: 75,
      total: 150,
      image: "https://example.com/product1.jpg"
    },
    {
      id: 2,
      name: "شيبس الذرة الأصفر",
      quantity: 3,
      price: 25,
      total: 75,
      image: "https://example.com/product2.jpg"
    },
    {
      id: 3,
      name: "عصير برتقال طبيعي",
      quantity: 1,
      price: 75,
      total: 75,
      image: "https://example.com/product3.jpg"
    }
  ]
};

const OrderDetails = ({ navigation, route }) => {
  const { orderId } = route.params || {};

  return (
    <View style={style.container}>
      {/* الهيدر */}
      <View style={style.header}>
        <View style={style.headerContent}>
          <View style={style.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
            </TouchableOpacity>
            <Text style={[styles.h3, style.headerTitle]}>
              تفاصيل الطلب
            </Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {/* معلومات الطلب الأساسية */}
        <View style={style.section}>
          <View style={style.orderHeader}>
            <View style={style.statusContainer}>
              <View style={style.deliveryStatusRow}>
                <Text style={style.deliveryTextRow}>
                  {orderDetails.status === "done" ? "تم التوصيل" : "جارٍ التنفيذ"}
                </Text>
              </View>
              <View style={style.orderInfo}>
                <Text style={style.orderNumber}>طلب رقم: {orderDetails.order_number}</Text>
                <Text style={style.orderDate}>
                  {new Date(orderDetails.created_at).toLocaleDateString("ar-EG")} - {" "}
                  {new Date(orderDetails.created_at).toLocaleTimeString("ar-EG", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* تفاصيل العميل */}
        <View style={style.section}>
          <Text style={style.sectionTitle}>معلومات العميل</Text>
          <View style={style.customerInfo}>
            <View style={style.customerRow}>
              <MaterialIcons name="person" size={20} color="#666" />
              <Text style={style.customerText}>{orderDetails.user.name}</Text>
            </View>
            <View style={style.customerRow}>
              <MaterialIcons name="phone" size={20} color="#666" />
              <Text style={style.customerText}>{orderDetails.user.phone}</Text>
            </View>
            <View style={style.customerRow}>
              <MaterialIcons name="location-on" size={20} color="#666" />
              <Text style={style.customerText}>{orderDetails.user.location}</Text>
            </View>
          </View>
        </View>

        {/* المنتجات المطلوبة */}
        <View style={style.section}>
          <Text style={style.sectionTitle}>المنتجات المطلوبة</Text>
          {orderDetails.items.map((item) => (
            <View key={item.id} style={style.productItem}>
              <View style={style.productRow}>
                <View style={style.imageContainer}>
                  <Image
                    source={require('../../assets/products/CHIPS_006-Photoroom.png')}
                    style={style.productImage}
                  />
                </View>
                <View style={style.productDetails}>
                  <Text style={style.productName}>{item.name}</Text>
                  <View style={style.productMeta}>
                    <Text style={style.productQuantity}>الكمية: {item.quantity}</Text>
                    <Text style={style.productPrice}>{item.price} جنيه للقطعة</Text>
                  </View>
                </View>
                <View style={style.productTotal}>
                  <Text style={style.totalPrice}>{item.total} جنيه</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* ملخص الفاتورة */}
        <View style={style.section}>
          <Text style={style.sectionTitle}>ملخص الفاتورة</Text>
          <View style={style.billSummary}>
            <View style={style.billRow}>
              <Text style={style.billLabel}>المجموع الفرعي</Text>
              <Text style={style.billValue}>{orderDetails.subtotal} جنيه</Text>
            </View>
            <View style={style.billRow}>
              <Text style={style.billLabel}>رسوم التوصيل</Text>
              <Text style={style.billValue}>{orderDetails.delivery_fee} جنيه</Text>
            </View>
            <View style={style.billRow}>
              <Text style={style.billLabel}>الضرائب</Text>
              <Text style={style.billValue}>{orderDetails.tax} جنيه</Text>
            </View>
            <View style={style.divider} />
            <View style={[style.billRow, style.totalRow]}>
              <Text style={style.totalLabel}>المجموع الكلي</Text>
              <Text style={style.totalValue}>{orderDetails.total} جنيه</Text>
            </View>
          </View>
        </View>

        {/* طريقة الدفع */}
        <View style={style.section}>
          <Text style={style.sectionTitle}>طريقة الدفع</Text>
          <View style={style.paymentMethod}>
            <MaterialIcons name="payment" size={20} color="#666" />
            <Text style={style.paymentText}>{orderDetails.payment_method}</Text>
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
  headerContent: {
    width: "100%",
    alignItems: "flex-end",
  },
  headerRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  headerTitle: {
    textAlign: "right",
    marginRight: 8,
    paddingBottom: 7,
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
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
    marginTop: 4,
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
    width: 60,
    height: 60,
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
  },
  productPrice: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
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