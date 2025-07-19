import React from "react";
import MainLayout from "../../layouts/Main";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import AddSalesForm from "@/components/AddSalesForm";
import { Card, CardContent } from "@/components/ui/card";

const AddSales = () => {
  const breadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/penjualan">Penjualan</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>Tambah</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  return (
    <MainLayout header={breadcrumb}>
      <h1 className="scroll-m-20 text-left text-4xl font-medium tracking-tight text-balance">Form Penjualan</h1>
      <Card>
        <CardContent>
          <AddSalesForm />
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default AddSales;
