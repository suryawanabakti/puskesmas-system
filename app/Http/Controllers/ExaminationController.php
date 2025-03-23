<?php

// app/Http/Controllers/ExaminationController.php
namespace App\Http\Controllers;

use App\Models\Examination;
use App\Models\Patient;
use App\Models\Medicine;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExaminationController extends Controller
{
    public function index()
    {
        $examinations = Examination::with('patient')
            ->latest()
            ->paginate(10);

        return Inertia::render('Examinations/Index', [
            'examinations' => $examinations
        ]);
    }

    public function create()
    {
        $patients = Patient::where('status', 'active')
            ->select('id', 'patient_id', 'name')
            ->get();

        $medicines = Medicine::select('id', 'medicine_id', 'name', 'unit')
            ->get();

        return Inertia::render('Examinations/Create', [
            'patients' => $patients,
            'medicines' => $medicines
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'complaint' => 'required|string',
            'diagnosis' => 'required|string',
            'treatment' => 'required|string',
            'doctor' => 'required|string',
            'examination_date' => 'required|date',
            'prescriptions' => 'nullable|array',
            'prescriptions.*.medicine_id' => 'required|exists:medicines,id',
            'prescriptions.*.dosage' => 'required|string',
            'prescriptions.*.quantity' => 'required|integer|min:1',
            'prescriptions.*.instructions' => 'required|string',
        ]);

        // Generate examination_id
        $latestExamination = Examination::latest()->first();
        $examinationId = 'E001';

        if ($latestExamination) {
            $lastId = (int)substr($latestExamination->examination_id, 1);
            $examinationId = 'E' . str_pad($lastId + 1, 3, '0', STR_PAD_LEFT);
        }

        $examination = Examination::create([
            'examination_id' => $examinationId,
            'patient_id' => $validated['patient_id'],
            'complaint' => $validated['complaint'],
            'diagnosis' => $validated['diagnosis'],
            'treatment' => $validated['treatment'],
            'doctor' => $validated['doctor'],
            'examination_date' => $validated['examination_date'],
        ]);

        // Create prescriptions if any
        if (isset($validated['prescriptions']) && count($validated['prescriptions']) > 0) {
            foreach ($validated['prescriptions'] as $prescription) {
                $examination->prescriptions()->create([
                    'medicine_id' => $prescription['medicine_id'],
                    'dosage' => $prescription['dosage'],
                    'quantity' => $prescription['quantity'],
                    'instructions' => $prescription['instructions'],
                ]);

                // Update medicine stock
                $medicine = Medicine::find($prescription['medicine_id']);
                $medicine->stock -= $prescription['quantity'];
                $medicine->save();
            }
        }

        return redirect()->route('examinations.index')
            ->with('message', 'Pemeriksaan berhasil ditambahkan.');
    }

    public function show(Examination $examination)
    {
        $examination->load(['patient', 'prescriptions.medicine']);

        return Inertia::render('Examinations/Show', [
            'examination' => $examination
        ]);
    }

    public function edit(Examination $examination)
    {
        $examination->load('prescriptions.medicine');

        $patients = Patient::where('status', 'active')
            ->select('id', 'patient_id', 'name')
            ->get();

        $medicines = Medicine::select('id', 'medicine_id', 'name', 'unit')
            ->get();

        return Inertia::render('Examinations/Edit', [
            'examination' => $examination,
            'patients' => $patients,
            'medicines' => $medicines
        ]);
    }

    public function update(Request $request, Examination $examination)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'complaint' => 'required|string',
            'diagnosis' => 'required|string',
            'treatment' => 'required|string',
            'doctor' => 'required|string',
            'examination_date' => 'required|date',
            'prescriptions' => 'nullable|array',
            'prescriptions.*.id' => 'nullable|exists:medicine_prescriptions,id',
            'prescriptions.*.medicine_id' => 'required|exists:medicines,id',
            'prescriptions.*.dosage' => 'required|string',
            'prescriptions.*.quantity' => 'required|integer|min:1',
            'prescriptions.*.instructions' => 'required|string',
        ]);

        $examination->update([
            'patient_id' => $validated['patient_id'],
            'complaint' => $validated['complaint'],
            'diagnosis' => $validated['diagnosis'],
            'treatment' => $validated['treatment'],
            'doctor' => $validated['doctor'],
            'examination_date' => $validated['examination_date'],
        ]);

        // Handle prescriptions
        if (isset($validated['prescriptions'])) {
            // Get current prescriptions
            $currentPrescriptions = $examination->prescriptions->keyBy('id');

            foreach ($validated['prescriptions'] as $prescriptionData) {
                if (isset($prescriptionData['id']) && $currentPrescriptions->has($prescriptionData['id'])) {
                    // Update existing prescription
                    $prescription = $currentPrescriptions->get($prescriptionData['id']);

                    // Adjust medicine stock
                    $medicine = Medicine::find($prescriptionData['medicine_id']);
                    $medicine->stock += $prescription->quantity; // Return old quantity
                    $medicine->stock -= $prescriptionData['quantity']; // Deduct new quantity
                    $medicine->save();

                    $prescription->update([
                        'medicine_id' => $prescriptionData['medicine_id'],
                        'dosage' => $prescriptionData['dosage'],
                        'quantity' => $prescriptionData['quantity'],
                        'instructions' => $prescriptionData['instructions'],
                    ]);

                    // Remove from current prescriptions
                    $currentPrescriptions->forget($prescriptionData['id']);
                } else {
                    // Create new prescription
                    $examination->prescriptions()->create([
                        'medicine_id' => $prescriptionData['medicine_id'],
                        'dosage' => $prescriptionData['dosage'],
                        'quantity' => $prescriptionData['quantity'],
                        'instructions' => $prescriptionData['instructions'],
                    ]);

                    // Update medicine stock
                    $medicine = Medicine::find($prescriptionData['medicine_id']);
                    $medicine->stock -= $prescriptionData['quantity'];
                    $medicine->save();
                }
            }

            // Delete removed prescriptions
            foreach ($currentPrescriptions as $prescription) {
                // Return medicine to stock
                $medicine = Medicine::find($prescription->medicine_id);
                $medicine->stock += $prescription->quantity;
                $medicine->save();

                $prescription->delete();
            }
        }

        return redirect()->route('examinations.index')
            ->with('message', 'Pemeriksaan berhasil diperbarui.');
    }

    public function destroy(Examination $examination)
    {
        // Return medicine quantities to stock
        foreach ($examination->prescriptions as $prescription) {
            $medicine = Medicine::find($prescription->medicine_id);
            $medicine->stock += $prescription->quantity;
            $medicine->save();
        }

        $examination->delete();

        return redirect()->route('examinations.index')
            ->with('message', 'Pemeriksaan berhasil dihapus.');
    }
}
