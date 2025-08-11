import {useState, useEffect, useCallback} from "react";
import {format} from "date-fns";
import {profitShareService} from "@/services/profitShareService";
import {toast} from "sonner";
import validator from "validator";

export const useProfitShare = () => {
    const [profitShare, setProfitShare] = useState([]);
    const [ownerBalance, setOwnerBalance] = useState([]);
    const [loadingProfitShare, setLoadingProfitShare] = useState(false);
    const [loadingOwnerBalance, setLoadingOwnerBalance] = useState(false);
    const [isModalFormOpen, setIsModalFormOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        date: "",
        name: "",
        amount: "",
    });

    useEffect(() => {
        if (selectedDate) {
            const formatted = format(selectedDate, "yyyy-MM-dd");
            setFormData((prev) => ({...prev, date: formatted}));
        }
    }, [selectedDate]);

    const handleMaxClick = () => {
        const selected = ownerBalance.find((item) => item.name === formData.name);
        if (selected) {
            setFormData((prev) => ({...prev, amount: selected.balance}));
        }
    };

    const fetchProfitShare = useCallback(async () => {
        setLoadingProfitShare(true);
        setError(null);
        try {
            const response = await profitShareService.getProfitShare();
            if (response.success) {
                setProfitShare(response.data);
            } else {
                toast.error("Gagal memuat bagi hasil.");
                setError("Gagal memuat data.");
            }
        } catch (err) {
            toast.error("Terjadi kesalahan saat mengambil data bagi hasil.");
            setError(err.message || "Unknown error");
        } finally {
            setTimeout(() => setLoadingProfitShare(false), 500);
        }
    }, []);

    const fetchOwnerBalance = useCallback(async () => {
        setLoadingOwnerBalance(true);
        setError(null);
        try {
            const response = await profitShareService.getOwnerBalance();
            if (response.success) {
                setOwnerBalance(response.data);
            } else {
                toast.error("Gagal memuat saldo.");
                setError("Gagal memuat data.");
            }
        } catch (err) {
            toast.error("Terjadi kesalahan saat mengambil data saldo.");
            setError(err.message || "Unknown error");
        } finally {
            setTimeout(() => setLoadingOwnerBalance(false), 500);
        }
    }, []);

    useEffect(() => {
        fetchProfitShare();
        fetchOwnerBalance();
    }, [fetchProfitShare, fetchOwnerBalance]);

    const validateForm = () => {
        if (validator.isEmpty(formData.date || "")) {
            return "Tanggal wajib diisi";
        }
        if (validator.isEmpty(formData.name || "")) {
            return "Nama wajib diisi";
        }

        const selectedOwner = ownerBalance.find((item) => item.name === formData.name);
        if (!selectedOwner) {
            return "Nama tidak ditemukan";
        }

        if (!validator.isFloat(formData.amount, {min: 0.01})) {
            return "Jumlah harus berupa angka positif";
        }

        const inputAmount = parseFloat(formData.amount);
        const maxAmount = parseFloat(selectedOwner.balance);
        if (inputAmount > maxAmount) {
            return "Jumlah melebihi saldo yang tersedia";
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

        setFormLoading(true);
        try {
            await profitShareService.createWithdraw(formData);
            toast.success("Data berhasil ditambahkan!");
            resetForm();
            refreshData();
            setIsModalFormOpen(false);
        } catch (err) {
            const apiMessage = err.response?.data?.message || err.message || "Gagal mengimpor data";
            toast.error(apiMessage);
            setError(apiMessage);
        } finally {
            setFormLoading(false);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const setJumlah = (value) => {
        setFormData((prev) => ({
            ...prev,
            amount: value,
        }));
    };

    const refreshData = () => {
        fetchProfitShare();
        fetchOwnerBalance();
    };

    const resetForm = () => {
        setFormData({name: "", amount: ""});
        setSelectedDate(null);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await profitShareService.deleteWithdraw(deleteId);
            refreshData();
            toast.success("Data berhasil dihapus");
        } catch (err) {
            console.error("Error deleting sale:", err);
            toast.error("Gagal menghapus data");
        } finally {
            setIsDeleteDialogOpen(false);
        }
    };

    return {
        profitShare,
        ownerBalance,
        loading: loadingProfitShare || loadingOwnerBalance,
        isModalFormOpen,
        formData,
        selectedDate,
        formLoading,
        isDeleteDialogOpen,
        error,
        refreshData,
        setFormData,
        handleSubmit,
        handleChange,
        handleSelectChange,
        handleMaxClick,
        handleDelete,
        confirmDelete,
        setJumlah,
        setSelectedDate,
        setIsDeleteDialogOpen,
        setIsModalFormOpen,
    };
};
