<?php

namespace App\Mail;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingStatusUpdated extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Booking $booking,
        public string $previousStatus,
    ) {}

    public function envelope(): Envelope
    {
        $subject = match ($this->booking->status) {
            'confirmed' => 'Your 6YARI consultation is confirmed',
            'cancelled' => 'Your 6YARI consultation was cancelled',
            'completed' => 'Thank you for choosing 6YARI',
            default => 'Your 6YARI booking has been updated',
        };

        return new Envelope(subject: $subject);
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.bookings.status-updated',
        );
    }
}