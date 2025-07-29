import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { colors, styles } from "../../../styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../Redux/Slices/productsSlice";
import { addOrUpdateCartItem } from "../../Redux/Slices/CartItems";
import { useNavigation } from "@react-navigation/native";
import { PATHS } from "../../routes/Paths";
import SectionHeader from "../GlobalComponents/SectionHeader";




const ProductCard = ({ item,AddToCart,navigate }) => (
    <View style={componentStyles.cardContainer}>
       <TouchableOpacity onPress={()=>navigate(PATHS.ProductDetails,{ProductId:item.id})}>
         <View style={componentStyles.imageContainer}>
            <Image  source={{uri: item.image}} style={componentStyles.image} />
            <TouchableOpacity
           onPress={() => AddToCart(item.id)}
            style={componentStyles.addButton}>
                <AntDesign name="plus" size={24} color="blue" />
            </TouchableOpacity>
        </View>
        <View style={componentStyles.infoContainer}>
            <Text style={[styles.h3,componentStyles.titleText]}>{item.name}</Text>
            <View style={styles.priceContainer}>
                <Text style={[styles.h3,componentStyles.priceText]}>{item.endPrice}</Text>
                <Text style={[styles.h3,componentStyles.priceText]}>ج.م /</Text>
                <Text style={[styles.h3,componentStyles.priceText]}>{item.unit}</Text>
            </View>
        </View>
       </TouchableOpacity>
    </View>
);

function RecommendedProducts({sectionName,data}) {
     const {navigate} = useNavigation();
const dispatch=useDispatch();
    const {products}=useSelector((state)=>state.products);
    const[SalePro,SetSalePro]=useState([])
    useEffect(()=>{
dispatch(fetchProducts());
    },[]);
 useEffect(() => {
  if(products.length > 0){
    const TargetData=products.slice(0,6)
SetSalePro(TargetData)
  }
  }, [products]);


  function AddToCart(ProId) {
    // console.log('Product ID:', ProId);
    
    dispatch(addOrUpdateCartItem({ product_id: ProId, quantity: 1 }));
  }
    return (
        <View style={{flex:1}}>
            
        
            <FlatList
                horizontal
                inverted
                showsHorizontalScrollIndicator={false}
                data={SalePro}
                renderItem={({ item }) => <ProductCard AddToCart={AddToCart} item={item} navigate={navigate} />}
                keyExtractor={item => item.id}
                contentContainerStyle={componentStyles.listContentContainer}
            />
        </View>
    );
}

const componentStyles = StyleSheet.create({
  
    cardContainer: {
        height: 188,
        width: 155,
        marginTop: 12,
       paddingRight:15,
    //    backgroundColor:'green'
       
    },
    imageContainer: {
        height: 130,
        width: '100%',
        borderRadius: 20,
        backgroundColor: '#EBF2FF',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    addButton: {
        position: 'absolute',
        left: 10,
        bottom: 10,
        backgroundColor: '#EBF2FF',
        borderRadius: 25,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    infoContainer: {
    
      paddingRight:10,
    },
    titleText: {
        textAlign: 'right',
       fontSize:13,
        marginTop: 8,
       color:'#424047'
    },
    priceText: {
        textAlign: 'right',
         fontSize:13,
        marginTop: 8,
        color:'#424047'
    },
   
});

export default RecommendedProducts;
