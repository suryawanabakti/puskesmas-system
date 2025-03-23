<?php
// app/Http/Controllers/MedicineController.php
namespace App\Http\Controllers;

use App\Models\Medicine;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MedicineController extends Controller
{
    public function index()
    {
        $medicines = Medicine::latest()->paginate(10);

        return Inertia::render('Medicines/Index', [
            'medicines' => $medicines
        ]);
    }

    public function create()
    {
        return Inertia::render('Medicines/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'unit' => 'required|string|max:50',
            'stock' => 'required|integer|min:0',
            'expiry_date' => 'required|date',
            'supplier' => 'required|string|max:255',
        ]);

        // Generate medicine_id
        $latestMedicine = Medicine::latest()->first();
        $medicineId = 'M001';

        if ($latestMedicine) {
            $lastId = (int)substr($latestMedicine->medicine_id, 1);
            $medicineId = 'M' . str_pad($lastId + 1, 3, '0', STR_PAD_LEFT);
        }

        $validated['medicine_id'] = $medicineId;

        Medicine::create($validated);

        return redirect()->route('medicines.index')
            ->with('message', 'Obat berhasil ditambahkan.');
    }

    public function show(Medicine $medicine)
    {
        return Inertia::render('Medicines/Show', [
            'medicine' => $medicine
        ]);
    }

    public function edit(Medicine $medicine)
    {
        return Inertia::render('Medicines/Edit', [
            'medicine' => $medicine
        ]);
    }

    public function update(Request $request, Medicine $medicine)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'unit' => 'required|string|max:50',
            'stock' => 'required|integer|min:0',
            'expiry_date' => 'required|date',
            'supplier' => 'required|string|max:255',
        ]);

        $medicine->update($validated);

        return redirect()->route('medicines.index')
            ->with('message', 'Obat berhasil diperbarui.');
    }

    public function destroy(Medicine $medicine)
    {
        // Check if medicine is used in any prescription
        if ($medicine->prescriptions()->count() > 0) {
            return redirect()->route('medicines.index')
                ->with('error', 'Obat tidak dapat dihapus karena sedang digunakan dalam resep.');
        }

        $medicine->delete();

        return redirect()->route('medicines.index')
            ->with('message', 'Obat berhasil dihapus.');
    }
}
