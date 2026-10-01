<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Update</title>
</head>

<body style="margin: 0; padding: 0; background: #f5f5f5; font-family: Arial, Helvetica, sans-serif; color: #171717;">

    <div style="padding: 40px 16px;">
        <div style="max-width: 560px; margin: 0 auto;">

            <div style="margin-bottom: 24px; text-align: center;">
                <div style="font-size: 24px; font-weight: 700;">6YARI</div>
            </div>

            <div style="overflow: hidden; border: 1px solid #e5e5e5; border-radius: 12px; background: #ffffff;">
                <div style="padding: 32px;">

                    <div style="margin-bottom: 20px; font-size: 12px; font-weight: 600; color: #737373; letter-spacing: 0.5px;">
                        BOOKING UPDATE
                    </div>

                    @if ($booking->status === 'confirmed')
                        <h1 style="margin: 0 0 12px; font-size: 26px;">
                            Your consultation is confirmed.
                        </h1>

                        <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #737373;">
                            Hi {{ $booking->name }}, your consultation with 6YARI has been confirmed. We look forward to speaking with you.
                        </p>

                    @elseif ($booking->status === 'cancelled')
                        <h1 style="margin: 0 0 12px; font-size: 26px;">
                            Your booking has been cancelled.
                        </h1>

                        <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #737373;">
                            Hi {{ $booking->name }}, your consultation booking with 6YARI has been cancelled. If you have questions or would like to book again, please contact us.
                        </p>

                    @elseif ($booking->status === 'completed')
                        <h1 style="margin: 0 0 12px; font-size: 26px;">
                            Thank you for choosing 6YARI.
                        </h1>

                        <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #737373;">
                            Hi {{ $booking->name }}, thank you for taking the time to consult with us. We appreciate your interest in 6YARI.
                        </p>
                    @endif

                    <div style="padding: 16px; border: 1px solid #e5e5e5; border-radius: 8px; background: #fafafa;">
                        <div style="margin-bottom: 6px; font-size: 11px; font-weight: 600; color: #737373; text-transform: uppercase;">
                            Booking Reference
                        </div>

                        <div style="font-size: 17px; font-weight: 600;">
                            {{ $booking->reference }}
                        </div>
                    </div>

                    <div style="margin-top: 24px;">
                        <div style="margin-bottom: 12px; font-size: 13px; font-weight: 600;">
                            Appointment Details
                        </div>

                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; font-size: 14px; color: #737373;">Date</td>
                                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; text-align: right;">
                                    {{ \Carbon\Carbon::parse($booking->date)->format('F j, Y') }}
                                </td>
                            </tr>

                            <tr>
                                <td style="padding: 8px 0; font-size: 14px; color: #737373;">Time</td>
                                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; text-align: right;">
                                    {{ \Carbon\Carbon::parse($booking->time)->format('g:i A') }}
                                </td>
                            </tr>

                            <tr>
                                <td style="padding: 8px 0; font-size: 14px; color: #737373;">Meeting</td>
                                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; text-align: right;">
                                    {{ ucfirst(str_replace('-', ' ', $booking->meeting_type)) }}
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div style="padding: 20px 32px; border-top: 1px solid #e5e5e5; background: #fafafa;">
                    <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #737373;">
                        This email was sent because your 6YARI booking was updated.
                    </p>
                </div>
            </div>

            <p style="padding-top: 20px; text-align: center; font-size: 11px; color: #a3a3a3;">
                © {{ date('Y') }} 6YARI
            </p>
        </div>
    </div>

</body>
</html>