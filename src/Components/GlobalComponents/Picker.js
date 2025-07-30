import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { View } from "react-native";

import { egyptGovernorates } from "./governantment";
import { colors, styles } from "../../../styles";

export default function TestPicker({ Governate, SetGovernate }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(
    egyptGovernorates.map((gov) => ({
      label: gov,
      value: gov,
    }))
  );

  return (
    <View
      style={{
        zIndex: open ? 1000 : 1,
        elevation: open ? 10 : 0,
        maxHeight:230,
        position: "relative", 
      }}
    >
      <DropDownPicker
        placeholder="اختر المحافظة"
        open={open}
        value={Governate}
        items={items}
        setOpen={setOpen}
        setValue={(callback) => {
          const selected = callback(Governate);
          SetGovernate(selected);
        }}
        setItems={setItems}
        listMode="SCROLLVIEW"   
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
        style={[
          styles.inputWrapper,
          {
            zIndex: 1000,
          },
        ]}
        dropDownDirection="BOTTOM"
        dropDownContainerStyle={{
          ...styles.inputWrapper,
          height: 250,
          zIndex: 1000,
          elevation: 10,
          position: "relative",  
          marginTop:-50,
        }}
        textStyle={[styles.h4, { textAlign: "right" }]}
        placeholderStyle={{ textAlign: "right" }}
        listItemLabelStyle={{ textAlign: "right" }}
      />
    </View>
  );
}
