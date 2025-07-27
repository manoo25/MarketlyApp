import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, ScrollView, View, FlatList, Modal, TextInput, Alert } from "react-native";
import { useState } from 'react';
import { colors, styles } from '../../styles';
import { ArrowRight2 } from 'iconsax-react-nativejs';
import { User } from 'iconsax-react-nativejs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { UserLogin } from '../Redux/Slices/users';
import OptionsList from '../Components/UserOptionsComponents/OptionsList';



function UserOptions() {
    const user = useSelector((state) => state.Users.currentUser);
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
                    {user?.image ? (
                        <TouchableOpacity style={{ width: 55, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EBF2FF', borderRadius: 50, height: 55 }}>
                            <Image source={{ uri: user.image }} style={{ width: 55, height: 55, borderRadius: 50 }} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={{ width: 55, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EBF2FF', borderRadius: 50, height: 55 }}>
                            <User size="32" color="#327AFF" />
                        </TouchableOpacity>
                    )}
                    <View style={{ width: '80%', marginRight: 8 }}>
                        {/* user.name */}
                        <Text style={[styles.h3, { textAlign: 'right', marginRight: 8, paddingBottom: 7 }]}>
                            {user?.name || "---"}
                        </Text>
                        {/* user.email */}
                        <Text style={[styles.h4, { textAlign: 'right', marginRight: 8, paddingBottom: 7 }]}>{user?.email || "---"}</Text>
                    </View>
                </View>
                <OptionsList />
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