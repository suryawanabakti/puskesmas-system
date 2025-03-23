<?php
// app/Models/Medicine.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Medicine extends Model
{
    use HasFactory;

    protected $fillable = [
        'medicine_id',
        'name',
        'category',
        'unit',
        'stock',
        'expiry_date',
        'supplier'
    ];

    public function prescriptions(): HasMany
    {
        return $this->hasMany(MedicinePrescription::class);
    }
}
