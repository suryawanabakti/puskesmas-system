// resources/js/Pages/Patients/Show.tsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Examination, type Patient, type Referral } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit } from 'lucide-react';

interface PatientsShowProps {
    patient: Patient & {
        examinations: Examination[];
        referrals: Referral[];
    };
}

export default function PatientsShow({ patient }: PatientsShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Pasien',
            href: '/patients',
        },
        {
            title: patient.name,
            href: `/patients/${patient.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Pasien: ${patient.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Informasi Pasien</h1>
                    <Link href={route('patients.edit', patient.id)}>
                        <Button size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle>Data Pribadi</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">ID Pasien</h3>
                                <p className="text-lg font-semibold">{patient.patient_id}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Nama Lengkap</h3>
                                <p className="text-lg font-semibold">{patient.name}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">NIK</h3>
                                <p className="text-lg">{patient.nik}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Jenis Kelamin</h3>
                                <p className="text-lg">{patient.gender}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Tanggal Lahir</h3>
                                <p className="text-lg">{patient.birth_date}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Alamat</h3>
                                <p className="text-lg">{patient.address}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Nomor Telepon</h3>
                                <p className="text-lg">{patient.phone}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Status</h3>
                                <Badge variant={patient.status === 'active' ? 'default' : 'secondary'}>
                                    {patient.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Riwayat Pemeriksaan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {patient.examinations && patient.examinations.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Tanggal</TableHead>
                                            <TableHead>Diagnosis</TableHead>
                                            <TableHead>Dokter</TableHead>
                                            <TableHead>Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {patient.examinations.map((examination) => (
                                            <TableRow key={examination.id}>
                                                <TableCell>{examination.examination_id}</TableCell>
                                                <TableCell>{examination.examination_date}</TableCell>
                                                <TableCell>{examination.diagnosis}</TableCell>
                                                <TableCell>{examination.doctor}</TableCell>
                                                <TableCell>
                                                    <Link href={route('examinations.show', examination.id)}>
                                                        <Button variant="outline" size="sm">
                                                            Detail
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <p className="text-muted-foreground">Belum ada riwayat pemeriksaan</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Riwayat Rujukan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {patient.referrals && patient.referrals.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Tanggal</TableHead>
                                            <TableHead>Diagnosis</TableHead>
                                            <TableHead>Dirujuk Ke</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {patient.referrals.map((referral) => (
                                            <TableRow key={referral.id}>
                                                <TableCell>{referral.referral_id}</TableCell>
                                                <TableCell>{referral.referral_date}</TableCell>
                                                <TableCell>{referral.diagnosis}</TableCell>
                                                <TableCell>{referral.referred_to}</TableCell>
                                                <TableCell>
                                                    <Badge variant={referral.status === 'completed' ? 'default' : 'secondary'}>
                                                        {referral.status === 'completed' ? 'Selesai' : 'Menunggu'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Link href={route('referrals.show', referral.id)}>
                                                        <Button variant="outline" size="sm">
                                                            Detail
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <p className="text-muted-foreground">Belum ada riwayat rujukan</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
