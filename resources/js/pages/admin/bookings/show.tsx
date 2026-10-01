import { Head, Link, router } from "@inertiajs/react";
import {
    ArrowLeft,
    CalendarDays,
    Clock3,
    Mail,
    MapPin,
    Phone,
    User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";

import { toast } from "sonner";

type Booking = {
    id: number;
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
    status: string;
    created_at: string;
};

type Props = {
    booking: Booking;
};

const purposeLabels: Record<string, string> = {
    gaming: "Gaming",
    development: "Development",
    creative: "Creative",
    work: "Work",
};

const meetingLabels: Record<string, string> = {
    video: "Video Call",
    phone: "Phone Call",
    "in-person": "In Person",
};

const statusLabels: Record<string, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    completed: "Completed",
    cancelled: "Cancelled",
};

function formatDate(value: string) {
    return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

function formatTime(value: string) {
    const [hours, minutes] = value.split(":");
    const hour = Number(hours);

    const displayHour = hour % 12 || 12;
    const period = hour >= 12 ? "PM" : "AM";

    return `${displayHour}:${minutes} ${period}`;
}

function getStatusClass(status: string) {
    switch (status) {
        case "confirmed":
            return "bg-emerald-500/10 text-emerald-600";

        case "completed":
            return "bg-blue-500/10 text-blue-600";

        case "cancelled":
            return "bg-red-500/10 text-red-600";

        default:
            return "bg-yellow-500/10 text-yellow-600";
    }
}

export default function Show({ booking }: Props) {
    const [status, setStatus] = useState(booking.status);
    const [updating, setUpdating] = useState(false);

    function updateStatus() {
        setUpdating(true);

        router.patch(
            `/admin/bookings/${booking.id}/status`,
            { status },
            {
                preserveScroll: true,

                onSuccess: () => {
                    toast("Booking status updated", {
                        description: `Status changed to ${
                            statusLabels[status] ?? status
                        }.`,
                    });
                },

                onError: () => {
                    toast.error("Failed to update booking status", {
                        description: "Something went wrong. Please try again.",
                    });

                    setStatus(booking.status);
                },

                onFinish: () => {
                    setUpdating(false);
                },
            },
        );
    }
    const budget =
        booking.budget === "custom" ? booking.custom_budget : booking.budget;

    return (
        <>
            <Head title={`Booking ${booking.reference}`} />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/bookings">
                            <ArrowLeft />
                        </Link>
                    </Button>

                    <div>
                        <p className="text-sm text-muted-foreground">Booking</p>

                        <h1 className="text-2xl font-semibold tracking-tight">
                            {booking.reference}
                        </h1>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                    <div className="space-y-6">
                        <section className="rounded-xl border bg-card p-6">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                                    <User className="size-4 text-primary" />
                                </div>

                                <div>
                                    <h2 className="font-semibold">Customer</h2>

                                    <p className="text-sm text-muted-foreground">
                                        Contact information
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Name
                                    </p>

                                    <p className="mt-1 font-medium">
                                        {booking.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Email
                                    </p>

                                    <div className="mt-1 flex items-center gap-2">
                                        <Mail className="size-4 text-muted-foreground" />

                                        <p className="font-medium">
                                            {booking.email}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Phone
                                    </p>

                                    <div className="mt-1 flex items-center gap-2">
                                        <Phone className="size-4 text-muted-foreground" />

                                        <p className="font-medium">
                                            {booking.phone}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-xl border bg-card p-6">
                            <h2 className="mb-5 font-semibold">Consultation</h2>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Purpose
                                    </p>

                                    <p className="mt-1 font-medium">
                                        {purposeLabels[booking.purpose] ??
                                            booking.purpose}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Budget
                                    </p>

                                    <p className="mt-1 font-medium">
                                        {budget
                                            ? `₱${Number(budget).toLocaleString()}`
                                            : "Not specified"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Meeting type
                                    </p>

                                    <p className="mt-1 font-medium">
                                        {meetingLabels[booking.meeting_type] ??
                                            booking.meeting_type}
                                    </p>
                                </div>

                                {booking.location && (
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Location
                                        </p>

                                        <div className="mt-1 flex items-center gap-2">
                                            <MapPin className="size-4 text-muted-foreground" />

                                            <p className="font-medium">
                                                {booking.location}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section className="rounded-xl border bg-card p-6">
                            <h2 className="mb-5 font-semibold">Appointment</h2>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Date
                                    </p>

                                    <div className="mt-1 flex items-center gap-2">
                                        <CalendarDays className="size-4 text-muted-foreground" />

                                        <p className="font-medium">
                                            {formatDate(booking.date)}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Time
                                    </p>

                                    <div className="mt-1 flex items-center gap-2">
                                        <Clock3 className="size-4 text-muted-foreground" />

                                        <p className="font-medium">
                                            {formatTime(booking.time)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className="h-fit rounded-xl border bg-card p-6">
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Booking status
                                </p>

                                <div className="mt-2">
                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${getStatusClass(
                                            status,
                                        )}`}
                                    >
                                        {statusLabels[status] ?? status}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="booking-status"
                                    className="text-sm font-medium"
                                >
                                    Change status
                                </label>

                                <select
                                    id="booking-status"
                                    value={status}
                                    onChange={(event) =>
                                        setStatus(event.target.value)
                                    }
                                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>

                            <Button
                                type="button"
                                className="w-full"
                                disabled={updating || status === booking.status}
                                onClick={updateStatus}
                            >
                                {updating ? "Updating..." : "Update status"}
                            </Button>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
}
