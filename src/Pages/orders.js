import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../../styles";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../Redux/Slices/Orders";
import { useNavigation } from "@react-navigation/native";
import { PATHS } from "../routes/Paths";

const Orders = () => {
  const {navigate}=useNavigation();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.Orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <View style={style.container}>
      <View style={{ alignItems: "center", marginTop: 60, marginBottom: 16 }}>
        <View style={{ width: "100%", alignItems: "flex-end" }}>
          <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigate(PATHS.Home)}>
              <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
            </TouchableOpacity>
            <Text style={[styles.h3, { textAlign: "right", marginRight: 8, paddingBottom: 7 }]}>
              الطلبات
            </Text>
          </View>
        </View>
      </View>

      {orders?.length > 0 && (
        <FlatList
          data={orders}
           keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={style.section}>
              <View style={style.infoRowBordered}>
<View
  style={[
    style.deliveryStatusRow,
    {
      backgroundColor:
        item.status === "done"
          ? "#D4EDDA"
          : item.status === "inprogress"
          ? "#E3F0FF"
          : item.status === "pending"
          ? "#FFF4E5"
          : item.status === "returns"
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
          item.status === "done"
            ? "green"
            : item.status === "inprogress"
            ? "#327AFF"
            : item.status === "pending"
            ? "#e2980eff"
            : item.status === "returns"
            ? "red"
            : "#327AFF",
      },
    ]}
  >
    {item.status === "done" && "تم التوصيل" ||
     item.status === "inprogress" && "قيد التنفيذ" ||
     item.status === "pending" && "معلق" ||
     item.status === "returns" && "ملغى"}
  </Text>
</View>


                <Text style={[styles.h2,style.dateText]}>
                  {new Date(item.created_at).toLocaleDateString("ar-EG")}
                </Text>
                <Text style={[styles.h2,style.dateText]}>
                  {new Date(item.created_at).toLocaleTimeString("ar-EG", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>

              <View style={style.underline} />

              <View style={style.productRow}>
                <View style={style.imageContainer}>
                  <Image
                    source={{ uri: item.imageCover }}
                    style={style.image}
                  />
                </View>
                <View style={style.productInfo}>
                 
                  <View style={style.orderNumberRow}>
                    <Text style={[styles.h2,style.productTitle]} >إجمالى الطلب: </Text>
                    <Text style={[styles.h2,style.productTitle]}>{item.total} ج.م</Text>
                  </View>
                  <View style={style.orderNumberRow}>
                    <Text style={[styles.h3,style.dateText]} >اسم التاجر: </Text>
                    <Text style={[styles.h3,style.dateText]}>{item.trader_id?.name??'--'}</Text>
                  </View>
                </View>
              </View>

              <View style={style.priceRow}>
               
                 <TouchableOpacity  onPress={() =>navigate(PATHS.OrderDetails, { OrderData: item })}>
                   <Text style={[style.detailsLink]}>تفاصيل الطلب</Text>
                  </TouchableOpacity> 
                 <TouchableOpacity>
                  <View style={style.deliveryStatusRow}>
                  <Text style={[styles.h2,style.deliveryTextRow]}>الطلب مرة أخرى</Text>
                </View>
                  </TouchableOpacity> 
                 
               
                
              </View>

            
            </View>
          )}
        />
      )}
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
    marginBottom: 20,
    padding: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
  },
  infoRowBordered: {
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 2,
    borderRadius: 12,
    marginBottom:0,
  },
  underline: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  deliveryStatusRow: {
    backgroundColor: "#E3F0FF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
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
    paddingHorizontal:3
  },
  productRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 0,
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
    width: '100%',
    height: '100%',
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
    marginVertical: 10,
    paddingEnd: 10,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  detailsLink: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 4,
  },

});

export default Orders;
