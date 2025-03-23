<?php
// app/Http/Controllers/PatientController.php
namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index()
    {
        $patients = Patient::latest()->paginate(10);

        return Inertia::render('Patients/Index', [
            'patients' => $patients
        ]);
    }

    public function create()
    {
        return Inertia::render('Patients/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nik' => 'required|string|max:20|unique:patients',
            'name' => 'required|string|max:255',
            'gender' => 'required|in:Laki-laki,Perempuan',
            'birth_date' => 'required|date',
            'address' => 'required|string',
            'phone' => 'required|string|max:15',
            'status' => 'required|in:active,inactive',
        ]);

        // Generate patient_id
        $latestPatient = Patient::latest()->first();
        $patientId = 'P001';

        if ($latestPatient) {
            $lastId = (int)substr($latestPatient->patient_id, 1);
            $patientId = 'P' . str_pad($lastId + 1, 3, '0', STR_PAD_LEFT);
        }

        $validated['patient_id'] = $patientId;

        Patient::create($validated);

        return redirect()->route('patients.index')
            ->with('message', 'Pasien berhasil ditambahkan.');
    }

    public function show(Patient $patient)
    {
        $patient->load(['examinations', 'referrals']);

        return Inertia::render('Patients/Show', [
            'patient' => $patient
        ]);
    }

    public function edit(Patient $patient)
    {
        return Inertia::render('Patients/Edit', [
            'patient' => $patient
        ]);
    }

    public function update(Request $request, Patient $patient)
    {
        $validated = $request->validate([
            'nik' => 'required|string|max:20|unique:patients,nik,' . $patient->id,
            'name' => 'required|string|max:255',
            'gender' => 'required|in:Laki-laki,Perempuan',
            'birth_date' => 'required|date',
            'address' => 'required|string',
            'phone' => 'required|string|max:15',
            'status' => 'required|in:active,inactive',
        ]);

        $patient->update($validated);

        return redirect()->route('patients.index')
            ->with('message', 'Pasien berhasil diperbarui.');
    }

    public function destroy(Patient $patient)
    {
        $patient->delete();

        return redirect()->route('patients.index')
            ->with('message', 'Pasien berhasil dihapus.');
    }
}
