import { useState, useEffect } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { expensesService } from "@/services/expensesService";

export const useExpensesForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    unit: "",
    quantity: "",
    price_per_unit: "",
    shipping_cost: "",
    discount: "",
    total_price: "",
    notes: "",
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const resetForm = () => ({
    date: "",
    name: "",
    unit: "",
    quantity: "",
    price_per_unit: "",
    shipping_cost: "",
    discount: "",
    total_price: "",
    notes: "",
  });

  // Update date when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      const formatted = format(selectedDate, "yyyy-MM-dd");
      setFormData((prev) => ({ ...prev, date: formatted }));
    }
  }, [selectedDate]);

  // Auto-calculate totals
  useEffect(() => {
    const quantity = parseFloat(formData.quantity) || 0;
    const pricePerUnit = parseFloat(formData.price_per_unit) || 0;
    const shippingCost = parseFloat(formData.shipping_cost) || 0;
    const discountCost = parseFloat(formData.discount) || 0;

    const totalPrice = (pricePerUnit + shippingCost - discountCost) * quantity;

    setFormData((prev) => ({
      ...prev,
      total_price: totalPrice ? totalPrice.toString() : "",
    }));
  }, [formData.quantity, formData.price_per_unit, formData.shipping_cost, formData.discount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const dataToSubmit = {
      ...formData,
      shipping_cost: formData.shipping_cost.trim() === "" ? 0 : formData.shipping_cost,
      discount: formData.discount.trim() === "" ? 0 : formData.discount,
      notes: formData.notes.trim() === "" ? null : formData.notes,
    };

    try {
      await expensesService.createExpenses(dataToSubmit);
      toast.success("Data berhasil ditambahkan!");
      // navigate("/penjualan");
    } catch (err) {
      const apiMessage = err.response?.data?.message || err.message || "Gagal mengimpor data";
      toast.error(apiMessage);
      setError(apiMessage);
    } finally {
      setFormData(resetForm());
      setSelectedDate(null);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/biaya");
  };

  return {
    formData,
    selectedDate,
    loading,
    error,
    setSelectedDate,
    handleChange,
    handleSelectChange,
    handleSubmit,
    handleCancel,
  };
};
