import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";

type SaleType = "Individual" | "Batch" | "All";

interface SelectSaleTypeProps {
  onSelect: (type: SaleType) => void;
  defaultValue?: SaleType;
}

const SelectSaleType = ({
  onSelect,
  defaultValue = "All",
}: SelectSaleTypeProps) => {
  const [selectedType, setSelectedType] = useState<SaleType>(defaultValue);

  const handleSelect = (type: SaleType) => {
    setSelectedType(type);
    onSelect(type);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, selectedType === "All" && styles.selectedButton]}
        onPress={() => handleSelect("All")}
      >
        <Text
          style={[
            styles.buttonText,
            selectedType === "All" && styles.selectedButtonText,
          ]}
        >
          All
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedType === "Individual" && styles.selectedButton,
        ]}
        onPress={() => handleSelect("Individual")}
      >
        <Text
          style={[
            styles.buttonText,
            selectedType === "Individual" && styles.selectedButtonText,
          ]}
        >
          Individual
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedType === "Batch" && styles.selectedButton,
        ]}
        onPress={() => handleSelect("Batch")}
      >
        <Text
          style={[
            styles.buttonText,
            selectedType === "Batch" && styles.selectedButtonText,
          ]}
        >
          Batch
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.lightGrey,
    borderRadius: 8,
    padding: 2,
    height: 40,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginHorizontal: 2,
  },
  selectedButton: {
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 11,
    color: Colors.darkGrey,
  },
  selectedButtonText: {
    color: Colors.black,
    fontWeight: "600",
  },
});

export default SelectSaleType;
