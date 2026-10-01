"use client";
import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import {
    CalendarDays,
    Check,
    CheckCheck,
    Clock3,
    Copy,
    Download,
    Mail,
    MapPin,
    Phone,
    Printer,
    User,
    Video,
} from "lucide-react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import type { BookingData } from "@/types/booking";

type ConfirmationProps = {
    data: BookingData;
    reference: string;
    submittedAt: Date;
};

const formatTime = (value: string) => {
    if (!value) return "Not specified";

    const [hours, minutes] = value.split(":");
    const hour = Number(hours);

    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;

    return `${displayHour}:${minutes} ${period}`;
};

export default function Confirmation({
    data,
    reference,
    submittedAt,
}: ConfirmationProps) {
    const [copied, setCopied] = useState(false);
    const [qrCode, setQrCode] = useState("");

    const budget =
        data.budget === "custom"
            ? `₱${Number(data.customBudget || 0).toLocaleString()}`
            : `₱${Number(data.budget).toLocaleString()}`;

    const meetingLabel =
        data.meetingType === "video"
            ? "Video Call"
            : data.meetingType === "phone"
              ? "Phone Call"
              : "In Person";

    const copyReference = async () => {
        await navigator.clipboard.writeText(reference);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const confirmationRef = useRef<HTMLDivElement>(null);

    //print function
    const handlePrint = () => {
        window.print();
    };

    // pdf download
    const handleDownloadPdf = () => {
        try {
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const pageWidth = pdf.internal.pageSize.getWidth();

            const margin = 20;
            const contentWidth = pageWidth - margin * 2;

            let y = 25;

            // --------------------------------
            // Header
            // --------------------------------

            pdf.setTextColor(20, 20, 20);

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(22);
            pdf.text("6YARI", margin, y);

            y += 8;

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(9);
            pdf.setTextColor(100, 100, 100);

            pdf.text("CONSULTATION CONFIRMATION", margin, y);

            // --------------------------------
            // Reference
            // --------------------------------

            y += 18;

            pdf.setDrawColor(225, 225, 225);
            pdf.line(margin, y, pageWidth - margin, y);

            y += 12;

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(9);
            pdf.setTextColor(100, 100, 100);

            pdf.text("REFERENCE", margin, y);

            y += 6;

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(18);
            pdf.setTextColor(20, 20, 20);

            pdf.text(reference, margin, y);

            // --------------------------------
            // Client
            // --------------------------------

            y += 18;

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(12);

            pdf.text("Client", margin, y);

            y += 8;

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            pdf.setTextColor(50, 50, 50);

            pdf.text(`Name: ${data.name}`, margin, y);

            y += 6;

            pdf.text(`Email: ${data.email}`, margin, y);

            y += 6;

            pdf.text(`Phone: ${data.phone}`, margin, y);

            // --------------------------------
            // Consultation
            // --------------------------------

            y += 16;

            pdf.setTextColor(20, 20, 20);
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(12);

            pdf.text("Consultation", margin, y);

            y += 8;

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            pdf.setTextColor(50, 50, 50);

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

            const purpose = purposeLabels[data.purpose] ?? data.purpose;

            const meeting = meetingLabels[data.meetingType] ?? data.meetingType;

            const budget =
                data.budget === "custom"
                    ? data.customBudget
                        ? `PHP ${Number(data.customBudget).toLocaleString()}`
                        : "Custom"
                    : `PHP ${Number(data.budget).toLocaleString()}`;

            const date = data.date
                ? format(data.date, "MMMM d, yyyy")
                : "Not selected";

            const time = data.time ? formatTime(data.time) : "Not selected";

            pdf.text(`Purpose: ${purpose}`, margin, y);

            y += 6;

            pdf.text(`Budget: ${budget}`, margin, y);

            y += 6;

            pdf.text(`Meeting: ${meeting}`, margin, y);

            y += 6;

            pdf.text(`Date: ${date}`, margin, y);

            y += 6;

            pdf.text(`Time: ${time}`, margin, y);

            // --------------------------------
            // Location
            // --------------------------------

            if (data.location) {
                y += 6;

                pdf.text(`Location: ${data.location}`, margin, y);
            }

            // --------------------------------
            // Submitted
            // --------------------------------

            y += 18;

            pdf.setDrawColor(225, 225, 225);

            pdf.line(margin, y, pageWidth - margin, y);

            y += 10;

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(9);
            pdf.setTextColor(100, 100, 100);

            pdf.text("REQUESTED", margin, y);

            y += 6;

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            pdf.setTextColor(50, 50, 50);

            pdf.text(
                format(submittedAt, "MMMM d, yyyy 'at' h:mm a"),
                margin,
                y,
            );

            // --------------------------------
            // Footer
            // --------------------------------

            const footerY = pdf.internal.pageSize.getHeight() - 20;

            pdf.setFontSize(8);
            pdf.setTextColor(130, 130, 130);

            pdf.text(
                "Keep this reference for your consultation.",
                margin,
                footerY,
            );

            pdf.text(reference, pageWidth - margin, footerY, {
                align: "right",
            });

            // --------------------------------
            // Save
            // --------------------------------

            pdf.save(`6YARI-${reference}.pdf`);
        } catch (error) {
            console.error("Failed to generate PDF:", error);
        }
    };

    // use effect
    useEffect(() => {
        const bookingUrl = window.location.href;

        QRCode.toDataURL(bookingUrl, {
            width: 200,
            margin: 2,
            errorCorrectionLevel: "H",
        }).then((url) => {
            setQrCode(url);
        });
    }, []);
    return (
        <div ref={confirmationRef} className="mx-auto w-full max-w-2xl">
            <div className="mb-10 text-center">
                <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary shadow-[0_0_40px_rgba(139,92,246,0.15)]">
                    <Check className="size-7" strokeWidth={2} />
                </div>

                <p className="mb-3 text-xs font-medium tracking-[0.2em] text-primary">
                    REQUEST RECEIVED
                </p>

                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                    Consultation confirmed.
                </h1>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                    Your consultation request has been successfully submitted.
                    Keep your reference number for your records.
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/70 shadow-2xl">
                <div className="border-b border-border/60 px-6 py-6 sm:px-8">
                    <div className="flex items-start justify-between gap-6">
                        <div>
                            <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground">
                                6YARI
                            </p>

                            <p className="mt-2 text-sm font-medium">
                                Custom PC Consultation
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-[10px] font-medium tracking-[0.18em] text-muted-foreground">
                                REFERENCE
                            </p>

                            <button
                                type="button"
                                onClick={copyReference}
                                className="mt-1 flex items-center gap-2 text-sm font-medium tracking-wider transition-colors hover:text-primary"
                            >
                                <span>{reference}</span>

                                {copied ? (
                                    <CheckCheck
                                        className="size-3.5 text-primary"
                                        strokeWidth={1.8}
                                    />
                                ) : (
                                    <Copy
                                        className="size-3.5 text-muted-foreground"
                                        strokeWidth={1.5}
                                    />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-b border-border/60 px-6 py-6 sm:px-8">
                    <div className="mb-5 flex items-center gap-3">
                        <User
                            className="size-4 text-primary"
                            strokeWidth={1.5}
                        />

                        <span className="text-xs font-medium tracking-[0.15em]">
                            CLIENT
                        </span>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-3">
                        <div>
                            <p className="text-[10px] tracking-[0.15em] text-muted-foreground">
                                FULL NAME
                            </p>

                            <p className="uppercase mt-1.5 text-sm font-medium">
                                {data.name || "Not provided"}
                            </p>
                        </div>

                        <div>
                            <p className="flex items-center gap-2 text-[10px] tracking-[0.15em] text-muted-foreground">
                                <Mail className="size-3" />
                                EMAIL
                            </p>

                            <p className="mt-1.5 break-all text-sm font-medium">
                                {data.email || "Not provided"}
                            </p>
                        </div>

                        <div>
                            <p className="flex items-center gap-2 text-[10px] tracking-[0.15em] text-muted-foreground">
                                <Phone className="size-3" />
                                PHONE
                            </p>

                            <p className="mt-1.5 text-sm font-medium">
                                {data.phone || "Not provided"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-b border-border/60 px-6 py-6 sm:px-8">
                    <div className="mb-5">
                        <span className="text-xs font-medium tracking-[0.15em]">
                            CONSULTATION
                        </span>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                            <p className="text-[10px] tracking-[0.15em] text-muted-foreground">
                                PURPOSE
                            </p>

                            <p className="uppercase mt-1.5 text-lg font-semibold tracking-tight">
                                {data.purpose || "Not specified"}
                            </p>
                        </div>

                        <div>
                            <p className="text-[10px] tracking-[0.15em] text-muted-foreground">
                                BUDGET
                            </p>

                            <p className="mt-1.5 text-lg font-semibold tracking-tight">
                                {budget}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-b border-border/60 px-6 py-6 sm:px-8">
                    <div className="mb-5 flex items-center gap-3">
                        {data.meetingType === "video" && (
                            <Video
                                className="size-4 text-primary"
                                strokeWidth={1.5}
                            />
                        )}

                        {data.meetingType === "phone" && (
                            <Phone
                                className="size-4 text-primary"
                                strokeWidth={1.5}
                            />
                        )}

                        {data.meetingType === "in-person" && (
                            <MapPin
                                className="size-4 text-primary"
                                strokeWidth={1.5}
                            />
                        )}

                        <span className="text-xs font-medium tracking-[0.15em]">
                            MEETING
                        </span>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-3">
                        <div>
                            <p className="text-[10px] tracking-[0.15em] text-muted-foreground">
                                METHOD
                            </p>

                            <p className="mt-1.5 text-sm font-medium">
                                {meetingLabel}
                            </p>
                        </div>

                        <div>
                            <p className="flex items-center gap-2 text-[10px] tracking-[0.15em] text-muted-foreground">
                                <CalendarDays className="size-3" />
                                DATE
                            </p>

                            <p className="mt-1.5 text-sm font-medium">
                                {data.date
                                    ? format(data.date, "MMM d, yyyy")
                                    : "Not specified"}
                            </p>
                        </div>

                        <div>
                            <p className="flex items-center gap-2 text-[10px] tracking-[0.15em] text-muted-foreground">
                                <Clock3 className="size-3" />
                                TIME
                            </p>

                            <p className="mt-1.5 text-sm font-medium">
                                {formatTime(data.time)}
                            </p>
                        </div>
                    </div>
                    {data.meetingType === "in-person" && data.location && (
                        <div className=" border-border/50 pt-5">
                            <p className="flex items-center gap-2 text-[10px] tracking-[0.15em] text-muted-foreground">
                                <MapPin className="size-3" />
                                LOCATION
                            </p>

                            <p className="uppercase mt-1.5 text-sm font-medium">
                                {data.location}
                            </p>
                        </div>
                    )}
                </div>

                {qrCode && (
                    <div className="mt-8 flex flex-col items-center text-center">
                        <div className="rounded-2xl border border-border/60 bg-white p-5 shadow-sm">
                            <img
                                src={qrCode}
                                alt="QR code for this consultation"
                                className="size-45"
                            />
                        </div>

                        <p className="mt-4 text-sm font-medium">
                            Save your consultation
                        </p>

                        <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
                            Scan this QR code with your phone to open this
                            confirmation page.
                        </p>
                    </div>
                )}

                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                    <button
                        onClick={handleDownloadPdf}
                        type="button"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border/60 px-5 text-sm font-medium transition-colors hover:bg-muted"
                    >
                        <Download className="size-4" />
                        Download PDF
                    </button>

                    <button
                        type="button"
                        onClick={handlePrint}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                        <Printer className="size-4" />
                        Print
                    </button>
                </div>

                <div className="px-6 py-5 sm:px-8">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-[10px] tracking-[0.15em] text-muted-foreground">
                                REQUEST SUBMITTED
                            </p>

                            <p className="mt-1 text-xs font-medium">
                                {format(submittedAt, "MMMM d, yyyy · h:mm a")}
                            </p>
                        </div>

                        <span className="text-[10px] font-medium tracking-[0.15em] text-primary">
                            CONFIRMED
                        </span>
                    </div>
                </div>
            </div>

            {/* Note */}
            <div className="mt-6 flex items-start gap-3 px-1">
                <Check
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    strokeWidth={2}
                />

                <p className="text-xs leading-5 text-muted-foreground">
                    Keep your reference number{" "}
                    <span className="font-medium text-foreground">
                        {reference}
                    </span>{" "}
                    for your consultation. 6YARI will use the contact
                    information provided above to follow up with you.
                </p>
            </div>
        </div>
    );
}
