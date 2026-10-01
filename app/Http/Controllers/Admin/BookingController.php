<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use Inertia\Inertia;

use App\Mail\BookingStatusUpdated;
use Illuminate\Support\Facades\Mail;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::query()
            ->latest()
            ->paginate(15);

        return Inertia::render('admin/bookings/index', [
            'bookings' => $bookings,
        ]);
    }

    public function show(Booking $booking)
    {
        return Inertia::render('admin/bookings/show', [
            'booking' => $booking,
        ]);
    }
    public function updateStatus(Request $request, Booking $booking)
{
    $validated = $request->validate([
        'status' => [
            'required',
            'in:pending,confirmed,completed,cancelled',
        ],
    ]);

    $previousStatus = $booking->status;
    $newStatus = $validated['status'];

    // Avoid unnecessary updates and duplicate notifications.
    if ($previousStatus === $newStatus) {
        return back()->with('success', 'Booking status is unchanged.');
    }

    $booking->update([
        'status' => $newStatus,
    ]);

    // Notify the customer for these status changes.
    if (in_array($newStatus, ['confirmed', 'cancelled', 'completed'])) {
        Mail::to($booking->email)->send(
            new BookingStatusUpdated($booking, $previousStatus)
        );
    }

    return back()->with('success', 'Booking status updated.');
}
}