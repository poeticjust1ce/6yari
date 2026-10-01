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
        Schema::create('bookings', function (Blueprint $table) {
              $table->id();

        $table->string('reference')->unique();

        $table->string('name');
        $table->string('email');
        $table->string('phone');

        $table->string('purpose');

        $table->string('budget')->nullable();
        $table->string('custom_budget')->nullable();

        $table->string('meeting_type');

        $table->date('date');
        $table->string('time');

        $table->string('location')->nullable();

        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
