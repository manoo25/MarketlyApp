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
const ordersData = [
  {
    id: "87475ac7-7c7d-4ddd-b356-d33cb44f044c",
    total: 320,
    status: "done",
    created_at: "2025-07-19T16:46:27.04369",
    user: {
      name: "ahmed gaafer",
      image: "https://lh3.googleusercontent.com/a/ACg8ocJMvg4__licxBerocx7HB2v8sMZrHMTBvx4YwUIc8C5w7lJdDU=s96-c",
      location: "شبين الكوم, المنوفية, 32732, مصر",
    },
    payment_method: "scsc",
    reason: "dvdvdv",
    order_number: "12345687",
  },
    {
    id: "87475ac7-7c7d-4ddd-b356-d33cb44f044c",
    total: 320,
    status: "done",
    created_at: "2025-07-19T16:46:27.04369",
    user: {
      name: "ahmed gaafer",
      image: "https://lh3.googleusercontent.com/a/ACg8ocJMvg4__licxBerocx7HB2v8sMZrHMTBvx4YwUIc8C5w7lJdDU=s96-c",
      location: "شبين الكوم, المنوفية, 32732, مصر",
    },
    payment_method: "scsc",
    reason: "dvdvdv",
    order_number: "12345687",
  }
];

const Orders = ({ navigation }) => {
  return (
    <View style={style.container}>
      <View style={{ alignItems: "center", marginTop: 60, marginBottom: 16 }}>
        <View style={{ width: "100%", alignItems: "flex-end" }}>
          <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
            </TouchableOpacity>
            <Text style={[styles.h3, { textAlign: "right", marginRight: 8, paddingBottom: 7 }]}>
              الطلبات
            </Text>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
  {ordersData.length > 0 && (
    <View style={style.section}>
      <View style={style.infoRowBordered}>
        <View style={style.deliveryStatusRow}>
          <Text style={style.deliveryTextRow}>
            {ordersData[0].status === "done" ? "تم التوصيل" : "جارٍ التنفيذ"}
          </Text>
        </View>
        <Text style={style.dateText}>
          {new Date(ordersData[0].created_at).toLocaleDateString("ar-EG")}
        </Text>
        <Text style={style.dateText}>
          {new Date(ordersData[0].created_at).toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>

      <View style={style.underline} />

      <View style={style.productRow}>
        <View style={style.imageContainer}>
          <Image
            source={{ uri: ordersData[0].user.image }}
            style={style.image}
          />
        </View>
        <View style={style.productInfo}>
          <Text style={style.productTitle}>{ordersData[0].user.name}</Text>
          <View style={style.orderNumberRow}>
            <Text style={style.dateText}>رقم الطلب:</Text>
            <Text style={style.dateText}>{ordersData[0].order_number}</Text>
          </View>
        </View>
      </View>

      <View style={style.priceRow}>
        <View>
          <Text style={style.priceText}>{ordersData[0].total} EGP</Text>
          <Text style={style.detailsLink}>تفاصيل الطلب</Text>
        </View>
        <View style={style.deliveryStatusRow}>
          <Text style={style.deliveryTextRow}>الطلب مرة أخرى</Text>
        </View>
      </View>

      <View style={style.ratingFooter}>
        <Text style={style.ratingFooterText}>تم التقيم 5/5 ⭐</Text>
      </View>
    </View>
  )}
</ScrollView>

    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  section: {
    marginBottom: 24,
    padding: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
  },
  infoRowBordered: {
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  underline: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 12,
  },
  deliveryStatusRow: {
    backgroundColor: "#E3F0FF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 10,
  },
  deliveryTextRow: {
    color: "#327AFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  dateText: {
    color: "#B0B0B0",
    fontSize: 16,
    fontWeight: "bold",
  },
  productRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 16,
  },
  imageContainer: {
    height: 110,
    width: 120,
    borderRadius: 20,
    backgroundColor: '#EBF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  image: {
    width: 100,
    height: 90,
    borderRadius: 20,
  },
  productInfo: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 8,
  },
 orderNumberRow: {
  flexDirection: "row-reverse",
  alignItems: "center",
  marginTop: 4, 
},

  priceRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  detailsLink: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 4,
  },
  ratingFooter: {
    backgroundColor: '#F5F5F5',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 12,
  },
  ratingFooterText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#888",
    textAlign: "center",
  },
});

export default Orders;