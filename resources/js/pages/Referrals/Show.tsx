// resources/js/Pages/Referrals/Show.tsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Referral } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit } from 'lucide-react';

interface ReferralsShowProps {
    referral: Referral;
}

export default function ReferralsShow({ referral }: ReferralsShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Rujukan',
            href: '/referrals',
        },
        {
            title: referral.referral_id,
            href: `/referrals/${referral.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Rujukan: ${referral.referral_id}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Detail Rujukan</h1>
                    <Link href={route('referrals.edit', referral.id)}>
                        <Button size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Rujukan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">ID Rujukan</h3>
                                <p className="text-lg font-semibold">{referral.referral_id}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Tanggal Rujukan</h3>
                                <p className="text-lg">{referral.referral_date}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Dokter</h3>
                                <p className="text-lg">{referral.doctor}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Status</h3>
                                <Badge variant={referral.status === 'completed' ? 'default' : 'secondary'}>
                                    {referral.status === 'completed' ? 'Selesai' : 'Menunggu'}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Data Pasien</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {referral.patient && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="text-muted-foreground text-sm font-medium">ID Pasien</h3>
                                            <p className="text-lg">{referral.patient.patient_id}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-muted-foreground text-sm font-medium">Nama Pasien</h3>
                                            <p className="text-lg">{referral.patient.name}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <Link href={route('patients.show', referral.patient.id)}>
                                            <Button variant="outline" size="sm">
                                                Lihat Detail Pasien
                                            </Button>
                                        </Link>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Detail Rujukan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Diagnosis</h3>
                                <p className="text-lg">{referral.diagnosis}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Dirujuk Ke</h3>
                                <p className="text-lg">{referral.referred_to}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Alasan Rujukan</h3>
                                <p className="text-lg">{referral.reason}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
