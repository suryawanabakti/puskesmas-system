<?php
// app/Models/Patient.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'nik',
        'name',
        'gender',
        'birth_date',
        'address',
        'phone',
        'status'
    ];

    public function examinations(): HasMany
    {
        return $this->hasMany(Examination::class);
    }

    public function referrals(): HasMany
    {
        return $this->hasMany(Referral::class);
    }
}
