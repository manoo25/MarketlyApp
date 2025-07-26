
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors, styles } from '../../styles';
import { ScrollView, View } from 'react-native';
import { ArrowRight2 } from 'iconsax-react-nativejs';
import RecommendedProducts from '../Components/ProductDeatailsComponents/RecommendedProducts';


const products = [
    { id: '1', title: 'رقائق البطاطس بطعم الملح, ١٠٠جم ', details: 'تذوق الطعم الاصلى لرقائق البطاطس اللذيذة', image: require("../../assets/products/chips.png") }
];



function ProductDetails() {
    return (
        <>
            <View style={{ flex: 1, backgroundColor: "#EBF2FF" }}>
                <View style={{ alignItems: 'center', marginTop: 60 }}>
                    <View style={{ width: '90%', alignItems: 'flex-end' }}>
                        <TouchableOpacity >
                            <ArrowRight2 size="32" color="#424047" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 16 }}>
                        {/* product.image */}
                        <Image source={products[0].image} style={{ width: 200, height: 215 }} />
                    </View>
                </View>
                <View style={[{ marginTop: 16 }, style.top, styles.paddingView]}>
                    {/* product.title */}
                    <Text style={[styles.h3, { textAlign: 'right' }]}>
                        {products[0].title}
                    </Text>
                    {/* product.details */}
                    <Text style={[{ marginTop: 10 }, styles.paragraph]}>
                        {products[0].details}
                    </Text>
                    <View style={styles.dividerLine} />
                    <Text style={[{ marginTop: 24 }, styles.h4]}>
                        مرشح لك أيضاّ
                    </Text>
                    <RecommendedProducts />
                    <View style={styles.dividerLine} />
                    <View style={{ alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row-reverse', marginTop: 12 }}>
                        <View style={{ marginRight: 10 }}>
                            <Text style={[styles.h2, { color: colors.BtnsColor }]}>15.0 EGP</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <TouchableOpacity style={{
                                backgroundColor: colors.BtnsColor,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 175,
                                height: 60,
                                borderRadius: 12
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
                                    اضافة الى العربة
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    top: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    }
});

export default ProductDetails