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

export const formatDateISO = (dateInput) => {
  const date = new Date(dateInput);
  if (isNaN(date)) return "";
  return date.toISOString().split("T")[0];
};

export const formatDecimalSmart = (value) => {
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  return num % 1 === 0 ? num.toString() : num.toString();
};

export const formatWeight = (weight) => {
  return `${formatDecimalSmart(weight)} kg`;
};

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const parseAndRound = (value, decimals = 2) => {
  const num = parseFloat(value);
  if (isNaN(num)) return 0;
  return parseFloat(num.toFixed(decimals));
};

export const parseAndRoundInt = (value) => {
  const num = parseFloat(value);
  if (isNaN(num)) return 0;
  return Math.round(num);
};

export const formatMonthYear = (dateInput) => {
  const date = new Date(dateInput);
  if (isNaN(date)) return "";
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
  });
};

export const formatMonthYearShort = (dateInput) => {
  const date = new Date(dateInput);
  if (isNaN(date)) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

export const formatCurrencyWithoutSymbol = (amount) => {
  const num = parseFloat(amount);
  if (isNaN(num)) return "0";
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
  }).format(Math.round(num));
};
