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

import { updateCategory } from "@/apis/category";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  TUpdateCategoryRequest,
  CategoryUpdateSchema,
} from "@/schema/category.schema";
import { useRouter } from "next/navigation";

interface FormUpdateCategoryProps extends React.HTMLAttributes<HTMLDivElement> {
  initialData: TUpdateCategoryRequest;
}

export function FormUpdateCategory({
  className,
  initialData,
  ...props
}: FormUpdateCategoryProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<TUpdateCategoryRequest>({
    resolver: zodResolver(CategoryUpdateSchema),
    defaultValues: initialData,
  });

  console.log("initialData", initialData);
  const onSubmit = async (data: TUpdateCategoryRequest) => {
    // console.log(data);
    setIsLoading(true);
    try {
      const response = await updateCategory(data._id, data);
      if (response.status === 200) {
        toast({
          title: "Cập Nhật Thành Công",
        });
        router.push("/admin/categories");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update category: ${error}`,
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
                    <Input placeholder="Name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Update
          </Button>
        </form>
      </div>
    </Form>
  );
}
