import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { componentStyles } from "../../../styles";

export default function CategoryTabs({ categories, onCategoryChange }) {
  const allCategories = [ ...categories , "الكل"];
  const [selected, setSelected] = useState("الكل");

  const handleSelect = (cat) => {
    setSelected(cat);
    if (onCategoryChange) onCategoryChange(cat);
  };

  return (
    <View style={styles.tabsContainer}>
      {allCategories.map((cat, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleSelect(cat)}
          style={styles.tabItem}
        >
          <Text
            style={[componentStyles.h2,styles.tabText, selected === cat && styles.tabTextActive]}
          >
            {cat}
          </Text>
          {selected === cat && <View style={styles.activeLine} />}
        </TouchableOpacity>
      ))}
      <View style={styles.bottomBorder} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#7B7686",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 0,
  },
  tabText: {
    fontSize: 14,
    color: "#7B7686",
    fontWeight: "400",
  },
  tabTextActive: {
    color: "#46B8F0",
    fontWeight: "600",
  },
  activeLine: {
    marginTop: 12,
    height: 1,
    backgroundColor: "#46B8F0",
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
