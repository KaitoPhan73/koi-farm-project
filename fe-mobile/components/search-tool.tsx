import Colors from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { TextInput, View, TouchableOpacity, Keyboard } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const SearchTool = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { brand } = useLocalSearchParams();

  const brandQuery = Array.isArray(brand) ? brand[0] : brand;

  const handleSearch = () => {
    Keyboard.dismiss();
    if (searchQuery === "") {
      router.push("/");
      if (brandQuery !== undefined) {
        router.setParams({ brand: brandQuery });
      }
    } else {
      router.setParams({ artName: searchQuery });
    }
  };

  return (
    <View className="p-4 flex-row items-center">
      <TextInput
        placeholder="Search for tools..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        className="border border-gray-300 rounded-md p-2 flex-1"
        style={{ backgroundColor: Colors.white }}
      />
      <TouchableOpacity onPress={handleSearch} className="ml-2">
        <Feather name="search" size={24} color={Colors.primaryColor} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchTool;
