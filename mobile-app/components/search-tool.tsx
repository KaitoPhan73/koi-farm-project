import Colors from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
  Text,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";

const SearchTool = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { category } = useLocalSearchParams();

  const categoryQuery = Array.isArray(category) ? category[0] : category;

  const handleSearch = () => {
    Keyboard.dismiss();
    if (searchQuery === "") {
      router.push("/product");
      if (categoryQuery !== undefined) {
        router.setParams({ category: categoryQuery });
      }
    } else {
      router.setParams({ search: searchQuery });
    }
  };

  return (
    <View className="p-4 flex-row items-center">
      <TextInput
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        returnKeyType="search"
        className="border border-gray-300 rounded-md p-2 flex-1"
        style={{ backgroundColor: Colors.white }}
      />
      <TouchableOpacity
        onPress={handleSearch}
        className="ml-2 bg-blue-500 p-3 rounded-md"
        style={{ backgroundColor: Colors.primaryColor }}
      >
        <Feather name="search" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchTool;
