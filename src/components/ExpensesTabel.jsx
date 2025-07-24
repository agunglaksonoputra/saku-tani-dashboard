// components/SalesTable.js
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye, Trash2Icon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatDate, formatDecimalSmart } from "@/utils/formatters";
import { isMoreThan3Days } from "@/utils/dateUtils";

const ExpensesTable = ({ expenses, loading, pagination, onDelete, onView }) => {
  if (loading) {
    return (
      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-16">No</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Harga</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="w-32">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(pagination.limit)].map((_, i) => (
              <TableRow key={i}>
                {Array(9)
                  .fill()
                  .map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-8 w-full" />
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-16">No</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total Harga</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead className="w-32">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                Tidak ada data biaya
              </TableCell>
            </TableRow>
          ) : (
            expenses.map((expense, index) => (
              <TableRow key={expense.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{(pagination.page - 1) * pagination.limit + index + 1}</TableCell>
                <TableCell>
                  <div className="font-medium">{expense.name}</div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">{expense.unit}</span>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{formatDecimalSmart(expense.quantity)}</span>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-orange-600">{formatCurrency(expense.total_price)}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{formatDate(expense.date)}</div>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="success" onClick={() => onView(expense.id)}>
                        <Eye />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View</p>
                    </TooltipContent>
                  </Tooltip>
                  {isMoreThan3Days(expense.date) ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="secondary" disabled>
                          <Trash2Icon />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Tidak bisa dihapus (lebih dari 3 hari)</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="destructive" onClick={() => onDelete(expense.id)}>
                          <Trash2Icon />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Hapus</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpensesTable;
