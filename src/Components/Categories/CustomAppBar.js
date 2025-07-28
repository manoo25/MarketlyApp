// CustomAppBar.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ArrowRight2 } from "iconsax-react-nativejs";

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
      if (isSearching) {
        setIsSearching(false);
        onSearchClose?.();
      } else {
        setIsSearching(true);
      }
  };

  const handleCloseSearch = () => {
    setIsSearching(false);
    onSearchClose?.();
  };

  return (
    <View style={styles.container}>
      {/* الهيدر الرئيسي */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          {onBack && (
            <TouchableOpacity onPress={onBack}>
              <ArrowRight2 size="32" color="#424047" />
            </TouchableOpacity>
          )}
          <Text style={styles.title}>{title}</Text>
        </View>

        {showSearch && (
          <TouchableOpacity
            style={styles.searchIconContainer}
            onPress={handleSearchPress}
          >
            <Ionicons name="search" size={24} color="#424047" />
          </TouchableOpacity>
        )}
      </View>

      {/* حقل البحث المنفصل */}
      {isSearching && (
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            autoFocus
            style={styles.searchInput}
            placeholder={`ابحث في ${title}...`}
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={onSearchChange}
            selectionColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleCloseSearch}>
              <Ionicons name="close" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default CustomAppBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 48 : 24,
    paddingBottom: 8,
    writingDirection: "rtl",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "Tajawal-Bold",
    fontSize: 28,
    color: "#333333",
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
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 10,
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 8,
    fontSize: 16,
    textAlign: "right",
    color: "#000",
    fontFamily: "Tajawal-Regular",
  },
});
