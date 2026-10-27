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
        Schema::create('words', function (Blueprint $table) {
            $table->id();
            $table->string('word');
            $table->string('phonetics')->nullable();
            $table->string('type1')->nullable();
            $table->string('type2')->nullable();
            $table->text('def1')->nullable();
            $table->text('def1bis')->nullable();
            $table->text('def2')->nullable();
            $table->text('def2bis')->nullable();
            $table->string('source')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('words');
    }
};
