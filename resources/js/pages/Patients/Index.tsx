// resources/js/Pages/Patients/Index.tsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PaginatedData, type Patient } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Edit, FileText, MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import React from 'react';

interface PatientsIndexProps {
    patients: PaginatedData<Patient>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Pasien',
        href: '/patients',
    },
];

export default function PatientsIndex({ patients }: PatientsIndexProps) {
    const { data, setData, get, processing } = useForm({
        search: '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('patients.index'), {
            preserveState: true,
        });
    };

    const handleReset = () => {
        setData('search', '');
        get(route('patients.index'), {
            preserveState: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Pasien" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Daftar Pasien</h1>
                    <Link href={route('patients.create')}>
                        <Button className="bg-green-600 hover:bg-green-700">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Pasien
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle>Pencarian dan Filter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="flex flex-col gap-4 sm:flex-row">
                            <Input
                                placeholder="Cari nama pasien..."
                                className="sm:max-w-sm"
                                value={data.search}
                                onChange={(e) => setData('search', e.target.value)}
                            />
                            <Button type="submit" disabled={processing}>
                                Cari
                            </Button>
                            <Button type="button" variant="outline" onClick={handleReset}>
                                Reset
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">ID</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>NIK</TableHead>
                                <TableHead>Jenis Kelamin</TableHead>
                                <TableHead>Tanggal Lahir</TableHead>
                                <TableHead>Alamat</TableHead>
                                <TableHead>No. Telepon</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {patients.data.length > 0 ? (
                                patients.data.map((patient) => (
                                    <TableRow key={patient.id}>
                                        <TableCell className="font-medium">{patient.patient_id}</TableCell>
                                        <TableCell>{patient.name}</TableCell>
                                        <TableCell>{patient.nik}</TableCell>
                                        <TableCell>{patient.gender}</TableCell>
                                        <TableCell>{patient.birth_date}</TableCell>
                                        <TableCell>{patient.address}</TableCell>
                                        <TableCell>{patient.phone}</TableCell>
                                        <TableCell>
                                            <Badge variant={patient.status === 'active' ? 'default' : 'secondary'}>
                                                {patient.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('patients.show', patient.id)}>
                                                            <FileText className="mr-2 h-4 w-4" />
                                                            <span>Detail</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('patients.edit', patient.id)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            <span>Edit</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={route('patients.destroy', patient.id)}
                                                            method="delete"
                                                            as="button"
                                                            className="w-full text-left text-red-600"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            <span>Hapus</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={9} className="py-4 text-center">
                                        Tidak ada data pasien
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {patients.links && patients.links.length > 3 && (
                    <div className="mt-4 flex items-center justify-end">
                        <div className="flex gap-2">
                            {patients.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || ''}
                                    className={`rounded px-4 py-2 ${
                                        link.active ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                    } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                    preserveScroll
                                >
                                    {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
