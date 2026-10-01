<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Booking Received</title>
</head>

<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif; color: #171717;">

    <div style="padding: 40px 16px;">

        <div style="max-width: 560px; margin: 0 auto;">

            <!-- Logo -->
            <div style="margin-bottom: 24px; text-align: center;">
                <div style="font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
                    6YARI
                </div>
            </div>

            <!-- Main card -->
            <div style="background: #ffffff; border: 1px solid #e5e5e5; border-radius: 12px; overflow: hidden;">

                <div style="padding: 32px;">

                    <div style="margin-bottom: 24px;">
                        <div style="display: inline-block; padding: 6px 10px; background: #f5f5f5; border-radius: 6px; font-size: 12px; font-weight: 600; color: #525252;">
                            BOOKING RECEIVED
                        </div>
                    </div>

                    <h1 style="margin: 0 0 12px; font-size: 28px; line-height: 1.2; letter-spacing: -0.5px;">
                        We've received your request.
                    </h1>

                    <p style="margin: 0 0 28px; font-size: 15px; line-height: 1.6; color: #737373;">
                        Hi {{ $booking->name }},
                        <br><br>
                        Thanks for booking a consultation with 6YARI. We've received your request and will review the details shortly.
                    </p>

                    <!-- Reference -->
                    <div style="margin-bottom: 24px; padding: 16px; background: #fafafa; border: 1px solid #e5e5e5; border-radius: 8px;">
                        <div style="margin-bottom: 5px; font-size: 11px; font-weight: 600; color: #737373; text-transform: uppercase; letter-spacing: 0.5px;">
                            Booking Reference
                        </div>

                        <div style="font-size: 17px; font-weight: 600; letter-spacing: 0.5px;">
                            {{ $booking->reference }}
                        </div>
                    </div>

                    <!-- Appointment -->
                    <div style="margin-bottom: 24px;">

                        <div style="margin-bottom: 12px; font-size: 13px; font-weight: 600; color: #525252;">
                            Appointment
                        </div>

                        <table style="width: 100%; border-collapse: collapse;">

                            <tr>
                                <td style="padding: 8px 0; font-size: 14px; color: #737373;">
                                    Date
                                </td>

                                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; text-align: right;">
                                    {{ \Carbon\Carbon::parse($booking->date)->format('F j, Y') }}
                                </td>
                            </tr>

                            <tr>
                                <td style="padding: 8px 0; font-size: 14px; color: #737373;">
                                    Time
                                </td>

                                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; text-align: right;">
                                    {{ \Carbon\Carbon::parse($booking->time)->format('g:i A') }}
                                </td>
                            </tr>

                            <tr>
                                <td style="padding: 8px 0; font-size: 14px; color: #737373;">
                                    Meeting
                                </td>

                                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; text-align: right;">
                                    {{ $booking->meeting_type }}
                                </td>
                            </tr>

                        </table>

                    </div>

                    <div style="height: 1px; background: #e5e5e5; margin: 24px 0;"></div>

                    <!-- Consultation -->
                    <div>

                        <div style="margin-bottom: 12px; font-size: 13px; font-weight: 600; color: #525252;">
                            Consultation Details
                        </div>

                        <table style="width: 100%; border-collapse: collapse;">

                            <tr>
                                <td style="padding: 8px 0; font-size: 14px; color: #737373;">
                                    Purpose
                                </td>

                                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; text-align: right;">
                                    {{ ucfirst($booking->purpose) }}
                                </td>
                            </tr>

                            <tr>
                                <td style="padding: 8px 0; font-size: 14px; color: #737373;">
                                    Budget
                                </td>

                                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; text-align: right;">
                                    {{ $booking->budget === 'custom' ? $booking->custom_budget : $booking->budget }}
                                </td>
                            </tr>

                        </table>

                    </div>

                </div>

                <!-- Footer -->
                <div style="padding: 20px 32px; background: #fafafa; border-top: 1px solid #e5e5e5;">

                    <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #737373;">
                        This email was sent because a consultation was booked through 6YARI.
                    </p>

                </div>

            </div>

            <div style="padding-top: 20px; text-align: center;">

                <p style="margin: 0; font-size: 11px; color: #a3a3a3;">
                    © {{ date('Y') }} 6YARI
                </p>

            </div>

        </div>

    </div>

</body>
</html>