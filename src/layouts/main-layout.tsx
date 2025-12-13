import { Outlet } from "react-router-dom";
import { ModeToggle } from "../components/common/mode-toggle";

export function MainLayout() {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-8">
                    <div className="mr-4 flex">
                        <a className="mr-6 flex items-center space-x-2" href="/">
                            <span className="hidden font-bold sm:inline-block text-xl tracking-tight">
                                CodeHex
                            </span>
                        </a>
                        <nav className="flex items-center space-x-6 text-sm font-medium">
                            <a href="/services" className="transition-colors hover:text-foreground/80 text-foreground/60">Services</a>
                            <a href="/case-studies" className="transition-colors hover:text-foreground/80 text-foreground/60">Case Studies</a>
                            <a href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">About</a>
                            <a href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">Contact</a>
                        </nav>
                    </div>
                    <div className="flex flex-1 items-center justify-end space-x-2">
                        <nav className="flex items-center space-x-2">
                            <ModeToggle />
                        </nav>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <Outlet />
            </main>


        </div>
    );
}
