import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import LabelInpts from "../GlobalComponents/LabelInpts";
import { styles } from "../../../styles";
import SectionHeader from "../GlobalComponents/SectionHeader";


const recommendedProductsData = [
    { id: '1', title: 'شعيرية  ',  image: require("../../../assets/products/noodle.png") },
    { id: '2', title: 'مشروب غازى',  image: require("../../../assets/products/cute-cartoon-cola-drink-vector-Photoroom.png") },
    { id: '3', title: 'شيبسى',  image: require("../../../assets/products/CHIPS_006-Photoroom.png") },
    { id: '4', title: 'خبز',  image: require("../../../assets/products/81d97f939dc5d0c3ad370eea66cbb3cb-flat-bakery-bread-image.webp") },
    { id: '5', title: 'شعيرية  ',  image: require("../../../assets/products/noodle.png") },
    { id: '6', title: 'مشروب غازى',  image: require("../../../assets/products/cute-cartoon-cola-drink-vector-Photoroom.png") },
    { id: '7', title: 'شيبسى',  image: require("../../../assets/products/CHIPS_006-Photoroom.png") },
    { id: '8', title: 'المزيد',  image: require("../../../assets/HomeSlide/more.png") },
];

const CategoryCard = ({ item }) => (
    <View style={componentStyles.cardContainer}>
        <TouchableOpacity>
            <View style={componentStyles.imageContainer}>
            <Image source={item.image} style={componentStyles.image} 
            resizeMode="contain"
            />
        </View>
        <View >
            <Text style={[componentStyles.titleText, styles.h2,{fontSize:11}]}>{item.title}</Text>
           
        </View>
        </TouchableOpacity>
    </View>
);

function MainCategories() {
    return (
        <View style={{ height:'auto' }}>
             <SectionHeader text=" الأقسام" />
                             
            <FlatList
                horizontal
                inverted
                 scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                data={recommendedProductsData}
                renderItem={({ item }) => <CategoryCard item={item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={componentStyles.listContentContainer}
            />
        </View>
    );
}

const componentStyles = StyleSheet.create({
    listContentContainer: {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:16,
        flexWrap:'wrap',
        gap:16,
        marginTop:5,
        height:'auto'
        
     
    },
    cardContainer: {
      
        width: 77,
        height:82,
       flexDirection:'column',
       alignItems:'center',
    },
    imageContainer: {
        height: 60,
        width: 60,
        borderRadius: 10,
        backgroundColor: '#327AFF1A',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },

    titleText: {
        textAlign: 'center',
        marginTop: 6,

    },
   
});

export default MainCategories;
