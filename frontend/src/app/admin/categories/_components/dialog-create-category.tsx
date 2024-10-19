import { createCategory } from "@/api/category";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
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
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  CreateCategorySchema,
  TCreateCategoryRequest,
} from "@/schema/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { statusCategory } from "./config";
type Props = {
  className?: string;
};
export function DialogCreateCategory({ className }: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  const form = useForm<TCreateCategoryRequest>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      categoryName: "",
      description: "",
      status: "ACTIVE",
    },
  });

  const onSubmit = async (data: TCreateCategoryRequest) => {
    setIsLoading(true);
    try {
      const response = await createCategory(data);
      if (response.status === 200) {
        toast({
          title: "Tạo phân loại thành công",
        });
      }
      setOpen(false);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: `Lỗi khi tạo phân loại: ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className={className}>
        <Button variant="default">Tạo Phân Loại</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tạo Phân Loại</DialogTitle>
          <DialogDescription>Tạo phân loại mới</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <div className="grid gap-4 py-4">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 mb-2">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="categoryName" className="text-right">
                    Tên
                  </Label>
                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="categoryName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Tên..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="categoryName" className="text-right">
                    Mô tả
                  </Label>
                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Mô tả..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="categoryName" className="text-right">
                    Trạng thái
                  </Label>
                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
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
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Tạo
                </Button>
              </DialogFooter>
            </form>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
