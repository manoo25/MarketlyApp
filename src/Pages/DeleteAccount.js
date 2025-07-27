import { StyleSheet, Text, TouchableOpacity, ScrollView, View, TextInput } from "react-native";
import { colors, styles } from '../../styles';
import { ArrowRight2 } from 'iconsax-react-nativejs';
import { Trash } from 'iconsax-react-nativejs';





function DeleteAccount() {
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
                            <Text style={[styles.h2, { textAlign: 'right', }]}>حذف الحساب</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/* المحتوى */}
            <View style={style.emptyContainer}>
                <Trash size="200" color="#f92e5a" />
                <Text style={[styles.h4, { marginTop: 12, color: '#f92e5a', textAlign: 'center' }]}>اذا حذفت الحساب سيتم حذف جميع بياناتك و لن تستطيع الحصول عليها مره اخرى</Text>
                <Text style={[styles.h5, { marginTop: 8 }]}>هل متأكد انك تريد الاستمرار في حذف الحساب؟</Text>
                <View style={{ alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row-reverse', marginTop: 24}}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <TouchableOpacity style={{
                            backgroundColor: 'rgba(238, 48, 48, 0.1)',
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
                                        color: '#F92E5A',

                                    },
                                ]}
                            >
                                حذف
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
                        <TouchableOpacity style={{
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
                                الغاء
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 93,
    },
})

export default DeleteAccount