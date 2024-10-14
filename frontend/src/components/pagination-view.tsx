"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { useUrlParamChange } from "@/hooks/url";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
type PaginationViewProps = {
  pageCount: number; // Tổng số trang
  currentPage: number; // Trang hiện tại
  className?: string;
};

export function PaginationView({
  pageCount,
  currentPage,
  className,
}: PaginationViewProps) {
  const { updateUrlParam } = useUrlParamChange();
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });
  const handlePageChange = (newPageIndex: number) => {
    updateUrlParam("page", newPageIndex.toString());
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const showPagesBeforeCurrent = currentPage > 3;
    const showPagesAfterCurrent = currentPage < pageCount - 2;

    // Trang đầu và dấu chấm lửng
    if (showPagesBeforeCurrent && currentPage > 4) {
      pageNumbers.push(
        <PaginationItem key="page-1">
          <Button
            variant="outline"
            className="h-10 w-10 p-0 rounded-full text-xs sm:text-sm md:text-base lg:text-lg"
            onClick={() => handlePageChange(1)}
          >
            {1}
          </Button>
        </PaginationItem>
        // <PaginationItem key="ellipsis-start">
        //   <PaginationEllipsis />
        // </PaginationItem>
      );
    }

    // Trang xung quanh trang hiện tại (responsive)
    const range = !isDesktop ? 1 : 2;
    for (
      let i = Math.max(currentPage - range, 1);
      i <= Math.min(currentPage + range, pageCount);
      i++
    ) {
      pageNumbers.push(
        <PaginationItem key={`page-${i}`}>
          <Button
            variant="outline"
            className={`h-10 w-10 p-0 rounded-full text-xs sm:text-sm md:text-base lg:text-lg ${
              i === currentPage ? "bg-[#CDA274] text-white" : "ghost"
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Button>
        </PaginationItem>
      );
    }

    // Trang cuối và dấu chấm lửng
    if (showPagesAfterCurrent && currentPage < pageCount - 3) {
      pageNumbers.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>,
        <PaginationItem key={`page-${pageCount}`}>
          <Button
            variant="outline"
            className={`h-10 w-10 p-0 rounded-full text-xs sm:text-sm md:text-base lg:text-lg ${
              pageCount === currentPage ? "bg-[#CDA274] text-white" : "ghost"
            }`}
            onClick={() => handlePageChange(pageCount)}
          >
            {pageCount}
          </Button>
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="outline"
            className="h-10 w-10 p-0 rounded-full text-xs sm:text-sm md:text-base lg:text-lg"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <Button
            variant="outline"
            className="h-10 w-10 p-0 rounded-full text-xs sm:text-sm md:text-base lg:text-lg"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageCount}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
