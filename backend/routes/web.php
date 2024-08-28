<?php

use Illuminate\Support\Facades\Route;

// Rute web Anda
Route::get('/', function () {
    return view('welcome');
});

// Import rute API
require base_path('routes/api.php');
