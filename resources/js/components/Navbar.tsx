import { Link } from "@inertiajs/react";
import { title } from "process";
import { useState } from "react";

function NavBar() {
    const [nav, setNav] = useState(false);

    const navItems = [
        {
            title: "Products",
            path: "/products",
        },
        {
            title: "Builds",
            path: "/builds",
        },
        {
            title: "About Us",
            path: "/about",
        },
        {
            title: "Admin",
            path: "/login",
        },
    ];

    const closeNav = () => setNav(false);

    return (
        <nav className="relative z-50 w-full">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                <Link
                    href="/"
                    className="hover:text-secondary-foreground hover:tracking-[0.08em] text-2xl font-bold transition-all duration-200 hover:opacity-80"
                    onClick={closeNav}
                >
                    <span className="text-primary">6</span>yari
                </Link>

                {/* desktop nav */}
                <div className="hidden items-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.title}
                            href={item.path}
                            className="relative py-2 transition-colors duration-200 hover:text-primary"
                        >
                            {item.title}
                        </Link>
                    ))}

                    <Link
                        href="/book"
                        className="bg-primary px-8 py-2.5 text-black transition-all duration-200 hover:bg-primary-foreground hover:text-white"
                    >
                        BOOK
                    </Link>
                </div>

                {/* mobile menu */}
                <button
                    type="button"
                    aria-label={
                        nav ? "Close navigation menu" : "Open navigation menu"
                    }
                    aria-expanded={nav}
                    onClick={() => setNav((prev) => !prev)}
                    className="group relative flex h-10 w-10 items-center justify-center md:hidden"
                >
                    <span
                        className={`absolute h-0.5 w-7 bg-foreground transition-all duration-300 ease-in-out ${
                            nav ? "rotate-45" : "-translate-y-2"
                        }`}
                    />

                    <span
                        className={`absolute h-0.5 w-7 bg-foreground transition-all duration-300 ease-in-out ${
                            nav ? "opacity-0" : "opacity-100"
                        }`}
                    />

                    <span
                        className={`absolute h-0.5 w-7 bg-foreground transition-all duration-300 ease-in-out ${
                            nav ? "-rotate-45" : "translate-y-2"
                        }`}
                    />
                </button>
            </div>

            {/* moobile nav */}
            <div
                className={`overflow-hidden border-border/40 md:hidden ${
                    nav
                        ? "max-h-96 opacity-100"
                        : "pointer-events-none max-h-0 opacity-0"
                } transition-all duration-300 ease-in-out`}
            >
                <div
                    className={`flex flex-col items-center gap-2 px-6 py-6 transition-transform duration-300 ease-in-out ${
                        nav ? "translate-y-0" : "-translate-y-4"
                    }`}
                >
                    {navItems.map((item) => (
                        <Link
                            key={item.title}
                            href={item.path}
                            onClick={closeNav}
                            className="w-full py-3 text-center transition-colors duration-200 hover:text-primary"
                        >
                            {item.title}
                        </Link>
                    ))}

                    <Link
                        href="/book"
                        onClick={closeNav}
                        className="mt-3 w-full max-w-xs bg-primary px-8 py-3 text-center text-black transition-all duration-200 hover:bg-primary-foreground hover:text-white"
                    >
                        BOOK
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
