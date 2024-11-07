"use client";

import * as React from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  TUpdateProductRequest,
  UpdateProductSchema,
} from "@/schema/product.schema";
import { updateProduct } from "@/apis/product";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { listStatus } from "../../_components/config";
import { TProductBaseResponse } from "@/schema/product-base.schema";

interface FormUpdateProductProps {
  initialData: TUpdateProductRequest;
  productBases: TProductBaseResponse[];
}

export function FormUpdateProduct({
  initialData,
  productBases,
}: FormUpdateProductProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<TUpdateProductRequest>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: TUpdateProductRequest) => {
    setIsLoading(true);
    try {
      const response = await updateProduct(data._id, data);
      if (response.status === 200) {
        toast({
          title: "Product Updated Successfully",
        });
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update product: ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div className="grid gap-6">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-2">
            <FormField
              control={form.control}
              name="productBase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Base</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Base" />
                      </SelectTrigger>
                      <SelectContent>
                        {productBases.map((item) => (
                          <SelectItem key={item._id} value={item._id}>
                            {item.name} - {item.breed}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="S">S</SelectItem>
                        <SelectItem value="M">M</SelectItem>
                        <SelectItem value="L">L</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descriptionSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., '3-6 cm' or '10 cm'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Age..."
                      {...field}
                      min={0}
                      max={50}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price..."
                      {...field}
                      min={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Stock quantity..."
                      {...field}
                      min={0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {listStatus.map((item, index) => (
                          <SelectItem value={item.value} key={index}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Update Product
          </Button>
        </form>
      </div>
    </Form>
  );
}
