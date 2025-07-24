import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, ScrollView, View, FlatList } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";






const CartList = ({ items }) => {
    return (
        <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* صورة المنتج داخل مربع ذو خلفية فاتحة */}
                    <View style={{ flexDirection: 'row-reverse', width : '60%', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <View style={style.cardContainer}>
                            <View style={style.imageContainer}>
                                <Image source={item.image} style={style.image} />
                            </View>
                        </View>
                        {/* معلومات المنتج */}
                        <View style={style.infoContainer}>
                            <Text style={style.titleText}>{item.name}</Text>
                            <Text style={style.priceText}>{item.price}</Text>
                        </View>
                    </View>
                    {/* أزرار التحكم في الكمية */}
                    <View style={style.quantityContainer}>
                        <TouchableOpacity style={style.quantityButton}>
                            <AntDesign name="plus" size={16} color="#327AFF" />
                        </TouchableOpacity>
                        <Text style={style.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity style={style.quantityButton}>
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
        height: 110,
        width: 120,
        marginTop: 16,
        marginLeft: 16,
    },
    imageContainer: {
        height: 110,
        width: 120,
        borderRadius: 20,
        backgroundColor: '#EBF2FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 90,
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
        width: 16,
        height: 16,
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