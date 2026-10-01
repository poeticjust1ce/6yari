import { useState } from "react";
import { Coins, Gem, Pencil, Rocket, Zap } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Input } from "@/components/ui/input";

import type { BookingData } from "@/types/booking";

type BudgetProps = {
    data: BookingData;
    onChange: (data: Partial<BookingData>) => void;
};

const budgets = [
    {
        value: "30000",
        amount: "₱30K",
        label: "STARTER",
        icon: Coins,
    },
    {
        value: "50000",
        amount: "₱50K",
        label: "BALANCED",
        icon: Zap,
    },
    {
        value: "75000",
        amount: "₱75K",
        label: "PERFORMANCE",
        icon: Rocket,
    },
    {
        value: "100000",
        amount: "₱100K+",
        label: "ENTHUSIAST",
        icon: Gem,
    },
];

export default function Budget({ data, onChange }: BudgetProps) {
    const isCustom = data.budget === "custom";

    const handleCustomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/\D/g, "");

        onChange({
            customBudget: value,
        });
    };

    return (
        <div className="mx-auto w-full max-w-xl">
            <div className="mb-10">
                <p className="mb-3 text-xs font-medium tracking-[0.2em] text-primary">
                    03 / BUDGET
                </p>

                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                    What’s your budget?
                </h1>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Set the range you’re comfortable investing in your build.
                </p>
            </div>

            <RadioGroup
                value={data.budget}
                onValueChange={(e) => onChange({ budget: e })}
                className="grid grid-cols-2 gap-3"
            >
                {budgets.map((item) => {
                    const Icon = item.icon;
                    const isSelected = data.budget === item.value;

                    return (
                        <Label
                            key={item.value}
                            htmlFor={item.value}
                            className={`
                group flex min-h-40 cursor-pointer flex-col
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
                  size-7 transition-colors duration-200
                  ${
                      isSelected
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground"
                  }
                `}
                                strokeWidth={1.5}
                            />

                            <div className="text-center">
                                <div className="text-xl font-semibold tracking-tight">
                                    {item.amount}
                                </div>

                                <div className="mt-1 text-[10px] font-medium tracking-[0.18em] text-muted-foreground">
                                    {item.label}
                                </div>
                            </div>
                        </Label>
                    );
                })}
            </RadioGroup>

            <div className="mt-3">
                <button
                    type="button"
                    onClick={() => onChange({ budget: "custom" })}
                    className={`
            group flex w-full cursor-pointer items-center gap-4
            rounded-xl border p-5 text-left transition-all duration-200
            ${
                isCustom
                    ? "border-primary bg-primary/10"
                    : "border-border/60 bg-background/30 hover:border-primary/50 hover:bg-accent/30"
            }
          `}
                >
                    <div
                        className={`
              flex size-11 shrink-0 items-center justify-center rounded-lg
              border transition-colors duration-200
              ${
                  isCustom
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border/60 text-muted-foreground group-hover:text-foreground"
              }
            `}
                    >
                        <Pencil className="size-5" strokeWidth={1.5} />
                    </div>

                    <div className="flex-1">
                        <div className="text-sm font-medium">CUSTOM BUILD</div>

                        <div className="mt-1 text-xs text-muted-foreground">
                            Set your own budget
                        </div>
                    </div>

                    <div
                        className={`
              size-4 rounded-full border transition-all duration-200
              ${
                  isCustom
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/40"
              }
            `}
                    />
                </button>
            </div>

            {/* Custom budget input */}
            {isCustom && (
                <div className="mt-3 overflow-hidden rounded-xl border border-primary/30 bg-background/40 p-5">
                    <div className="mb-3 flex items-center justify-between">
                        <span className="text-[10px] font-medium tracking-[0.18em] text-muted-foreground">
                            YOUR BUDGET
                        </span>

                        <span className="text-[10px] tracking-[0.15em] text-primary">
                            PHP
                        </span>
                    </div>

                    <div className="flex items-center border-b border-border/60 pb-2">
                        <span className="mr-2 text-2xl font-medium text-muted-foreground">
                            ₱
                        </span>

                        <Input
                            id="custom-budget-input"
                            value={data.customBudget}
                            onChange={handleCustomChange}
                            placeholder="65,000"
                            inputMode="numeric"
                            autoFocus
                            className="h-auto border-0 bg-transparent p-0 text-3xl font-semibold tracking-tight shadow-none focus-visible:ring-0"
                        />
                    </div>

                    <p className="mt-3 text-xs text-muted-foreground">
                        Enter the amount you’re comfortable investing in your
                        build.
                    </p>
                </div>
            )}
        </div>
    );
}
