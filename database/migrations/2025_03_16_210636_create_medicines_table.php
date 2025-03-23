<?php
// database/migrations/xxxx_xx_xx_create_medicines_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('medicines', function (Blueprint $table) {
            $table->id();
            $table->string('medicine_id')->unique();
            $table->string('name');
            $table->string('category');
            $table->string('unit');
            $table->integer('stock')->default(0);
            $table->date('expiry_date');
            $table->string('supplier');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('medicines');
    }
};
