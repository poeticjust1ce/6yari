import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import BookingStepper from "@/components/Booking/BookingStepper";
import About from "@/components/Booking/About";
import Purpose from "@/components/Booking/Purpose";
import Budget from "@/components/Booking/Budget";
import Meet from "@/components/Booking/Meet";
import Review from "@/components/Booking/Review";

import type { BookingData } from "@/types/booking";

const initialBooking: BookingData = {
    name: "",
    email: "",
    phone: "",

    purpose: "gaming",

    budget: "50000",
    customBudget: "",

    meetingType: "video",

    date: undefined,
    time: "",

    location: "",
};

type BookingProps = {
    data: BookingData;
};

export default function BookingPage({ data }: BookingProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const [booking, setBooking] = useState<BookingData>(initialBooking);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);

            const payload = {
                name: booking.name,
                email: booking.email,
                phone: booking.phone,
                purpose: booking.purpose,
                budget: booking.budget,
                customBudget: booking.customBudget,
                meetingType: booking.meetingType,
                date: booking.date
                    ? booking.date.toISOString().split("T")[0]
                    : "",
                time: booking.time,
                location: booking.location,
            };

            const response = await fetch("/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("Booking validation failed:", result);
                return;
            }

            window.location.href = `/bookings/${encodeURIComponent(result.reference)}`;
        } catch (error) {
            console.error("Failed to submit booking:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const updateBooking = (data: Partial<BookingData>) => {
        setBooking((previous) => ({
            ...previous,
            ...data,
        }));
    };

    const nextStep = () => {
        if (currentStep < 4) {
            setCurrentStep((previous) => previous + 1);
        }
    };

    const previousStep = () => {
        if (currentStep > 0) {
            setCurrentStep((previous) => previous - 1);
        }
    };

    const goToStep = (step: number) => {
        setCurrentStep(step);
    };

    return (
        <main className="min-h-screen w-full py-12 md:px-6 md:py-20">
            <div className="mx-auto w-full max-w-2xl ">
                <div className="mb-10">
                    <p className="text-xs font-medium tracking-[0.2em] text-primary">
                        6YARI / CONSULTATION
                    </p>

                    <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                        Build something that fits.
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                        Tell us about your setup, your needs, and how you'd like
                        to work with us.
                    </p>
                </div>

                <div className="rounded-2xl border border-border/60 bg-card/90 p-5 shadow-2xl sm:p-8 md:p-10">
                    <BookingStepper currentStep={currentStep} />
                    <div className="mt-12">
                        {currentStep === 0 && (
                            <About data={booking} onChange={updateBooking} />
                        )}

                        {currentStep === 1 && (
                            <Purpose data={booking} onChange={updateBooking} />
                        )}

                        {currentStep === 2 && (
                            <Budget data={booking} onChange={updateBooking} />
                        )}

                        {currentStep === 3 && (
                            <Meet data={booking} onChange={updateBooking} />
                        )}

                        {currentStep === 4 && (
                            <Review data={booking} onEdit={goToStep} />
                        )}
                    </div>

                    {/* nav */}
                    <div className="mt-12 flex items-center justify-between border-t border-border/60 pt-6">
                        {currentStep > 0 ? (
                            <Button
                                variant="ghost"
                                onClick={previousStep}
                                className="gap-2 hover:cursor-pointer"
                            >
                                <ArrowLeft className="size-4" />
                                BACK
                            </Button>
                        ) : (
                            <div />
                        )}

                        {currentStep < 4 && (
                            <Button
                                onClick={nextStep}
                                className="gap-2 hover:cursor-pointer"
                            >
                                CONTINUE
                                <ArrowRight className="size-4" />
                            </Button>
                        )}

                        {currentStep === 4 && (
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="gap-2 hover:cursor-pointer"
                            >
                                {isSubmitting
                                    ? "REQUESTING..."
                                    : "REQUEST CONSULTATION"}
                                <ArrowRight className="size-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
