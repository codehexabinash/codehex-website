import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { ModeToggle } from "../common/mode-toggle"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false)
    }, [location.pathname])

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    const navLinks = [
        { href: "/services", label: "Services" },
        { href: "/case-studies", label: "Case Studies" },
        { href: "/testimonials", label: "Testimonials" },
        { href: "/blog", label: "Blog" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-8">
                {/* Logo */}
                <div className="mr-8">
                    <Link className="flex items-center space-x-2" to="/">
                        <span className="font-bold inline-block text-xl tracking-tight">
                            CodeHex
                        </span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <div className="hidden lg:flex flex-1 items-center justify-between">
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={`transition-colors hover:text-foreground/80 ${location.pathname === link.href
                                        ? "text-foreground"
                                        : "text-foreground/60"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center space-x-4">
                        <ModeToggle />
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex flex-1 items-center justify-end lg:hidden space-x-4">
                    <ModeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex items-center justify-center rounded-md p-2 text-foreground/70 hover:bg-accent hover:text-foreground focus:outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-x-0 top-16 z-50 overflow-hidden bg-background border-t border-border/40 lg:hidden"
                    >
                        <div className="container h-full px-4 py-8 flex flex-col items-center space-y-8">
                            <nav className="flex flex-col items-center space-y-6 text-lg font-medium">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + i * 0.05 }}
                                    >
                                        <Link
                                            to={link.href}
                                            className={`block py-2 transition-colors hover:text-primary ${location.pathname === link.href
                                                    ? "text-primary font-bold"
                                                    : "text-foreground/80"
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-auto pb-20"
                            >
                                <Link
                                    to="/contact"
                                    className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                >
                                    Get Started
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
