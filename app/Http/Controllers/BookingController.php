<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

use App\Mail\BookingReceived;
use Illuminate\Support\Facades\Mail;

class BookingController extends Controller
{

// store function
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:30'],

            'purpose' => ['required', 'string', 'max:50'],

            'budget' => ['required', 'string', 'max:50'],
            'customBudget' => ['nullable', 'string', 'max:50'],

            'meetingType' => ['required', 'string', 'max:50'],

            'date' => ['required', 'date'],
            'time' => ['required', 'date_format:H:i'],

            'location' => ['nullable', 'string', 'max:255'],
        ]);

        $reference = '6Y-' . strtoupper(Str::random(8));

        $booking = Booking::create([
            'reference' => $reference,

            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],

            'purpose' => $validated['purpose'],

            'budget' => $validated['budget'],
            'custom_budget' => $validated['customBudget'] ?? null,

            'meeting_type' => $validated['meetingType'],

            'date' => $validated['date'],
            'time' => $validated['time'],

            'location' => $validated['location'] ?? null,

        ]);


        Mail::to($booking->email)
    ->send(new BookingReceived($booking));
    
        return response()->json([
            'message' => 'Booking created successfully.',
            'reference' => $booking->reference,
            'booking' => $booking,
        ], 201);
    }

    // display booking by reference
     public function show(string $reference)
    {
        $booking = Booking::where('reference', $reference)
            ->firstOrFail();

        return Inertia::render('bookings', [
            'booking' => $booking,
        ]);
    }

 
}