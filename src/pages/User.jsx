import React from "react";
import MainLayout from "../layouts/Main";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList} from "@/components/ui/breadcrumb";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {Binary, Eye, FilePen, Plus, Trash2} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {useUserPage} from "../hooks/useUserPage";
import {SelectField} from "@/components/SelectField.jsx";
import {FormField} from "@/components/FormField.jsx";

const User = () => {
    const {
        users,
        loading,
        error,
        refetch,
        deleting,
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
        adding,
        openEditModal,
        openDeleteModal,
        handleSave,
        handleAddUser,
        handleDelete,
        handleInputChange,
        tokenOpen,
        setTokenOpen,
        tokenReset,
        handleSubmit,
        formData,
        handleChange
    } = useUserPage();

    const breadcrumb = (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink>User</BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );

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
                        <div className="flex gap-2">
                            <Button variant="default" size="sm" onClick={setTokenOpen}>
                                <Binary className="w-4 h-4 mr-2"/>
                                Reset Code
                            </Button>
                            <Button variant="success" size="sm" onClick={setAddOpen}>
                                <Plus className="w-4 h-4 mr-2"/>
                                Tambah
                            </Button>
                        </div>
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
                                                <span
                                                    className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800">{typeof user.role === "object" ? user.role.name : user.role}</span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button variant="warning" size="sm"
                                                                    onClick={() => openEditModal(user)}
                                                                    disabled={saving || deleting}>
                                                                <FilePen/>
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Edit</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button variant="destructive" size="sm"
                                                                    onClick={() => openDeleteModal(user)}
                                                                    disabled={saving || deleting}>
                                                                <Trash2/>
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
                                <DialogDescription>Edit username dan role user. Pastikan informasi yang dimasukkan sudah
                                    benar.</DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" value={selectedUser?.username || ""}
                                           onChange={(e) => handleInputChange("username", e.target.value)}
                                           placeholder="Masukkan username" disabled={saving}/>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Select value={selectedUser?.role || ""}
                                            onValueChange={(value) => handleInputChange("role", value)}
                                            disabled={saving}>
                                        <SelectTrigger id="role">
                                            <SelectValue placeholder="Pilih role"/>
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
                                <Button onClick={handleSave}
                                        disabled={saving || !selectedUser?.username?.trim() || !selectedUser?.role}>
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
                                    Apakah Anda yakin ingin menghapus user <strong>{userToDelete?.username}</strong>?
                                    Tindakan ini tidak dapat dibatalkan.
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
                                <AlertDialogAction onClick={handleDelete} disabled={deleting}
                                                   className="bg-red-600 hover:bg-red-700">
                                    {deleting ? "Menghapus..." : "Hapus"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <Dialog open={addOpen} onOpenChange={setAddOpen}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Tambah User</DialogTitle>
                                <DialogDescription>Isi data user baru dengan benar sebelum
                                    menyimpan.</DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="add-username">Username</Label>
                                    <Input id="add-username" value={newUser.username}
                                           onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                                           placeholder="Masukkan username" disabled={adding}/>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="add-password">Password</Label>
                                    <Input id="add-password" type="password" value={newUser.password}
                                           onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                                           placeholder="Masukkan password" disabled={adding}/>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="add-password">Validation Code</Label>
                                    <Input id="add-validation" type="string" value={newUser.validation}
                                           onChange={(e) => setNewUser({...newUser, validationCode: e.target.value})}
                                           placeholder="Masukkan validation code" disabled={adding}/>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="add-role">Role</Label>
                                    <Select value={newUser.role}
                                            onValueChange={(value) => setNewUser({...newUser, role: value})}
                                            disabled={adding}>
                                        <SelectTrigger id="add-role">
                                            <SelectValue placeholder="Pilih role"/>
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
                                        setNewUser({username: "", password: "", role: "", validationCode: ""});
                                    }}
                                    disabled={adding}>
                                    Batal
                                </Button>
                                <Button onClick={handleAddUser}
                                        disabled={adding || !newUser.username || !newUser.password || !newUser.role}>
                                    {adding ? "Menyimpan..." : "Simpan"}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={tokenOpen} onOpenChange={setTokenOpen}>
                        <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                                <DialogTitle>Token Reset Password</DialogTitle>
                                <DialogDescription>
                                    Lihat daftar token reset password atau generate token baru untuk user.
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <FormField label="Username" name="username" type="text" value={formData.username}
                                           onChange={handleChange}
                                           required/>
                                <Button type="submit" className="w-full">
                                    Generate Token
                                </Button>
                            </form>

                            {/* Table Token */}
                            <div className="mt-6 rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Username</TableHead>
                                            <TableHead>Token</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tokenReset.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={2} className="text-center text-gray-500">
                                                    Belum ada token
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            tokenReset.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium">{item.username}</TableCell>
                                                    <TableCell className="font-mono">{item.code}</TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </DialogContent>
                    </Dialog>
                </>
            )}
        </MainLayout>
    );
};

export default User;
