import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, ScrollView, View, FlatList, Modal, TextInput, Alert } from "react-native";
import { useState } from 'react';
import { colors, styles } from '../../styles';
import { ArrowRight2 } from 'iconsax-react-nativejs';
import { User } from 'iconsax-react-nativejs';
import OptionsList from '../Components/UserOptionsComponents/OptionsList';



function UserOptions() {
    return (
        <View style={style.container}>
            {/* الهيدر */}
            <View style={{ alignItems: 'center', marginTop: 60, marginBottom: 16 }}>
                <View style={{ width: '100%', alignItems: 'flex-end' }}>
                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <TouchableOpacity>
                            <ArrowRight2 size="32" color="#424047" />
                        </TouchableOpacity>
                        <Text style={[styles.h3, { textAlign: 'right', marginRight: 8, paddingBottom: 7 }]}>الحساب</Text>
                    </View>
                </View>
            </View>
            {/* محتوى الصفحة */}
            <View style={style.container}>

                <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                    <TouchableOpacity style={{ width: '55', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EBF2FF' , borderRadius: 50, height: 55 }}>
                        <View style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}>
                            <User size="32" color="#327AFF"/>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '80%', marginRight: 8 }}>
                        {/* user.name */}
                        <Text style={[styles.h3, { textAlign: 'right', marginRight: 8, paddingBottom: 7 }]}>
                            محمد أحمد
                        </Text>
                        {/* user.email */}
                        <Text style={[styles.h4, { textAlign: 'right', marginRight: 8, paddingBottom: 7 }]}>mohamedahmed@gmail.com</Text>
                    </View>
                </View>
                <OptionsList/>
            </View>
        </View>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: '#fff',
    },

});

export default UserOptions