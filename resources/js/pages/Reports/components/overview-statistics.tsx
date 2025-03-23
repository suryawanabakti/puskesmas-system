// resources/js/Pages/Reports/components/overview-statistics.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, AlertTriangle, Clipboard, Pill, Users } from 'lucide-react';

interface OverviewStatisticsProps {
    statistics: {
        totalPatients: number;
        newPatientsThisMonth: number;
        totalExaminations: number;
        examinationsThisMonth: number;
        totalReferrals: number;
        referralsThisMonth: number;
        totalMedicines: number;
        lowStockMedicines: number;
    };
}

export default function OverviewStatistics({ statistics }: OverviewStatisticsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Pasien</CardTitle>
                    <Users className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{statistics.totalPatients}</div>
                    <p className="text-muted-foreground text-xs">+{statistics.newPatientsThisMonth} pasien baru bulan ini</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Pemeriksaan</CardTitle>
                    <Clipboard className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{statistics.totalExaminations}</div>
                    <p className="text-muted-foreground text-xs">{statistics.examinationsThisMonth} pemeriksaan bulan ini</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Rujukan</CardTitle>
                    <Activity className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{statistics.totalReferrals}</div>
                    <p className="text-muted-foreground text-xs">{statistics.referralsThisMonth} rujukan bulan ini</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Stok Obat</CardTitle>
                    <Pill className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{statistics.totalMedicines}</div>
                    <p className="text-muted-foreground flex items-center text-xs">
                        <AlertTriangle className="mr-1 h-3 w-3 text-red-500" />
                        {statistics.lowStockMedicines} obat stok menipis
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
