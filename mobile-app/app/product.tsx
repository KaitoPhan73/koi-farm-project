import React, { useEffect, useState, useCallback } from "react";
import { ScrollView } from "react-native";
import ProductList from "@/components/products-list";
import { TProductResponse } from "@/schema/product.schema";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "@/components/Loading";
import productAPI from "@/apis/product";
import CategoryList from "@/components/category-list";
import SearchHeader from "@/components/SearchHeader";

type SaleType = "Individual" | "Batch" | "All";

export default function Product() {
  const { category, search } = useLocalSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<TProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [saleType, setSaleType] = useState<SaleType>("All");
  const limit = 6;

  const fetchProducts = async (page: number = 1) => {
    setLoading(true);
    try {
      const params: any = {
        page,
        limit,
      };

      if (category) params.category = category;
      if (search) params.search = search;
      if (saleType !== "All") params.saleType = saleType;

      const response = await productAPI.getProducts(params);
      setProducts(response.items);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaleTypeChange = (type: SaleType) => {
    setSaleType(type);
  };

  useEffect(() => {
    fetchProducts();
  }, [category, search, saleType]);

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <SearchHeader onSaleTypeSelect={handleSaleTypeChange} />
      <CategoryList />
      {loading ? (
        <Loading size="large" />
      ) : (
        <ProductList productList={products} />
      )}
    </ScrollView>
  );
}
