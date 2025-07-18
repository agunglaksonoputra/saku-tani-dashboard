// components/SalesFilter.js
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, X, Calendar, Filter } from "lucide-react";
import { useCustomers, useItems } from "../hooks/useSales";

const SalesFilter = ({ filters, onFilterChange, onClearFilters }) => {
  const { customers } = useCustomers();
  const { items } = useItems();

  const handleInputChange = (field, value) => {
    onFilterChange({ [field]: value });
  };

  const handleSelectChange = (field, value) => {
    onFilterChange({ [field]: value });
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Customer Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Pelanggan</label>
            <Select value={filters.customer} onValueChange={(value) => handleSelectChange("customer", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih pelanggan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Pelanggan</SelectItem>
                {customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.name}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Item Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Sayuran</label>
            <Select value={filters.item_name} onValueChange={(value) => handleSelectChange("item_name", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih sayuran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem>Semua Sayuran</SelectItem>
                {items.map((item) => (
                  <SelectItem key={item.id || item.name} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date From Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tanggal Mulai</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input type="date" value={formatDate(filters.startDate)} onChange={(e) => handleInputChange("startDate", e.target.value)} className="pl-10 cursor-pointer" />
            </div>
          </div>

          {/* Date To Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tanggal Akhir</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input type="date" value={formatDate(filters.endDate)} onChange={(e) => handleInputChange("endDate", e.target.value)} className="pl-10" />
            </div>
          </div>

          {/* Sort Options */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Urutkan Berdasarkan</label>
            <Select value={filters.sort_by} onValueChange={(value) => handleSelectChange("sort_by", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Urutkan berdasarkan..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Tanggal</SelectItem>
                <SelectItem value="customer">Pelanggan</SelectItem>
                <SelectItem value="item_name">Sayuran</SelectItem>
                <SelectItem value="total_price">Total Harga</SelectItem>
                <SelectItem value="total_weight_kg">Total Berat</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Order */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Urutan</label>
            <Select value={filters.sort_order} onValueChange={(value) => handleSelectChange("sort_order", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
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

export default SalesFilter;
