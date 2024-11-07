import toolApi from "@/apis";
import categoryApi from "@/apis/category";
import productAPI from "@/apis/product";
import { useQuery } from "@tanstack/react-query";

export const useTools = (params ?: any) => {
  const getProducts = useQuery({
    queryKey: ["products",params],
    queryFn: () => productAPI.getProducts(params),
  });

  // const getTool = (id: string) =>
  //   useQuery({
  //     queryKey: ["tool", id],
  //     queryFn: () => toolApi.getTool(id),
  //   });

  // const getCategories = () =>
  //   useQuery({
  //     queryKey: ["categories"],
  //     queryFn: () => toolApi.getCategories(),
  //   });

  // const getBrands = () =>
  //   useQuery({
  //     queryKey: ["brands", brand],
  //     queryFn: () => toolApi.getBrands(brand),
  //   });

  const getCategories = () =>
    useQuery({
      queryKey: ["categories"],
      queryFn: () => categoryApi.getCategories(),
    });

  return { getProducts, getCategories};
};
