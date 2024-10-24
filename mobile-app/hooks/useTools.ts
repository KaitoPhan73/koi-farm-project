import toolApi from "@/apis";
import categoryApi from "@/apis/category";
import { useQuery } from "@tanstack/react-query";

export const useTools = (brand?: string, artName?: string) => {
  const getTools = useQuery({
    queryKey: ["tools", brand, artName],
    queryFn: () => toolApi.getTools(brand, artName),
  });

  const getTool = (id: string) =>
    useQuery({
      queryKey: ["tool", id],
      queryFn: () => toolApi.getTool(id),
    });

  const getBrands = () =>
    useQuery({
      queryKey: ["brands", brand],
      queryFn: () => toolApi.getBrands(brand),
    });

  const getCategories = () =>
    useQuery({
      queryKey: ["categories"],
      queryFn: () => categoryApi.getCategories(),
    });

  return { getTools, getCategories, getTool, getBrands };
};
