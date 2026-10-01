import { Head } from "@inertiajs/react";
import { dashboard } from "@/routes";
import { CalendarCheck, CheckCircle2, Clock3, Users } from "lucide-react";

type Booking = {
    id: number;
    reference: string;
    name: string;
    email: string;
    purpose: string;
    date: string;
    time: string;
    status: string;
};

type DashboardProps = {
    bookings: Booking[];
    stats: {
        total: number;
        pending: number;
        today: number;
        completed: number;
    };
};

const statusLabels: Record<string, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    completed: "Completed",
    cancelled: "Cancelled",
};

function formatTime(value: string) {
    const [hours, minutes] = value.split(":");

    const hour = Number(hours);
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;

    return `${displayHour}:${minutes} ${period}`;
}

function formatDate(value: string) {
    return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
}

function statusClass(status: string) {
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

const purposeLabels: Record<string, string> = {
    gaming: "Gaming",
    development: "Development",
    creative: "Creative",
    work: "Work",
};

export default function Dashboard({ bookings, stats }: DashboardProps) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                {/* header */}
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Dashboard
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Overview of your 6YARI activities.
                    </p>
                </div>

                {/* stats */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border bg-card p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Total Bookings
                            </p>

                            <CalendarCheck className="size-4 text-muted-foreground" />
                        </div>

                        <p className="mt-3 text-3xl font-semibold">
                            {stats.total}
                        </p>
                    </div>

                    <div className="rounded-xl border bg-card p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Pending
                            </p>

                            <Clock3 className="size-4 text-muted-foreground" />
                        </div>

                        <p className="mt-3 text-3xl font-semibold">
                            {stats.pending}
                        </p>
                    </div>

                    <div className="rounded-xl border bg-card p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Today
                            </p>

                            <Users className="size-4 text-muted-foreground" />
                        </div>

                        <p className="mt-3 text-3xl font-semibold">
                            {stats.today}
                        </p>
                    </div>

                    <div className="rounded-xl border bg-card p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Completed
                            </p>

                            <CheckCircle2 className="size-4 text-muted-foreground" />
                        </div>

                        <p className="mt-3 text-3xl font-semibold">
                            {stats.completed}
                        </p>
                    </div>
                </div>

                {/* Bookings */}
                <div className="rounded-xl border bg-card">
                    <div className="flex items-center justify-between border-b px-5 py-4">
                        <div>
                            <h2 className="font-semibold">Recent Bookings</h2>

                            <p className="text-sm text-muted-foreground">
                                Latest consultation requests.
                            </p>
                        </div>

                        <a
                            href="/admin/bookings"
                            className="text-sm font-medium text-primary hover:underline"
                        >
                            View all
                        </a>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b bg-muted/40">
                                <tr>
                                    <th className="px-5 py-3 text-left font-medium">
                                        Reference
                                    </th>

                                    <th className="px-5 py-3 text-left font-medium">
                                        Customer
                                    </th>

                                    <th className="px-5 py-3 text-left font-medium">
                                        Purpose
                                    </th>

                                    <th className="px-5 py-3 text-left font-medium">
                                        Schedule
                                    </th>

                                    <th className="px-5 py-3 text-left font-medium">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {bookings.map((booking) => (
                                    <tr
                                        key={booking.id}
                                        className="transition-colors hover:bg-muted/30"
                                    >
                                        <td className="px-5 py-4 font-medium">
                                            {booking.reference}
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
                                            {purposeLabels[booking.purpose] ??
                                                booking.purpose}
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4">
                                            <div>
                                                {formatDate(booking.date)}
                                            </div>

                                            <div className="text-xs text-muted-foreground">
                                                {formatTime(booking.time)}
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClass(
                                                    booking.status,
                                                )}`}
                                            >
                                                {statusLabels[booking.status] ??
                                                    booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {bookings.length === 0 && (
                        <div className="px-6 py-12 text-center">
                            <CalendarCheck className="mx-auto size-8 text-muted-foreground" />

                            <p className="mt-3 font-medium">No bookings yet</p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                New consultation requests will appear here.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: "Dashboard",
            href: dashboard(),
        },
    ],
};
