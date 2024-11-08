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
} from "react-native-paper";

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

  const handleInputChange = (key: keyof FormData, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
    alert("Đăng ký đã được gửi!");
  };

  return (
    <PaperProvider theme={MyTheme}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Kí Gửi Cá Koi</Text>

          <TextInput
            placeholder="Họ và tên"
            style={styles.input}
            onChangeText={(text) => handleInputChange("name", text)}
          />

          <TextInput
            placeholder="Số điện thoại"
            keyboardType="phone-pad"
            style={styles.input}
            onChangeText={(text) => handleInputChange("contact", text)}
          />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            style={styles.input}
            onChangeText={(text) => handleInputChange("email", text)}
          />
          <TextInput
            placeholder="Address"
            keyboardType="email-address"
            style={styles.input}
            onChangeText={(text) => handleInputChange("address", text)}
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Chọn thể loại kí gửi</Text>
            <Picker
              selectedValue={selectedType}
              onValueChange={(itemValue) => {
                setSelectedType(itemValue);
                setIsTypeSelected(true);
              }}
            >
              <Picker.Item label="Chọn thể loại" value="" />
              <Picker.Item label="Thực hiện chăm sóc" value="type1" />
              <Picker.Item
                label="Thực hiện gửi cho trang trại bán"
                value="type2"
              />
            </Picker>
          </View>

          {isTypeSelected && (
            <Text style={styles.selectedTypeText}>
              Bạn đã chọn:{" "}
              {selectedType === "type1"
                ? "Thực hiện chăm sóc"
                : "Thực hiện gửi cho trang trại bán"}
            </Text>
          )}

          <TextInput
            placeholder="Mô tả các cá muốn kí gửi"
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
            Gửi Đăng Ký
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
});

export default HomeScreen;
