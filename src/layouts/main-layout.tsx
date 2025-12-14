import { Outlet } from "react-router-dom";
import { Navbar } from "../components/layout/navbar";

export function MainLayout() {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />

            <main className="flex-1">
                <Outlet />
            </main>


        </div>
    );
}
