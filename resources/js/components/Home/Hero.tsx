import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "@inertiajs/react";

export function Hero() {
    return (
        <section className="overflow-hidden bg-background">
            <div
                className="
          pointer-events-none
          absolute
          -right-40
          top-1/2
          h-125
          w-125
          -translate-y-1/2
          rounded-full
          bg-primary/20
          blur-[120px]
          animate-pulse
  animation-duration-[50s]
        "
            />

            <div className="mx-auto flex max-w-7xl items-center px-6 py-16 lg:px-8">
                <div className="grid w-full items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-4">
                    <div className="relative z-10 max-w-xl">
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-8 bg-primary" />

                            <span className="hero-content text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                                6yari PC Studio
                            </span>
                        </div>

                        <h1 className="hero-content text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">
                            Built
                            <br />
                            <span className="text-primary">around</span> you.
                        </h1>

                        <p className="hero-description mt-7 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
                            Custom computers designed around the way you work,
                            play, create, and build.
                        </p>

                        <div className="hero-content mt-9 flex flex-wrap items-center gap-4">
                            <Link href="/book">
                                <Button
                                    className="
                  group
                  inline-flex
                  h-12
                  items-center
                  gap-3
                  rounded-full
                  bg-primary
                  px-6
                  text-sm
                  font-medium
                  text-primary-foreground
                  transition-all
                  duration-300
                  hover:gap-4
                  hover:opacity-90
                  hover:cursor-pointer
                "
                                >
                                    Start a consultation
                                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                                </Button>
                            </Link>
                            <Link
                                href="/builds"
                                className="
                  inline-flex
                  h-12
                  items-center
                  rounded-full
                  px-5
                  text-sm
                  font-medium
                  text-muted-foreground
                  transition-colors
                  hover:text-foreground
                  hover:cursor-pointer
                "
                            >
                                Explore builds
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="pointer-events-none ml-6 hero-image w-auto h-auto inter">
                    <img src="images/hero.png" alt="Hero image" />
                </div>
            </div>
        </section>
    );
}
