import React, { useEffect } from 'react'
import {  StyleSheet, Text, TouchableOpacity, ScrollView, View, Modal, TextInput, Alert } from "react-native";
import { useState } from 'react';
import CartList from '../Components/CartComponents/CartList';
import { colors, styles } from '../../styles';
import { MessageText1 } from 'iconsax-react-nativejs';
import { CloseCircle } from 'iconsax-react-nativejs';
import { BagCross } from 'iconsax-react-nativejs';
import { ArrowRight2 } from 'iconsax-react-nativejs';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItemsByUserId, fetchCartItems } from '../Redux/Slices/CartItems';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { UserId } from '../Redux/Slices/GetUserData';
import {  addOrderItems } from '../Redux/Slices/OrderItems';
import { addOrder } from '../Redux/Slices/Orders';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigation } from '@react-navigation/native';
import { PATHS } from '../routes/Paths';
import HeaderPages from '../Components/GlobalComponents/HeaderPages';









function Cart() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [notes, setNotes] = useState('');
    const [savedNotes, setSavedNotes] = useState('');
    const [TotalPrice, SetTotalPrice] = useState(0);
    const dispatch=useDispatch();
    const{cartItems}=useSelector((state)=>state.CartItems);
const[CartItemsArr,setCartItemsArr]=useState([]);

  const {navigate}=useNavigation();
    useEffect(()=>{
        dispatch(fetchCartItems());
        },[dispatch]);
    useEffect(()=>{
       if (cartItems.length > 0) {
        setCartItemsArr(cartItems);
       } 
        },[cartItems]);

    useEffect(() => {
  const Total = CartItemsArr.reduce((acc, item) => {
    return acc + item.product.endPrice * item.quantity;
  }, 0); // قيمة ابتدائية 0


  SetTotalPrice(Total);
}, [CartItemsArr]);



    const handleSaveNotes = () => {
        // هنا يمكنك فعل أي شيء بالملاحظات (مثل إرسالها إلى API، تخزينها في Redux، إلخ)
        setSavedNotes(notes); // نحفظ الملاحظات في حالة مؤقتة للعرض هنا
        setIsModalVisible(false); // إخفاء الـ Modal
        Alert.alert('تم حفظ الملاحظات', `ملاحظاتك: ${notes}`); // تأكيد للمستخدم
    };



