import toolApi from "@/apis";
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

  const getCategories = () =>
    useQuery({
      queryKey: ["categories"],
      queryFn: () => toolApi.getCategories(),
    });

  return { getProducts, getCategories };
};
