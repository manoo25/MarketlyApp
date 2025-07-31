import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors, componentStyles, styles } from "../../../styles";
import DiscountBadge from "../../Components/OffersComponents/DiscountBadge";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addOrUpdateCartItem } from "../../Redux/Slices/CartItems";



const ProductCard = ({ item }) => {
  const hasDiscount = item.traderprice > item.endPrice;
  const discountPercent = hasDiscount
    ? ((item.traderprice - item.endPrice) / item.traderprice) * 100
    : 0;

  return (
    <View style={[componentStyles.cardContainer,{paddingRight:0}]}>
     
        <View  style={componentStyles.imageContainer}>
          {hasDiscount && <DiscountBadge discount={discountPercent} />}

          <Image
            source={
              typeof item.image === "string" ? { uri: item.image } : item.image
            }
            style={componentStyles.image}
          />
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
    
    </View>
  );
};

function DelegatorListProducts({ products }) {


  if (!products || products.length === 0) {
    return (
      <View style={{ padding: 20 }}>
        <Text
          style={{
            textAlign: "center",
            color: "#666",
            fontFamily: "Tajawal-Medium",
          }}
        >
          لا توجد منتجات لعرضها
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1,  marginTop: 16 }}>
   <FlatList
  data={products}
  renderItem={({ item }) => <ProductCard item={item}  />}
  keyExtractor={(item) => item.id.toString()}
  numColumns={2}
  key={2}   
  columnWrapperStyle={{
     flexDirection: "row-reverse",
    justifyContent: "space-between",
  //  backgroundColor:'gray',
   width:'100%',
   paddingHorizontal:20
  }}
 ItemSeparatorComponent={() => <View style={{ width: 25 }} />}
  showsVerticalScrollIndicator={false}
/>


    </View>
  );
}


export default DelegatorListProducts;
