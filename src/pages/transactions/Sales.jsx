import React, {useRef} from "react";
import {Upload, Plus, RefreshCw} from "lucide-react";
import MainLayout from "../../layouts/Main";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList} from "@/components/ui/breadcrumb";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";
import {formatCurrency, formatDate, formatDecimalSmart, formatWeight, capitalizeFirst} from "@/utils/formatters";
import {useSales} from "@/hooks/useSales";
import SalesFilter from "../../components/SalesFilter";
import SalesTable from "../../components/SalesTable";
import SalesPagination from "../../components/SalesPagination";
import SalesSummary from "../../components/SalesSummary";

const Sales = () => {
    const {
        sales,
        loading,
        pagination,
        filters,
        handlePageChange,
        handleLimitChange,
        handleFilterChange,
        handleSort,
        clearFilters,
        refreshData,
        handleAdd,
        handleView,
        handleDelete,
        confirmDelete,
        handleImport,
        importing,
        selectedSale,
        dialogOpen,
        isDeleteDialogOpen,
        setDialogOpen,
        setIsDeleteDialogOpen,
    } = useSales();

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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const isValidExtension = file.name.toLowerCase().endsWith(".xlsx");
        if (!isValidExtension) {
            toast.error("Silakan unggah file dengan format .xlsx");
            event.target.value = "";
            return;
        }

        handleImport(file);
        event.target.value = "";
    };

    return (
        <MainLayout header={breadcrumb}>
            <div className="space-y-6">
                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={refreshData} disabled={loading}>
                            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}/>
                            Refresh
                        </Button>
                    </div>

                    <div className="flex gap-2">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="file-upload">
                                <Button variant="outline" size="sm" disabled={importing} asChild>
                  <span>
                    <Upload className="w-4 h-4 mr-2"/>
                      {importing ? "Importing..." : "Import"}
                  </span>
                                </Button>
                            </Label>
                            <Input id="file-upload" type="file" accept=".xlsx" onChange={handleFileChange}
                                   disabled={importing} className="hidden"/>
                        </div>

                        <Button variant="success" size="sm" onClick={handleAdd}>
                            <Plus className="w-4 h-4 mr-2"/>
                            Tambah
                        </Button>
                    </div>
                </div>

                {/* Sales Summary */}
                <SalesSummary pagination={pagination} filters={filters} loading={loading}/>

                {/* Sales Filter */}
                <SalesFilter filters={filters} onFilterChange={handleFilterChange} onClearFilters={clearFilters}/>

                {/* Sales Table */}
                <div ref={tableContainerRef}>
                    <SalesTable sales={sales} loading={loading} onSort={handleSort} filters={filters}
                                pagination={pagination} onDelete={handleDelete} onView={handleView}/>
                </div>

                {/* Pagination */}
                <SalesPagination pagination={pagination} onPageChange={handlePageChange}
                                 onLimitChange={handleLimitChange}/>
                {/* {!loading && sales.length > 0 && <SalesPagination pagination={pagination} onPageChange={handlePageChange} onLimitChange={handleLimitChange} />} */}

                {/* Dialog View Data */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Detail Penjualan</DialogTitle>
                            <DialogDescription>Informasi lengkap transaksi penjualan</DialogDescription>
                        </DialogHeader>

                        {selectedSale ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm table-auto border-separate border-spacing-y-2">
                                    <tbody>
                                    <tr>
                                        <td className="font-medium w-1/3">Pelanggan</td>
                                        <td className="w-4">:</td>
                                        <td>{selectedSale.customer}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Sayuran</td>
                                        <td>:</td>
                                        <td>{capitalizeFirst(selectedSale.item_name)}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Quantity</td>
                                        <td>:</td>
                                        <td>
                                            {formatDecimalSmart(selectedSale.quantity)} {selectedSale.unit}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Berat per gram</td>
                                        <td>:</td>
                                        <td>{formatDecimalSmart(selectedSale.weight_per_unit_gram)} g</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Harga per satuan</td>
                                        <td>:</td>
                                        <td>{formatCurrency(selectedSale.price_per_unit)}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Total Berat</td>
                                        <td>:</td>
                                        <td>{formatWeight(selectedSale.total_weight_kg)}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Total Harga</td>
                                        <td>:</td>
                                        <td>{formatCurrency(selectedSale.total_price)}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Tanggal</td>
                                        <td>:</td>
                                        <td>{formatDate(selectedSale.date)}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Keterangan</td>
                                        <td>:</td>
                                        {selectedSale.note == null ? <td>-</td> : <td>{selectedSale.note}</td>}
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Dibuat oleh</td>
                                        <td>:</td>
                                        <td>{selectedSale.created_by}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div>Memuat data...</div>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Dialog Delete */}
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Hapus Data Penjualan</DialogTitle>
                        </DialogHeader>
                        <p>Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.</p>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                Batal
                            </Button>
                            <Button variant="destructive" onClick={confirmDelete}>
                                Hapus
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </MainLayout>
    );
};

export default Sales;
