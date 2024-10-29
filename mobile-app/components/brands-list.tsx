import Colors from "@/constants/Colors";
import { useTools } from "@/hooks/useTools";
import { router, useLocalSearchParams } from "expo-router";
import { styled } from "nativewind";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Loading from "@/components/Loading";

const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const BrandsList = () => {
  const { getCategories, getProductsByCategory } = useTools(); // Adjust useTools to include getProductsByCategory
  const gap = 12;
  const outerPadding = 16;

  // Local state to store the selected category and fetched products
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = getCategories().data?.items || [];
  const brands = ["All", ...categories.map((item) => item.name)];

  useEffect(() => {
    // Fetch products based on the selected category
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = selectedCategory
          ? await getProductsByCategory(selectedCategory)
          : await getProductsByCategory(); // Fetch all products if "All" is selected
        setProducts(response.items);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const CardBrand = ({ brand }: { brand: string }) => {
    const isSelected = brand === selectedCategory || (brand === "All" && !selectedCategory);

    return (
      <StyledTouchableOpacity
        className={`shadow-md rounded-md py-2 px-3 flex-1 justify-center items-center ${isSelected ? "bg-primary" : "bg-white"
          }`}
        style={{ backgroundColor: isSelected ? Colors.primaryColor : "white" }}
        onPress={() => setSelectedCategory(brand === "All" ? null : brand)}
      >
        <StyledText
          className={`text-md font-semibold ${isSelected ? "text-white" : "text-black"
            }`}
        >
          {brand}
        </StyledText>
      </StyledTouchableOpacity>
    );
  };

  return (
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
      <View style={{ marginTop: 20 }}>
        {loading ? (
          <Loading size="large" />
        ) : (
          // Render filtered products here
          <FlatList
            data={products}
            renderItem={({ item }) => (
              <Text style={{ padding: 10 }}>{item.name}</Text>
            )}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    </View>
  );
};

export default BrandsList;
