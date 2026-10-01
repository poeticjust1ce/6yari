import { email } from "@/routes/password";
import { BookingData } from "@/types/booking";
import { format } from "date-fns";
import {
    CalendarDays,
    Check,
    Clock3,
    Mail,
    Pencil,
    Phone,
    User,
    Video,
} from "lucide-react";

type ReviewProps = {
    data: BookingData;
    onEdit?: (step: number) => void;
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
export default function Review({ data, onEdit }: ReviewProps) {
    function formatTime(time: string) {
        const [hours, minutes] = time.split(":").map(Number);

        const date = new Date();
        date.setHours(hours, minutes, 0, 0);

        return date.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
        });
    }

    const purpose = purposeLabels[data.purpose] ?? data.purpose;
    const meeting = meetingLabels[data.meetingType] ?? data.meetingType;
    const budget =
        data.budget === "custom"
            ? data.customBudget
                ? `₱${Number(data.customBudget).toLocaleString()}`
                : "Custom"
            : `₱${Number(data.budget).toLocaleString()}`;
    const date = data.date
        ? format(new Date(data.date), "MMMM d, yyyy")
        : "Not selected";
    const time = data.time ? formatTime(data.time) : "Not selected";

    return (
        <div className="mx-auto w-full max-w-xl">
            {/* Header */}
            <div className="mb-10">
                <p className="mb-3 text-xs font-medium tracking-[0.2em] text-primary">
                    05 / REVIEW
                </p>

                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                    Ready to build?
                </h1>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Take a final look at your consultation details before
                    submitting.
                </p>
            </div>

            {/* Summary */}
            <div className="space-y-3">
                {/* About */}
                <section className="rounded-xl border border-border/60 bg-background/30">
                    <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <User
                                className="size-4 text-primary"
                                strokeWidth={1.5}
                            />

                            <span className="text-xs font-medium tracking-[0.15em]">
                                ABOUT
                            </span>
                        </div>

                        <button
                            type="button"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <Pencil className="size-4" strokeWidth={1.5} />
                        </button>
                    </div>

                    <div className="space-y-4 px-5 py-5">
                        <div>
                            <p className="text-xs text-muted-foreground">
                                FULL NAME
                            </p>

                            <p className="mt-1 text-sm font-medium">
                                {data.name || "Not provided"}
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Mail className="size-3.5" />
                                    EMAIL
                                </p>

                                <p className="mt-1 break-all text-sm font-medium">
                                    {data.email || "Not provided"}
                                </p>
                            </div>

                            <div>
                                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Phone className="size-3.5" />
                                    PHONE
                                </p>

                                <p className="mt-1 text-sm font-medium">
                                    {data.phone
                                        ? `+63 ${data.phone}`
                                        : "Not provided"}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Purpose + Budget */}
                <div className="grid gap-3 sm:grid-cols-2">
                    <section className="rounded-xl border border-border/60 bg-background/30">
                        <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
                            <span className="text-xs font-medium tracking-[0.15em]">
                                PURPOSE
                            </span>

                            <button
                                type="button"
                                className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <Pencil className="size-4" strokeWidth={1.5} />
                            </button>
                        </div>

                        <div className="px-5 py-5">
                            <p className="text-2xl font-semibold tracking-tight">
                                {purpose || "Not selected"}
                            </p>
                        </div>
                    </section>

                    <section className="rounded-xl border border-border/60 bg-background/30">
                        <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
                            <span className="text-xs font-medium tracking-[0.15em]">
                                BUDGET
                            </span>

                            <button
                                type="button"
                                className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <Pencil className="size-4" strokeWidth={1.5} />
                            </button>
                        </div>

                        <div className="px-5 py-5">
                            <p className="text-2xl font-semibold tracking-tight">
                                {budget}
                            </p>
                        </div>
                    </section>
                </div>

                {/* Meeting */}
                <section className="rounded-xl border border-border/60 bg-background/30">
                    <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <Video
                                className="size-4 text-primary"
                                strokeWidth={1.5}
                            />

                            <span className="text-xs font-medium tracking-[0.15em]">
                                MEET
                            </span>
                        </div>

                        <button
                            type="button"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <Pencil className="size-4" strokeWidth={1.5} />
                        </button>
                    </div>

                    <div className="grid gap-5 px-5 py-5 sm:grid-cols-3">
                        <div>
                            <p className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Video className="size-3.5" />
                                METHOD
                            </p>

                            <p className="mt-1 text-sm font-medium">
                                {meeting || "Not selected"}
                            </p>
                        </div>

                        <div>
                            <p className="flex items-center gap-2 text-xs text-muted-foreground">
                                <CalendarDays className="size-3.5" />
                                DATE
                            </p>

                            <p className="mt-1 text-sm font-medium">{date}</p>
                        </div>

                        <div>
                            <p className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock3 className="size-3.5" />
                                TIME
                            </p>

                            <p className="mt-1 text-sm font-medium">{time}</p>
                        </div>
                    </div>

                    {data.meetingType === "in-person" && data.location && (
                        <div className="border-t border-border/60 px-5 py-4">
                            {" "}
                            <p className="text-xs text-muted-foreground">
                                {" "}
                                PREFERRED LOCATION{" "}
                            </p>{" "}
                            <p className="mt-1 text-sm font-medium">
                                {" "}
                                {data.location}{" "}
                            </p>{" "}
                        </div>
                    )}
                </section>
            </div>

            {/* Confirmation */}
            <div className="mt-8 flex items-start gap-3 rounded-lg border border-border/60 bg-muted/20 p-4">
                <Check
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    strokeWidth={2}
                />

                <p className="text-xs leading-5 text-muted-foreground">
                    By submitting, you’re requesting a consultation with{" "}
                    <span className="font-semibold">6yari</span>. We’ll use the
                    information above to prepare for your session.
                </p>
            </div>
        </div>
    );
}
