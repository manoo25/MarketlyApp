import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, styles } from '../../../styles';
import { useNavigation } from "@react-navigation/native";
import { PATHS } from '../../routes/Paths';



const Empty = ({ header, subHeader, icon }) => {

    const { navigate } = useNavigation();

    return (
        <View style={style.emptyContainer}>
            {icon}
            <Text style={[styles.h3, { marginTop: 12 }]}>{header}</Text>
            <Text style={[styles.paragraph, { marginTop: 8 }]}>{subHeader}</Text>
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
                    borderRadius: 16,
                }}
                    onPress={() => (navigate(PATHS.Home))}
                // Navigate to the home page or any other action
                >
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
};

const style = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 93,
    }
});

export default Empty;
