import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Filter, X } from "lucide-react";
import { formatDateISO } from "@/utils/formatters";

const ExpensesFilter = ({ filters, onFilterChange, onClearFilters }) => {
  const handleInputChange = (field, value) => {
    onFilterChange({ [field]: value });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter Penjualan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Date From Filter */}
          <div className="flex flex-col gap-2 w-fit">
            <label className="text-sm font-medium">Tanggal Mulai</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input type="date" value={formatDateISO(filters.startDate)} onChange={(e) => handleInputChange("startDate", e.target.value)} className="pl-10 cursor-pointer" />
            </div>
          </div>

          {/* Date To Filter */}
          <div className="flex flex-col gap-2 w-fit">
            <label className="text-sm font-medium">Tanggal Akhir</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input type="date" value={formatDateISO(filters.endDate)} onChange={(e) => handleInputChange("endDate", e.target.value)} className="pl-10 cursor-pointer" />
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="flex items-end">
            <Button variant="outline" onClick={onClearFilters}>
              <X className="w-4 h-4 mr-2" />
              Reset Filter
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesFilter;
