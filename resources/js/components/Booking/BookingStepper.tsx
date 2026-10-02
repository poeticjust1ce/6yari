const steps = ["ABOUT", "PURPOSE", "BUDGET", "MEET", "REVIEW"];

type BookingStepperProps = {
    currentStep: number;
};

export default function BookingStepper({ currentStep }: BookingStepperProps) {
    return (
        <div className="w-full">
            {/* Numbers + progress lines */}
            <div className="relative grid grid-cols-5">
                {/* Background line */}
                <div className="absolute left-[10%] right-[10%] top-1.75 h-px bg-border">
                    {/* Progress */}
                    <div
                        className="h-full origin-left bg-primary transition-transform duration-500 ease-out"
                        style={{
                            transform: `scaleX(${
                                currentStep / (steps.length - 1)
                            })`,
                        }}
                    />
                </div>

                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                        <div
                            key={step}
                            className="relative flex justify-center"
                        >
                            <button
                                type="button"
                                className={`relative z-10 bg-card px-1 text-xs font-medium tracking-wider transition-colors duration-300 ${
                                    isActive || isCompleted
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                }`}
                            >
                                {String(stepNumber).padStart(2, "0")}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Labels */}
            <div className="mt-2 grid grid-cols-5">
                {steps.map((step, index) => (
                    <div
                        key={step}
                        className={`text-center text-[0.65em] tracking-[0.15em] transition-colors duration-300 ${
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
