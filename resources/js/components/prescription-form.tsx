// resources/js/Components/PrescriptionForm.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { type Medicine, type MedicinePrescription } from '@/types';
import { Plus, Trash2 } from 'lucide-react';

interface PrescriptionFormProps {
    prescriptions: Partial<MedicinePrescription>[];
    setPrescriptions: (prescriptions: Partial<MedicinePrescription>[]) => void;
    medicines: Medicine[];
    errors: Record<string, string>;
}

export default function PrescriptionForm({ prescriptions, setPrescriptions, medicines, errors }: PrescriptionFormProps) {
    const addPrescription = () => {
        setPrescriptions([
            ...prescriptions,
            {
                medicine_id: undefined,
                dosage: '',
                quantity: 1,
                instructions: '',
            },
        ]);
    };

    const removePrescription = (index: number) => {
        const newPrescriptions = [...prescriptions];
        newPrescriptions.splice(index, 1);
        setPrescriptions(newPrescriptions);
    };

    const updatePrescription = (index: number, field: keyof MedicinePrescription, value: any) => {
        const newPrescriptions = [...prescriptions];
        newPrescriptions[index] = {
            ...newPrescriptions[index],
            [field]: value,
        };
        setPrescriptions(newPrescriptions);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Resep Obat</h3>
                <Button type="button" onClick={addPrescription} variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Obat
                </Button>
            </div>

            {prescriptions.length === 0 && <p className="text-muted-foreground">Belum ada obat yang ditambahkan</p>}

            {prescriptions.map((prescription, index) => (
                <div key={index} className="space-y-4 rounded-md border p-4">
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium">Obat #{index + 1}</h4>
                        <Button
                            type="button"
                            onClick={() => removePrescription(index)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor={`medicine_${index}`}>Obat</Label>
                            <Select
                                value={prescription.medicine_id?.toString()}
                                onValueChange={(value) => updatePrescription(index, 'medicine_id', parseInt(value))}
                            >
                                <SelectTrigger id={`medicine_${index}`}>
                                    <SelectValue placeholder="Pilih obat" />
                                </SelectTrigger>
                                <SelectContent>
                                    {medicines.map((medicine) => (
                                        <SelectItem key={medicine.id} value={medicine.id.toString()}>
                                            {medicine.name} ({medicine.unit})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors[`prescriptions.${index}.medicine_id`] && (
                                <p className="text-sm text-red-500">{errors[`prescriptions.${index}.medicine_id`]}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor={`dosage_${index}`}>Dosis</Label>
                            <Input
                                id={`dosage_${index}`}
                                value={prescription.dosage}
                                onChange={(e) => updatePrescription(index, 'dosage', e.target.value)}
                                placeholder="Contoh: 3x1 tablet"
                            />
                            {errors[`prescriptions.${index}.dosage`] && (
                                <p className="text-sm text-red-500">{errors[`prescriptions.${index}.dosage`]}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor={`quantity_${index}`}>Jumlah</Label>
                            <Input
                                id={`quantity_${index}`}
                                type="number"
                                min="1"
                                value={prescription.quantity}
                                onChange={(e) => updatePrescription(index, 'quantity', parseInt(e.target.value))}
                            />
                            {errors[`prescriptions.${index}.quantity`] && (
                                <p className="text-sm text-red-500">{errors[`prescriptions.${index}.quantity`]}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor={`instructions_${index}`}>Instruksi</Label>
                            <Textarea
                                id={`instructions_${index}`}
                                value={prescription.instructions}
                                onChange={(e) => updatePrescription(index, 'instructions', e.target.value)}
                                placeholder="Instruksi penggunaan obat"
                            />
                            {errors[`prescriptions.${index}.instructions`] && (
                                <p className="text-sm text-red-500">{errors[`prescriptions.${index}.instructions`]}</p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
