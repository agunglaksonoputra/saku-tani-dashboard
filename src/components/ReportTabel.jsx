import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrencyWithoutSymbol, formatMonthYear } from "@/utils/formatters";

const ReportTable = ({ report, loading }) => {
  if (loading) {
    return (
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            {/* Baris 1: Header utama */}
            <TableRow className="bg-gray-50">
              <TableHead rowSpan={2} className="text-center">
                No
              </TableHead>
              <TableHead rowSpan={2} className="text-center">
                Bulan
              </TableHead>
              <TableHead rowSpan={2} className="text-center">
                Penjualan
              </TableHead>
              <TableHead rowSpan={2} className="text-center">
                Pengeluaran
              </TableHead>
              <TableHead rowSpan={2} className="text-center">
                Laba
              </TableHead>
              <TableHead colSpan={3} className="text-center">
                Bagi Hasil (%)
              </TableHead>
              <TableHead colSpan={3} className="text-center">
                Pembayaran Bagi Hasil
              </TableHead>
              <TableHead colSpan={3} className="text-center">
                Saldo Bagi Hasil
              </TableHead>
              {/* <TableHead rowSpan={2} className="w-32">Action</TableHead> */}
            </TableRow>

            {/* Baris 2: Sub-header */}
            <TableRow className="bg-gray-50">
              <TableHead className="text-center">Zakat (10%)</TableHead>
              <TableHead className="text-center">Joko (45%)</TableHead>
              <TableHead className="text-center">Pardi (45%)</TableHead>
              <TableHead className="text-center">Zakat</TableHead>
              <TableHead className="text-center">Joko</TableHead>
              <TableHead className="text-center">Pardi</TableHead>
              <TableHead className="text-center">Zakat</TableHead>
              <TableHead className="text-center">Joko</TableHead>
              <TableHead className="text-center">Pardi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(10)].map((_, i) => (
              <TableRow key={i}>
                {[...Array(14)].map((_, j) => (
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
          {/* Baris 1: Header utama */}
          <TableRow className="bg-gray-50">
            <TableHead rowSpan={2} className="text-center">
              No
            </TableHead>
            <TableHead rowSpan={2} className="text-center">
              Bulan
            </TableHead>
            <TableHead rowSpan={2} className="text-center">
              Penjualan
            </TableHead>
            <TableHead rowSpan={2} className="text-center">
              Pengeluaran
            </TableHead>
            <TableHead rowSpan={2} className="text-center">
              Laba
            </TableHead>
            <TableHead colSpan={3} className="text-center">
              Bagi Hasil (%)
            </TableHead>
            <TableHead colSpan={3} className="text-center">
              Pembayaran Bagi Hasil
            </TableHead>
            <TableHead colSpan={3} className="text-center">
              Saldo Bagi Hasil
            </TableHead>
            {/* <TableHead rowSpan={2} className="w-32">Action</TableHead> */}
          </TableRow>

          {/* Baris 2: Sub-header */}
          <TableRow className="bg-gray-50">
            <TableHead className="text-center">Zakat (10%)</TableHead>
            <TableHead className="text-center">Joko (45%)</TableHead>
            <TableHead className="text-center">Pardi (45%)</TableHead>
            <TableHead className="text-center">Zakat</TableHead>
            <TableHead className="text-center">Joko</TableHead>
            <TableHead className="text-center">Pardi</TableHead>
            <TableHead className="text-center">Zakat</TableHead>
            <TableHead className="text-center">Joko</TableHead>
            <TableHead className="text-center">Pardi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {report.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                Tidak ada data penjualan
              </TableCell>
            </TableRow>
          ) : (
            report.map((report, index) => (
              <TableRow key={report.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div className="font-medium text-center">{formatMonthYear(report.date)}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-right">{formatCurrencyWithoutSymbol(report.total_sales)}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-right">{formatCurrencyWithoutSymbol(report.total_expenses)}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-right">{formatCurrencyWithoutSymbol(report.total_profit)}</div>
                </TableCell>
                {report.profitshare.map((item) => (
                  <TableCell key={item.id}>
                    <div className="font-medium text-right">{formatCurrencyWithoutSymbol(item.amount)}</div>
                  </TableCell>
                ))}
                {[1, 2, 3].map((ownerId) => {
                  const item = report.withdraw?.find((w) => w.owner_id === ownerId) || { amount: 0 };
                  return (
                    <TableCell key={ownerId}>
                      <div className="font-medium text-right">{formatCurrencyWithoutSymbol(item.amount)}</div>
                    </TableCell>
                  );
                })}

                {[1, 2, 3].map((ownerId) => {
                  const item = report.balance?.find((b) => b.owner_id === ownerId) || { balance: 0 };
                  return (
                    <TableCell key={ownerId}>
                      <div className="font-medium text-right">{formatCurrencyWithoutSymbol(item.balance)}</div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReportTable;
