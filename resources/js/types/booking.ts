export type BookingData = {
    name: string;
    email: string;
    phone: string;

    purpose: string;

    budget: string;
    customBudget: string;
    meetingType: string;

    date?: Date;
    time: string;

    location: string;
};
