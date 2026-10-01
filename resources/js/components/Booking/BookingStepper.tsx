const steps = ["ABOUT", "PURPOSE", "BUDGET", "MEET", "REVIEW"];

type BookingStepperProps = {
    currentStep: number;
};

export default function BookingStepper({ currentStep }: BookingStepperProps) {
    return (
        <div className="w-full">
            <div className="flex items-start">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                        <div key={step} className="flex flex-1 items-start">
                            <button
                                type="button"
                                className={`shrink-0 text-xs font-medium tracking-wider transition-colors duration-300 ${
                                    isActive || isCompleted
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                }`}
                            >
                                {String(stepNumber).padStart(2, "0")}
                            </button>

                            {index < steps.length - 1 && (
                                <div className="mx-3 mt-1.75 h-px flex-1 overflow-hidden bg-border ">
                                    <div
                                        className={`h-full origin-left bg-primary transition-transform duration-500 ease-out ${
                                            isCompleted
                                                ? "scale-x-100"
                                                : "scale-x-0"
                                        }`}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-2 flex">
                {steps.map((step, index) => (
                    <div
                        key={step}
                        className={`flex-1 text-[0.65em] tracking-[0.15em] transition-colors duration-300 ${
                            index === currentStep
                                ? "font-medium text-foreground"
                                : "text-muted-foreground"
                        }`}
                    >
                        {step}
                    </div>
                ))}
            </div>
        </div>
    );
}
