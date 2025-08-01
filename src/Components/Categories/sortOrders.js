// SortFilterModal.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Sortstylesheet
} from "react-native";
import Modal from "react-native-modal";
import { Feather } from "@expo/vector-icons";
import { Sortstyles } from "../../../styles";

const SortOrders = ({
  selectedOption,
  onChangeOption,
  onApply,
  options = [
    { label: "طلبات مكتملة", value: "done" },
    { label: "طلبات قيدالتنفيذ", value: "inprogress" },
    { label: "طلبات ملغاه", value: "returns" }
    
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
      <View style={Sortstyles.filterRow}>
        <Text style={Sortstyles.filterText}>رتب حسب</Text>
        <TouchableOpacity onPress={handleOpen} style={Sortstyles.iconButton}>
          <Feather name="filter" size={18} color="#333" />
        </TouchableOpacity>
      </View>

      {/* الاصلى مودال الترتيب */}
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setVisible(false)}
        swipeDirection="down"
        onSwipeComplete={() => setVisible(false)}
        style={Sortstyles.modal}
      >
        <View style={Sortstyles.modalContent}>
          <View style={Sortstyles.dragIndicator} />
          <View style={Sortstyles.modalHeader}>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={Sortstyles.closeButton}
            >
              <Feather name="x" size={18} color="#424047" />
            </TouchableOpacity>
            <Text style={Sortstyles.modalTitle}>رتب حسب</Text>
          </View>

          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={Sortstyles.radioRow}
              onPress={() => setTempOption(option.value)}
            >
              <Text style={Sortstyles.radioLabel}>{option.label}</Text>
              <View style={Sortstyles.radioCircle}>
                {tempOption === option.value && (
                  <View style={Sortstyles.selectedDot} />
                )}
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={Sortstyles.applyButton} onPress={handleApply}>
            <Text style={Sortstyles.applyButtonText}>تطبيق</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default SortOrders;


