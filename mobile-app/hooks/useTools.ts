import toolApi from "@/apis";
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

  return { getTools, getTool, getBrands };
};
