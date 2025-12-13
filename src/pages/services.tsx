
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ServicesSidebar } from "../components/services/services-sidebar";
import { ServiceDetails } from "../components/services/service-details";
import { PageTransition } from "../components/layout/page-transition";
import { serviceCategories, servicesData } from "../data/services";

export function Services() {
    const [selectedCategory, setSelectedCategory] = useState(serviceCategories[0].id);
    const apiData = servicesData[selectedCategory];
    const categoryInfo = serviceCategories.find(c => c.id === selectedCategory);

    return (
        <PageTransition>
            <div className="container py-20">
                <div className="mb-12 space-y-4">
                    <h1 className="text-5xl font-bold tracking-tight">Our Services</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Comprehensive digital solutions tailored to help your business grow and succeed in the modern era.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-3">
                        <ServicesSidebar
                            categories={serviceCategories}
                            selectedId={selectedCategory}
                            onSelect={setSelectedCategory}
                        />
                    </div>

                    <div className="lg:col-span-9 min-h-[600px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedCategory}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {apiData ? (
                                    <ServiceDetails
                                        service={apiData}
                                        icon={categoryInfo?.icon}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-64 border rounded-lg bg-muted/20">
                                        <p className="text-muted-foreground">Content coming soon for this category.</p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}
