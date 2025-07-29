import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { colors, styles } from "../../../styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts, fetchTraderProducts } from "../../Redux/Slices/productsSlice";
import { addOrUpdateCartItem } from "../../Redux/Slices/CartItems";
import { useNavigation } from "@react-navigation/native";
import { PATHS } from "../../routes/Paths";
import SectionHeader from "../GlobalComponents/SectionHeader";
import DiscountBadge from "../OffersComponents/DiscountBadge";




const ProductCard = ({ item,AddToCart,navigate }) => {
  const hasDiscount = item.traderprice > item.endPrice;
  const discountPercent = hasDiscount
    ? ((item.traderprice - item.endPrice) / item.traderprice) * 100
    : 0;

  return (
    <View style={componentStyles.cardContainer}>
      <TouchableOpacity onPress={()=>navigate(PATHS.ProductDetails,{ProductId:item.id})}>
        <View  style={componentStyles.imageContainer}>
          {hasDiscount && <DiscountBadge discount={discountPercent} />}

          <Image
            source={
              typeof item.image === "string" ? { uri: item.image } : item.image
            }
            style={componentStyles.image}
          />

         <TouchableOpacity
           onPress={() => AddToCart(item.id)}
            style={componentStyles.addButton}>
                <AntDesign name="plus" size={24} color="blue" />
            </TouchableOpacity>
        </View>

        <View style={componentStyles.infoContainer}>
          <Text
            style={[styles.h3, componentStyles.titleText]}
            numberOfLines={2}
          >
            {item.name}
          </Text>

          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "flex-end",
              marginTop: 6,
              flexWrap: "wrap",
              gap: 4,
            }}
          >
            {/* السعر بعد الخصم أو العادي */}
            <Text
              style={[
                styles.h3,
                {
                  fontSize: 14,
                  color: "#327AFF",
                  fontWeight: "600",
                },
              ]}
            >
              {item.endPrice ?? item.traderprice} جنيه
            </Text>

            {/* السعر قبل الخصم */}
            {hasDiscount && (
              <Text
                style={{
                  fontSize: 12,
                  color: "#7B7686",
                  textDecorationLine: "line-through",
                  paddingBottom: "2px",
                }}
              >
                {item.traderprice} جنيه
              </Text>
            )}

            {/* وحدة البيع */}
            {item.unit && (
              <Text
                style={{
                  fontSize: 13,
                  color: "#888",
                  fontFamily: "Tajawal-Medium",
                }}
              >
                /{item.unit}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

function RecommendedProducts({TraderID}) {
     const {navigate} = useNavigation();
const dispatch=useDispatch();
    const {traderProducts}=useSelector((state)=>state.products);
    const[TraderPro,SetTraderPro]=useState([])

     
    useEffect(()=>{
dispatch(fetchTraderProducts(TraderID));
    },[TraderID]);
 useEffect(() => {
  if(traderProducts.length > 0){
    const TargetData=traderProducts.slice(0,6)
SetTraderPro(TargetData)
  }
  }, [traderProducts]);


  function AddToCart(ProId) {
    // console.log('Product ID:', ProId);
    
    dispatch(addOrUpdateCartItem({ product_id: ProId, quantity: 1 }));
  }
    return (
        <View style={{flex:1}}>

 <View 
                         style={{
                           flex:1,
                           flexDirection:'row',
                           justifyContent:'space-between',
                          
                           width:'100%',
                           position:'relative',
                           alignItems:'center',
                          //  height:40,
                           paddingLeft:10,
                          //  marginBottom:5,
                          
                          
                           }}>
                             <TouchableOpacity onPress={()=>navigate(PATHS.TraderProducts
                                ,{TraderID:TraderID})
                             }>
                                 <Text style={[styles.h3,{fontSize:15,
                                 color:colors.primary,
                                 padding:8,
                                 borderRadius:10,
             backgroundColor: '#327AFF1A',
                                 }]}>
                                   المزيد
                                 </Text>
                               </TouchableOpacity>
                              
                               <Text style={[styles.h3,{
                                                  fontSize:22,
                                                  paddingRight:5,
                                                 
                                                  textAlign:"right"
                                              }]}>
                                                  منتجات هذا التاجر
                                              </Text>
                         </View>


         <View style={{flex:1}}>
            
        
            <FlatList
                horizontal
                inverted
                showsHorizontalScrollIndicator={false}
                data={TraderPro}
                renderItem={({ item }) => <ProductCard AddToCart={AddToCart} item={item} navigate={navigate} />}
                keyExtractor={item => item.id}
                contentContainerStyle={componentStyles.listContentContainer}
            />
        </View>
        </View>
       
    );
}

const componentStyles = StyleSheet.create({
  
    cardContainer: {
        height: 188,
        width: 155,
        marginTop: 12,
       paddingRight:10,
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
