import { format } from "date-fns";
import { CalendarDays, ChevronDown, MapPin, Phone, Video } from "lucide-react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "../../components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import type { BookingData } from "@/types/booking";
import { Button } from "../ui/button";

const meetingOptions = [
    {
        value: "video",
        label: "VIDEO CALL",
        icon: Video,
    },
    {
        value: "phone",
        label: "PHONE CALL",
        icon: Phone,
    },
    {
        value: "in-person",
        label: "IN PERSON",
        icon: MapPin,
    },
];

const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
];

type MeetProps = {
    data: BookingData;
    onChange: (data: Partial<BookingData>) => void;
};

export default function Meet({ data, onChange }: MeetProps) {
    const formatTime = (value: string) => {
        const [hours, minutes] = value.split(":");
        const hour = Number(hours);

        const period = hour >= 12 ? "PM" : "AM";
        const displayHour = hour % 12 || 12;

        return `${displayHour}:${minutes} ${period}`;
    };

    return (
        <div className="mx-auto w-full max-w-xl">
            <div className="mb-10">
                <p className="mb-3 text-xs font-medium tracking-[0.2em] text-primary">
                    04 / MEET
                </p>

                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                    How should we meet?
                </h1>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Choose how you’d like to discuss your build.
                </p>
            </div>

            <RadioGroup
                value={data.meetingType}
                onValueChange={(e) => onChange({ meetingType: e })}
                className="grid grid-cols-3 gap-3"
            >
                {meetingOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = data.meetingType === option.value;

                    return (
                        <Label
                            key={option.value}
                            htmlFor={option.value}
                            className={`
          group flex min-h-28 cursor-pointer flex-col
          items-center justify-center gap-3 rounded-xl
          border p-4 text-center transition-all duration-200
          ${
              isSelected
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border/60 bg-background/30 text-muted-foreground hover:border-primary/50 hover:bg-accent/30 hover:text-foreground"
          }
        `}
                        >
                            <RadioGroupItem
                                id={option.value}
                                value={option.value}
                                className="sr-only"
                            />

                            <Icon
                                className={`
            size-6 transition-colors duration-200
            ${
                isSelected
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground"
            }
          `}
                                strokeWidth={1.5}
                            />

                            <span className="text-[11px] font-medium tracking-[0.12em]">
                                {option.label}
                            </span>
                        </Label>
                    );
                })}
            </RadioGroup>

            <div className="mt-8 border-t border-border/60 pt-8">
                <div className="mb-5">
                    <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground">
                        PREFERRED TIME
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 flex flex-col ">
                        <Label>Date</Label>

                        <Popover>
                            <PopoverTrigger>
                                <button
                                    className={`
                    flex h-11 w-full items-center justify-between
                    rounded-md border bg-transparent px-3 text-sm
                    transition-colors hover:bg-accent/30
                    ${data.date ? "text-foreground" : "text-muted-foreground"}
                  `}
                                >
                                    <span className="flex items-center gap-2">
                                        <CalendarDays className="size-4" />

                                        {data.date
                                            ? format(data.date, "MMM d, yyyy")
                                            : "Select a date"}
                                    </span>

                                    <ChevronDown className="size-4 opacity-50" />
                                </button>
                            </PopoverTrigger>

                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={data.date}
                                    onSelect={(e) => onChange({ date: e })}
                                    disabled={(day) => day < new Date()}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="space-y-2">
                        <Label>Time</Label>

                        <Select
                            onValueChange={(e) => onChange({ time: e })}
                            value={data.time}
                        >
                            <SelectTrigger className="h-11 w-full">
                                <SelectValue placeholder="Select a time">
                                    {data.time && formatTime(data.time)}
                                </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                                {timeSlots.map((slot) => (
                                    <SelectItem key={slot} value={slot}>
                                        {formatTime(slot)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {data.meetingType === "in-person" && (
                <div className="mt-6 border-t border-border/60 pt-6">
                    <div className="space-y-2">
                        <Label htmlFor="location">Preferred Location</Label>

                        <Input
                            onChange={(e) =>
                                onChange({ location: e.target.value })
                            }
                            value={data.location}
                            id="location"
                            placeholder="e.g. 6yari Studio"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
