// SoftDrinks.js
import { React, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  I18nManager,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomAppBar from "../../Components/Categories/CustomAppBar";
import useFetchCompanies from "../../Components/Categories/useFetchCompanies";
import { Feather } from "@expo/vector-icons";
import Modal from "react-native-modal";
import RecommendedProducts from "../../Components/Categories/ListProducts";
// import useFetchProducts from "../../Components/Categories/useFetchProducts";
// import ProductList from "../../Components/Categories/ProductList";

const SoftDrinks = () => {
  // const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);

  const { companies } = useFetchCompanies();
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const handleSelect = (id) => {
    setSelectedCompanyId(id);
    console.log("Selected company:", id);
  };

  
  // ✅ تم تعليق الفيتش الحقيقي مؤقتًا
  // const { products } = useFetchProducts();
  // const softDrinkProducts = products.filter(
    //   (product) => product.category?.name === "مشروبات غازية"
    // );
    // const filteredProducts = softDrinkProducts;
    
    const [isFilterVisible, setFilterVisible] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState("highToLow");

    const handleFilterPress = () => {
        console.log("Filter icon pressed");
        setFilterVisible(true);
    };

    const handleApplySort = () => {
        console.log("Sorting by:", selectedSortOption);
        setFilterVisible(false);
    };

    return (
        <View style={styles.container}>
      <CustomAppBar
        title="المشروبات الغازية"
        // onBack={() => navigation.goBack()}
        onBack={() => console.log("Back Arrow Clciked")}
        showSearch={true}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchClose={() => setSearchQuery("")}
      />

      {/* ScrollView للشركات */}
      <View style={styles.scrollWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ direction: "rtl" }}
          contentContainerStyle={{
            flexDirection: "row-reverse",
          }}
        >
          {/* الشركات */}
          {companies
            .slice()
            .reverse()
            .map((company) => (
              <View key={company.id} style={styles.companyItem}>
                <TouchableOpacity
                  onPress={() => handleSelect(company.id)}
                  style={[
                    styles.imageWrapper,
                    selectedCompanyId === company.id && styles.selected,
                  ]}
                >
                  <Image
                    source={{ uri: company.image }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text style={styles.name}>{company.name}</Text>
              </View>
            ))}

          {/* "جميع الشركات" */}
          <View style={styles.companyItem}>
            <TouchableOpacity
              onPress={() => handleSelect(null)}
              style={[
                styles.imageWrapper,
                selectedCompanyId === null && styles.selected,
              ]}
            >
              <Image
                source={require("../../../assets/imgs/company-icon.png")}
                style={styles.image}
              />
            </TouchableOpacity>
            <Text style={styles.name}>جميع{"\n"}الشركات</Text>
          </View>
        </ScrollView>
      </View>

      {/* فلتر المنتجات */}
      <View style={styles.filterRow}>
        <Text style={styles.filterText}>رتب حسب</Text>
        <TouchableOpacity onPress={handleFilterPress} style={styles.iconButton}>
          <Feather name="filter" size={18} color="#333" />
        </TouchableOpacity>
      </View>

      {/* ✅ عرض منتجات static */}
      <RecommendedProducts />
      <Modal
        isVisible={isFilterVisible}
        onBackdropPress={() => setFilterVisible(false)}
        swipeDirection="down"
        onSwipeComplete={() => setFilterVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.dragIndicator} />

          {/* العنوان + زر الإغلاق */}
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setFilterVisible(false)}
              style={styles.closeButton}
            >
              <Feather
                style={styles.closeButtonText}
                name="x"
                size={18}
                color="#424047"
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>رتب حسب</Text>
          </View>

          {/* اختيارات الفلتر */}
          {[
            { label: "السعر (من الأعلى الى الأقل)", value: "highToLow" },
            { label: "السعر (من الأقل الى الأعلى)", value: "lowToHigh" },
            { label: "المقترحات", value: "suggested" },
          ].map((option, index, arr) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.radioRow,
                index !== arr.length && styles.radioRowBorder, // Add border except last
              ]}
              onPress={() => setSelectedSortOption(option.value)}
            >
              <Text style={styles.radioLabel}>{option.label}</Text>
              <View style={styles.radioCircle}>
                {selectedSortOption === option.value && (
                  <View style={styles.selectedDot} />
                )}
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApplySort}
          >
            <Text style={styles.applyButtonText}>تطبيق</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default SoftDrinks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  placeholder: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
  companyItem: {
    marginTop: 10,
    alignItems: "center",
    marginHorizontal: 6,
  },
  imageWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 8,
    backgroundColor: "#FAFAFA",
    width: 48,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    borderColor: "black",
    borderWidth: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  name: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: 500,
    textAlign: "center",
    color: "#7B7686",
  },
  filterRow: {
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: "flex-start",
  },
  iconButton: {
    padding: 2,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
    marginHorizontal: 4,
  },
  filterText: {
    paddingBottom: 8,
    fontSize: 14,
    fontWeight: 500,
    color: "#424047",
  },

  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalHeader: {
    flexDirection: "row-reverse", // لو اللغة عربية
    alignItems: "center",
    justifyContent: "flex-start", // أو "space-between" لو حابب مسافة بينهم
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  closeButton: {
    width: 26,
    height: 26,
    borderWidth: 2,
    borderColor: "#424047",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: "#424047",
  },

  radioRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    // paddingHorizontal: 10,
  },
  radioRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 10,
  },
  modalTitle: {
    color: "#424047",
    fontSize: 12,
    fontWeight: 500,
    marginBottom: 5,
    marginRight:10,
    textAlign: "right",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#666",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  selectedDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  radioLabel: {
    fontSize: 12,
    fontWeight:500,
    color: "#424047",
    flexShrink: 1,
  },
  applyButton: {
    backgroundColor: "#007bff",
    borderRadius: 15,
    paddingVertical: 12,
    marginTop: 20,
  },
  applyButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: 500,
  },
});
