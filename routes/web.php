<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\WordController;

// NAVIGATION
Route::get('/', [WordController::class, 'index']) -> name('home'); //registers a route for the homepage URL

// CRUD
// Route::post() defines a route that accepts POST requests.
Route::post('/words', [WordController::class, 'store']) -> name('words.store'); 
Route::get('/words/show/{id}', [WordController::class, 'show']) -> name('words.show'); //here, the brower requests information