<?php
// app/Models/MedicinePrescription.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MedicinePrescription extends Model
{
    use HasFactory;

    protected $fillable = [
        'examination_id',
        'medicine_id',
        'dosage',
        'quantity',
        'instructions'
    ];

    public function examination(): BelongsTo
    {
        return $this->belongsTo(Examination::class);
    }

    public function medicine(): BelongsTo
    {
        return $this->belongsTo(Medicine::class);
    }
}
