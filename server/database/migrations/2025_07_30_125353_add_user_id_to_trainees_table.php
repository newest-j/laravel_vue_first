<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
use App\Models\Trainee;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('trainees', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
        });

        // Create a default user for existing trainees
        $existingTrainees = Trainee::whereNull('user_id')->get();
        
        foreach ($existingTrainees as $trainee) {
            // Create a user for each existing trainee
            $user = User::create([
                'name' => $trainee->name,
                'email' => $trainee->name . '@example.com', // Temporary email
                'password' => bcrypt('password'), // Temporary password
            ]);
            
            $trainee->update(['user_id' => $user->id]);
        }

        // Make user_id required after populating
        Schema::table('trainees', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('trainees', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });
    }
};
