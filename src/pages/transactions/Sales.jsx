// pages/Sales.js
import React, { useState, useRef } from "react";
import MainLayout from "../../layouts/Main";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Plus, RefreshCw } from "lucide-react";
import { useSales } from "../../hooks/useSales";
import { salesService } from "../../services/salesService";
import SalesFilter from "../../components/SalesFilter";
import SalesTable from "../../components/SalesTable";
import SalesPagination from "../../components/SalesPagination";
import SalesSummary from "../../components/SalesSummary";

const Sales = () => {
  const { sales, loading, error, pagination, filters, handlePageChange, handleLimitChange, handleFilterChange, handleSort, clearFilters, refreshData } = useSales();

  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState(null);
  const tableContainerRef = useRef(null);

  const breadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>Penjualan</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImporting(true);
    setImportError(null);

    try {
      await salesService.importSales(file);
      refreshData();
      // Reset file input
      event.target.value = "";
    } catch (err) {
      setImportError(err.message || "Gagal mengimpor data");
    } finally {
      setImporting(false);
    }
  };

  const handleAdd = () => {
    // Navigate to add sales page
    // You can implement this with your router
    console.log("Navigate to add sales page");
  };

  const handleEdit = (id) => {
    // Navigate to edit sales page
    console.log("Navigate to edit sales page:", id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await salesService.deleteSale(id);
        refreshData();
      } catch (err) {
        console.error("Error deleting sale:", err);
        alert("Gagal menghapus data");
      }
    }
  };

  const handleView = (id) => {
    // Navigate to view sales detail page
    console.log("Navigate to view sales detail:", id);
  };

  return (
    <MainLayout header={breadcrumb}>
      <div className="space-y-6">
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Import Error Alert */}
        {importError && (
          <Alert variant="destructive">
            <AlertDescription>{importError}</AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={refreshData} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <input type="file" accept=".csv,.xlsx,.xls" onChange={handleImport} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={importing} />
              <Button variant="outline" size="sm" disabled={importing}>
                <Upload className="w-4 h-4 mr-2" />
                {importing ? "Importing..." : "Import"}
              </Button>
            </div>

            <Button variant="default" size="sm" onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah
            </Button>
          </div>
        </div>

        {/* Sales Summary */}
        <SalesSummary pagination={pagination} />

        {/* Sales Filter */}
        <SalesFilter filters={filters} onFilterChange={handleFilterChange} onClearFilters={clearFilters} />

        {/* Sales Table */}
        <div ref={tableContainerRef}>
          <SalesTable sales={sales} loading={loading} onSort={handleSort} filters={filters} pagination={pagination} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
        </div>

        {/* Pagination */}
        <SalesPagination pagination={pagination} onPageChange={handlePageChange} onLimitChange={handleLimitChange} />
        {/* {!loading && sales.length > 0 && <SalesPagination pagination={pagination} onPageChange={handlePageChange} onLimitChange={handleLimitChange} />} */}
      </div>
    </MainLayout>
  );
};

export default Sales;
