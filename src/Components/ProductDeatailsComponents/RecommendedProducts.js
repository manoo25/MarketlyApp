import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

// Sample data - replace with your actual data source
const recommendedProductsData = [
    { id: '1', title: 'شعيرية سريعة التحضير', price: '10.0 EGP', image: require("../../../assets/products/noodle.png") },
    { id: '2', title: 'مشروب غازى', price: '15.0 EGP', image: require("../../../assets/products/cute-cartoon-cola-drink-vector-Photoroom.png") },
    { id: '3', title: 'شيبسى', price: '10.0 EGP', image: require("../../../assets/products/CHIPS_006-Photoroom.png") },
    { id: '4', title: 'خبز', price: '10.0 EGP', image: require("../../../assets/products/81d97f939dc5d0c3ad370eea66cbb3cb-flat-bakery-bread-image.webp") },
];

const ProductCard = ({ item }) => (
    <View style={componentStyles.cardContainer}>
        <View style={componentStyles.imageContainer}>
            <Image source={item.image} style={componentStyles.image} />
            <TouchableOpacity style={componentStyles.addButton}>
                <AntDesign name="plus" size={24} color="blue" />
            </TouchableOpacity>
        </View>
        <View style={componentStyles.infoContainer}>
            <Text style={componentStyles.titleText}>{item.title}</Text>
            <Text style={componentStyles.priceText}>{item.price}</Text>
        </View>
    </View>
);

function RecommendedProducts() {
    return (
        <View style={{ height: 270, marginTop: 16 }}>
            <FlatList
                horizontal
                inverted
                showsHorizontalScrollIndicator={false}
                data={recommendedProductsData}
                renderItem={({ item }) => <ProductCard item={item} />}
                keyExtractor={item => item.id}
                style={{ height: 214 }} // Explicitly set the height of the FlatList component
                contentContainerStyle={componentStyles.listContentContainer}
            />
        </View>
    );
}

const componentStyles = StyleSheet.create({
    // listContentContainer: {
    //     paddingRight: 20, // Use paddingRight for inverted list
    // },
    cardContainer: {
        height: 188,
        width: 155,
        marginTop: 16,
        marginBottom: 10,
        marginLeft: 15, // Use marginLeft for spacing in inverted list
    },
    imageContainer: {
        height: 150,
        width: 160,
        borderRadius: 20,
        backgroundColor: '#EBF2FF',
    },
    image: {
        width: 160,
        height: 150,
        borderRadius: 20,
    },
    addButton: {
        position: 'absolute',
        left: 10,
        bottom: 10,
        backgroundColor: 'white',
        borderRadius: 25,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    infoContainer: {
        marginTop: 8,
        marginLeft: 16,
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
    },
    titleText: {
        textAlign: 'right',
        marginTop: 8,
    },
    priceText: {
        textAlign: 'right',
        marginTop: 14,
    },
});

export default RecommendedProducts;
