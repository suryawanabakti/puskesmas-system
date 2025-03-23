// resources/js/Pages/Referrals/Index.tsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PaginatedData, type Referral } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Edit, FileText, MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import React from 'react';

interface ReferralsIndexProps {
    referrals: PaginatedData<Referral>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Rujukan',
        href: '/referrals',
    },
];

export default function ReferralsIndex({ referrals }: ReferralsIndexProps) {
    const { data, setData, get, processing } = useForm({
        search: '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('referrals.index'), {
            preserveState: true,
        });
    };

    const handleReset = () => {
        setData('search', '');
        get(route('referrals.index'), {
            preserveState: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Rujukan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Daftar Rujukan</h1>
                    <Link href={route('referrals.create')}>
                        <Button className="bg-green-600 hover:bg-green-700">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Rujukan
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
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Nama Pasien</TableHead>
                                <TableHead>Diagnosis</TableHead>
                                <TableHead>Dirujuk Ke</TableHead>
                                <TableHead>Alasan</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Dokter</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {referrals.data.length > 0 ? (
                                referrals.data.map((referral) => (
                                    <TableRow key={referral.id}>
                                        <TableCell className="font-medium">{referral.referral_id}</TableCell>
                                        <TableCell>{referral.referral_date}</TableCell>
                                        <TableCell>{referral.patient?.name}</TableCell>
                                        <TableCell>{referral.diagnosis}</TableCell>
                                        <TableCell>{referral.referred_to}</TableCell>
                                        <TableCell>{referral.reason}</TableCell>
                                        <TableCell>
                                            <Badge variant={referral.status === 'completed' ? 'default' : 'secondary'}>
                                                {referral.status === 'completed' ? 'Selesai' : 'Menunggu'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{referral.doctor}</TableCell>
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
                                                        <Link href={route('referrals.show', referral.id)}>
                                                            <FileText className="mr-2 h-4 w-4" />
                                                            <span>Detail</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('referrals.edit', referral.id)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            <span>Edit</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={route('referrals.destroy', referral.id)}
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
                                        Tidak ada data rujukan
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {referrals.links && referrals.links.length > 3 && (
                    <div className="mt-4 flex items-center justify-end">
                        <div className="flex gap-2">
                            {referrals.links.map((link, i) => (
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
