<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $stats = [
            'total' => Booking::count(),

            'pending' => Booking::where('status', 'pending')
                ->count(),

            'today' => Booking::whereDate('date', now()->toDateString())
                ->count(),

            'completed' => Booking::where('status', 'completed')
                ->count(),
        ];

        $bookings = Booking::query()
            ->latest()
            ->limit(10)
            ->get([
                'id',
                'reference',
                'name',
                'email',
                'purpose',
                'date',
                'time',
                'status',
            ]);

        return Inertia::render('dashboard', [
            'bookings' => $bookings,
            'stats' => $stats,
        ]);
    }
}