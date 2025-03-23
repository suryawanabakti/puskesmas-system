<?php
// database/migrations/xxxx_xx_xx_create_referrals_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('referrals', function (Blueprint $table) {
            $table->id();
            $table->string('referral_id')->unique();
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            $table->text('diagnosis');
            $table->string('referred_to');
            $table->text('reason');
            $table->enum('status', ['pending', 'completed'])->default('pending');
            $table->string('doctor');
            $table->date('referral_date');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('referrals');
    }
};
