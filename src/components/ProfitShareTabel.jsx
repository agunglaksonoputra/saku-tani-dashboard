import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, formatCurrency } from "@/utils/formatters";
import { isMoreThan3Days } from "@/utils/dateUtils";
import { Trash2Icon } from "lucide-react";

const ProfitShareTabel = ({ profitShare, loading, onDelete }) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-16">No</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Jumlah</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-32">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            [...Array(10)].map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={5}>
                  <Skeleton className="h-9" />
                </TableCell>
              </TableRow>
            ))
          ) : profitShare.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                Tidak ada data penjualan
              </TableCell>
            </TableRow>
          ) : (
            profitShare.map((item, index) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div className="font-medium">{item.name}</div>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-orange-600">{formatCurrency(item.amount)}</span>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{formatDate(item.date)}</div>
                </TableCell>
                <TableCell>
                  {isMoreThan3Days(item.date) ? (
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
                        <Button variant="destructive" onClick={() => onDelete(item.id)}>
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

export default ProfitShareTabel;
