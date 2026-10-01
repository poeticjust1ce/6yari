<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function index()
    {
        $bookings = Booking::query()
            ->orderBy('date')
            ->orderBy('time')
            ->get([
                'id',
                'reference',
                'name',
                'purpose',
                'meeting_type',
                'date',
                'time',
                'status',
            ]);

        return Inertia::render('admin/calendar', [
            'bookings' => $bookings,
        ]);
    }
}