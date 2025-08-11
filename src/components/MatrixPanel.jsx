import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Card, CardContent } from "@/components/ui/card";
import { formatMonthYearShort, formatCurrencyWithoutSymbol } from "@/utils/formatters";

export default function BasicBars({ reportMatrix }) {
  const labels = reportMatrix.map((item) => formatMonthYearShort(item.date)).reverse();

  const totalSales = reportMatrix.map((item) => Number(item.total_sales)).reverse();
  const totalExpenses = reportMatrix.map((item) => Number(item.total_expenses)).reverse();
  const totalProfit = reportMatrix.map((item) => Number(item.total_profit)).reverse();

  return (
    <Card>
      <CardContent>
        <BarChart
          xAxis={[{ data: labels }]}
          yAxis={[
            {
              valueFormatter: (value) => formatCurrencyWithoutSymbol(value),
              tickLabelStyle: { fontSize: 6 },
            },
          ]}
          series={[
            { label: "Penjualan", data: totalSales, color: "#22c55e" },
            { label: "Pengeluaran", data: totalExpenses, color: "#f43f5e" },
            { label: "Profit", data: totalProfit, color: "#3b82f6" },
          ]}
          margin={0}
          grid={{ horizontal: true }}
          height={350}
        />
      </CardContent>
    </Card>
  );
}
