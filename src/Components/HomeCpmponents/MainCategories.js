import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import LabelInpts from "../GlobalComponents/LabelInpts";
import { styles } from "../../../styles";
import SectionHeader from "../GlobalComponents/SectionHeader";
import { useDispatch, useSelector } from "react-redux";
import { fetchcategories } from "../../Redux/Slices/Categories";
import { useEffect, useState } from "react";


const MoreObj = 
    { id: '6', name: 'المزيد',  img: require("../../../assets/HomeSlide/more.png") }



const CategoryCard = ({ item }) => (
    <View style={componentStyles.cardContainer}>
        <TouchableOpacity>
            <View style={componentStyles.imageContainer}>
          {
             item.id=='6'?
            <Image  source={item.img} style={componentStyles.image} 
            resizeMode="contain"
            />
            :
             <Image  source={{ uri: item.img }} style={componentStyles.image} 
            resizeMode="contain"
            />
          }
        </View>
        <View >
            <Text style={[componentStyles.titleText, styles.h2,{fontSize:11}]}>{item.name}</Text>
           
        </View>
        </TouchableOpacity>
    </View>
);

function MainCategories() {

const dispatch=useDispatch();
      const{categories}=useSelector((state)=>state.Categories)
const[MoreCat,SetMoreCat]=useState([])
  useEffect(() => {
   dispatch(fetchcategories());
  }, []);

  useEffect(() => {
  if(categories.length > 0){
    const TargetData=categories.slice(0,5)
SetMoreCat([...TargetData,MoreObj])
  }
  }, [categories]);
    return (
        <View style={{ height:'auto' }}>
             <SectionHeader text=" الأقسام" />
                             
            <FlatList
                horizontal
                inverted
                 scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                data={MoreCat}
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
