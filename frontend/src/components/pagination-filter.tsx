"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useUrlParamChange } from "@/hooks/url"; // Import your custom hook

type PaginationProps = {
  totalPage: number;
  page: number;
};

const PaginationFilter = ({ totalPage, page }: PaginationProps) => {
  const { updateUrlParams } = useUrlParamChange(); // Your custom hook for URL params
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = {
      page: newPage, // Update to the new page
    };
    updateUrlParams(params); // Call your function to update the URL
  };

  // Generate pagination items based on totalPage
  const generatePaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={i === page}
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Prevent default link behavior
              handlePageChange(i); // Call the page change function
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handlePageChange(Math.max(page - 1, 1))}
          />
        </PaginationItem>
        {generatePaginationItems()}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => handlePageChange(Math.min(page + 1, totalPage))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationFilter;
