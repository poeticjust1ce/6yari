import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import QRCode from "qrcode";

import Confirmation from "@/components/Booking/Confirmation";
import type { BookingData } from "@/types/booking";

type BookingRecord = {
    reference: string;
    name: string;
    email: string;
    phone: string;
    purpose: string;
    budget: string | null;
    custom_budget: string | null;
    meeting_type: string;
    date: string;
    time: string;
    location: string | null;
    created_at: string;
};

type Props = {
    booking: BookingRecord;
};

export default function BookingConfirmation({ booking }: Props) {
    const [qrCode, setQrCode] = useState("");

    useEffect(() => {
        QRCode.toDataURL(window.location.href, {
            width: 220,
            margin: 2,
            errorCorrectionLevel: "H",
        })
            .then(setQrCode)
            .catch(console.error);
    }, []);

    const bookingData: BookingData = {
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        purpose: booking.purpose,
        budget: booking.budget ?? "",
        customBudget: booking.custom_budget ?? "",
        meetingType: booking.meeting_type,
        date: booking.date ? new Date(`${booking.date}T00:00:00`) : undefined,
        time: booking.time,
        location: booking.location ?? "",
    };

    return (
        <>
            <Head title={`Booking ${booking.reference} | 6YARI`} />

            <main className="min-h-screen px-4 py-12 md:px-6 md:py-20">
                <div className="mx-auto w-full max-w-3xl space-y-6">
                    <Confirmation
                        data={bookingData}
                        reference={booking.reference}
                        submittedAt={new Date(booking.created_at)}
                    />
                </div>
            </main>
        </>
    );
}
