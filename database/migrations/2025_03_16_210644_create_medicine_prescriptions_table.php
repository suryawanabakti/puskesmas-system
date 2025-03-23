<?php
// database/migrations/xxxx_xx_xx_create_medicine_prescriptions_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('medicine_prescriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('examination_id')->constrained()->onDelete('cascade');
            $table->foreignId('medicine_id')->constrained()->onDelete('cascade');
            $table->string('dosage');
            $table->integer('quantity');
            $table->text('instructions');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('medicine_prescriptions');
    }
};
