// resources/js/Pages/Medicines/Edit.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Medicine } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

interface MedicinesEditProps {
    medicine: Medicine;
}

export default function MedicinesEdit({ medicine }: MedicinesEditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Obat',
            href: '/medicines',
        },
        {
            title: `Edit: ${medicine.name}`,
            href: `/medicines/${medicine.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: medicine.name || '',
        category: medicine.category || '',
        unit: medicine.unit || '',
        stock: medicine.stock || 0,
        expiry_date: medicine.expiry_date || '',
        supplier: medicine.supplier || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('medicines.update', medicine.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Obat: ${medicine.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">Edit Data Obat</h1>

                <Card>
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Data Obat: {medicine.medicine_id}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Obat</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Masukkan nama obat"
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Kategori</Label>
                                    <Input
                                        id="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        placeholder="Masukkan kategori obat"
                                    />
                                    {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="unit">Satuan</Label>
                                    <Input
                                        id="unit"
                                        value={data.unit}
                                        onChange={(e) => setData('unit', e.target.value)}
                                        placeholder="Contoh: Tablet, Kapsul, Botol"
                                    />
                                    {errors.unit && <p className="text-sm text-red-500">{errors.unit}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="stock">Stok</Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        min="0"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', parseInt(e.target.value))}
                                        placeholder="Masukkan jumlah stok"
                                    />
                                    {errors.stock && <p className="text-sm text-red-500">{errors.stock}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry_date">Tanggal Kadaluarsa</Label>
                                    <Input
                                        id="expiry_date"
                                        type="date"
                                        value={data.expiry_date}
                                        onChange={(e) => setData('expiry_date', e.target.value)}
                                    />
                                    {errors.expiry_date && <p className="text-sm text-red-500">{errors.expiry_date}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="supplier">Supplier</Label>
                                    <Input
                                        id="supplier"
                                        value={data.supplier}
                                        onChange={(e) => setData('supplier', e.target.value)}
                                        placeholder="Masukkan nama supplier"
                                    />
                                    {errors.supplier && <p className="text-sm text-red-500">{errors.supplier}</p>}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Link href={route('medicines.index')}>
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
