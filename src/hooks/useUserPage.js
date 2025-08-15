import {useEffect, useState} from "react";
import {toast} from "sonner";
import {useUsers} from "./useUsers";
import {useUser} from "./useUser";
import {generateTokenReset, getTokenReset} from "@/services/authService.js";
import validator from "validator";

export const useUserPage = () => {
    const {users, loading, error, refetch} = useUsers();
    const {deleting, setDeleting, remove, update, create} = useUser();
    const [tokenReset, setTokenReset] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [tokenOpen, setTokenOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        role: "",
        validationCode: "",
    });
    const [saving, setSaving] = useState(false);
    const [adding, setAdding] = useState(false);
    const [loadingToken, setLoadingToken] = useState(false);
    const [loadingGenerate, setLoadingGenerate] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
    });

    const resetForm = () => ({
        username: "",
    });

    const validateForm = () => {
        if (validator.isEmpty(formData.username)) {
            return "Username wajib diisi";
        }
        return null; // valid
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const openEditModal = (user) => {
        setSelectedUser({
            ...user,
            role: typeof user.role === "object" ? user.role.name : user.role,
        });
        setEditOpen(true);
    };

    const openDeleteModal = (user) => {
        setUserToDelete(user);
        setDeleteOpen(true);
    };

    const handleSave = async () => {
        if (!selectedUser?.id) return toast.error("ID user tidak ditemukan");
        if (!selectedUser.username?.trim()) return toast.error("Username tidak boleh kosong");
        if (!selectedUser.role) return toast.error("Role harus dipilih");

        const payload = {
            username: selectedUser.username.trim(),
            role: selectedUser.role,
        };

        const toastId = toast.loading("Menyimpan perubahan...");
        setSaving(true);

        try {
            await update(selectedUser.id, payload);
            await refetch();
            toast.success("User berhasil diperbarui", {id: toastId});
            setEditOpen(false);
            setSelectedUser(null);
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Terjadi kesalahan saat menyimpan";
            toast.error("Gagal menyimpan: " + errorMessage, {id: toastId});
        } finally {
            setSaving(false);
        }
    };

    const handleAddUser = async () => {
        if (!newUser.username?.trim()) return toast.error("Username tidak boleh kosong");
        if (!newUser.password) return toast.error("Password tidak boleh kosong");
        if (!newUser.role) return toast.error("Role harus dipilih");
        if (!newUser.validationCode) return toast.error("Validation tidak boleh kosong");

        const payload = {
            username: newUser.username.trim(),
            password: newUser.password,
            role_id: newUser.role,
            validationCode: newUser.validationCode,
        };

        const toastId = toast.loading("Menyimpan user baru...");
        setAdding(true);

        try {
            await create(payload);
            toast.success("User berhasil ditambahkan", {id: toastId});
            setNewUser({username: "", password: "", role: "", validationCode: ""});
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Terjadi kesalahan saat menambahkan";
            toast.error("Gagal menambahkan user: " + errorMessage, {id: toastId});
        } finally {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setAdding(false);
            setAddOpen(false);
            await refetch();
        }
    };

    const handleDelete = async () => {
        if (!userToDelete?.id) return toast.error("ID user tidak ditemukan");

        const toastId = toast.loading("Menghapus user...");
        setDeleting(true);

        try {
            await remove(userToDelete.id);
            await refetch();
            toast.success("User berhasil dihapus", {id: toastId});
            setDeleteOpen(false);
            setUserToDelete(null);
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Terjadi kesalahan saat menghapus";
            toast.error("Gagal menghapus: " + errorMessage, {id: toastId});
        } finally {
            setDeleting(false);
        }
    };

    const handleInputChange = (field, value) => {
        setSelectedUser((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            toast.error(validationError);
            return;
        }
        setLoadingGenerate(true);


        try {
            await generateTokenReset(formData.username);
            toast.success("Data berhasil ditambahkan!");
        } catch (err) {
            const apiMessage = err.response?.data?.message || err.message || "Gagal mengimpor data";
            toast.error(apiMessage);
        } finally {
            setFormData(resetForm());
            setTokenOpen(false)
            setLoadingGenerate(false);
        }
    };

    const fetchTokenReset = async () => {
        setLoadingToken(true);
        try {
            const res = await getTokenReset();
            setTokenReset(res.data || []);
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Gagal mengambil token reset");
        } finally {
            setLoadingToken(false);
        }
    };

    useEffect(() => {
        if (tokenOpen) {
            fetchTokenReset();
        }
    }, [tokenOpen]);

    return {
        users,
        loading: loading || loadingGenerate,
        error,
        refetch,
        deleting,
        setDeleting,
        selectedUser,
        setSelectedUser,
        editOpen,
        setEditOpen,
        addOpen,
        setAddOpen,
        deleteOpen,
        setDeleteOpen,
        userToDelete,
        setUserToDelete,
        newUser,
        setNewUser,
        saving,
        setSaving,
        adding,
        setAdding,
        tokenOpen,
        setTokenOpen,
        tokenReset,
        loadingToken,
        formData,
        handleChange,
        openEditModal,
        openDeleteModal,
        handleSave,
        handleAddUser,
        handleDelete,
        handleInputChange,
        handleSubmit,
    };
};
