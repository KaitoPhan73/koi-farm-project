import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";
import SearchTool from "./search-tool";
import Colors from "@/constants/Colors";
import { useState, useRef, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";

const SearchHeader = () => {
  const { category, search, saleType: urlSaleType } = useLocalSearchParams();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedType, setSelectedType] = useState(
    (urlSaleType as string) || "Individual"
  );
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    const toValue = showDropdown ? 0 : 1;
    setShowDropdown(!showDropdown);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSelect = (type: string) => {
    setSelectedType(type);
    toggleDropdown();

    // Xử lý URL params
    const params: any = {};
    if (category) params.category = category;
    if (search) params.search = search;
    params.saleType = type;

    router.setParams(params);
  };

  return (
    <View style={styles.container}>
      <View style={styles.saleTypeContainer}>
        <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
          <Text>{selectedType}</Text>
        </TouchableOpacity>

        {showDropdown && (
          <Animated.View
            style={[
              styles.dropdownContent,
              {
                opacity: fadeAnim,
                transform: [{ scaleY: scaleAnim }],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleSelect("Individual")}
            >
              <Text>Individual</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.dropdownItem, styles.dropdownItemLast]}
              onPress={() => handleSelect("Batch")}
            >
              <Text>Batch</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
      <View style={styles.searchContainer}>
        <SearchTool />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  saleTypeContainer: {
    flex: 0.3, // 30% của chiều rộng
    marginRight: 10, // Đổi marginLeft thành marginRight
    zIndex: 1000,
    elevation: 1000,
  },
  searchContainer: {
    flex: 0.7, // 70% của chiều rộng
  },
  dropdown: {
    padding: 10,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    minWidth: 100, // Đảm bảo độ rộng tối thiểu
  },
  dropdownContent: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: -1, // Làm cho dropdown sát với nút
    zIndex: 1000,
    elevation: 1000,
    transform: [{ translateY: 0 }],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dropdownItemLast: {
    borderBottomWidth: 0,
  },
});

export default SearchHeader;
