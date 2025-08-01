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
  { id: "1", image: require("../../../assets/HomeSlide/11.jpeg") },
  { id: "2", image: require("../../../assets/HomeSlide/22.jpeg") },
  { id: "3", image: require("../../../assets/HomeSlide/33.jpeg") },
  { id: "4", image: require("../../../assets/HomeSlide/44.jpeg") },
  { id: "5", image: require("../../../assets/HomeSlide/55.jpeg") },
  { id: "6", image: require("../../../assets/HomeSlide/66.jpeg") },
  { id: "7", image: require("../../../assets/HomeSlide/77.jpeg") },
  { id: "8", image: require("../../../assets/HomeSlide/88.jpeg") },
  { id: "9", image: require("../../../assets/HomeSlide/99.jpeg") },
  { id: "10", image: require("../../../assets/HomeSlide/111.jpeg") },
  { id: "11", image: require("../../../assets/HomeSlide/222.jpeg") },
];

const ProductCard = ({ item }) => (
  <View style={componentStyles.cardContainer}>

    <TouchableOpacity style={{ position: 'relative' }} >
      {/* <View style={componentStyles.cover}></View> */}
      {/* <Text style={[styles.h3, componentStyles.titleText]}>{item.title}</Text> */}
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
  const autoScrollInterval = useRef(null);

  const slideSize = width; // عرض العنصر يساوي عرض الشاشة

  const onScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setActiveIndex(index);
  };

  React.useEffect(() => {
    // Auto-scroll every 3 seconds
    autoScrollInterval.current = setInterval(() => {
      setActiveIndex((prevIndex) => {
        let nextIndex = prevIndex - 1;
        if (nextIndex < 0) {
          nextIndex = recommendedProductsData.length - 1;
        }
        // Scroll to the next item (inverted)
        flatListRef.current?.scrollToOffset({
          offset: nextIndex * slideSize,
          animated: true,
        });
        return nextIndex;
      });
    }, 3000);

    return () => {
      clearInterval(autoScrollInterval.current);
    };
  }, []);

  return (
    <View style={{ height: 270, marginTop: 16 }}>
      <FlatList
        ref={flatListRef}
        horizontal
        inverted // ✅ دي السطر اللي بيخلي الاتجاه من اليمين لليسار
        showsHorizontalScrollIndicator={false}
        data={recommendedProductsData}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingLeft: 0 }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        pagingEnabled={true}
        snapToInterval={slideSize}
        decelerationRate="fast"
        getItemLayout={(_, index) => ({ length: slideSize, offset: slideSize * index, index })}
      />

      <View style={{ height: 40, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
        {recommendedProductsData.map((_, index) => {
          const isActive = activeIndex === (recommendedProductsData.length - 1 - index);
          return (
            <View
              key={index}
              style={[
                componentStyles.indicatorDot,
                isActive ? { backgroundColor: "#424047" } : null
              ]}
            />
          );
        })}
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
    zIndex: 10
  },
  listContentContainer: {
    paddingLeft: 15,
    maxHeight: 200,

  },
  cardContainer: {
    height: 270,
    width: width,
    marginLeft: 0,
  },
  imageContainer: {
    height: "98%",
    width: "100%",
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  image: {
    height: "87%",
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
    fontSize: 18,
    color: 'white'
  }
  ,

  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: 'gray',
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

