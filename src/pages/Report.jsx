import React, { useRef } from "react";
import { RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import MainLayout from "@/layouts/Main";
import ReportTable from "@/components/ReportTabel";
import { useReport } from "@/hooks/useReport";

const Report = () => {
  const { report, loading, refreshData, handleExport } = useReport();

  const tableContainerRef = useRef(null);

  const breadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>Laporan</BreadcrumbLink>
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
            <Button variant="default" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div ref={tableContainerRef}>
          <ReportTable report={report} loading={loading} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Report;
