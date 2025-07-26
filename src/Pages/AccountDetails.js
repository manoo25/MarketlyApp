import { Image, StyleSheet, Text, TouchableOpacity, ScrollView, View, Modal, TextInput, Alert, Dimensions } from "react-native";
import { useState } from 'react';
import { colors, styles } from '../../styles';
import { ArrowRight2 } from 'iconsax-react-nativejs';
import { Edit } from 'iconsax-react-nativejs';


function AccountDetails() {
    return (
        <View style={style.container}>
            {/* الهيدر */}
            <View style={{ alignItems: 'center', marginTop: 60, marginBottom: 16 }}>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row-reverse' }}>
                    <View>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <TouchableOpacity>
                                <ArrowRight2 size="32" color="#424047" />
                            </TouchableOpacity>
                            <Text style={[styles.h2, { textAlign: 'right', }]}>بيانات الحساب</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <TouchableOpacity style={{
                            backgroundColor: '#EBF2FF',
                            flexDirection: 'row-reverse',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 130,
                            height: 60,
                            borderRadius: 16,
                            gap: 10,
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
                                تعديل
                            </Text>
                            <Edit size="32" color="#327aff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* المحتوى */}
            <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
                
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
})


export default AccountDetails;
