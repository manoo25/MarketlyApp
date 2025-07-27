import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, ScrollView, View, FlatList } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDispatch } from 'react-redux';
import { deleteCartItem, fetchCartItems, updateCartItem } from '../../Redux/Slices/CartItems';






const CartList = ({CartItemsArr,setCartItemsArr}) => {

const dispatch=useDispatch();


function IncreseQuantity(proId) {
  const CloneArr = [...CartItemsArr];

  const Index = CloneArr.findIndex((item) => item.id === proId);
  if (Index !== -1) {
    const updatedItem = { ...CloneArr[Index], quantity: CloneArr[Index].quantity + 1 };
    CloneArr[Index] = updatedItem;
    setCartItemsArr(CloneArr);
      dispatch(updateCartItem({id:proId, quantity: updatedItem.quantity}));
  }
}

function DecreseQuantity(proId) {
  const CloneArr = [...CartItemsArr];
  const Index = CloneArr.findIndex((item) => item.id === proId);

  if (Index !== -1) {
    const updatedItem = {
      ...CloneArr[Index],
      quantity: CloneArr[Index].quantity - 1,
    };

    if (updatedItem.quantity === 0) {
      const deletedItemId = CloneArr[Index].id;
      CloneArr.splice(Index, 1); // احذف العنصر
      dispatch(deleteCartItem(deletedItemId)); // ابعت الـ id
    } else {
      CloneArr[Index] = updatedItem;
      dispatch(updateCartItem({ id: proId, quantity: updatedItem.quantity }));
    }

    setCartItemsArr(CloneArr);
  }
}


    return (
        <FlatList
            data={CartItemsArr}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
               <View style={{ 
  flexDirection: 'row-reverse', 
marginTop:15,
  justifyContent: 'space-between',
  borderColor: 'gray',
  borderWidth: 0.2,
  paddingHorizontal: 10,
  alignItems: 'center',
  paddingBottom:8,
  borderRadius: 10,          
  borderStyle: 'solid'  
}}>

                    {/* صورة المنتج داخل مربع ذو خلفية فاتحة */}
                    <View style={{ flexDirection: 'row-reverse', width : '60%', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <View style={style.cardContainer}>
                            <View style={style.imageContainer}>
                                <Image source={{ uri: item.product.image }} style={style.image}
                                resizeMode='cover'
                                />
                            </View>
                        </View>
                        {/* معلومات المنتج */}
                        <View style={style.infoContainer}>
                            <Text style={style.titleText}>{item.product.name}</Text>
                            <Text style={style.priceText}>{item.product.endPrice*item.quantity}ج.م</Text>
                        </View>
                    </View>



                    {/* أزرار التحكم في الكمية */}
                    <View style={style.quantityContainer}>
                        <TouchableOpacity
                        onPress={()=>IncreseQuantity(item.id)}
                        style={style.quantityButton}>
                            <AntDesign name="plus" size={16} color="#327AFF" />
                        </TouchableOpacity>
                        <Text style={style.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity
                         onPress={()=>DecreseQuantity(item.id)}
                        style={style.quantityButton}>
                            <AntDesign name="minus" size={16} color="#327AFF" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            scrollEnabled={false}
        />
    );
};


const style = StyleSheet.create({
    cardContainer: {
        height: 100,
        width: 100,
        marginTop: 16,
        marginLeft: 16
    },
    imageContainer: {
        height: 100,
        width: 100,
        borderRadius: 20,
        backgroundColor: '#EBF2FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    infoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 8,
        marginLeft: 16,
        alignItems: 'flex-end',
    },
    titleText: {
        textAlign: 'right',
    },
    priceText: {
        textAlign: 'right',
        marginTop:8
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F9FB',
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 4,
        minWidth: 90,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        marginLeft: 10,
    },
    quantityButton: {
        borderRadius: 8,
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 2,
    },
    quantityText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        minWidth: 24,
    },
});



export default CartList;