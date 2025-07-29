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

// const ProductCard = ({ item }) => (
//   <View style={componentStyles.cardContainer}>
//     <TouchableOpacity onPress={() => console.log("Card pressed")}>
//       <View style={componentStyles.imageContainer}>
//         <Image
//           source={
//             typeof item.image === "string" ? { uri: item.image } : item.image // fallback لو صورة محلية
//           }
//           style={componentStyles.image}
//         />
//         <TouchableOpacity
//           onPress={() => console.log("Add button pressed")}
//           style={componentStyles.addButton}
//         >
//           <AntDesign name="plus" size={24} color="blue" />
//         </TouchableOpacity>
//       </View>
//       <View style={componentStyles.infoContainer}>
//         <Text style={[styles.h3, componentStyles.titleText]}>{item.name}</Text>
//         <Text style={[styles.h3, componentStyles.priceText]}>
//           {item.endPrice ?? item.traderprice} EGP
//         </Text>
//       </View>
//     </TouchableOpacity>
//   </View>
// );


const ProductCard = ({ item }) => {
  const hasDiscount = item.traderprice > item.endPrice;
  const discountPercent = hasDiscount
    ? ((item.traderprice - item.endPrice) / item.traderprice) * 100
    : 0;

  return (
    <View style={[componentStyles.cardContainer,{paddingRight:0}]}>
      <TouchableOpacity onPress={() => console.log("Card pressed")}>
        <View  style={componentStyles.imageContainer}>
          {hasDiscount && <DiscountBadge discount={discountPercent} />}

          <Image
            source={
              typeof item.image === "string" ? { uri: item.image } : item.image
            }
            style={componentStyles.image}
          />

          <TouchableOpacity
            onPress={() => console.log("Add button pressed")}
            style={componentStyles.addButton}
          >
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

function ListProducts({ products }) {
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
  renderItem={({ item }) => <ProductCard item={item} />}
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

// const cardWidth = (Dimensions.get("window").width - 16 * 2 - 12) / 2;

// const componentStyles = StyleSheet.create({
//   cardContainer: {
//     // height: 188,
//     width: 175,
//     marginTop: 12,
//     paddingRight: 15,
//     overflow: "hidden",
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     padding: 12,
//     // shadowColor: "#000",
//     // shadowOpacity: 0.05,
//     // shadowRadius: 6,
//     // shadowOffset: { width: 0, height: 2 },
//     // elevation: 3,
//   },
//   imageContainer: {
//     height: 130,
//     width: "100%",
//     borderRadius: 20,
//     backgroundColor: "#EBF2FF",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 20,
//   },
//   addButton: {
//     position: "absolute",
//     left: 10,
//     bottom: 10,
//     backgroundColor: "#EBF2FF",
//     borderRadius: 25,
//     width: 35,
//     height: 35,
//     alignItems: "center",
//     justifyContent: "center",
//     elevation: 5,
//   },
//   infoContainer: {
//     paddingRight: 10,
//   },
//   titleText: {
//     textAlign: "right",
//     fontSize: 13,
//     marginTop: 8,
//     color: "#424047",
//   },
//   priceText: {
//     textAlign: "right",
//     fontSize: 13,
//     marginTop: 8,
//     color: "#424047",
//   },
// });

export default ListProducts;
