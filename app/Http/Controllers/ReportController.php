<?php

// app/Http/Controllers/ReportController.php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\Examination;
use App\Models\Referral;
use App\Models\Medicine;
use App\Models\MedicinePrescription;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function index()
    {
        // Statistik umum
        $statistics = [
            'totalPatients' => Patient::count(),
            'newPatientsThisMonth' => Patient::whereMonth('created_at', Carbon::now()->month)
                ->whereYear('created_at', Carbon::now()->year)
                ->count(),
            'totalExaminations' => Examination::count(),
            'examinationsThisMonth' => Examination::whereMonth('examination_date', Carbon::now()->month)
                ->whereYear('examination_date', Carbon::now()->year)
                ->count(),
            'totalReferrals' => Referral::count(),
            'referralsThisMonth' => Referral::whereMonth('referral_date', Carbon::now()->month)
                ->whereYear('referral_date', Carbon::now()->year)
                ->count(),
            'totalMedicines' => Medicine::count(),
            'lowStockMedicines' => Medicine::where('stock', '<', 50)->count(),
        ];

        // Data untuk grafik pasien (6 bulan terakhir)
        $patientData = $this->getMonthlyData(Patient::class, 'created_at', 6);

        // Data untuk grafik pemeriksaan (6 bulan terakhir)
        $examinationData = $this->getMonthlyData(Examination::class, 'examination_date', 6);

        // Data untuk grafik rujukan (6 bulan terakhir)
        $referralData = $this->getMonthlyData(Referral::class, 'referral_date', 6);

        // Data untuk grafik obat (penggunaan 6 bulan terakhir)
        $medicineUsageData = $this->getMedicineUsageData(6);

        // Top 10 obat yang paling sering diresepkan
        $topMedicines = MedicinePrescription::select('medicine_id', DB::raw('count(*) as count'))
            ->with('medicine:id,name')
            ->groupBy('medicine_id')
            ->orderBy('count', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->medicine->name ?? 'Unknown',
                    'count' => $item->count,
                ];
            });

        // Distribusi diagnosis
        $diagnosisDistribution = Examination::select('diagnosis', DB::raw('count(*) as count'))
            ->groupBy('diagnosis')
            ->orderBy('count', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->diagnosis,
                    'count' => $item->count,
                ];
            });

        return Inertia::render('Reports/Index', [
            'statistics' => $statistics,
            'patientData' => $patientData,
            'examinationData' => $examinationData,
            'medicineData' => $medicineUsageData,
            'referralData' => $referralData,
            'topMedicines' => $topMedicines,
            'diagnosisDistribution' => $diagnosisDistribution,
        ]);
    }

    public function print(Request $request, $type)
    {
        $startDate = $request->input('start', Carbon::now()->subMonth()->format('Y-m-d'));
        $endDate = $request->input('end', Carbon::now()->format('Y-m-d'));

        $data = [];

        switch ($type) {
            case 'patients':
                $data = Patient::whereBetween('created_at', [$startDate, $endDate])
                    ->orderBy('created_at', 'desc')
                    ->get();
                break;

            case 'examinations':
                $data = Examination::with('patient:id,name,patient_id')
                    ->whereBetween('examination_date', [$startDate, $endDate])
                    ->orderBy('examination_date', 'desc')
                    ->get();
                break;

            case 'referrals':
                $data = Referral::with('patient:id,name,patient_id')
                    ->whereBetween('referral_date', [$startDate, $endDate])
                    ->orderBy('referral_date', 'desc')
                    ->get();
                break;

            case 'medicines':
                $data = Medicine::orderBy('name')
                    ->get();
                break;
        }

        return Inertia::render('Reports/Print', [
            'reportType' => $type,
            'period' => [
                'start' => $startDate,
                'end' => $endDate,
            ],
            'data' => $data,
        ]);
    }

    private function getMonthlyData($model, $dateField, $months)
    {
        $labels = [];
        $data = [];

        for ($i = $months - 1; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $labels[] = $date->format('M Y');

            $count = $model::whereMonth($dateField, $date->month)
                ->whereYear($dateField, $date->year)
                ->count();

            $data[] = $count;
        }

        return [
            'labels' => $labels,
            'data' => $data,
        ];
    }

    private function getMedicineUsageData($months)
    {
        $labels = [];
        $data = [];

        for ($i = $months - 1; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $labels[] = $date->format('M Y');

            $count = MedicinePrescription::whereHas('examination', function ($query) use ($date) {
                $query->whereMonth('examination_date', $date->month)
                    ->whereYear('examination_date', $date->year);
            })->count();

            $data[] = $count;
        }

        return [
            'labels' => $labels,
            'data' => $data,
        ];
    }
}
