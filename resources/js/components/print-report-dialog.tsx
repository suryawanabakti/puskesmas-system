// resources/js/Pages/Reports/components/print-report-dialog.tsx
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Printer } from 'lucide-react';
import { useState } from 'react';

interface PrintReportDialogProps {
    reportType: 'patients' | 'examinations' | 'referrals' | 'medicines';
}

export default function PrintReportDialog({ reportType }: PrintReportDialogProps) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [format, setFormat] = useState('pdf');
    const [open, setOpen] = useState(false);

    const handlePrint = () => {
        // In a real app, this would redirect to a print route with the selected parameters
        window.open(`/reports/${reportType}/print?start=${startDate}&end=${endDate}&format=${format}`, '_blank');
        setOpen(false);
    };

    const reportTitles = {
        patients: 'Laporan Data Pasien',
        examinations: 'Laporan Pemeriksaan',
        referrals: 'Laporan Rujukan',
        medicines: 'Laporan Stok Obat',
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Printer className="mr-2 h-4 w-4" />
                    Cetak Laporan
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Cetak {reportTitles[reportType]}</DialogTitle>
                    <DialogDescription>Pilih periode dan format laporan yang ingin dicetak.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="start-date" className="text-right">
                            Dari
                        </Label>
                        <Input id="start-date" type="date" className="col-span-3" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="end-date" className="text-right">
                            Sampai
                        </Label>
                        <Input id="end-date" type="date" className="col-span-3" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="format" className="text-right">
                            Format
                        </Label>
                        <Select value={format} onValueChange={setFormat}>
                            <SelectTrigger id="format" className="col-span-3">
                                <SelectValue placeholder="Pilih format" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pdf">PDF</SelectItem>
                                <SelectItem value="excel">Excel</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handlePrint}>
                        Cetak
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
