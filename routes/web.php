<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\WordController;
use App\Http\Controllers\AuthController;

// PUBLIC ROUTES
Route::get('/', [WordController::class, 'index']) -> name('home'); //registers a route for the homepage URL
Route::get('/words/show/{id}', [WordController::class, 'show']) -> name('words.show'); //here, the brower requests information

// LOGIN ROUTES
Route::middleware('guest')->group(function() {
    Route::get('/login', [AuthController::class, 'create'])->name('login');
    Route::post('/login', [AuthController::class, 'store'])->name('login.store');
});

// PROTECTED ROUTES
Route::middleware('auth')->group(function() {
    Route::post('/', [WordController::class, 'store']) -> name('words.store'); // Route::post() defines a route that accepts POST requests.
    Route::delete('/words/delete/{id}', [WordController::class, 'destroy']) -> name('words.destroy');
    Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');
});