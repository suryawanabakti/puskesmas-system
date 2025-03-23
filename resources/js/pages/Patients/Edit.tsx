// resources/js/Pages/Patients/Edit.tsx
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

interface PatientsEditProps {
    patient: Patient;
}

export default function PatientsEdit({ patient }: PatientsEditProps) {
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
            title: `Edit: ${patient.name}`,
            href: `/patients/${patient.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        nik: patient.nik || '',
        name: patient.name || '',
        gender: patient.gender || '',
        birth_date: patient.birth_date || '',
        address: patient.address || '',
        phone: patient.phone || '',
        status: patient.status || 'active',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('patients.update', patient.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Pasien: ${patient.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">Edit Data Pasien</h1>

                <Card>
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Data Pasien: {patient.patient_id}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="nik">NIK</Label>
                                    <Input id="nik" value={data.nik} onChange={(e) => setData('nik', e.target.value)} placeholder="Masukkan NIK" />
                                    {errors.nik && <p className="text-sm text-red-500">{errors.nik}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Lengkap</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Masukkan nama lengkap"
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Jenis Kelamin</Label>
                                    <Select value={data.gender} onValueChange={(value) => setData('gender', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih jenis kelamin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                            <SelectItem value="Perempuan">Perempuan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="birth_date">Tanggal Lahir</Label>
                                    <Input
                                        id="birth_date"
                                        type="date"
                                        value={data.birth_date}
                                        onChange={(e) => setData('birth_date', e.target.value)}
                                    />
                                    {errors.birth_date && <p className="text-sm text-red-500">{errors.birth_date}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Alamat</Label>
                                <Textarea
                                    id="address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    placeholder="Masukkan alamat lengkap"
                                />
                                {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Nomor Telepon</Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="Masukkan nomor telepon"
                                    />
                                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Aktif</SelectItem>
                                            <SelectItem value="inactive">Tidak Aktif</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Link href={route('patients.index')}>
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
