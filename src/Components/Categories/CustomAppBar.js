// CustomAppBar.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const CustomAppBar = ({
  title,
  onBack,
  showSearch,
  searchQuery,
  onSearchChange,
  onSearchClose,
}) => {
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchPress = () => {
    setIsSearching(true);
  };

  const handleCloseSearch = () => {
    setIsSearching(false);
    onSearchClose?.(); // رجّع البحث فاضي لو حبيت
  };

  return (
    <View style={styles.appBarContainer}>
      {isSearching ? (
        <View style={styles.searchContainer}>
          <TouchableOpacity
            onPress={handleCloseSearch}
            style={{ marginRight: 8 }}
          >
            <Feather name="x" size={24} color="gray" />
          </TouchableOpacity>
          <TextInput
            autoFocus
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholder={`ابحث في ${title}`}
            placeholderTextColor="#999" // <-- لون البليس هولدر
            style={styles.searchInput}
            underlineColorAndroid="transparent"
            selectionColor="gray"
          />
        </View>
      ) : (
        <View style={styles.appBar}>
          {showSearch ? (
            <TouchableOpacity onPress={handleSearchPress}>
              <Feather name="search" size={24} color="gray" />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 24 }} />
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            {onBack && (
              <TouchableOpacity onPress={onBack}>
                <Feather name="chevron-right" size={30} color="gray" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default CustomAppBar;

const styles = StyleSheet.create({
  appBarContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: "#fff",
  },
  appBar: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 5,
  },
  searchContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 60,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 8,
    textAlign: "right",
    borderWidth: 0, // <-- نشيل البوردر هنا
    backgroundColor: "#fff",
    color: "#000", // لون النص اللي بيكتبه المستخدم
    outlineColor: "transparent",
    fontSize:18,
  },
});
