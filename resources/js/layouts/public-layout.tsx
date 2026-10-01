import Navbar from "@/components/Navbar";
import type { ReactNode } from "react";

interface PublicLayoutProps {
    children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="mx-auto flex max-w-7xl items-center px-6 py-16 lg:px-8">
                {children}
            </main>
        </div>
    );
}
