<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'pasien'
        ]);
        // Generate patient_id
        $latestPatient = Patient::latest()->first();
        $patientId = 'P001';

        if ($latestPatient) {
            $lastId = (int)substr($latestPatient->patient_id, 1);
            $patientId = 'P' . str_pad($lastId + 1, 3, '0', STR_PAD_LEFT);
        }

        Patient::create([
            "patient_id" => $patientId,
            "user_id" => $user->id,
            "nik" => $request->nik,
            "name" => $request->name,
            "gender" => $request->gender,
            "birth_date" => $request->birth_date,
            "address" => $request->address,
            "phone" => $request->phone,
            "status" => "active"
        ]);

        event(new Registered($user));

        Auth::login($user);

        return to_route('dashboard');
    }
}
