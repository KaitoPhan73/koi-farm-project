import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  FlatList,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { TProductResponse } from "@/schema/product.schema";
import { styled } from "nativewind";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import productAPI from "@/apis/product";
import { useTools } from "@/hooks/useTools";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

const ProductsList = () => {
  const { category, name } = useLocalSearchParams();
  const router = useRouter();
  const { getProducts } = useTools();
  const [products, setProducts] = useState<TProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Số trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const limit = 6; // Số sản phẩm mỗi trang

  const fetchProducts = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const params = { page, limit, category, name };
      const response = await productAPI.getProducts(params);
      setProducts(response.items); // Cập nhật dữ liệu sản phẩm
      setTotalPages(response.totalPages); // Cập nhật tổng số trang
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page, limit);
  }, [page, category, name]); // Gọi lại khi trang hoặc các tham số khác thay đổi

  const renderItem = ({ item }: { item: TProductResponse }) => (
    <StyledPressable
      onPress={() => router.push(`/art-tools/${item._id}`)}
      style={styles.itemContainer}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.itemImg} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.name}</Text>
      </View>
    </StyledPressable>
  );

  if (loading) {
    return (
      <StyledView className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color={Colors.primaryColor} />
        <StyledText className="mt-4 text-gray-500">Loading...</StyledText>
      </StyledView>
    );
  }

  return (
    <StyledView className="flex-1">
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        className="w-full bg-gray-100"
      />
      <StyledView style={styles.pagination}>
        <Button 
          title="Previous" 
          onPress={() => setPage((prev) => Math.max(prev - 1, 1))} 
          disabled={page === 1} 
        />
        <Text style={styles.pageNumber}>Page {page} of {totalPages}</Text>
        <Button 
          title="Next" 
          onPress={() => setPage((prev) => Math.min(prev + 1, totalPages))} 
          disabled={page === totalPages || totalPages === 0} 
        />
      </StyledView>
    </StyledView>
  );
};

export default ProductsList;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    overflow: "hidden",
  },
  itemImg: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  itemInfo: {
    padding: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.white,
  },
  pageNumber: {
    fontSize: 16,
  },
});
