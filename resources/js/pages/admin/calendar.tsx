import { Head, Link } from "@inertiajs/react";
import { CalendarDays, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

type Booking = {
    id: number;
    reference: string;
    name: string;
    purpose: string;
    meeting_type: string;
    date: string;
    time: string;
    status: string;
};

type Props = {
    bookings: Booking[];
};

const purposeLabels: Record<string, string> = {
    gaming: "Gaming",
    development: "Development",
    creative: "Creative",
    work: "Work",
};

function getStatusClass(status: string) {
    switch (status) {
        case "confirmed":
            return "bg-emerald-500";
        case "completed":
            return "bg-blue-500";
        case "cancelled":
            return "bg-red-500";
        default:
            return "bg-yellow-500";
    }
}

function formatTime(value: string) {
    const [hours, minutes] = value.split(":");
    const hour = Number(hours);

    return `${hour % 12 || 12}:${minutes} ${hour >= 12 ? "PM" : "AM"}`;
}

function getDateKey(date: Date) {
    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
    ].join("-");
}

export default function Calendar({ bookings }: Props) {
    const today = new Date();

    const [currentDate, setCurrentDate] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1),
    );

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthName = currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    const days = useMemo(() => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const startDay = firstDay.getDay();
        const daysInMonth = lastDay.getDate();

        const previousMonthLastDay = new Date(year, month, 0).getDate();

        const calendarDays: Date[] = [];

        // Previous month
        for (let i = startDay - 1; i >= 0; i--) {
            calendarDays.push(
                new Date(year, month - 1, previousMonthLastDay - i),
            );
        }

        // Current month
        for (let day = 1; day <= daysInMonth; day++) {
            calendarDays.push(new Date(year, month, day));
        }

        // Next month
        const remainingDays = 42 - calendarDays.length;

        for (let day = 1; day <= remainingDays; day++) {
            calendarDays.push(new Date(year, month + 1, day));
        }

        return calendarDays;
    }, [year, month]);

    const bookingsByDate = useMemo(() => {
        return bookings.reduce<Record<string, Booking[]>>((groups, booking) => {
            if (!groups[booking.date]) {
                groups[booking.date] = [];
            }

            groups[booking.date].push(booking);

            return groups;
        }, {});
    }, [bookings]);

    function previousMonth() {
        setCurrentDate(new Date(year, month - 1, 1));
    }

    function nextMonth() {
        setCurrentDate(new Date(year, month + 1, 1));
    }

    function goToToday() {
        setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    }

    return (
        <>
            <Head title="Calendar" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <CalendarDays className="size-5 text-muted-foreground" />

                            <h1 className="text-2xl font-semibold tracking-tight">
                                Calendar
                            </h1>
                        </div>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage your upcoming consultations and appointments.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={goToToday}>
                            Today
                        </Button>

                        <div className="flex items-center rounded-md border">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-r-none"
                                onClick={previousMonth}
                            >
                                <ChevronLeft />
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-l-none"
                                onClick={nextMonth}
                            >
                                <ChevronRight />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Calendar */}
                <div className="overflow-hidden rounded-xl border bg-card">
                    {/* Month */}
                    <div className="border-b px-4 py-4 md:px-6">
                        <h2 className="text-lg font-medium">{monthName}</h2>
                    </div>

                    {/* Weekdays */}
                    <div className="grid grid-cols-7 border-b bg-muted/30">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                            (day) => (
                                <div
                                    key={day}
                                    className="px-2 py-3 text-center text-xs font-medium text-muted-foreground"
                                >
                                    <span className="sm:hidden">
                                        {day.charAt(0)}
                                    </span>

                                    <span className="hidden sm:inline">
                                        {day}
                                    </span>
                                </div>
                            ),
                        )}
                    </div>

                    {/* Days */}
                    <div className="grid grid-cols-7">
                        {days.map((date, index) => {
                            const dateKey = getDateKey(date);
                            const dayBookings = bookingsByDate[dateKey] ?? [];

                            const isCurrentMonth = date.getMonth() === month;

                            const isToday =
                                getDateKey(date) === getDateKey(today);

                            return (
                                <div
                                    key={`${dateKey}-${index}`}
                                    className={`min-h-28 border-b border-r p-2 md:min-h-36 ${
                                        !isCurrentMonth
                                            ? "bg-muted/10 text-muted-foreground"
                                            : ""
                                    }`}
                                >
                                    <div className="mb-2 flex justify-end">
                                        <span
                                            className={`flex size-7 items-center justify-center rounded-full text-sm ${
                                                isToday
                                                    ? "bg-primary text-primary-foreground font-semibold"
                                                    : ""
                                            }`}
                                        >
                                            {date.getDate()}
                                        </span>
                                    </div>

                                    <div className="space-y-1">
                                        {dayBookings
                                            .slice(0, 3)
                                            .map((booking) => (
                                                <Link
                                                    key={booking.id}
                                                    href={`/admin/bookings/${booking.id}`}
                                                    className={`group block rounded-md border bg-background px-2 py-1.5 text-left transition-colors hover:bg-muted ${
                                                        booking.status ===
                                                        "cancelled"
                                                            ? "opacity-50"
                                                            : ""
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-1.5">
                                                        <span
                                                            className={`size-1.5 shrink-0 rounded-full ${getStatusClass(
                                                                booking.status,
                                                            )}`}
                                                        />

                                                        <span className="truncate text-xs font-medium">
                                                            {booking.name}
                                                        </span>
                                                    </div>

                                                    <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                                                        <Clock3 className="size-3" />

                                                        <span>
                                                            {formatTime(
                                                                booking.time,
                                                            )}
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}

                                        {dayBookings.length > 3 && (
                                            <p className="px-2 text-[11px] text-muted-foreground">
                                                + {dayBookings.length - 3} more
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                    {[
                        ["pending", "Pending"],
                        ["confirmed", "Confirmed"],
                        ["completed", "Completed"],
                        ["cancelled", "Cancelled"],
                    ].map(([status, label]) => (
                        <div key={status} className="flex items-center gap-2">
                            <span
                                className={`size-2 rounded-full ${getStatusClass(
                                    status,
                                )}`}
                            />

                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
