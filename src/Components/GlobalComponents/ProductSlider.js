import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import SectionHeader from "./SectionHeader";
import { colors, styles } from "../../../styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../Redux/Slices/productsSlice";
import { addOrUpdateCartItem } from "../../Redux/Slices/CartItems";




const ProductCard = ({ item,AddToCart }) => (
    <View style={componentStyles.cardContainer}>
       <TouchableOpacity onPress={() => console.log('Card pressed')}>
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
            <Text style={[styles.h3,componentStyles.priceText]}>{item.endPrice}</Text>
        </View>
       </TouchableOpacity>
    </View>
);

function ProductSlider({sectionName,navigate,data}) {
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
    console.log('Product ID:', ProId);
    
    dispatch(addOrUpdateCartItem({ product_id: ProId, quantity: 1 }));
  }
    return (
        <View style={{marginTop:15}}>
            
             <View 
             style={{
               flex:1,
               flexDirection:'row',
               justifyContent:'space-between',
            //    backgroundColor:'green',
               position:'relative',
               alignItems:'center',
               paddingLeft:25,
               marginBottom:5,
              
              
               }}>
                 <TouchableOpacity>
                     <Text style={[styles.h3,{fontSize:15,
                     color:colors.primary,
                     padding:8,
                     borderRadius:10,
 backgroundColor: '#327AFF1A',
                     }]}>
                       المزيد
                     </Text>
                   </TouchableOpacity>
                   <SectionHeader text={sectionName} />
                  
             </View>
             
            <FlatList
                horizontal
                inverted
                showsHorizontalScrollIndicator={false}
                data={SalePro}
                renderItem={({ item }) => <ProductCard AddToCart={AddToCart} item={item} />}
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

export default ProductSlider;
