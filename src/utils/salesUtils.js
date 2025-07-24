// utils/salesUtils.js
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatWeight = (weight) => {
  return `${parseFloat(weight).toFixed(2)} kg`;
};

export const capitalizeFirst = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const validateDateRange = (dateFrom, dateTo) => {
  if (!dateFrom || !dateTo) return true;
  return new Date(dateFrom) <= new Date(dateTo);
};

export const generateSalesReport = (sales) => {
  if (!sales || sales.length === 0) return null;

  const report = {
    totalTransactions: sales.length,
    totalRevenue: sales.reduce((sum, sale) => sum + parseFloat(sale.total_price), 0),
    totalWeight: sales.reduce((sum, sale) => sum + parseFloat(sale.total_weight_kg), 0),
    averageTransactionValue: 0,
    topCustomers: {},
    topItems: {},
    dailySales: {},
  };

  // Calculate average transaction value
  report.averageTransactionValue = report.totalRevenue / report.totalTransactions;

  // Group by customers
  sales.forEach((sale) => {
    if (!report.topCustomers[sale.customer]) {
      report.topCustomers[sale.customer] = {
        transactions: 0,
        revenue: 0,
        weight: 0,
      };
    }
    report.topCustomers[sale.customer].transactions++;
    report.topCustomers[sale.customer].revenue += parseFloat(sale.total_price);
    report.topCustomers[sale.customer].weight += parseFloat(sale.total_weight_kg);
  });

  // Group by items
  sales.forEach((sale) => {
    if (!report.topItems[sale.item_name]) {
      report.topItems[sale.item_name] = {
        transactions: 0,
        revenue: 0,
        weight: 0,
      };
    }
    report.topItems[sale.item_name].transactions++;
    report.topItems[sale.item_name].revenue += parseFloat(sale.total_price);
    report.topItems[sale.item_name].weight += parseFloat(sale.total_weight_kg);
  });

  // Group by date
  sales.forEach((sale) => {
    const date = sale.date;
    if (!report.dailySales[date]) {
      report.dailySales[date] = {
        transactions: 0,
        revenue: 0,
        weight: 0,
      };
    }
    report.dailySales[date].transactions++;
    report.dailySales[date].revenue += parseFloat(sale.total_price);
    report.dailySales[date].weight += parseFloat(sale.total_weight_kg);
  });

  return report;
};

export const exportToCSV = (data, filename = "sales_data.csv") => {
  if (!data || data.length === 0) return;

  const headers = ["ID", "Tanggal", "Pelanggan", "Sayuran", "Unit", "Quantity", "Berat per Unit (gram)", "Total Berat (kg)", "Harga per Unit", "Total Harga", "Catatan", "Dibuat Oleh"];

  const csvContent = [headers.join(","), ...data.map((row) => [row.id, row.date, row.customer, row.item_name, row.unit, row.quantity, row.weight_per_unit_gram, row.total_weight_kg, row.price_per_unit, row.total_price, row.notes || "", row.created_by].join(","))].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const getUniqueValues = (array, key) => {
  return [...new Set(array.map((item) => item[key]))].filter(Boolean);
};

export const sortData = (data, sortBy, sortOrder) => {
  return [...data].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    // Handle different data types
    if (sortBy === "date") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    } else if (sortBy === "total_price" || sortBy === "total_weight_kg") {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    } else if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};
