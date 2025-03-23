<?php
// database/migrations/xxxx_xx_xx_create_examinations_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('examinations', function (Blueprint $table) {
            $table->id();
            $table->string('examination_id')->unique();
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            $table->text('complaint');
            $table->text('diagnosis');
            $table->text('treatment');
            $table->string('doctor');
            $table->date('examination_date');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('examinations');
    }
};
