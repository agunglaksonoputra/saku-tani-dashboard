// components/SalesTable.js
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Trash2, Eye } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

const SalesTable = ({ sales, loading, pagination, onDelete, onView }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDecimalSmart = (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    return num % 1 === 0 ? num.toString() : num.toString();
  };

  const formatWeight = (weight) => {
    return `${formatDecimalSmart(weight)} kg`;
  };

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (loading) {
    return (
      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-16">No</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Sayuran</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Berat</TableHead>
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
            <TableHead>Pelanggan</TableHead>
            <TableHead>Sayuran</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total Berat</TableHead>
            <TableHead>Total Harga</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead className="w-32">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                Tidak ada data penjualan
              </TableCell>
            </TableRow>
          ) : (
            sales.map((sale, index) => (
              <TableRow key={sale.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{(pagination.page - 1) * pagination.limit + index + 1}</TableCell>
                <TableCell>
                  <div className="font-medium">{sale.customer}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {capitalizeFirst(sale.item_name)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">{sale.unit}</span>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{formatDecimalSmart(sale.quantity)}</span>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-blue-600">{formatWeight(sale.total_weight_kg)}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-green-600">{formatCurrency(sale.total_price)}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{formatDate(sale.date)}</div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(sale.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Lihat Detail
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem onClick={() => onEdit(sale.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem> */}
                      <DropdownMenuItem onClick={() => onDelete(sale.id)} className="text-red-600">
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

export default SalesTable;
