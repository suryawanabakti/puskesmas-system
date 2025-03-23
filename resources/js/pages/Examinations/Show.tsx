// resources/js/Pages/Examinations/Show.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Examination, type MedicinePrescription } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit } from 'lucide-react';

interface ExaminationsShowProps {
    examination: Examination & {
        prescriptions: (MedicinePrescription & {
            medicine: {
                name: string;
                unit: string;
            };
        })[];
    };
}

export default function ExaminationsShow({ examination }: ExaminationsShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Pemeriksaan',
            href: '/examinations',
        },
        {
            title: examination.examination_id,
            href: `/examinations/${examination.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Pemeriksaan: ${examination.examination_id}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Detail Pemeriksaan</h1>
                    <Link href={route('examinations.edit', examination.id)}>
                        <Button size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle>Informasi Pemeriksaan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">ID Pemeriksaan</h3>
                                <p className="text-lg font-semibold">{examination.examination_id}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Tanggal Pemeriksaan</h3>
                                <p className="text-lg">{examination.examination_date}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Dokter</h3>
                                <p className="text-lg">{examination.doctor}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Data Pasien</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {examination.patient && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="text-muted-foreground text-sm font-medium">ID Pasien</h3>
                                            <p className="text-lg">{examination.patient.patient_id}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-muted-foreground text-sm font-medium">Nama Pasien</h3>
                                            <p className="text-lg">{examination.patient.name}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <Link href={route('patients.show', examination.patient.id)}>
                                            <Button variant="outline" size="sm">
                                                Lihat Detail Pasien
                                            </Button>
                                        </Link>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-3">
                        <CardHeader>
                            <CardTitle>Hasil Pemeriksaan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Keluhan</h3>
                                <p className="text-lg">{examination.complaint}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Diagnosis</h3>
                                <p className="text-lg">{examination.diagnosis}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Penanganan</h3>
                                <p className="text-lg">{examination.treatment}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-3">
                        <CardHeader>
                            <CardTitle>Resep Obat</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {examination.prescriptions && examination.prescriptions.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nama Obat</TableHead>
                                            <TableHead>Dosis</TableHead>
                                            <TableHead>Jumlah</TableHead>
                                            <TableHead>Instruksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {examination.prescriptions.map((prescription) => (
                                            <TableRow key={prescription.id}>
                                                <TableCell>{prescription.medicine?.name}</TableCell>
                                                <TableCell>{prescription.dosage}</TableCell>
                                                <TableCell>
                                                    {prescription.quantity} {prescription.medicine?.unit}
                                                </TableCell>
                                                <TableCell>{prescription.instructions}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <p className="text-muted-foreground">Tidak ada resep obat</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
