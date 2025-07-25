import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, parseAndRound } from "@/utils/formatters";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export function SectionCards({ report, loading }) {
  if (loading) {
    return (
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Pendapatan</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              <Skeleton className="h-10 w-10/12" />
            </CardTitle>
            <CardAction>
              <Skeleton className="h-6 w-20" />
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <Skeleton className="h-4 w-8/12" />
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Pengeluaran</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              <Skeleton className="h-10 w-10/12" />
            </CardTitle>
            <CardAction>
              <Skeleton className="h-6 w-20" />
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <Skeleton className="h-4 w-8/12" />
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Laba</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              <Skeleton className="h-10 w-10/12" />
            </CardTitle>
            <CardAction>
              <Skeleton className="h-6 w-20" />
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <Skeleton className="h-4 w-8/12" />
          </CardFooter>
        </Card>
      </div>
    );
  }
  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      <Card className="@container/card hover:shadow-md transition-shadow">
        <CardHeader>
          <CardDescription>Total Pendapatan</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{formatCurrency(report.total_sales)}</CardTitle>
          <CardAction>
            <Badge variant="outline">
              {report.growth_sales >= 0 ? <TrendingUp /> : <TrendingDown />}
              {report.growth_sales >= 0 ? "+" : ""}
              {parseAndRound(report.growth_sales, 0)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {report.growth_sales >= 0 ? (
            <div className="line-clamp-1 flex gap-2 font-medium text-green-600">
              Penjualan naik +{parseAndRound(report.growth_sales, 0)}% pada bulan ini <TrendingUp className="size-4" />
            </div>
          ) : (
            <div className="line-clamp-1 flex gap-2 font-medium text-red-600">
              Turun {parseAndRound(report.growth_sales, 0)}% pada bulan ini
              <TrendingDown className="size-4" />
            </div>
          )}
        </CardFooter>
      </Card>

      <Card className="@container/card hover:shadow-md transition-shadow">
        <CardHeader>
          <CardDescription>Total Pengeluaran</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{formatCurrency(report.total_expenses)}</CardTitle>
          <CardAction>
            <Badge variant="outline">
              {report.growth_expenses >= 0 ? <TrendingUp /> : <TrendingDown />}
              {report.growth_expenses >= 0 ? "+" : ""}
              {parseAndRound(report.growth_expenses, 0)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {report.growth_expenses >= 0 ? (
            <div className="line-clamp-1 flex gap-2 font-medium text-red-600">
              Pengeluaran naik +{parseAndRound(report.growth_expenses, 0)}% pada bulan ini
              <TrendingUp className="size-4" />
            </div>
          ) : (
            <div className="line-clamp-1 flex gap-2 font-medium text-green-600">
              Pengeluaran turun {parseAndRound(report.growth_expenses, 0)}% pada bulan ini
              <TrendingDown className="size-4" />
            </div>
          )}
        </CardFooter>
      </Card>

      <Card className="@container/card hover:shadow-md transition-shadow">
        <CardHeader>
          <CardDescription>Total Laba</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{formatCurrency(report.total_profit)}</CardTitle>
          <CardAction>
            <Badge variant="outline">
              {report.growth_profit >= 0 ? <TrendingUp /> : <TrendingDown />}
              {report.growth_profit >= 0 ? "+" : ""}
              {parseAndRound(report.growth_profit, 0)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {report.growth_profit >= 0 ? (
            <div className="line-clamp-1 flex gap-2 font-medium text-green-600">
              Laba naik +{parseAndRound(report.growth_profit, 0)}% pada bulan ini
              <TrendingUp className="size-4" />
            </div>
          ) : (
            <div className="line-clamp-1 flex gap-2 font-medium text-red-600">
              Laba turun {parseAndRound(report.growth_profit, 0)}% pada bulan ini
              <TrendingDown className="size-4" />
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
