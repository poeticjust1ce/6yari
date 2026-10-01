import { BriefcaseBusiness, Code2, Gamepad2, Palette } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BookingData } from "@/types/booking";

const purposes = [
    {
        value: "gaming",
        label: "Gaming",
        icon: Gamepad2,
    },
    {
        value: "development",
        label: "Development",
        icon: Code2,
    },
    {
        value: "creative",
        label: "Creative",
        icon: Palette,
    },
    {
        value: "work",
        label: "Work",
        icon: BriefcaseBusiness,
    },
];

type PurposeProps = {
    data: BookingData;
    onChange: (data: Partial<BookingData>) => void;
};

export default function Purpose({ data, onChange }: PurposeProps) {
    return (
        <div className="mx-auto w-full max-w-xl">
            <div className="mb-10">
                <p className="mb-3 text-xs font-medium tracking-[0.2em] text-primary">
                    02 / PURPOSE
                </p>

                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                    What are you building for?
                </h1>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Choose the primary purpose for your new PC.
                </p>
            </div>

            <RadioGroup
                value={data.purpose}
                onValueChange={(e) => onChange({ purpose: e })}
                className="grid grid-cols-2 gap-3"
            >
                {purposes.map((item) => {
                    const Icon = item.icon;
                    const isSelected = data.purpose === item.value;

                    return (
                        <Label
                            key={item.value}
                            htmlFor={item.value}
                            className={`
                group flex min-h-36 cursor-pointer flex-col
                items-center justify-center gap-4 rounded-xl
                border p-6 transition-all duration-200
                ${
                    isSelected
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border/60 bg-background/30 text-muted-foreground hover:border-primary/50 hover:bg-accent/30 hover:text-foreground"
                }
              `}
                        >
                            <RadioGroupItem
                                id={item.value}
                                value={item.value}
                                className="sr-only"
                            />

                            <Icon
                                className={`
                  size-7 transition-all duration-200
                  ${
                      isSelected
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground"
                  }
                `}
                                strokeWidth={1.5}
                            />

                            <span className="text-sm font-medium">
                                {item.label}
                            </span>
                        </Label>
                    );
                })}
            </RadioGroup>
        </div>
    );
}
