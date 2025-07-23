import React from "react";
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
              <TableHead rowSpan={2} className="text-center border border-gray-200">
                No
              </TableHead>
              <TableHead rowSpan={2} className="text-center border border-gray-200">
                Bulan
              </TableHead>
              <TableHead rowSpan={2} className="text-center border border-gray-200">
                Penjualan
              </TableHead>
              <TableHead rowSpan={2} className="text-center border border-gray-200">
                Pengeluaran
              </TableHead>
              <TableHead rowSpan={2} className="text-center border border-gray-200">
                Laba
              </TableHead>
              <TableHead colSpan={3} className="text-center border border-gray-200">
                Bagi Hasil (%)
              </TableHead>
              <TableHead colSpan={3} className="text-center border border-gray-200">
                Pembayaran Bagi Hasil
              </TableHead>
              <TableHead colSpan={3} className="text-center border border-gray-200">
                Saldo Bagi Hasil
              </TableHead>
              {/* <TableHead rowSpan={2} className="w-32">Action</TableHead> */}
            </TableRow>

            {/* Baris 2: Sub-header */}
            <TableRow className="bg-gray-50">
              <TableHead className="text-center border border-gray-200">Zakat (10%)</TableHead>
              <TableHead className="text-center border border-gray-200">Joko (45%)</TableHead>
              <TableHead className="text-center border border-gray-200">Pardi (45%)</TableHead>
              <TableHead className="text-center border border-gray-200">Zakat</TableHead>
              <TableHead className="text-center border border-gray-200">Joko</TableHead>
              <TableHead className="text-center border border-gray-200">Pardi</TableHead>
              <TableHead className="text-center border border-gray-200">Zakat</TableHead>
              <TableHead className="text-center border border-gray-200">Joko</TableHead>
              <TableHead className="text-center border border-gray-200">Pardi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(10)].map((_, i) => (
              <TableRow key={i}>
                {[...Array(14)].map((_, j) => (
                  <TableCell key={j} className="border border-gray-200">
                    <Skeleton className="h-4 w-full" />
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
            <TableHead rowSpan={2} className="text-center border border-gray-200">
              No
            </TableHead>
            <TableHead rowSpan={2} className="text-center border border-gray-200">
              Bulan
            </TableHead>
            <TableHead rowSpan={2} className="text-center border border-gray-200">
              Penjualan
            </TableHead>
            <TableHead rowSpan={2} className="text-center border border-gray-200">
              Pengeluaran
            </TableHead>
            <TableHead rowSpan={2} className="text-center border border-gray-200">
              Laba
            </TableHead>
            <TableHead colSpan={3} className="text-center border border-gray-200">
              Bagi Hasil (%)
            </TableHead>
            <TableHead colSpan={3} className="text-center border border-gray-200">
              Pembayaran Bagi Hasil
            </TableHead>
            <TableHead colSpan={3} className="text-center border border-gray-200">
              Saldo Bagi Hasil
            </TableHead>
            {/* <TableHead rowSpan={2} className="w-32">Action</TableHead> */}
          </TableRow>

          {/* Baris 2: Sub-header */}
          <TableRow className="bg-gray-50">
            <TableHead className="text-center border border-gray-200">Zakat (10%)</TableHead>
            <TableHead className="text-center border border-gray-200">Joko (45%)</TableHead>
            <TableHead className="text-center border border-gray-200">Pardi (45%)</TableHead>
            <TableHead className="text-center border border-gray-200">Zakat</TableHead>
            <TableHead className="text-center border border-gray-200">Joko</TableHead>
            <TableHead className="text-center border border-gray-200">Pardi</TableHead>
            <TableHead className="text-center border border-gray-200">Zakat</TableHead>
            <TableHead className="text-center border border-gray-200">Joko</TableHead>
            <TableHead className="text-center border border-gray-200">Pardi</TableHead>
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
                <TableCell className="font-medium border border-gray-200">{index + 1}</TableCell>
                <TableCell className="border border-gray-200">
                  <div className="text-sm text-center">{formatMonthYear(report.date)}</div>
                </TableCell>
                <TableCell className="border border-gray-200">
                  <div className="text-sm text-gray-600 text-right">{formatCurrencyWithoutSymbol(report.total_sales)}</div>
                </TableCell>
                <TableCell className="border border-gray-200">
                  <div className="text-sm text-gray-600 text-right">{formatCurrencyWithoutSymbol(report.total_expenses)}</div>
                </TableCell>
                <TableCell className="border border-gray-200">
                  <div className="text-sm text-gray-600 text-right">{formatCurrencyWithoutSymbol(report.total_profit)}</div>
                </TableCell>
                {report.profitshare.map((item) => (
                  <TableCell key={item.id} className="border border-gray-200">
                    <div className="text-sm text-gray-600 text-right">{formatCurrencyWithoutSymbol(item.amount)}</div>
                  </TableCell>
                ))}
                {[1, 2, 3].map((ownerId) => {
                  const item = report.withdraw?.find((w) => w.owner_id === ownerId) || { amount: 0 };
                  return (
                    <TableCell key={ownerId} className="border border-gray-200">
                      <div className="text-sm text-gray-600 text-right">{formatCurrencyWithoutSymbol(item.amount)}</div>
                    </TableCell>
                  );
                })}

                {[1, 2, 3].map((ownerId) => {
                  const item = report.balance?.find((b) => b.owner_id === ownerId) || { balance: 0 };
                  return (
                    <TableCell key={ownerId} className="border border-gray-200">
                      <div className="text-sm text-gray-600 text-right">{formatCurrencyWithoutSymbol(item.balance)}</div>
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
