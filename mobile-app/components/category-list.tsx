import Colors from "@/constants/Colors";
import { useTools } from "@/hooks/useTools";
import { router, useLocalSearchParams } from "expo-router";
import { styled } from "nativewind";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const CategoryList = () => {
  const { getCategories } = useTools();
  const { category, active } = useLocalSearchParams();
  const gap = 12;
  const outerPadding = 16;

  // Debug logs
  // console.log("CategoryList - current category:", category);
  // console.log("CategoryList - current active:", active);

  React.useEffect(() => {
    if (!category && !active) {
      router.replace({
        pathname: "/product",
        params: { active: "true" },
      });
    }
  }, []);

  const categories = getCategories().data?.items || [];
  // console.log(
  //   "Available categories:",
  //   categories.map((c) => ({ id: c._id, name: c.name }))
  // );

  const categoryList = ["All", ...categories.map((item) => item.name)];

  const CategoryCard = ({ item }: { item: string }) => {
    const isSelected =
      (item === "All" && active === "true" && !category) ||
      categories.find((cat) => cat.name === item && cat._id === category);

    const handlePress = () => {
      if (item === "All") {
        router.replace({
          pathname: "/product",
          params: { active: "true" },
        });
      } else {
        const selectedCategory = categories.find((cat) => cat.name === item);
        if (selectedCategory) {
          router.setParams({
            category: selectedCategory._id,
            active: "true",
          });
        }
      }
    };

    return (
      <StyledTouchableOpacity
        className={`shadow-md rounded-md py-2 px-3 flex-1 justify-center items-center ${isSelected ? "bg-primary" : "bg-white"
          }`}
        style={{ backgroundColor: isSelected ? Colors.primaryColor : "white" }}
        onPress={handlePress}
      >
        <StyledText
          className={`text-md font-semibold ${isSelected ? "text-white" : "text-black"
            }`}
        >
          {item}
        </StyledText>
      </StyledTouchableOpacity>
    );
  };

  return (
    <View className="mb-4">
      <FlatList
        data={categoryList}
        renderItem={({ item }) => <CategoryCard item={item} />}
        keyExtractor={(item) => item}
        contentContainerStyle={{
          gap,
          paddingHorizontal: outerPadding,
        }}
        className="w-full"
        horizontal
      />
    </View>
  );
};

export default CategoryList;
