<?php
// app/Models/Referral.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Referral extends Model
{
    use HasFactory;

    protected $fillable = [
        'referral_id',
        'doctor_id',
        'patient_id',
        'diagnosis',
        'referred_to',
        'reason',
        'status',
        'doctor',
        'referral_date'
    ];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }
}
