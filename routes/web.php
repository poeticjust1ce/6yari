<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// public controllers
use App\Http\Controllers\BookingController;
use App\Http\Controllers\DashboardController;

// admin controllers
use App\Http\Controllers\Admin\CalendarController;
use App\Http\Controllers\Admin\BookingController as AdminBookingController;


Route::inertia('/', 'welcome')->name('home');

Route::inertia('book', 'book')->name('book');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)
        ->name('dashboard');

    Route::get('/admin/bookings', [AdminBookingController::class, 'index'])
        ->name('admin.bookings.index');

    Route::get('/admin/bookings/{booking}', [AdminBookingController::class, 'show'])
        ->name('admin.bookings.show');

        Route::get('/admin/calendar', [CalendarController::class, 'index'])
    ->name('admin.calendar');

        Route::patch('/admin/bookings/{booking}/status', [
    AdminBookingController::class,
    'updateStatus',
])->name('admin.bookings.status');
});

// Create booking
Route::post('/bookings', [BookingController::class, 'store']);

// View booking
Route::get('/bookings/{reference}', [BookingController::class, 'show'])
    ->name('bookings.show');

require __DIR__.'/settings.php';