import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../../styles";
import { useDispatch, useSelector } from "react-redux";
import { editOrder, getOrders } from "../Redux/Slices/Orders";
import { useNavigation } from "@react-navigation/native";
import { PATHS } from "../routes/Paths";
import GoBack from "../Components/GlobalComponents/GoBack";
import HeaderPages from "../Components/GlobalComponents/HeaderPages";
import NotesModal from "../Components/GlobalComponents/Modal";
import Empty from "../Components/GlobalComponents/Empty";
import { ReceiptText } from 'iconsax-react-nativejs';
import SkeletonBox from "../Components/GlobalComponents/SkeletonBox.js";



const Orders = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [note, setNote] = useState('');
  const [cancelOrderId, setcancelOrderId] = useState('');
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.Orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);



  async function handleSaveNotes() {
    const resultAction = await dispatch(
      editOrder({
        id: cancelOrderId,
        updatedData: {
          status: "returns",
          reason: note,
        },
      })
    );

    if (editOrder.fulfilled.match(resultAction)) {
      Alert.alert("تم", "تم الغاءالطلب بنجاح.");
    }

    setIsModalVisible(false);
  }


  return (
    <View style={style.container}>
      <View style={{ alignItems: 'center', marginTop: 60, marginBottom: 24 }}>
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row-reverse' }}>
          <HeaderPages title={'الطلبات'} navigate={() => navigate(PATHS.Home)} />
        </View>
      </View>
      {/* Replace CartItemsArr.length === 0 with orders?.length === 0 */}
      {orders?.length > 0 && loading === false ? (
        <>
          <NotesModal
            visible={isModalVisible}
            onClose={() => {
              setIsModalVisible(false);
              setNote('');
            }}
            note={note}
            setNote={setNote}
            onSave={handleSaveNotes}
            style={style}
          />

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
                      {(item.status === "done" && "تم التوصيل") ||
                        (item.status === "inprogress" && "قيد التنفيذ") ||
                        (item.status === "pending" && "معلق") ||
                        (item.status === "returns" && "ملغى")}
                    </Text>
                  </View>


                  <Text style={[styles.h2, style.dateText]}>
                    {new Date(item.created_at).toLocaleDateString("ar-EG")}
                  </Text>
                  <Text style={[styles.h2, style.dateText]}>
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
                      <Text style={[styles.h2, style.productTitle]} >إجمالى الطلب: </Text>
                      <Text style={[styles.h2, style.productTitle]}>{item.total} ج.م</Text>
                    </View>
                    <View style={style.orderNumberRow}>
                      <Text style={[styles.h3, style.dateText]} >اسم التاجر: </Text>
                      <Text style={[styles.h3, style.dateText]}>{item.trader_id?.name ?? '--'}</Text>
                    </View>
                  </View>
                </View>

                <View style={style.priceRow}>

                  <TouchableOpacity onPress={() => navigate(PATHS.OrderDetails, { OrderData: item })}>
                    <Text style={[style.detailsLink]}>تفاصيل الطلب</Text>
                  </TouchableOpacity>
                  {(item.status === "pending" || item.status === "inprogress") &&
                    <TouchableOpacity
                      onPress={() => {
                        setIsModalVisible(true);
                        setcancelOrderId(item.id);
                      }}
                    >
                      <View style={style.deliveryStatusRow}>
                        <Text style={[styles.h2, style.deliveryTextRow]}>الغاء الطلبية</Text>
                      </View>
                    </TouchableOpacity>
                  }
                  {
                    item.status === "done" &&

                    <View style={[style.deliveryStatusRow, { backgroundColor: '#D4EDDA' }]}>
                      <Text style={[
                        styles.h3, style.deliveryTextRow, { fontSize: 12, color: 'green' }]}
                      >تم التاكيد من قبل المندوب</Text>
                    </View>

                  }



                </View>


              </View>
            )}
          />
        </>
      ) : orders?.length === 0 && loading === false ? (

        <View style={{ flex: 1 }}>
          <Empty
            header={"لا يوجد طلبات"}
            subHeader={"يبدو أنك لم تقم بعمل أي طلبات بعد."}
            icon={<ReceiptText size="200" color="#424047" />}
          />
        </View>
      ) : (
        <View style={style.skContainer}>
          <FlatList
            data={[...Array(3)]}
            keyExtractor={(_, index) => index.toString()}
            vertical
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View key={index} style={style.mainProductCard}>
                <SkeletonBox style={style.mainImage} />
              </View>
            )}
          />
        </View>
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
    marginBottom: 0,
  },
  underline: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  deliveryStatusRow: {
    backgroundColor: "#F8D7DA",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
  },
  deliveryTextRow: {
    color: "red",
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
    paddingHorizontal: 3
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
  skContainer: {
    paddingHorizontal: 12,
    backgroundColor: '#fff',

  },

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  mainProductCard: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#F7F7F7',
    padding: 12,
    marginBottom: 24,
  },

  mainImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 16,
  },


});

export default Orders;
