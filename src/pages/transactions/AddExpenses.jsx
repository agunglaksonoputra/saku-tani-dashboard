import React from "react";
import MainLayout from "../../layouts/Main";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import AddExpensesForm from "@/components/AddExpensesForm";

const AddExpenses = () => {
  const breadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/biaya">Biaya</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>Form</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  return (
    <MainLayout header={breadcrumb}>
      <h1 className="scroll-m-20 text-left text-4xl font-medium tracking-tight text-balance">Form Biaya</h1>
      <Card>
        <CardContent>
          <AddExpensesForm />
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default AddExpenses;
