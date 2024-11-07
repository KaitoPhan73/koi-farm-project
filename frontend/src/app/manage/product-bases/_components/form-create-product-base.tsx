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
  TProductBaseRequest,
  ProductBaseSchema,
} from "@/schema/product-base.schema";
import { TCategoryResponse } from "@/schema/category.schema";
import { createProductBase } from "@/apis/product-base";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { DialogImg } from "@/components/dialog-img";

interface FormCreateProductBaseProps {
  categories: TCategoryResponse[];
}

export function FormCreateProductBase({
  categories,
}: FormCreateProductBaseProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<TProductBaseRequest>({
    resolver: zodResolver(ProductBaseSchema),
    defaultValues: {
      name: "",
      category: "",
      breed: "",
      origin: "",
      personality: "",
      imageUrl: "",
      basePrice: 0,
    },
  });

  const onSubmit = async (data: TProductBaseRequest) => {
    setIsLoading(true);
    try {
      const response = await createProductBase(data);
      if (response.status === 201) {
        toast({
          title: "Product Base Created Successfully",
        });
        router.push("/manage/product-bases");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to create product base: ${error}`,
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
                    <Input placeholder="Product name..." {...field} />
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
                        {categories.map((item) => (
                          <SelectItem key={item._id} value={item._id}>
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
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Image</FormLabel>
                  <FormControl>
                    <div>
                      <CldUploadWidget
                        signatureEndpoint="/api/sign-image"
                        onSuccess={(result: any) => {
                          field.onChange(result?.info.url);
                        }}
                      >
                        {({ open }) => (
                          <Button
                            type="button"
                            className="w-full"
                            onClick={() => open()}
                          >
                            Choose Image
                          </Button>
                        )}
                      </CldUploadWidget>
                      {field.value && (
                        <div className="relative mt-4">
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
              name="basePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Base price..."
                      {...field}
                      min={1}
                    />
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
            Create Product Base
          </Button>
        </form>
      </div>
    </Form>
  );
}
