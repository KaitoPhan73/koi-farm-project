"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { createProduct } from "@/apis/product"; // Đảm bảo rằng bạn có API createProduct
import { ReloadIcon } from "@radix-ui/react-icons";
import { TProductRequest, ProductSchema } from "@/schema/product.schema"; // Đảm bảo rằng bạn đã định nghĩa schema
import { useRouter } from "next/navigation";
import { Select } from "@/components/ui/select";

interface FormCreateProductProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FormCreateProduct({
  className,
  ...props
}: FormCreateProductProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<TProductRequest>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      category: "",
      age: undefined,
      origin: "",
      gender: "Male", // Có thể đặt giá trị mặc định
      size: undefined,
      breed: "",
      personality: "",
      dailyFeedAmount: undefined,
      screeningRate: undefined,
      healthStatus: "",
      imageUrl: "",
      price: undefined,
      available: true, // Có thể đặt giá trị mặc định
      status: "Available", // Có thể đặt giá trị mặc định
      isImportedPurebred: false,
      isF1Hybrid: false,
      isPureVietnamese: false,
    },
  });

  const onSubmit = async (data: TProductRequest) => {
    setIsLoading(true);
    try {
      const response = await createProduct(data);
      if (response.status === 201) {
        toast({
          title: "Product Created Successfully",
        });
        router.push("/admin/products"); // Chuyển hướng đến trang danh sách sản phẩm
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to create product: ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Category ID..." {...field} />
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
                    <Input type="number" placeholder="Age..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Origin</FormLabel>
                  <FormControl>
                    <Input placeholder="Origin..." {...field} />
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
                    <select {...field} className="w-full">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
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
                  <FormLabel>Size (cm)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Size..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Breed</FormLabel>
                  <FormControl>
                    <Input placeholder="Breed..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personality</FormLabel>
                  <FormControl>
                    <Input placeholder="Personality..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dailyFeedAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Daily Feed Amount (grams)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Daily Feed Amount..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="screeningRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Screening Rate (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Screening Rate..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="healthStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Health Status</FormLabel>
                  <FormControl>
                    <Input placeholder="Health Status..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Image URL..." {...field} />
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
                    <Input type="number" placeholder="Price..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available</FormLabel>
                  <FormControl>
                    <Select {...field} className="w-full">
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </Select>
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
                    <select {...field} className="w-full">
                      <option value="Available">Available</option>
                      <option value="Sold">Sold</option>
                      <option value="Pending">Pending</option>
                      <option value="Not for Sale">Not for Sale</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isImportedPurebred"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is Imported Purebred?</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full">
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isF1Hybrid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is F1 Hybrid?</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full">
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPureVietnamese"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is Pure Vietnamese?</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full">
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
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
            Create Product
          </Button>
        </form>
      </div>
    </Form>
  );
}
