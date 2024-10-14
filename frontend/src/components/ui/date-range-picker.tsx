"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format, parseISO } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialFromDate = searchParams.get("fromDate")
    ? parseISO(searchParams.get("fromDate") as string)
    : undefined;
  const initialToDate = searchParams?.get("toDate")
    ? parseISO(searchParams.get("toDate") as string)
    : undefined;

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: initialFromDate,
    to: initialToDate,
  });

  // Hàm xử lý thay đổi khi người dùng chọn ngày
  const handleDateChange = (selectedDate: DateRange | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      const params = new URLSearchParams(searchParams);

      if (!selectedDate.from || !selectedDate.to) {
        params.delete("fromDate");
        params.delete("toDate");
      } else {
        params.set("fromDate", format(selectedDate.from, "yyyy-MM-dd"));
        params.set("toDate", format(selectedDate.to, "yyyy-MM-dd"));
      }

      // Thay đổi URL và cập nhật trang
      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Chọn ngày</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
