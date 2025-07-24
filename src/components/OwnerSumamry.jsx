import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

const OwnerBalanceSummary = ({ ownerBalance }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {ownerBalance.map((ownerBalance, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm font-medium text-gray-600">{ownerBalance.name}</CardTitle>
              <CardDescription className="italic">Saldo Tersedia</CardDescription>
            </div>
            <div className={`p-2 rounded-full bg-green-50`}>
              <User className={`h-4 w-4 text-green-600`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold text-green-600`}>{formatCurrency(ownerBalance.balance)}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OwnerBalanceSummary;
