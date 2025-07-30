import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Feather } from "@expo/vector-icons";
import { Sortstyles } from "../../../styles";

const options = [
  { label: "السعر من الأعلى", value: "highToLow" },
  { label: "السعر من الأقل", value: "lowToHigh" },
  { label: "بدون ترتيب", value: "default" },
];

const SortFilter = ({ selectedOption, onSelect }) => {
  const [visible, setVisible] = useState(false);
  const [tempOption, setTempOption] = useState(selectedOption);

  const handleApply = () => {
    onSelect(tempOption);
    setVisible(false);
  };

  return (
    <>
      <View style={Sortstyles.filterRow}>
        <Text style={Sortstyles.filterText}>رتب حسب</Text>
        <TouchableOpacity onPress={() => setVisible(true)} style={Sortstyles.iconButton}>
          <Feather name="filter" size={18} color="#333" />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 12 }}>
            رتب حسب
          </Text>

          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => setTempOption(option.value)}
              style={{
                paddingVertical: 12,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: tempOption === option.value ? "#327AFF" : "#333",
                  fontSize: 15,
                }}
              >
                {option.label}
              </Text>

              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: tempOption === option.value ? "#327AFF" : "#ccc",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {tempOption === option.value && (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "#327AFF",
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={{
              marginTop: 16,
              backgroundColor: "#327AFF",
              paddingVertical: 12,
              borderRadius: 8,
            }}
            onPress={handleApply}
          >
            <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
              تطبيق
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default SortFilter;
