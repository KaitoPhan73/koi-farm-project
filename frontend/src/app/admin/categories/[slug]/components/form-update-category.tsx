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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UpdateCategorySchema,
  TUpdateCategoryRequest,
} from "@/schema/category.schema";
import { updateCategory } from "@/api/category";
import { ReloadIcon } from "@radix-ui/react-icons";
import { statusCategory } from "../../_components/config";

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
  const form = useForm<TUpdateCategoryRequest>({
    resolver: zodResolver(UpdateCategorySchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: TUpdateCategoryRequest) => {
    // console.log(data);
    setIsLoading(true);
    try {
      const response = await updateCategory(data);
      if (response.status === 200) {
        toast({
          title: "Cập Nhật Thành Công",
        });
        // Redirect hoặc refresh trang nếu cần
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
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên..." {...field} />
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
                  <FormLabel>Mô Tả</FormLabel>
                  <FormControl>
                    <Input placeholder="Mô Tả..." {...field} />
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormLabel>Trạng thái</FormLabel>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusCategory.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Câp Nhật
          </Button>
        </form>
      </div>
    </Form>
  );
}
