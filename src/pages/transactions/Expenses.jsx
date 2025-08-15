import React, {useRef} from "react";
import {Upload, Plus, RefreshCw} from "lucide-react";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList} from "@/components/ui/breadcrumb";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {toast} from "sonner";
import MainLayout from "@/layouts/Main";
import {useExpenses} from "@/hooks/useExpenses";
import ExpensesSummary from "@/components/ExpensesSummary";
import ExpensesFilter from "@/components/ExpensesFilter";
import ExpensesPagination from "@/components/ExpensesPagination";
import {formatCurrency, formatDate, formatDecimalSmart} from "@/utils/formatters";
import ExpensesTable from "@/components/ExpensesTabel";

const Expenses = () => {
    const {
        expenses,
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
        selectedExpenses,
        dialogOpen,
        isDeleteDialogOpen,
        setDialogOpen,
        setIsDeleteDialogOpen,
    } = useExpenses();

    const tableContainerRef = useRef(null);

    const breadcrumb = (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink>Biaya</BreadcrumbLink>
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

                {/* Expenses Summary */}
                <ExpensesSummary pagination={pagination} filters={filters} loading={loading}/>

                {/* Expenses Filter */}
                <ExpensesFilter filters={filters} onFilterChange={handleFilterChange} onClearFilters={clearFilters}/>

                {/* Expenses Table */}
                <div ref={tableContainerRef}>
                    <ExpensesTable expenses={expenses} loading={loading} onSort={handleSort} filters={filters}
                                   pagination={pagination} onDelete={handleDelete} onView={handleView}/>
                </div>

                {/* Pagination */}
                <ExpensesPagination pagination={pagination} onPageChange={handlePageChange}
                                    onLimitChange={handleLimitChange}/>

                {/* Dialog View Data */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Detail Biaya</DialogTitle>
                            <DialogDescription>Informasi lengkap transaksi biaya</DialogDescription>
                        </DialogHeader>

                        {selectedExpenses ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm table-auto border-separate border-spacing-y-2">
                                    <tbody>
                                    <tr>
                                        <td className="font-medium">Tanggal</td>
                                        <td>:</td>
                                        <td>{formatDate(selectedExpenses.date)}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium w-1/3">Nama</td>
                                        <td className="w-4">:</td>
                                        <td>{selectedExpenses.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Quantity</td>
                                        <td>:</td>
                                        <td>
                                            {formatDecimalSmart(selectedExpenses.quantity)} {selectedExpenses.unit}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Ongkir</td>
                                        <td>:</td>
                                        <td>{formatCurrency(selectedExpenses.shipping_cost)}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Diskon</td>
                                        <td>:</td>
                                        <td>{formatCurrency(selectedExpenses.discount)}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Haga per Unit</td>
                                        <td>:</td>
                                        <td>{formatCurrency(selectedExpenses.price_per_unit)}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Total Harga</td>
                                        <td>:</td>
                                        <td>{formatCurrency(selectedExpenses.total_price)}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Keterangan</td>
                                        <td>:</td>
                                        {selectedExpenses.note == null ? <td>-</td> : <td>{selectedExpenses.note}</td>}
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Dibuat oleh</td>
                                        <td>:</td>
                                        <td>{selectedExpenses.created_by}</td>
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

export default Expenses;
