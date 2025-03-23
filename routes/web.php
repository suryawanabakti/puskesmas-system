<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ExaminationController;
use App\Http\Controllers\ReferralController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return redirect('/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('dashboard-dokter', function () {
        return Inertia::render('dokter/dashboard');
    })->name('dashboard.dokter');

    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');

    Route::resource('patients', PatientController::class);
    Route::resource('users', UserController::class);
    Route::resource('examinations', ExaminationController::class);
    Route::resource('referrals', ReferralController::class);
    Route::resource('medicines', MedicineController::class);
    Route::get('/reports/{type}/print', [ReportController::class, 'print'])->name('reports.print');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
