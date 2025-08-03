import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { componentStyles } from "../../../styles";
import { colors } from "../../../styles";

export default function CategoryTabs({ categories, onCategoryChange }) {
  const allCategories = ["الكل", ...categories];
  const [selected, setSelected] = useState("الكل");

  const handleSelect = (cat) => {
    setSelected(cat);
    if (onCategoryChange) onCategoryChange(cat);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelect(item)} style={styles.tabItem}>
      <Text
        style={[
          componentStyles.h2,
          styles.tabText,
          selected === item && styles.tabTextActive,
        ]}
      >
        {item}
      </Text>
      {selected === item && <View style={styles.activeLine} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.tabsWrapper}>
      <FlatList
        data={allCategories}
        horizontal
        inverted

        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.tabsContainer}
      />
      <View style={styles.bottomBorder} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabsWrapper: {
    backgroundColor: "#fff",
    marginBottom: 20,
    position: "relative",
  },
  tabsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 0,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 20,
    paddingBottom: 0,
  },
  tabText: {
    fontSize: 14,
    color: "#7B7686",
    fontWeight: "400",
  },
  tabTextActive: {
    color: colors.BtnsColor,
    fontWeight: "600",
  },
  activeLine: {
    marginTop: 12,
    height: 1,
    backgroundColor: colors.BtnsColor,
    width: "100%",
    borderRadius: 1,
  },
  bottomBorder: {
    position: "absolute",
    bottom: 2,
    left: 16,
    right: 16,
    height: 1,
    backgroundColor: "#EFECF3",
    opacity: 1,
  },
});
