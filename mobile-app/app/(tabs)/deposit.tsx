import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  Provider as PaperProvider,
  DefaultTheme,
  Button,
  RadioButton,
} from "react-native-paper";
import axios from "axios";

// Cải thiện theme và giao diện
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FFA500", // Màu chủ đạo là cam
    background: "#F9FAFB", // Nền sáng
    surface: "#ffffff", // Màu nền của các component
  },
};

type FormData = {
  name: string;
  contact: string;
  koiType: string;
  comments: string;
  address: string;
  email: string;
  selectedType?: string;
  selectedMethod?: string;
};

const HomeScreen: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contact: "",
    address: "",
    email: "",
    koiType: "",
    comments: "",
  });

  const [selectedType, setSelectedType] = useState<string>("");
  const [isTypeSelected, setIsTypeSelected] = useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const handleInputChange = (key: keyof FormData, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    if (!selectedType || (selectedType === "type2" && !selectedMethod)) {
      alert("Please provide both the type and method of consignment.");
      return;
    }

    try {
      const fullData = {
        ...formData,
        koiType: selectedType,
        ...(selectedType === "type2" && { selectedMethod }),
      };

      console.log(fullData); // Kiểm tra dữ liệu đầy đủ

      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}consignments`,
        fullData
      );

      alert("Registration submitted successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
      alert(
        "An error occurred while submitting the registration. Please try again!"
      );
    }
  };

  return (
    <PaperProvider theme={MyTheme}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Koi Fish Consignment</Text>

          <TextInput
            placeholder="Full Name"
            style={styles.input}
            onChangeText={(text) => handleInputChange("name", text)}
          />

          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(text) => handleInputChange("email", text.trim())}
          />

          <TextInput
            placeholder="Phone Number"
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={(text) =>
              handleInputChange("contact", text.replace(/[^0-9]/g, ""))
            }
          />

          <TextInput
            placeholder="Address"
            style={styles.input}
            onChangeText={(text) => handleInputChange("address", text)}
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Select Consignment Type</Text>
            <Picker
              selectedValue={selectedType}
              onValueChange={(itemValue) => {
                setSelectedType(itemValue);
                setIsTypeSelected(true);
              }}
            >
              <Picker.Item label="Choose Type" value="" />
              <Picker.Item label="Care Service" value="type1" />
              <Picker.Item label="Farm Sale Consignment" value="type2" />
            </Picker>
          </View>

          {isTypeSelected && selectedType === "type2" && (
            <>
              <Text style={styles.pickerLabel}>Select Consignment Method</Text>
              <View style={styles.radioGroup}>
                <View style={styles.radioItem}>
                  <RadioButton
                    value="offline"
                    status={
                      selectedMethod === "offline" ? "checked" : "unchecked"
                    }
                    onPress={() => setSelectedMethod("offline")}
                  />
                  <Text>Offline (Regular Customer)</Text>
                </View>
                <View style={styles.radioItem}>
                  <RadioButton
                    value="online"
                    status={
                      selectedMethod === "online" ? "checked" : "unchecked"
                    }
                    onPress={() => setSelectedMethod("online")}
                  />
                  <Text>Online (Business Customer)</Text>
                </View>
              </View>
            </>
          )}

          {isTypeSelected && (
            <Text style={styles.selectedTypeText}>
              Selected:{" "}
              {selectedType === "type1"
                ? "Care Service"
                : "Farm Sale Consignment"}
              {selectedType === "type2" && selectedMethod && (
                <Text>
                  {" "}
                  - Method:{" "}
                  {selectedMethod === "offline"
                    ? "Offline (Regular Customer)"
                    : "Online (Business Customer)"}
                </Text>
              )}
            </Text>
          )}

          <TextInput
            placeholder="Describe your koi fish for consignment"
            multiline
            numberOfLines={5}
            autoCapitalize="sentences"
            textAlignVertical="top"
            style={styles.textArea}
            onChangeText={(text) => handleInputChange("comments", text)}
          />

          <Button
            mode="contained"
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            Submit Registration
          </Button>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB", // Nền sáng cho toàn bộ trang
  },
  contentContainer: {
    padding: 20,
  },
  formContainer: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  headerText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFA500", // Màu chữ chủ đạo
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  pickerContainer: {
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  selectedTypeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50", // Màu xanh để thông báo đã chọn
    marginBottom: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    height: 150,
  },
  submitButton: {
    backgroundColor: "#FFA500",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  radioGroup: {
    marginBottom: 16,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
});

export default HomeScreen;
