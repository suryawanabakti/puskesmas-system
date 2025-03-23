// resources/js/Pages/Reports/Index.tsx
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Activity, CalendarIcon, Clipboard, Pill, Users } from 'lucide-react';
import { useState } from 'react';

import ExaminationStatistics from './components/examination-statistics';
import MedicineStatistics from './components/medicine-statistics';
import OverviewStatistics from './components/overview-statistics';
import PatientStatistics from './components/patient-statistics';
import ReferralStatistics from './components/referral-statistics';

interface ReportsIndexProps {
    statistics: {
        totalPatients: number;
        newPatientsThisMonth: number;
        totalExaminations: number;
        examinationsThisMonth: number;
        totalReferrals: number;
        referralsThisMonth: number;
        totalMedicines: number;
        lowStockMedicines: number;
    };
    patientData: {
        labels: string[];
        data: number[];
    };
    examinationData: {
        labels: string[];
        data: number[];
    };
    medicineData: {
        labels: string[];
        data: number[];
    };
    referralData: {
        labels: string[];
        data: number[];
    };
    topMedicines: {
        name: string;
        count: number;
    }[];
    diagnosisDistribution: {
        name: string;
        count: number;
    }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Laporan',
        href: '/reports',
    },
];

export default function ReportsIndex({
    statistics,
    patientData,
    examinationData,
    medicineData,
    referralData,
    topMedicines,
    diagnosisDistribution,
}: ReportsIndexProps) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [period, setPeriod] = useState('month');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h1 className="text-2xl font-bold">Laporan dan Statistik</h1>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal sm:w-auto">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, 'PPP', { locale: id }) : <span>Pilih tanggal</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                            </PopoverContent>
                        </Popover>

                        <Select value={period} onValueChange={setPeriod}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Pilih periode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="day">Harian</SelectItem>
                                <SelectItem value="week">Mingguan</SelectItem>
                                <SelectItem value="month">Bulanan</SelectItem>
                                <SelectItem value="year">Tahunan</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <OverviewStatistics statistics={statistics} />

                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
                        <TabsTrigger value="overview">Ringkasan</TabsTrigger>
                        <TabsTrigger value="patients">
                            <Users className="mr-2 h-4 w-4" />
                            Pasien
                        </TabsTrigger>
                        <TabsTrigger value="examinations">
                            <Clipboard className="mr-2 h-4 w-4" />
                            Pemeriksaan
                        </TabsTrigger>
                        <TabsTrigger value="referrals">
                            <Activity className="mr-2 h-4 w-4" />
                            Rujukan
                        </TabsTrigger>
                        <TabsTrigger value="medicines">
                            <Pill className="mr-2 h-4 w-4" />
                            Obat
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-4 space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Tren Pasien Baru</CardTitle>
                                    <CardDescription>
                                        Jumlah pasien baru per{' '}
                                        {period === 'day' ? 'jam' : period === 'week' ? 'hari' : period === 'month' ? 'minggu' : 'bulan'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <PatientStatistics data={patientData} />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Tren Pemeriksaan</CardTitle>
                                    <CardDescription>
                                        Jumlah pemeriksaan per{' '}
                                        {period === 'day' ? 'jam' : period === 'week' ? 'hari' : period === 'month' ? 'minggu' : 'bulan'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ExaminationStatistics data={examinationData} />
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Distribusi Diagnosis</CardTitle>
                                    <CardDescription>10 diagnosis teratas</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <ReferralStatistics
                                            data={{
                                                labels: diagnosisDistribution.map((item) => item.name),
                                                data: diagnosisDistribution.map((item) => item.count),
                                            }}
                                            chartType="pie"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Penggunaan Obat</CardTitle>
                                    <CardDescription>10 obat yang paling sering diresepkan</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <MedicineStatistics
                                            data={{
                                                labels: topMedicines.map((item) => item.name),
                                                data: topMedicines.map((item) => item.count),
                                            }}
                                            chartType="bar"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="patients" className="mt-4 space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Statistik Pasien</CardTitle>
                                <CardDescription>Data pasien berdasarkan periode waktu</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[400px]">
                                    <PatientStatistics data={patientData} />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Distribusi Jenis Kelamin</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <PatientStatistics
                                            data={{
                                                labels: ['Laki-laki', 'Perempuan'],
                                                data: [55, 45],
                                            }}
                                            chartType="pie"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Distribusi Umur</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <PatientStatistics
                                            data={{
                                                labels: ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61+'],
                                                data: [15, 12, 18, 22, 19, 10, 4],
                                            }}
                                            chartType="bar"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="examinations" className="mt-4 space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Statistik Pemeriksaan</CardTitle>
                                <CardDescription>Data pemeriksaan berdasarkan periode waktu</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[400px]">
                                    <ExaminationStatistics data={examinationData} />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Distribusi Diagnosis</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <ExaminationStatistics
                                            data={{
                                                labels: diagnosisDistribution.map((item) => item.name),
                                                data: diagnosisDistribution.map((item) => item.count),
                                            }}
                                            chartType="pie"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Pemeriksaan per Dokter</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <ExaminationStatistics
                                            data={{
                                                labels: ['dr. Andi Wijaya', 'dr. Dewi Susanti', 'dr. Budi Santoso'],
                                                data: [45, 38, 17],
                                            }}
                                            chartType="bar"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="referrals" className="mt-4 space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Statistik Rujukan</CardTitle>
                                <CardDescription>Data rujukan berdasarkan periode waktu</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[400px]">
                                    <ReferralStatistics data={referralData} />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Distribusi Tujuan Rujukan</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <ReferralStatistics
                                            data={{
                                                labels: ['RSUD Makale', 'RS Elim Rantepao', 'RS Lakipadada', 'Lainnya'],
                                                data: [65, 20, 10, 5],
                                            }}
                                            chartType="pie"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Status Rujukan</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <ReferralStatistics
                                            data={{
                                                labels: ['Selesai', 'Menunggu'],
                                                data: [75, 25],
                                            }}
                                            chartType="doughnut"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="medicines" className="mt-4 space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Penggunaan Obat</CardTitle>
                                <CardDescription>Data penggunaan obat berdasarkan periode waktu</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[400px]">
                                    <MedicineStatistics data={medicineData} />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Obat Paling Sering Diresepkan</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <MedicineStatistics
                                            data={{
                                                labels: topMedicines.map((item) => item.name),
                                                data: topMedicines.map((item) => item.count),
                                            }}
                                            chartType="bar"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Distribusi Kategori Obat</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <MedicineStatistics
                                            data={{
                                                labels: ['Analgesik', 'Antibiotik', 'Antihistamin', 'Antasida', 'Bronkodilator', 'Lainnya'],
                                                data: [30, 25, 15, 10, 10, 10],
                                            }}
                                            chartType="pie"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Stok Obat Menipis</CardTitle>
                                <CardDescription>Obat dengan stok di bawah batas minimum</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <table className={cn('w-full caption-bottom text-sm')}>
                                        <thead className="[&_tr]:border-b">
                                            <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                                                <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Nama Obat</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Kategori</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Stok</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Batas Minimum</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">Kadaluarsa</th>
                                            </tr>
                                        </thead>
                                        <tbody className="[&_tr:last-child]:border-0">
                                            {[
                                                {
                                                    id: 'M004',
                                                    name: 'Cetirizine 10mg',
                                                    category: 'Antihistamin',
                                                    stock: 25,
                                                    minStock: 50,
                                                    expiry: '11-2025',
                                                },
                                                {
                                                    id: 'M005',
                                                    name: 'Salbutamol Inhaler',
                                                    category: 'Bronkodilator',
                                                    stock: 10,
                                                    minStock: 20,
                                                    expiry: '06-2025',
                                                },
                                                {
                                                    id: 'M008',
                                                    name: 'Ambroxol Sirup',
                                                    category: 'Ekspektoran',
                                                    stock: 15,
                                                    minStock: 30,
                                                    expiry: '09-2025',
                                                },
                                            ].map((medicine) => (
                                                <tr
                                                    key={medicine.id}
                                                    className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors"
                                                >
                                                    <td className="p-4 align-middle">{medicine.id}</td>
                                                    <td className="p-4 align-middle font-medium">{medicine.name}</td>
                                                    <td className="p-4 align-middle">{medicine.category}</td>
                                                    <td className="p-4 align-middle">
                                                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">
                                                            {medicine.stock}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 align-middle">{medicine.minStock}</td>
                                                    <td className="p-4 align-middle">{medicine.expiry}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
