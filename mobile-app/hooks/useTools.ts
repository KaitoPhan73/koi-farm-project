import toolApi from "@/apis";
import categoryApi from "@/apis/category";
import { useQuery } from "@tanstack/react-query";

export const useTools = (brand?: string, artName?: string) => {
  const getProducts = useQuery({
    queryKey: ["tools", brand, artName],
    queryFn: () => toolApi.getProducts(brand, artName),
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
