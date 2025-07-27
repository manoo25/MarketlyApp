// SortFilterModal.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
} from "react-native";
import Modal from "react-native-modal";
import { Feather } from "@expo/vector-icons";

const SortFilterModal = ({
  selectedOption,
  onChangeOption,
  onApply,
  options = [
    { label: "السعر من الأعلى", value: "highToLow" },
    { label: "السعر من الأقل", value: "lowToHigh" },
    { label: "المقترحات", value: "suggested" },
  ],
}) => {
  const [isVisible, setVisible] = useState(false);
  const [tempOption, setTempOption] = useState(selectedOption);

  const handleOpen = () => {
    setTempOption(selectedOption);
    setVisible(true);
  };

  const handleApply = () => {
    onChangeOption(tempOption);
    onApply(tempOption);
    setVisible(false);
  };

  return (
    <>
      {/* زر الترتيب + الفلتر */}
      <View style={styles.filterRow}>
        <Text style={styles.filterText}>رتب حسب</Text>
        <TouchableOpacity onPress={handleOpen} style={styles.iconButton}>
          <Feather name="filter" size={18} color="#333" />
        </TouchableOpacity>
      </View>

      {/* مودال الترتيب */}
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setVisible(false)}
        swipeDirection="down"
        onSwipeComplete={() => setVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.dragIndicator} />
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.closeButton}
            >
              <Feather name="x" size={18} color="#424047" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>رتب حسب</Text>
          </View>

          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.radioRow}
              onPress={() => setTempOption(option.value)}
            >
              <Text style={styles.radioLabel}>{option.label}</Text>
              <View style={styles.radioCircle}>
                {tempOption === option.value && (
                  <View style={styles.selectedDot} />
                )}
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>تطبيق</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default SortFilterModal;

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: "flex-start",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#424047",
    paddingBottom: 8,
    fontFamily: "Tajawal-Medium",
  },
  iconButton: {
    padding: 2,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
    marginHorizontal: 4,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
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
  modalHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-start",
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
  modalTitle: {
    color: "#424047",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 5,
    marginRight: 10,
    textAlign: "right",
    fontFamily: "Tajawal-Bold",
  },
  radioRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
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
    fontWeight: "500",
    color: "#424047",
    fontFamily: "Tajawal-Regular",
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
    fontWeight: "500",
    fontFamily: "Tajawal-Regular",
  },
});
