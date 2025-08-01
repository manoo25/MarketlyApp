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
import GoBack from "../GlobalComponents/GoBack";
import HeaderPages from "../GlobalComponents/HeaderPages";

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
        <View style={{ alignItems: 'center', marginTop: 60, marginBottom: 24 }}>
          <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row-reverse' }}>
            <HeaderPages title={title} />
          </View>
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
    writingDirection: "rtl",

  },
  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingStart: 16,


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
    marginTop: 40,
  },
  searchBox: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 0,
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 8,
    fontSize: 16,
    textAlign: "right",
    color: "#000",
    fontFamily: "Tajawal-Regular",
  },
});
