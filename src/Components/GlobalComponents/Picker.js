import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { View } from "react-native";

import { egyptGovernorates } from "./governantment"; // مصفوفة المحافظات
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
    <View style={{ zIndex: 1000 }}>
      <DropDownPicker
        placeholder="اختر المحافظة"
        open={open}
        value={Governate}
        items={items}
        setOpen={setOpen}
        setValue={(callback) => {
          const selected = callback(Governate); // ✅ احصل على القيمة الجديدة
          SetGovernate(selected); // ✅ مررها إلى Formik باستخدام setFieldValue
        }}
        setItems={setItems}
        style={styles.inputWrapper}
        dropDownContainerStyle={[styles.inputWrapper, { height: 150 }]}
        textStyle={[styles.h4, { textAlign: "right" }]}
        placeholderStyle={{ textAlign: "right" }}
        listItemLabelStyle={{ textAlign: "right" }}
      />
    </View>
  );
}
