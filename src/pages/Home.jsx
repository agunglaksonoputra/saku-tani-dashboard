import React from "react";
import MainLayout from "@/layouts/Main";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SectionCards } from "@/components/section-card";
import { useDashboard } from "@/hooks/useDashboard";
import BasicBars from "@/components/MatrixPanel.jsx";

const Home = () => {
  const { report, reportMatrix, loading } = useDashboard();

  const breadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  return (
    <MainLayout header={breadcrumb}>
      <SectionCards report={report} loading={loading} />
      <BasicBars reportMatrix={reportMatrix} />
    </MainLayout>
  );
};

export default Home;
