import {useState, useEffect} from "react";
import {format} from "date-fns";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import {salesService} from "@/services/salesService";
import validator from "validator";

export const useSalesForm = () => {
    const [formData, setFormData] = useState({
        date: "",
        customer: "",
        item_name: "",
        unit: "",
        quantity: "",
        weight_per_unit_gram: "",
        total_weight_kg: "",
        price_per_unit: "",
        total_price: "",
        notes: "",
    });

    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const resetForm = () => ({
        date: "",
        customer: "",
        item_name: "",
        unit: "",
        quantity: "",
        weight_per_unit_gram: "",
        total_weight_kg: "",
        price_per_unit: "",
        total_price: "",
        notes: "",
    });

    // Update date when selectedDate changes
    useEffect(() => {
        if (selectedDate) {
            const formatted = format(selectedDate, "yyyy-MM-dd");
            setFormData((prev) => ({...prev, date: formatted}));
        }
    }, [selectedDate]);

    // Auto-calculate totals
    useEffect(() => {
        const quantity = parseFloat(formData.quantity) || 0;
        const weightPerUnit = parseFloat(formData.weight_per_unit_gram) || 0;
        const pricePerUnit = parseFloat(formData.price_per_unit) || 0;

        const totalWeight = (quantity * weightPerUnit) / 1000;
        const totalPrice = quantity * pricePerUnit;

        setFormData((prev) => ({
            ...prev,
            total_weight_kg: totalWeight ? totalWeight.toString() : "",
            total_price: totalPrice ? totalPrice.toString() : "",
        }));
    }, [formData.quantity, formData.weight_per_unit_gram, formData.price_per_unit]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const validateForm = () => {
        if (validator.isEmpty(formData.date)) {
            return "Tanggal wajib diisi";
        }
        if (validator.isEmpty(formData.customer)) {
            return "Nama customer wajib diisi";
        }
        if (validator.isEmpty(formData.item_name)) {
            return "Nama barang wajib diisi";
        }
        if (validator.isEmpty(formData.unit)) {
            return "Satuan wajib diisi";
        }
        if (!validator.isFloat(formData.quantity, {min: 0.01})) {
            return "Jumlah harus berupa angka positif";
        }
        if (!validator.isFloat(formData.weight_per_unit_gram, {min: 0.01})) {
            return "Berat/unit harus berupa angka positif";
        }
        if (!validator.isFloat(formData.price_per_unit, {min: 0.01})) {
            return "Harga/unit harus berupa angka positif";
        }
        if (formData.notes && !validator.isLength(formData.notes, {max: 500})) {
            return "Catatan maksimal 500 karakter";
        }
        return null; // valid
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const validationError = validateForm();
        if (validationError) {
            toast.error(validationError);
            setError(validationError);
            return;
        }

        setLoading(true);

        const dataToSubmit = {
            ...formData,
            notes: formData.notes.trim() === "" ? null : formData.notes,
        };

        try {
            await salesService.createSale(dataToSubmit);
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
        navigate("/penjualan");
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
