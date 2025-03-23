<?php
// app/Http/Controllers/ReferralController.php
namespace App\Http\Controllers;

use App\Models\Referral;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReferralController extends Controller
{
    public function index()
    {
        $referrals = Referral::with('patient')
            ->latest()
            ->paginate(10);

        return Inertia::render('Referrals/Index', [
            'referrals' => $referrals
        ]);
    }

    public function create()
    {
        $patients = Patient::where('status', 'active')
            ->select('id', 'patient_id', 'name')
            ->get();

        return Inertia::render('Referrals/Create', [
            'patients' => $patients
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'diagnosis' => 'required|string',
            'referred_to' => 'required|string',
            'reason' => 'required|string',
            'status' => 'required|in:pending,completed',
            'doctor' => 'required|string',
            'referral_date' => 'required|date',
        ]);

        // Generate referral_id
        $latestReferral = Referral::latest()->first();
        $referralId = 'R001';

        if ($latestReferral) {
            $lastId = (int)substr($latestReferral->referral_id, 1);
            $referralId = 'R' . str_pad($lastId + 1, 3, '0', STR_PAD_LEFT);
        }

        $validated['referral_id'] = $referralId;

        Referral::create($validated);

        return redirect()->route('referrals.index')
            ->with('message', 'Rujukan berhasil ditambahkan.');
    }

    public function show(Referral $referral)
    {
        $referral->load('patient');

        return Inertia::render('Referrals/Show', [
            'referral' => $referral
        ]);
    }

    public function edit(Referral $referral)
    {
        $patients = Patient::where('status', 'active')
            ->select('id', 'patient_id', 'name')
            ->get();

        return Inertia::render('Referrals/Edit', [
            'referral' => $referral,
            'patients' => $patients
        ]);
    }

    public function update(Request $request, Referral $referral)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'diagnosis' => 'required|string',
            'referred_to' => 'required|string',
            'reason' => 'required|string',
            'status' => 'required|in:pending,completed',
            'doctor' => 'required|string',
            'referral_date' => 'required|date',
        ]);

        $referral->update($validated);

        return redirect()->route('referrals.index')
            ->with('message', 'Rujukan berhasil diperbarui.');
    }

    public function destroy(Referral $referral)
    {
        $referral->delete();

        return redirect()->route('referrals.index')
            ->with('message', 'Rujukan berhasil dihapus.');
    }
}
