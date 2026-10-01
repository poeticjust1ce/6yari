import { Label } from "../ui/label";
import { Input } from "../ui/input";

import type { BookingData } from "@/types/booking";

type AboutProps = {
    data: BookingData;
    onChange: (data: Partial<BookingData>) => void;
};

export default function About({ data, onChange }: AboutProps) {
    return (
        <div className="mx-auto w-full max-w-xl">
            <div className="mb-10">
                <p className="mb-3 text-xs font-medium tracking-[0.2em] text-primary">
                    01 / ABOUT YOU
                </p>

                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                    Let’s start with the basics.
                </h1>

                <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                    Tell us a little about yourself so we know who we're
                    building for.
                </p>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="ex. Niccolo Terre"
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => onChange({ name: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => onChange({ email: e.target.value })}
                    />
                </div>

                <div className="flex">
                    <div className="flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                        +63
                    </div>

                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        placeholder="9XX XXX XXXX"
                        className="rounded-l-none"
                        autoComplete="tel"
                        value={data.phone || "9"}
                        onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");

                            if (!value.startsWith("9")) {
                                value = "9" + value.replace(/^9+/, "");
                            }

                            value = value.slice(0, 10);

                            let formatted = value;

                            if (value.length > 3) {
                                formatted =
                                    value.slice(0, 3) + " " + value.slice(3);
                            }

                            if (value.length > 6) {
                                formatted =
                                    value.slice(0, 3) +
                                    " " +
                                    value.slice(3, 6) +
                                    " " +
                                    value.slice(6);
                            }

                            onChange({ phone: formatted });
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
