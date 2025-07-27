import { Translate } from "iconsax-react-nativejs";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
} from "react-native";
import { styles } from "../../../styles";


const { width } = Dimensions.get("window");

const recommendedProductsData = [
  { id: "1", title: "شعرية سريعة التحضير", price: "10.0 EGP", image: require("../../../assets/HomeSlide/1.jpg") },
  { id: "2", title: "مشروب غازى", price: "15.0 EGP", image: require("../../../assets/HomeSlide/2.jpg") },
  { id: "3", title: "شيبسى", price: "10.0 EGP", image: require("../../../assets/products/CHIPS_006-Photoroom.png") },
  { id: "4", title: "خبز", price: "10.0 EGP", image: require("../../../assets/products/81d97f939dc5d0c3ad370eea66cbb3cb-flat-bakery-bread-image.webp") },
];

const ProductCard = ({ item }) => (
  <View style={componentStyles.cardContainer}>
   
    <TouchableOpacity style={{position:'relative'}} >  
         <View style={componentStyles.cover}></View>
    <Text style={[styles.h3,componentStyles.titleText]}>{item.title}</Text>
    <View style={componentStyles.imageContainer}>
      <Image source={item.image} 
     resizeMode="cover"

      style={componentStyles.image} />
     
    </View>
     </TouchableOpacity>
  </View>
);

function MainSlider() {
  const [activeIndex, setActiveIndex] = useState(recommendedProductsData.length - 1);
  const flatListRef = useRef();

  const onScroll = (event) => {
    const slideSize = 254 + 15; // card width + marginLeft
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setActiveIndex(index);
  };

  return (
    <View style={{ height:140, marginTop: 16 }}>
     <FlatList
  ref={flatListRef}
  horizontal
  inverted // ✅ دي السطر اللي بيخلي الاتجاه من اليمين لليسار
  showsHorizontalScrollIndicator={false}
  data={recommendedProductsData}
  renderItem={({ item }) => <ProductCard item={item} />}
  keyExtractor={(item) => item.id}
  contentContainerStyle={componentStyles.listContentContainer}
  onScroll={onScroll}
  scrollEventThrottle={16}
  pagingEnabled={false}
  snapToInterval={254 + 15}
  decelerationRate="fast"
/>


     <View style={{ height: 40, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
  {recommendedProductsData.map((_, index) => (
    <View
      key={index}
      style={[
        componentStyles.indicatorDot,
        activeIndex === (recommendedProductsData.length - 1 - index) && { backgroundColor: "#424047" },
      ]}
    />
  ))}
</View>

    </View>
  );
}

const componentStyles = StyleSheet.create({
  cover: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#00000080",
     borderRadius: 20,
     zIndex:10
  },
  listContentContainer: {
    paddingLeft: 15,
    maxHeight: 140,
   
  },
  cardContainer: {
    height: 92,
    width: 254,
    marginRight: 12,
   
   
  },
  imageContainer: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
    backgroundColor: "#EBF2FF",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
   
   
  },

 
titleText: {
  textAlign: "right",
  zIndex: 500,
  position: 'absolute',
  top: 44,
  right: 0,
  paddingHorizontal: 30, 
  fontSize:18,
  color:'white'
}
,

  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor:'gray',
    marginTop: 0,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#A6A1B1",
    marginHorizontal: 5,
  },
});

export default MainSlider;
