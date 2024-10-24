import Colors from "@/constants/Colors";
import { useTools } from "@/hooks/useTools";
import { toolResponse } from "@/schema/tool.schema";
import { router, useLocalSearchParams } from "expo-router";
import { styled } from "nativewind";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const BrandsList = () => {
  const { getCategories } = useTools();
  const gap = 12;
  const outerPadding = 16;
  const brands = getCategories().data?.map((item) => item.name) || [];
  brands.unshift("All");
  console.log(getCategories().data);
  const { brand: selectedBrand, artName } = useLocalSearchParams();
  const artNameQuery = Array.isArray(artName) ? artName[0] : artName;

  const CardBrand = ({ brand }: { brand: string }) => {
    const isSelected =
      brand === selectedBrand || (brand === "All" && !selectedBrand);

    return (
      <StyledTouchableOpacity
        className={`shadow-md rounded-md py-2 px-3 flex-1 justify-center items-center ${
          isSelected ? "bg-primary" : "bg-white"
        }`}
        style={{ backgroundColor: isSelected ? Colors.primaryColor : "white" }}
        onPress={() => {
          if (brand === "All") {
            router.push("/");
            if (artNameQuery !== undefined) {
              router.setParams({ artName: artNameQuery });
            }
          } else {
            router.setParams({ brand: brand });
          }
        }}
      >
        <StyledText
          className={`text-md font-semibold ${
            isSelected ? "text-white" : "text-black"
          }`}
        >
          {brand}
        </StyledText>
      </StyledTouchableOpacity>
    );
  };

  return (
    <View>
      <View>
        <FlatList
          data={brands}
          renderItem={({ item }) => <CardBrand brand={item} />}
          keyExtractor={(item) => item}
          contentContainerStyle={{
            gap,
            paddingHorizontal: outerPadding,
          }}
          className="w-full"
          horizontal
        />
      </View>
    </View>
  );
};

export default BrandsList;