// resources/js/Pages/Medicines/Show.tsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Medicine } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit } from 'lucide-react';

interface MedicinesShowProps {
    medicine: Medicine;
}

export default function MedicinesShow({ medicine }: MedicinesShowProps) {
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
            title: medicine.name,
            href: `/medicines/${medicine.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Obat: ${medicine.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Detail Obat</h1>
                    <Link href={route('medicines.edit', medicine.id)}>
                        <Button size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Obat</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">ID Obat</h3>
                                <p className="text-lg font-semibold">{medicine.medicine_id}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Nama Obat</h3>
                                <p className="text-lg font-semibold">{medicine.name}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Kategori</h3>
                                <p className="text-lg">{medicine.category}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Satuan</h3>
                                <p className="text-lg">{medicine.unit}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Stok</h3>
                                <Badge variant={medicine.stock > 100 ? 'default' : 'destructive'}>{medicine.stock}</Badge>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Tanggal Kadaluarsa</h3>
                                <p className="text-lg">{medicine.expiry_date}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Supplier</h3>
                                <p className="text-lg">{medicine.supplier}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Tanggal Ditambahkan</h3>
                                <p className="text-lg">{medicine.created_at}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground text-sm font-medium">Terakhir Diperbarui</h3>
                                <p className="text-lg">{medicine.updated_at}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