async function CompleteOrder() {
  const orderId = uuidv4();

  // تجهيز عناصر الطلب
  const orderItems = CartItemsArr.map((item) => ({
    order_id: orderId,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.product.endPrice * item.quantity,
  }));

  // تجهيز كائن الطلب
  const order = {
    id: orderId,
    trader_id: CartItemsArr[0].product.trader_id,
    user_id: UserId,
    status: 'pending',
    imageCover: CartItemsArr[0].product.image,
    total: TotalPrice,
    note: savedNotes,
  };

  try {
    const resultOrder = await dispatch(addOrder(order));
    unwrapResult(resultOrder);
    const resultItems = await dispatch(addOrderItems(orderItems));
    unwrapResult(resultItems);
    const resultDelete = await dispatch(deleteCartItemsByUserId(UserId));
    unwrapResult(resultDelete);
navigate(PATHS.Orders);
    Alert.alert(' تم إرسال الطلب بنجاح');

  } catch (error) {
    console.error(' Failed to complete order:', error);
    Alert.alert(' حدث خطأ أثناء إرسال الطلب');
  }
}









    return (
        <View style={style.container}>
           <HeaderPages title={'سلة التسوق'} navigate={() => navigate(PATHS.Home)} />

            {/* محتوى السلة */}
            <View style={{ flex: 1 }}>
                {CartItemsArr.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <>
                        <ScrollView showsVerticalScrollIndicator={false}>
                             <CartList CartItemsArr={CartItemsArr} setCartItemsArr={setCartItemsArr} />
                           
                            <View>
                                <Text style={[{ textAlign: 'right',marginTop:15 }, styles.h3]}>ملاحظات إضافية</Text>
                                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center', marginTop: 16 }}>
                                        <View style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ textAlign: 'right' }}><MessageText1 size="32" color="#424047" /></Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.h4, { textAlign: 'right', marginRight: 8, paddingBottom: 7 }]}>هل تود ان تخبرنا أى شىء اخر ؟</Text>
                                            <Text style={[styles.paragraph, { textAlign: 'right', marginRight: 8, paddingBottom: 7 }]}>اخبرنا بأى شىء تريده</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={[{ textAlign: 'right' }, styles.h3]}>ملخص الطلب</Text>
                            </View>
                            <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                                <View>
                                    <Text style={{ textAlign: 'right' }}>اجمالى الطلب</Text>
                                </View>
                                <View>
                                    <Text style={[styles.h4, { textAlign: 'right', marginRight: 8, paddingBottom: 7 }]}>{TotalPrice} ج.م </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                                <View>
                                    <Text style={{ textAlign: 'right' }}>مصاريف التوصيل</Text>
                                </View>
                                <View>
                                    <Text style={[styles.h4, { textAlign: 'right', marginRight: 8, paddingBottom: 7 ,color:'green'}]}>مجانا</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                                <View>
                                    <Text style={[styles.h3, { textAlign: 'right' }]}>الإجمالى</Text>
                                </View>
                                <View>
                                    <Text style={[styles.h4, { textAlign: 'right', marginRight: 8, paddingBottom: 7 }]}>{TotalPrice} ج.م </Text>
                                </View>
                            </View>
                        </ScrollView>
                        <View style={styles.dividerLine} />
                        <View style={{ alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row-reverse' }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <TouchableOpacity style={{
                                    backgroundColor: '#EBF2FF',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 175,
                                    height: 60,
                                    borderRadius: 16
                                }}
                                
                                onPress={()=>navigate(PATHS.TraderProducts
                                ,{TraderID:CartItemsArr[0].product.trader_id})
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
                              onPress={CompleteOrder}
                                style={{
                                    backgroundColor: colors.BtnsColor,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 175,
                                    height: 60,
                                    borderRadius: 16
                                }} >
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
                                        ارسال الطلب
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </>
                )}
            </View>
            <Modal
                animationType="slide" // تأثير ظهور من الأسفل
                transparent={true} // يجعل الخلفية شفافة
                visible={isModalVisible} // يتحكم في ظهوره أو إخفائه
                onRequestClose={() => {
                    // يمكن استخدام هذا في الأندرويد للتحكم في زر الرجوع بالجهاز
                    setIsModalVisible(!isModalVisible);
                }}>

                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <View style={{ flexDirection: 'row-reverse', width: '90%', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={style.modalTitle}>أضف ملاحظاتك</Text>
                            <TouchableOpacity
                                style={{ marginRight: -16, marginTop: -16 }}
                                onPress={() => {
                                    setIsModalVisible(false); // إخفاء الـ Modal بدون حفظ
                                    setNotes(''); // مسح أي ملاحظات مكتوبة عند الإلغاء
                                }}>
                                <CloseCircle size="32" color="#424047" />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={style.textInput}
                            onChangeText={setNotes} // تحديث حالة الملاحظات مع كل تغيير
                            value={notes} // عرض القيمة الحالية للملاحظات
                            placeholder="اكتب ملاحظاتك هنا..."
                            multiline={true} // السماح بعدة أسطر
                            numberOfLines={4} // عدد الأسطر الافتراضي
                        />
                        <View style={style.buttonContainer}>
                            <TouchableOpacity
                                style={[style.modalButton, style.buttonSave]}
                                onPress={handleSaveNotes}>
                                <Text style={style.buttonText}>حفظ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const EmptyCart = () => (
    <View style={style.emptyContainer}>
        <BagCross size="200" color="#424047" />
        <Text style={[styles.h3, { marginTop: 12 }]}>لا يوجد شىء فى سلة التسوق !</Text>
        <Text style={[styles.paragraph, { marginTop: 8 }]}>جاهز لطلب شىء ؟</Text>
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 16,
            }}
        >
            <TouchableOpacity style={{
                backgroundColor: '#EBF2FF',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: 180,
                height: 70,
                borderRadius: 16
            }} >
                <Text
                    style={[
                        styles.h2,
                        {
                            textAlign: "right",
                            fontSize: 20,
                            color: colors.BtnsColor,

                        },
                    ]}
                >
                    مواصلة الشراء
                </Text>
            </TouchableOpacity>
        </View>
    </View>
);




const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 93,
    },
    emptyImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
        opacity: 0.7,
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
    },
    cartItem: {
        flexDirection: 'row',
        padding: 12,
        marginVertical: 8,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        elevation: 2,
    },
    itemImage: {
        width: 80,
        height: 80,
        marginRight: 12,
        borderRadius: 10,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    itemDetail: {
        fontSize: 14,
        color: '#555',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'right',
        width: '100%',
    },
    textInput: {
        width: '100%',
        height: 100,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        textAlignVertical: 'top',
        textAlign: 'right',
    },
    buttonContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalButton: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: '45%',
        alignItems: 'center',
    },
    buttonSave: {
        backgroundColor: '#327AFF',
    },
    buttonCancel: {
        backgroundColor: '#f44336',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


export default Cart;