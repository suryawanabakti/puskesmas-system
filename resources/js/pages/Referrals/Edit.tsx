// resources/js/Pages/Referrals/Edit.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Patient, type Referral } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

interface ReferralsEditProps {
    referral: Referral;
    patients: Patient[];
}

export default function ReferralsEdit({ referral, patients }: ReferralsEditProps) {
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
            title: `Edit: ${referral.referral_id}`,
            href: `/referrals/${referral.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        patient_id: referral.patient_id.toString(),
        diagnosis: referral.diagnosis || '',
        referred_to: referral.referred_to || '',
        reason: referral.reason || '',
        status: referral.status || 'pending',
        doctor: referral.doctor || '',
        referral_date: referral.referral_date || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('referrals.update', referral.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Rujukan: ${referral.referral_id}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">Edit Rujukan</h1>

                <Card>
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Data Rujukan: {referral.referral_id}</CardTitle>
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
                                Simpan Perubahan
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
