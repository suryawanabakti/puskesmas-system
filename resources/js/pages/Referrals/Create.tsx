// resources/js/Pages/Referrals/Create.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Patient } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

interface ReferralsCreateProps {
    patients: Patient[];
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
    {
        title: 'Tambah',
        href: '/referrals/create',
    },
];

export default function ReferralsCreate({ patients }: ReferralsCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        patient_id: '',
        diagnosis: '',
        referred_to: '',
        reason: '',
        status: 'pending',
        doctor: '',
        referral_date: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('referrals.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Rujukan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">Tambah Rujukan Baru</h1>

                <Card>
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Data Rujukan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="patient_id">Pasien</Label>
                                    <Select value={data.patient_id} onValueChange={(value) => setData('patient_id', value)}>
                                        <SelectTrigger id="patient_id">
                                            <SelectValue placeholder="Pilih pasien" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {patients.map((patient) => (
                                                <SelectItem key={patient.id} value={patient.id.toString()}>
                                                    {patient.patient_id} - {patient.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.patient_id && <p className="text-sm text-red-500">{errors.patient_id}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="referral_date">Tanggal Rujukan</Label>
                                    <Input
                                        id="referral_date"
                                        type="date"
                                        value={data.referral_date}
                                        onChange={(e) => setData('referral_date', e.target.value)}
                                    />
                                    {errors.referral_date && <p className="text-sm text-red-500">{errors.referral_date}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="diagnosis">Diagnosis</Label>
                                    <Input
                                        id="diagnosis"
                                        value={data.diagnosis}
                                        onChange={(e) => setData('diagnosis', e.target.value)}
                                        placeholder="Masukkan diagnosis"
                                    />
                                    {errors.diagnosis && <p className="text-sm text-red-500">{errors.diagnosis}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="doctor">Dokter</Label>
                                    <Input
                                        id="doctor"
                                        value={data.doctor}
                                        onChange={(e) => setData('doctor', e.target.value)}
                                        placeholder="Masukkan nama dokter"
                                    />
                                    {errors.doctor && <p className="text-sm text-red-500">{errors.doctor}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="referred_to">Dirujuk Ke</Label>
                                    <Input
                                        id="referred_to"
                                        value={data.referred_to}
                                        onChange={(e) => setData('referred_to', e.target.value)}
                                        placeholder="Masukkan tujuan rujukan"
                                    />
                                    {errors.referred_to && <p className="text-sm text-red-500">{errors.referred_to}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="Pilih status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Menunggu</SelectItem>
                                            <SelectItem value="completed">Selesai</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="reason">Alasan Rujukan</Label>
                                <Textarea
                                    id="reason"
                                    value={data.reason}
                                    onChange={(e) => setData('reason', e.target.value)}
                                    placeholder="Masukkan alasan rujukan"
                                />
                                {errors.reason && <p className="text-sm text-red-500">{errors.reason}</p>}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Link href={route('referrals.index')}>
                                <Button variant="outline" type="button">
                                    Batal
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                Simpan
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
