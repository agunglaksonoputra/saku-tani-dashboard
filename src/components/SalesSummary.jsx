import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, Weight, DollarSign, Package } from "lucide-react";
import { formatCurrency, formatWeight } from "@/utils/formatters";

const SalesSummary = ({ pagination, filters = {} }) => {
  const { totalPrice, totalWeightKg, avgPricePerTransaction, totalFilter } = pagination;

  const hasActiveFilters = Object.values(filters).some((v) => v !== "" && v !== null && v !== undefined);

  const summaryCards = [
    {
      title: "Total Transaksi",
      description: hasActiveFilters ? undefined : "Bulan ini",
      value: totalFilter.toLocaleString("id-ID"),
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Pendapatan",
      description: hasActiveFilters ? undefined : "Bulan ini",
      value: formatCurrency(totalPrice),
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Berat",
      description: hasActiveFilters ? undefined : "Bulan ini",
      value: formatWeight(totalWeightKg),
      icon: Weight,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Rata-rata per Transaksi",
      description: hasActiveFilters ? undefined : "Bulan ini",
      value: formatCurrency(avgPricePerTransaction),
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {summaryCards.map((card, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm font-medium text-gray-600">{card.title}</CardTitle>
              {card.description ? <CardDescription className="italic">{card.description}</CardDescription> : <div className="h-5" />}
            </div>
            <div className={`p-2 rounded-full ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SalesSummary;
