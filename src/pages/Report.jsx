import React from "react";
import { Upload, Plus, RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import MainLayout from "@/layouts/Main";
import { Label } from "@/components/ui/label";

const Report = () => {
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
            <Button variant="outline" size="sm">
              <RefreshCw className={`w-4 h-4 mr-2`} />
              Refresh
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="default" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Report;
