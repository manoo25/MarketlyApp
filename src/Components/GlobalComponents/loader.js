import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import SkeletonBox from './SkeletonBox.js'
import HeaderPages from './HeaderPages.js'

export default function Loader() {
  return (
    <View style={{ flex: 1 }}>
      <View style={style.container}>
        {/* Header */}


      </View>
      <View style={style.skContainer}>
        <FlatList
          data={[...Array(6)]}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View key={index} style={style.item}>
              <SkeletonBox style={style.imageSkeleton} />
              <SkeletonBox style={style.textSkeleton} />
              <SkeletonBox style={style.priceSkeleton} />
            </View>
          )}
        />
      </View>




    </View>
  )
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    writingDirection: "rtl",
  },
  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    height: 90
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#FAFAFA",
    borderRadius: 105,
    borderWidth: 1,
    borderColor: "#EFECF3",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "flex-end",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    alignSelf: "flex-end",
  },
  modalOption: {
    paddingVertical: 12,
  },
  skContainer: {
  paddingVertical: 8,
  paddingHorizontal: 12,
  backgroundColor: '#fff',
},

item: {
  width: 120, // عرض العنصر زي الصورة
  marginRight: 12,
  borderRadius: 12,
  backgroundColor: '#F7F7F7',
  padding: 8,
  alignItems: 'center',
},

imageSkeleton: {
  width: '100%',
  height: 100, // أصغر شوية من اللي كان عندك عشان تناسب الكروت الصغيرة
  borderRadius: 8,
  marginBottom: 8,
},

textSkeleton: {
  width: '80%',
  height: 14,
  borderRadius: 6,
  marginBottom: 6,
},

priceSkeleton: {
  width: '60%',
  height: 12,
  borderRadius: 6,
},

});
