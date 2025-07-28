import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors, styles } from '../../../styles';
import { ArrowLeft2 } from 'iconsax-react-nativejs';
import { LogoutCurve } from 'iconsax-react-nativejs';
import { logoutUser } from "../../Redux/Slices/users";
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PATHS } from '../../routes/Paths';







const settings = [
    { id: '1', title: 'بيانات الحساب' },
    { id: '2', title: 'العناوين المحفوظة' },
    { id: '3', title: 'تغيير الحساب' },
    { id: '4', title: 'تغيير كلمة المرور' },
    { id: '5', title: 'الإشعارات', value: 'فعالة' },
    { id: '6', title: 'اللغة', value: 'العربية' },
];





function OptionsList() {



    const dispatch = useDispatch();
    const { replace } = useNavigation();
    const navigation = useNavigation();





    const handleLogout = async () => {
        await AsyncStorage.removeItem('userData');
        dispatch(logoutUser());
        replace(PATHS.Login);
    };

    const handleOptionPress = (item) => {
        if (item.id === "1") {
            navigation.navigate(PATHS.AccountDetails);
        } else if (item.id === "2") {
            navigation.navigate(PATHS.SavedAdresses);
        } else if (item.id === "4") {
            navigation.navigate(PATHS.ChangePassword);
        }
    };


    const RenderItem = ({ item, onPress }) => (
        <TouchableOpacity style={style.item} onPress={onPress}>
            <View style={style.textContainer}>
                <View>
                    <Text style={[style.title, styles.h4]}>{item.title}</Text>
                </View>

                <View>
                    {item.value && <Text style={[style.value, styles.h5]}>{item.value}</Text>}
                </View>
            </View>
            <ArrowLeft2 size="24" color="#424047" />
        </TouchableOpacity>
    );


    return (
        <View style={style.container}>
            <FlatList
                data={settings}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <RenderItem item={item} onPress={() => handleOptionPress(item)} />
                )}
                ItemSeparatorComponent={() => <View style={style.separator} />}
            />
            <View style={style.separator} />
            <TouchableOpacity style={[style.logout, { alignSelf: 'flex-end' }]} onPress={() => Alert.alert('تأكيد', 'هل تريد تسجيل الخروج؟', [
                { text: 'إلغاء', style: 'cancel' },
                { text: 'تأكيد', onPress: handleLogout }])}>
                <LogoutCurve size="20" color="#ee3030" />
                <Text style={[styles.h3, style.logoutText]}>تسجيل خروج</Text>
            </TouchableOpacity>
        </View>
    );
}


const style = StyleSheet.create({
    container: {
        padding: 16,
    },
    item: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        marginTop: 4,
    },
    textContainer: {
        width: '90%',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        color: '#333',
    },
    value: {
        fontSize: 14,
        color: '#999',

    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
    },
    logout: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: 16,
        gap: 6,
    },
    logoutText: {
        color: '#ee3030',
        fontSize: 16,
    },
});

export default OptionsList