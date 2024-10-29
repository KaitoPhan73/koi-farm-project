import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import ArtToolsList from "@/components/products-list";
import BrandsList from "@/components/brands-list";
import SearchTool from "@/components/search-tool";
import { TProductResponse } from "@/schema/product.schema";
import productAPI from "@/apis/product";
import { useTools } from "@/hooks/useTools";
import { useLocalSearchParams, useRouter } from "expo-router";
import Loading from "@/components/Loading";

export default function Product() {
  const { category, name } = useLocalSearchParams();
  const router = useRouter();
  const { getProducts } = useTools();

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

  useEffect(() => {
    fetchProducts();
  }, [category, name]);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <SearchTool />
      <BrandsList />
      {loading ? <Loading size="large" /> : <ArtToolsList newsList={products} />}
    </ScrollView>
  );
}
