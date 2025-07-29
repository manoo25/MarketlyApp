import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from 'react';
import { colors, styles } from '../../styles';
import { ArrowRight2 } from 'iconsax-react-nativejs';
import ChangePassComponents from '../Components/ChangePassComponents/ChangePassComponents';
import LoadingSpinner from "../Components/GlobalComponents/LoadingSpinner";






function ChangePassword({navigation}) {


    return (
        <View style={style.container}>
            {/* الهيدر */}
            <View style={{ alignItems: 'center', marginTop: 60, marginBottom: 16 }}>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row-reverse' }}>
                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <ArrowRight2 size="32" color="#424047" />
                        </TouchableOpacity>
                        <Text style={[styles.h2, { textAlign: 'right' }]}>تغيير كلمة السر</Text>
                    </View>
                </View>
            </View>
            {/* المحتوى */}
            <ChangePassComponents />
            <View style={{ paddingTop: 22 }}>
                <Text style={[styles.h5, { textAlign: 'right', color: '#A6A1B1' }]}>
                    يجب أن تتكون كلمة المرور من 8 أحرف على الأقل،
                </Text>
                <Text style={[styles.h5, { textAlign: 'right', color: '#A6A1B1' }]}>
                    ويجب أن تتضمن :
                </Text>
                <Text style={[styles.h5, { textAlign: 'right', color: '#A6A1B1' }]}>
                    • حرف كبير واحد (A-Z)
                </Text>
                <Text style={[styles.h5, { textAlign: 'right', color: '#A6A1B1' }]}>
                    • حرف صغير واحد (a-z)
                </Text>
                <Text style={[styles.h5, { textAlign: 'right', color: '#A6A1B1' }]}>
                    • رقم واحد (0-9)
                </Text>
                <Text style={[styles.h5, { textAlign: 'right', color: '#A6A1B1' }]}>
                    • رمز خاص واحد (مثل: - @ # $ % ^ & * _ - + = . , ? /)
                </Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 24,
                }}
            >
                <TouchableOpacity
                    style={styles.Btn}
                >
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
                        حفظ

                    </Text>

                </TouchableOpacity>
            </View>
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

export default ChangePassword;