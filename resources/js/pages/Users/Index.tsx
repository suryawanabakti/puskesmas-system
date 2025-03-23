'use client';

import type React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { MoreHorizontal, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface Props {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function Index({ users }: Props) {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'dokter',
    });
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRoleChange = (value: string) => {
        setFormData({ ...formData, role: value });
    };

    const openCreateDialog = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            role: 'dokter',
        });
        setIsCreateDialogOpen(true);
    };

    const openEditDialog = (user: User) => {
        setCurrentUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            password: '',
            role: user.role,
        });
        setIsEditDialogOpen(true);
    };

    const openDeleteDialog = (user: User) => {
        setCurrentUser(user);
        setIsDeleteDialogOpen(true);
    };

    const handleCreate = () => {
        router.post('/users', formData, {
            onSuccess: () => {
                setIsCreateDialogOpen(false);
            },
        });
    };

    const handleUpdate = () => {
        if (!currentUser) return;

        router.put(`/users/${currentUser.id}`, formData, {
            onSuccess: () => {
                setIsEditDialogOpen(false);
            },
        });
    };

    const handleDelete = () => {
        if (!currentUser) return;

        router.delete(`/users/${currentUser.id}`, {
            onSuccess: () => {
                setIsDeleteDialogOpen(false);
            },
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/users', { search: searchQuery }, { preserveState: true });
    };

    const goToPage = (page: number) => {
        router.get('/users', { page }, { preserveState: true });
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'dokter':
                return 'bg-blue-100 text-blue-800';
            case 'apoteker':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppLayout>
            <Head title="Manajemen Pengguna" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                    <h1 className="text-primary-900 text-2xl font-semibold">Manajemen Pengguna</h1>

                    <div className="mt-4 flex items-center justify-between">
                        <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
                            <Input
                                type="search"
                                placeholder="Cari pengguna..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full"
                            />
                            <Button type="submit" size="icon" variant="outline">
                                <Search className="h-4 w-4" />
                            </Button>
                        </form>

                        <Button onClick={openCreateDialog}>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Pengguna
                        </Button>
                    </div>

                    <div className="mt-6 overflow-hidden rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Tanggal Dibuat</TableHead>
                                    <TableHead className="w-[100px]">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Badge className={getRoleBadgeColor(user.role)}>{user.role === 'dokter' ? 'Dokter' : 'Apoteker'}</Badge>
                                        </TableCell>
                                        <TableCell>{new Date(user.created_at).toLocaleDateString('id-ID')}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => openEditDialog(user)}>
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => openDeleteDialog(user)} className="text-red-600">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Hapus
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {users.last_page > 1 && (
                        <Pagination className="mt-4">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (users.current_page > 1) {
                                                goToPage(users.current_page - 1);
                                            }
                                        }}
                                        className={users.current_page === 1 ? 'pointer-events-none opacity-50' : ''}
                                    />
                                </PaginationItem>

                                {Array.from({ length: users.last_page }, (_, i) => i + 1).map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                goToPage(page);
                                            }}
                                            isActive={page === users.current_page}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (users.current_page < users.last_page) {
                                                goToPage(users.current_page + 1);
                                            }
                                        }}
                                        className={users.current_page === users.last_page ? 'pointer-events-none opacity-50' : ''}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </div>
            </div>

            {/* Create User Dialog */}
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Tambah Pengguna Baru</DialogTitle>
                        <DialogDescription>Tambahkan pengguna baru dengan role dokter atau apoteker.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Masukkan nama lengkap" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Masukkan alamat email"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Masukkan password"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="role">Role</Label>
                            <Select value={formData.role} onValueChange={handleRoleChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dokter">Dokter</SelectItem>
                                    <SelectItem value="apoteker">Apoteker</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={handleCreate}>Simpan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit User Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Pengguna</DialogTitle>
                        <DialogDescription>Ubah informasi pengguna.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name">Nama</Label>
                            <Input
                                id="edit-name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Masukkan nama lengkap"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-email">Email</Label>
                            <Input
                                id="edit-email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Masukkan alamat email"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-password">Password (kosongkan jika tidak ingin mengubah)</Label>
                            <Input
                                id="edit-password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Masukkan password baru"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-role">Role</Label>
                            <Select value={formData.role} onValueChange={handleRoleChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dokter">Dokter</SelectItem>
                                    <SelectItem value="apoteker">Apoteker</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={handleUpdate}>Simpan Perubahan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete User Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Hapus Pengguna</DialogTitle>
                        <DialogDescription>Apakah Anda yakin ingin menghapus pengguna ini? Tindakan ini tidak dapat dibatalkan.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Batal
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
