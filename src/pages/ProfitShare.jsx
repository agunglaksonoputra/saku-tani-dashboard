import React, { useRef } from "react";
import MainLayout from "@/layouts/Main";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, RefreshCw } from "lucide-react";
import { useProfitShare } from "@/hooks/useProfitShare";
import ProfitShareTable from "../components/ProfitShareTabel";
import OwnerBalanceSummary from "@/components/OwnerSumamry";
import AddWithdrawForm from "@/components/AddWithdrawForm";

const ProfitShare = () => {
  const { profitShare, ownerBalance, loading, isModalFormOpen, isDeleteDialogOpen, refreshData, setIsModalFormOpen, handleDelete, confirmDelete, setIsDeleteDialogOpen } = useProfitShare();

  const tableContainerRef = useRef(null);

  const breadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>Bagi Hasil</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  return (
    <MainLayout header={breadcrumb}>
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={refreshData} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="success" size="sm" onClick={() => setIsModalFormOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah
            </Button>
          </div>
        </div>

        {/* Sales Summary */}
        <OwnerBalanceSummary ownerBalance={ownerBalance} />

        {/* ProfitShare Table */}
        <div ref={tableContainerRef}>
          <ProfitShareTable profitShare={profitShare} loading={loading} onDelete={handleDelete} />
        </div>
      </div>

      <AddWithdrawForm open={isModalFormOpen} onOpenChange={setIsModalFormOpen} />

      {/* Dialog Delete */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Data Transaksi</DialogTitle>
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
    </MainLayout>
  );
};

export default ProfitShare;
