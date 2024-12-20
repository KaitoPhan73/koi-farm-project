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
import { TProductRequest, ProductSchema } from "@/schema/product.schema"; // Make sure you define a schema for creating a product
import { createProduct } from "@/apis/product"; // Ensure you have an API function for creating a product
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { listStatus } from "./config";
import { TCategoryResponse } from "@/schema/category.schema";
import { CldUploadWidget } from "next-cloudinary";
import { DialogImg } from "@/components/dialog-img";

interface FormCreateProductProps {
  categories: TCategoryResponse[]; // Category list for selection
}

export function FormCreateProduct({ categories }: FormCreateProductProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<TProductRequest>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      category: "",
      age: 0,
      origin: "",
      gender: "Male", // Default value if needed
      size: "S",
      breed: "",
      personality: "",
      dailyFeedAmount: 0,
      screeningRate: 0,
      healthStatus: "",
      imageUrl: "",
      price: 0,
      status: "Available", // Default value if needed
    },
  });

  const onSubmit = async (data: TProductRequest) => {
    setIsLoading(true);
    try {
      const response = await createProduct(data); // Call the create API
      if (response.status === 201) {
        toast({
          title: "Product Created Successfully",
        });
        router.push("/admin/products");
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
      <div className="grid gap-6">
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((item, index) => (
                          <SelectItem key={index} value={item._id}>
                            {item.name}
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
                  <FormLabel>Upload Image</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <CldUploadWidget
                        signatureEndpoint="/api/sign-image"
                        onSuccess={(result: any) => {
                          field.onChange(result?.info.url);
                        }}
                      >
                        {({ open }) => (
                          <Button
                            type="button"
                            className="w-1/2"
                            onClick={() => open()}
                          >
                            Choose Image
                          </Button>
                        )}
                      </CldUploadWidget>
                      {field.value && (
                        <div className="w-1/2">
                          <DialogImg imgURL={field.value} />
                        </div>
                      )}
                    </div>
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
            Create Product
          </Button>
        </form>
      </div>
    </Form>
  );
}
