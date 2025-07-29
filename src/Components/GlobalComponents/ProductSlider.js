import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import SectionHeader from "./SectionHeader";
import { colors, componentStyles, styles } from "../../../styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../Redux/Slices/productsSlice";
import { addOrUpdateCartItem } from "../../Redux/Slices/CartItems";
import { useNavigation } from "@react-navigation/native";
import { PATHS } from "../../routes/Paths";
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
               style={[styles.h3,{fontSize:14,color:colors.primary}]}
            >
              {item.endPrice ?? item.traderprice} ج
            </Text>

            {/* السعر قبل الخصم */}
            {hasDiscount && (
              <Text
                style={[styles.h3,{fontSize:14,
                  color: "#7B7686",
                  textDecorationLine: "line-through",
                 
                }]}
              >
                {item.traderprice} ج
              </Text>
            )}

            {/* وحدة البيع */}
            {item.unit && (
              <Text
                 style={[styles.h3,{fontSize:14}]}
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

// const ProductCard = ({ item,AddToCart,navigate }) => (
//     <View style={componentStyles.cardContainer}>
//        <TouchableOpacity onPress={()=>navigate(PATHS.ProductDetails,{ProductId:item.id})}>
//          <View style={componentStyles.imageContainer}>
//             <Image  source={{uri: item.image}} style={componentStyles.image} />
//             <TouchableOpacity
//            onPress={() => AddToCart(item.id)}
//             style={componentStyles.addButton}>
//                 <AntDesign name="plus" size={24} color="blue" />
//             </TouchableOpacity>
//         </View>
//         <View style={componentStyles.infoContainer}>
//             <Text style={[styles.h3,componentStyles.titleText]}>{item.name}</Text>
//              <View style={styles.priceContainer}>
//                             <Text style={[styles.h3,componentStyles.priceText]}>{item.endPrice}</Text>
//                             <Text style={[styles.h3,componentStyles.priceText]}>ج.م /</Text>
//                             <Text style={[styles.h3,componentStyles.priceText]}>{item.unit}</Text>
//                         </View>
//         </View>
//        </TouchableOpacity>
//     </View>
// );

function ProductSlider({sectionName,data}) {
     const {navigate} = useNavigation();
const dispatch=useDispatch();
    const {products}=useSelector((state)=>state.products);
    const[SalePro,SetSalePro]=useState([])
    useEffect(()=>{
dispatch(fetchProducts());
    },[]);
 useEffect(() => {
  if(products.length > 0){
    const TargetData=products.filter(x=>x.onSale==true).slice(0,6)
SetSalePro(TargetData)
  }
  }, [products]);


  function AddToCart(ProId) {
 
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
               paddingLeft:15,
               marginBottom:5,
              
              
               }}>
                 <TouchableOpacity onPress={()=>navigate(PATHS.OffersPage)}>
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
                renderItem={({ item }) => <ProductCard AddToCart={AddToCart} item={item} navigate={navigate} />}
                keyExtractor={item => item.id}
                contentContainerStyle={componentStyles.listContentContainer}
            />
        </View>
    );
}



export default ProductSlider;
