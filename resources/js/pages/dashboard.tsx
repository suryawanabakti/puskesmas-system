// resources/js/Pages/Dashboard.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Activity, Clipboard, Pill, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">Sistem Informasi Pelayanan Pasien</h1>
                <p className="text-muted-foreground">Selamat datang di Sistem Informasi Pelayanan Pasien Puskesmas Ratte Lembang Kadundung</p>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Users className="h-5 w-5" />
                                Data Pasien
                            </CardTitle>
                            <CardDescription>Kelola data pasien</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-sm">Tambah, edit, dan lihat data pasien yang terdaftar.</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Clipboard className="h-5 w-5" />
                                Pemeriksaan
                            </CardTitle>
                            <CardDescription>Kelola data pemeriksaan</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-sm">Catat dan lihat riwayat pemeriksaan pasien.</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Activity className="h-5 w-5" />
                                Rujukan
                            </CardTitle>
                            <CardDescription>Kelola data rujukan</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-sm">Buat dan lihat rujukan pasien ke fasilitas kesehatan lain.</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Pill className="h-5 w-5" />
                                Data Obat
                            </CardTitle>
                            <CardDescription>Kelola data obat</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-sm">Tambah, edit, dan lihat stok obat yang tersedia.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
