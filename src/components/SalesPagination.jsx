// components/SalesPagination.js
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const SalesPagination = ({ pagination, onPageChange, onLimitChange }) => {
  const { page, limit, total } = pagination;
  const totalPages = Math.ceil(total / limit);

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, page - Math.floor(maxVisiblePages / 2));
      let end = start + maxVisiblePages - 1;

      if (end > totalPages) {
        end = totalPages;
        start = end - maxVisiblePages + 1;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between px-2 py-4">
      {/* Items per page selector */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Tampilkan</span>
        <Select value={limit.toString()} onValueChange={(value) => onLimitChange(parseInt(value))}>
          <SelectTrigger className="w-fit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="25">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-gray-700">data per halaman</span>
      </div>

      {/* Page info */}
      <div className="flex items-center space-x-6">
        <div className="text-sm text-gray-700">
          Menampilkan {startItem} - {endItem} dari {total} data
        </div>

        {/* Pagination controls */}
        <div className="flex items-center space-x-2">
          {/* First page */}
          <Button variant="outline" size="sm" onClick={() => onPageChange(1)} disabled={page === 1} className="h-8 w-8 p-0">
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          {/* Previous page */}
          <Button variant="outline" size="sm" onClick={() => onPageChange(page - 1)} disabled={page === 1} className="h-8 w-8 p-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page numbers */}
          {pageNumbers.map((pageNum, index) => (
            <React.Fragment key={index}>
              {pageNum === "..." ? (
                <span className="px-2 py-1 text-gray-500">...</span>
              ) : (
                <Button variant={pageNum === page ? "default" : "outline"} size="sm" onClick={() => onPageChange(pageNum)} className="h-8 w-8 p-0">
                  {pageNum}
                </Button>
              )}
            </React.Fragment>
          ))}

          {/* Next page */}
          <Button variant="outline" size="sm" onClick={() => onPageChange(page + 1)} disabled={page === totalPages} className="h-8 w-8 p-0">
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Last page */}
          <Button variant="outline" size="sm" onClick={() => onPageChange(totalPages)} disabled={page === totalPages} className="h-8 w-8 p-0">
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalesPagination;
