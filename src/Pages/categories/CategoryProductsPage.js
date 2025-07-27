// CategoryProductsPage.js
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  I18nManager,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Modal from "react-native-modal";
import CustomAppBar from "../../Components/Categories/CustomAppBar";
import useFetchCompanies from "../../Components/Categories/useFetchCompanies";
import { useSelector } from "react-redux";
import ListProducts from "../../Components/Categories/ListProducts";

const CategoryProductsPage = ({ route, navigation }) => {
  const { category } = route.params;
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("highToLow");

  const { companies } = useFetchCompanies();
  const allProducts = useSelector((state) => state.products.products);

  const handleSelectCompany = (id) => {
    setSelectedCompanyId(id);
  };

  const handleApplySort = () => {
    // sort logic can go here later
    setFilterVisible(false);
  };


const companiesInThisCategory = Array.from(
  new Set(
    (allProducts || [])
      .filter((product) => product.category_id === category.id)
      .map((product) => product.company_id)
  )
);


  const filteredCompanies = (companies || []).filter((company) =>
    companiesInThisCategory.includes(company.id)
  );

  // ✅ فلترة المنتجات بناءً على القسم والشركة المختارة مؤقتًا
const filteredProducts = (allProducts || []).filter((product) => {
  const belongsToCategory = product.category_id === category.id;
  const matchesCompany =
    selectedCompanyId === null || product.company_id === selectedCompanyId;
  const matchesSearch =
    searchQuery.trim() === "" ||
    product.name?.toLowerCase().includes(searchQuery.trim().toLowerCase());

  return belongsToCategory && matchesCompany && matchesSearch;
});



const getProductPrice = (product) =>
  parseFloat(product.endPrice ?? product.traderprice ?? 0);

const sortedProducts = filteredProducts.slice();

if (selectedSortOption === "highToLow") {
  sortedProducts.sort((a, b) => getProductPrice(b) - getProductPrice(a));
} else if (selectedSortOption === "lowToHigh") {
  sortedProducts.sort((a, b) => getProductPrice(a) - getProductPrice(b));
}


    // const filteredProducts = allProducts || [];

    // console.log("allProducts =>", allProducts);


  return (
    <View style={styles.container}>
      <CustomAppBar
        title={category.name}
        onBack={() => navigation.goBack()}
        showSearch={true}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchClose={() => setSearchQuery("")}
      />

      {/* الشركات */}
      <View>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ direction: "rtl" }} // ✅ أضف دي هنا
            contentContainerStyle={{
            flexDirection: "row-reverse",
            paddingHorizontal: 12,
                paddingVertical: 10,
            }}
        >
            {filteredCompanies
            .slice()
            .reverse()
            .map((company) => (
                <View key={company.id} style={styles.companyItem}>
                <TouchableOpacity
                    onPress={() => handleSelectCompany(company.id)}
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
                onPress={() => handleSelectCompany(null)}
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

      
      {/* زر الفلتر */}
      <View style={styles.filterRow}>
        <Text style={styles.filterText}>رتب حسب</Text>
        <TouchableOpacity
          onPress={() => setFilterVisible(true)}
          style={styles.iconButton}
        >
          <Feather name="filter" size={18} color="#333" />
        </TouchableOpacity>
      </View>

      {/* عرض المنتجات (مؤقتًا استاتيك) */}
      <ListProducts products={sortedProducts} />

      {/* المودال للفلترة */}
      <Modal
        isVisible={isFilterVisible}
        onBackdropPress={() => setFilterVisible(false)}
        swipeDirection="down"
        onSwipeComplete={() => setFilterVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.dragIndicator} />
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setFilterVisible(false)}
              style={styles.closeButton}
            >
              <Feather name="x" size={18} color="#424047" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>رتب حسب</Text>
          </View>

          {[
            { label: "السعر من الأعلى", value: "highToLow" },
            { label: "السعر من الأقل", value: "lowToHigh" },
            { label: "المقترحات", value: "suggested" },
          ].map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.radioRow}
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

export default CategoryProductsPage;

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
    marginRight: 10,
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
    fontWeight: 500,
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
