<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('temperature', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('patient_temp')->default(0);
            $table->integer('score')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('temperature');
    }
};
