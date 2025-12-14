
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ServiceDetails } from "../components/services/service-details";
import { PageTransition } from "../components/layout/page-transition";
import { serviceCategories, servicesData } from "../data/services";
import { cn } from "../lib/utils";

export function Services() {
    // Determine default open state: on mobile maybe none? or first?
    // User interaction "when user click ... details should be shown" suggests initially folded or one open.
    // Let's keep one open by default to show content, or use null for all closed.
    const [expandedId, setExpandedId] = useState<string | null>(serviceCategories[0].id);

    return (
        <PageTransition>
            <div className="container py-20 min-h-screen">
                <div className="mb-16 text-center space-y-4 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Our Services</h1>
                    <p className="text-xl text-muted-foreground">
                        Comprehensive digital solutions tailored to help your business grow and succeed in the modern era.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {serviceCategories.map((category) => {
                        const isExpanded = expandedId === category.id;
                        const serviceDetail = servicesData[category.id];

                        return (
                            <motion.div
                                key={category.id}
                                initial={false}
                                animate={{
                                    backgroundColor: isExpanded ? "hsl(var(--card))" : "hsl(var(--card)/0.5)",
                                    borderColor: isExpanded ? "hsl(var(--primary)/0.5)" : "hsl(var(--border))",
                                }}
                                className={cn(
                                    "group rounded-3xl border overflow-hidden transition-all duration-300",
                                    isExpanded ? "shadow-2xl ring-1 ring-primary/20" : "hover:bg-card/80 hover:border-primary/30"
                                )}
                            >
                                <button
                                    onClick={() => setExpandedId(isExpanded ? null : category.id)}
                                    className="flex items-center justify-between w-full p-6 md:p-8 text-left outline-none"
                                >
                                    <div className="flex items-center gap-4 md:gap-6">
                                        <div className={cn(
                                            "p-3 md:p-4 rounded-2xl transition-colors duration-300",
                                            isExpanded ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                                        )}>
                                            <category.icon className="w-6 h-6 md:w-10 md:h-10" />
                                        </div>
                                        <div>
                                            <h3 className={cn(
                                                "text-xl md:text-3xl font-bold transition-colors",
                                                isExpanded ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                                            )}>
                                                {category.title}
                                            </h3>
                                            {!isExpanded && (
                                                <p className="hidden md:block mt-1 text-muted-foreground">
                                                    {category.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className={cn(
                                        "p-2 rounded-full border transition-all duration-300",
                                        isExpanded ? "bg-primary text-primary-foreground border-primary rotate-180" : "border-border text-muted-foreground group-hover:border-primary group-hover:text-primary"
                                    )}>
                                        <ChevronDown className="w-6 h-6" />
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 pt-0 md:p-8 md:pt-0">
                                                <div className="h-px w-full bg-border/50 mb-8" />
                                                <ServiceDetails
                                                    service={serviceDetail}
                                                // We don't pass icon here as it's in the header now
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </PageTransition>
    )
}
