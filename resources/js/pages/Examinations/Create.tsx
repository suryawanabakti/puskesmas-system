// resources/js/Pages/Examinations/Create.tsx
import PrescriptionForm from '@/components/prescription-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Medicine, type Patient } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

interface ExaminationsCreateProps {
    patients: Patient[];
    medicines: Medicine[];
}

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
        title: 'Tambah',
        href: '/examinations/create',
    },
];

export default function ExaminationsCreate({ patients, medicines }: ExaminationsCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        patient_id: '',
        complaint: '',
        diagnosis: '',
        treatment: '',
        doctor: '',
        examination_date: new Date().toISOString().split('T')[0],
        prescriptions: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('examinations.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Pemeriksaan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">Tambah Pemeriksaan Baru</h1>

                <Card>
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Data Pemeriksaan</CardTitle>
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
                                    <Label htmlFor="examination_date">Tanggal Pemeriksaan</Label>
                                    <Input
                                        id="examination_date"
                                        type="date"
                                        value={data.examination_date}
                                        onChange={(e) => setData('examination_date', e.target.value)}
                                    />
                                    {errors.examination_date && <p className="text-sm text-red-500">{errors.examination_date}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="complaint">Keluhan</Label>
                                <Textarea
                                    id="complaint"
                                    value={data.complaint}
                                    onChange={(e) => setData('complaint', e.target.value)}
                                    placeholder="Masukkan keluhan pasien"
                                />
                                {errors.complaint && <p className="text-sm text-red-500">{errors.complaint}</p>}
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
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
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="treatment">Penanganan</Label>
                                <Textarea
                                    id="treatment"
                                    value={data.treatment}
                                    onChange={(e) => setData('treatment', e.target.value)}
                                    placeholder="Masukkan penanganan yang diberikan"
                                />
                                {errors.treatment && <p className="text-sm text-red-500">{errors.treatment}</p>}
                            </div>

                            <div className="border-t pt-4">
                                <PrescriptionForm
                                    prescriptions={data.prescriptions}
                                    setPrescriptions={(prescriptions) => setData('prescriptions', prescriptions)}
                                    medicines={medicines}
                                    errors={errors}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Link href={route('examinations.index')}>
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
