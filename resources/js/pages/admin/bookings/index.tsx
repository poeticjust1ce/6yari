import { Head } from "@inertiajs/react";
import { CalendarCheck, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Link } from "@inertiajs/react";

import { Input } from "@/components/ui/input";

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

type Pagination<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
};

type BookingsProps = {
    bookings: Pagination<Booking>;
};
const purposeLabels: Record<string, string> = {
    gaming: "Gaming",
    development: "Development",
    creative: "Creative",
    work: "Work",
};

const statusLabels: Record<string, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    completed: "Completed",
    cancelled: "Cancelled",
};

function formatDate(value: string) {
    return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
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

export default function Bookings({ bookings }: BookingsProps) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredBookings = useMemo(() => {
        return bookings.data.filter((booking) => {
            const searchValue = search.toLowerCase();

            const matchesSearch =
                booking.reference.toLowerCase().includes(searchValue) ||
                booking.name.toLowerCase().includes(searchValue) ||
                booking.email.toLowerCase().includes(searchValue);

            const matchesStatus =
                statusFilter === "all" || booking.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [bookings, search, statusFilter]);

    return (
        <>
            <Head title="Bookings" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                            <CalendarCheck className="size-5 text-primary" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Bookings
                            </h1>

                            <p className="text-sm text-muted-foreground">
                                Manage customer consultations and appointments.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            placeholder="Search by name, email, or reference..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            className="pl-9"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(event.target.value)
                        }
                        className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                    >
                        <option value="all">All statuses</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <div className="overflow-hidden rounded-xl border bg-card">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b bg-muted/40">
                                <tr className="text-left">
                                    <th className="px-5 py-4 font-medium">
                                        Reference
                                    </th>

                                    <th className="px-5 py-4 font-medium">
                                        Customer
                                    </th>

                                    <th className="px-5 py-4 font-medium">
                                        Purpose
                                    </th>

                                    <th className="px-5 py-4 font-medium">
                                        Appointment
                                    </th>

                                    <th className="px-5 py-4 font-medium">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {filteredBookings.length > 0 ? (
                                    filteredBookings.map((booking) => (
                                        <tr
                                            key={booking.id}
                                            className="transition-colors hover:bg-muted/40"
                                        >
                                            <td className="px-5 py-4">
                                                <Link
                                                    href={`/admin/bookings/${booking.id}`}
                                                    className="font-medium text-primary hover:underline cursor-pointer"
                                                >
                                                    {booking.reference}
                                                </Link>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="font-medium">
                                                    {booking.name}
                                                </div>

                                                <div className="text-xs text-muted-foreground">
                                                    {booking.email}
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                {purposeLabels[
                                                    booking.purpose
                                                ] ?? booking.purpose}
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="font-medium">
                                                    {formatDate(booking.date)}
                                                </div>

                                                <div className="text-xs text-muted-foreground">
                                                    {formatTime(booking.time)}
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                                                        booking.status,
                                                    )}`}
                                                >
                                                    {statusLabels[
                                                        booking.status
                                                    ] ?? booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-5 py-12 text-center"
                                        >
                                            <p className="font-medium">
                                                No bookings found
                                            </p>

                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Try changing your search or
                                                filter.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
