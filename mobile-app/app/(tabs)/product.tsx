import React, { useEffect, useState, useCallback } from "react";
import { ScrollView } from "react-native";
import ProductList from "@/components/products-list";
import BrandsList from "@/components/brands-list";
import SearchTool from "@/components/search-tool";
import { TProductResponse } from "@/schema/product.schema";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "@/components/Loading";
import productAPI from "@/apis/product";
import { TProductBaseResponse } from "@/schema/productbase.schema";

export default function Product() {
  const { category, name } = useLocalSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<TProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 6;

  const fetchProducts = async (page: number = 1) => {
    setLoading(true);
    try {
      const params = { page, limit, category, name };
      const response = await productAPI.getProducts(params);
      setProducts(response.items);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when category or name changes
  useEffect(() => {
    fetchProducts();
  }, [category, name]);

  // Fetch products again when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <SearchTool />
      <BrandsList />
      {loading ? (
        <Loading size="large" />
      ) : (
        <ProductList productList={products} />
      )}
    </ScrollView>
  );
}
