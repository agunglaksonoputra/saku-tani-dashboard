import React, { useState } from "react";
import MainLayout from "../layouts/Main";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useUsers } from "../hooks/useUsers";
import { useUser } from "../hooks/useUser";
import { toast } from "sonner";
import { FilePen, Plus, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const User = () => {
  const { users, loading, error, refetch } = useUsers();
  const { deleting, setDeleting, remove, update, create } = useUser();
  const [selectedUser, setSelectedUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "", validationCode: "" });
  const [saving, setSaving] = useState(false);
  const [adding, setAdding] = useState(false);

  const breadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>User</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

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
    if (!selectedUser?.id) {
      toast.error("ID user tidak ditemukan");
      return;
    }

    // Validasi input
    if (!selectedUser.username?.trim()) {
      toast.error("Username tidak boleh kosong");
      return;
    }

    if (!selectedUser.role) {
      toast.error("Role harus dipilih");
      return;
    }

    const payload = {
      username: selectedUser.username.trim(),
      role: selectedUser.role,
    };

    const toastId = toast.loading("Menyimpan perubahan...");
    setSaving(true);

    try {
      await update(selectedUser.id, payload);

      // Refresh data setelah update
      await refetch();

      toast.success("User berhasil diperbarui", { id: toastId });
      setEditOpen(false);
      setSelectedUser(null);
    } catch (err) {
      console.error("Update gagal:", err);
      const errorMessage = err.response?.data?.message || err.message || "Terjadi kesalahan saat menyimpan";
      toast.error("Gagal menyimpan: " + errorMessage, { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  const handleAddUser = async () => {
    if (!newUser.username?.trim()) {
      toast.error("Username tidak boleh kosong");
      return;
    }

    if (!newUser.password) {
      toast.error("Password tidak boleh kosong");
      return;
    }

    if (!newUser.role) {
      toast.error("Role harus dipilih");
      return;
    }

    if (!newUser.validationCode) {
      toast.error("Validation tidak boleh kososng");
    }

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

      toast.success("User berhasil ditambahkan", { id: toastId });

      setNewUser({ username: "", password: "", role: "" });
    } catch (err) {
      console.error("Create gagal:", err);
      const errorMessage = err.response?.data?.message || err.message || "Terjadi kesalahan saat menambahkan";
      toast.error("Gagal menambahkan user: " + errorMessage, { id: toastId });
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setAdding(false);
      setAddOpen(false);
      await refetch();
    }
  };

  const handleDelete = async () => {
    if (!userToDelete?.id) {
      toast.error("ID user tidak ditemukan");
      return;
    }

    const toastId = toast.loading("Menghapus user...");
    setDeleting(true);

    try {
      await remove(userToDelete.id);

      // Refresh data setelah delete
      await refetch();

      toast.success("User berhasil dihapus", { id: toastId });
      setDeleteOpen(false);
      setUserToDelete(null);
    } catch (err) {
      console.error("Delete gagal:", err);
      const errorMessage = err.response?.data?.message || err.message || "Terjadi kesalahan saat menghapus";
      toast.error("Gagal menghapus: " + errorMessage, { id: toastId });
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

  return (
    <MainLayout header={breadcrumb}>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">Gagal memuat data user: {error.message}</p>
          <Button onClick={refetch} variant="outline">
            Coba Lagi
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-end">
            <Button variant="success" size="sm" onClick={setAddOpen}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah
            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">No</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="w-32">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                      Tidak ada data user
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user, index) => (
                    <TableRow key={user.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800">{typeof user.role === "object" ? user.role.name : user.role}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="warning" size="sm" onClick={() => openEditModal(user)} disabled={saving || deleting}>
                                <FilePen />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="destructive" size="sm" onClick={() => openDeleteModal(user)} disabled={saving || deleting}>
                                <Trash2 />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Modal Edit */}
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
                <DialogDescription>Edit username dan role user. Pastikan informasi yang dimasukkan sudah benar.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" value={selectedUser?.username || ""} onChange={(e) => handleInputChange("username", e.target.value)} placeholder="Masukkan username" disabled={saving} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={selectedUser?.role || ""} onValueChange={(value) => handleInputChange("role", value)} disabled={saving}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="operator">Operator</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditOpen(false);
                    setSelectedUser(null);
                  }}
                  disabled={saving}>
                  Batal
                </Button>
                <Button onClick={handleSave} disabled={saving || !selectedUser?.username?.trim() || !selectedUser?.role}>
                  {saving ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Modal Delete Confirmation */}
          <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Hapus User</AlertDialogTitle>
                <AlertDialogDescription>
                  Apakah Anda yakin ingin menghapus user <strong>{userToDelete?.username}</strong>? Tindakan ini tidak dapat dibatalkan.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    setDeleteOpen(false);
                    setUserToDelete(null);
                  }}
                  disabled={deleting}>
                  Batal
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={deleting} className="bg-red-600 hover:bg-red-700">
                  {deleting ? "Menghapus..." : "Hapus"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Tambah User</DialogTitle>
                <DialogDescription>Isi data user baru dengan benar sebelum menyimpan.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="add-username">Username</Label>
                  <Input id="add-username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} placeholder="Masukkan username" disabled={adding} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="add-password">Password</Label>
                  <Input id="add-password" type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} placeholder="Masukkan password" disabled={adding} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="add-password">Validation Code</Label>
                  <Input id="add-validation" type="string" value={newUser.validation} onChange={(e) => setNewUser({ ...newUser, validationCode: e.target.value })} placeholder="Masukkan validation code" disabled={adding} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="add-role">Role</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })} disabled={adding}>
                    <SelectTrigger id="add-role">
                      <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Admin</SelectItem>
                      <SelectItem value="2">Owner</SelectItem>
                      <SelectItem value="3">Operator</SelectItem>
                      <SelectItem value="4">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setAddOpen(false);
                    setNewUser({ username: "", password: "", role: "", validationCode: "" });
                  }}
                  disabled={adding}>
                  Batal
                </Button>
                <Button onClick={handleAddUser} disabled={adding || !newUser.username || !newUser.password || !newUser.role}>
                  {adding ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </MainLayout>
  );
};

export default User;
