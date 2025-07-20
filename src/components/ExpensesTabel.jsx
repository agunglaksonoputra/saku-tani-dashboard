// components/SalesTable.js
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Trash2, Eye } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatDate, formatDecimalSmart } from "@/utils/formatters";

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
                  <div className="font-medium text-green-600">{formatCurrency(expense.total_price)}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{formatDate(expense.date)}</div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(expense.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Lihat Detail
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem onClick={() => onEdit(sale.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem> */}
                      <DropdownMenuItem onClick={() => onDelete(expense.id)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
