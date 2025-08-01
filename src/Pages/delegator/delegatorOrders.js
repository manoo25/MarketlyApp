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
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { editOrder, getDelegatorOrders, getOrders } from "../../Redux/Slices/Orders";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import NotesModal from "../../Components/GlobalComponents/Modal";
import HeaderPages from "../../Components/GlobalComponents/HeaderPages";
import { styles } from "../../../styles";
import { DelegatesPaths } from "../../routes/delegatesRoute/delegatesPaths";

const DelegatorOrders = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [note, setNote] = useState('');
  const [cancelOrderId, setcancelOrderId] = useState('');
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.Orders);
  const orders = useSelector((state) => state.Orders.delegatesOrders);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(getDelegatorOrders());
    }
  }, [dispatch, isFocused]);

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
      dispatch(getDelegatorOrders());
      Alert.alert("تم", "تم الغاءالطلب بنجاح.");
    }

    setIsModalVisible(false);
  }

  return (
    <View style={style.container}>
      <View style={{ alignItems: 'center', marginTop: 60, marginBottom: 24 }}>
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row-reverse' }}>
          <HeaderPages title={'طلبات العملاء'} navigate={() => navigate(DelegatesPaths.DelegatorProducts)} />
            </View>
            </View>
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
                        <Text style={[styles.h3, style.dateText]} >اسم العميل: </Text>
                        <Text style={[styles.h3, style.dateText]}>
                          {item.user_id?.name.split(' ', 2).join(' ') ?? '--'}</Text>
                      </View>
                      <View style={[style.orderNumberRow, { marginTop: 8 }]}>
                        <Text style={[styles.h3, style.dateText]} >الهاتف: </Text>

                        <Text style={[styles.h3, style.dateText]}>
                          {item.user_id?.phone ?? '--'}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={style.priceRow}>

                    <TouchableOpacity onPress={() => navigate(DelegatesPaths.DelegatorOrderDetails, { OrderData: item })}>
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
                        <Text style={[[
                          styles.h3, style.deliveryTextRow, { fontSize: 12, color: 'green' }]]}
                        >تم التاكيد من قبل المندوب</Text>
                      </View>

                    }

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

});

        export default DelegatorOrders;
