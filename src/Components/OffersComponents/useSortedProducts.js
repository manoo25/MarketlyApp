
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

const options = [
  { label: "السعر من الأعلى", value: "highToLow" },
  { label: "السعر من الأقل", value: "lowToHigh" },
  { label: "بدون ترتيب", value: "default" },
];

const SortFilter = ({ selectedOption, onSelect }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "flex-end", marginVertical: 10 }}>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ marginLeft: 6, color: "#424047" }}>رتب حسب</Text>
          <Ionicons name="filter" size={18} color="#424047" />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View style={{ backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 12 }}>رتب حسب</Text>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => {
                onSelect(option.value);
                setVisible(false);
              }}
              style={{ paddingVertical: 12 }}
            >
              <Text style={{ color: selectedOption === option.value ? "#327AFF" : "#333" }}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </>
  );
};

export default SortFilter;
