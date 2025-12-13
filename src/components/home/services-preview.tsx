import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useOutsideClick } from "../../hooks/use-outside-click"
import { Code, Smartphone, Globe, Cloud, Database, BarChart, PenTool, Shield, Zap, X, ChevronRight } from "lucide-react"

const services = [
    {
        id: "web-dev",
        icon: Globe,
        title: "Web Development",
        description: "Responsive, high-performance websites built with modern technologies.",
        details: "We build pixel-perfect, performant websites using the latest frameworks like React, Next.js, and Tailwind CSS. From landing pages to complex web applications, we ensure your digital presence is robust, SEO-friendly, and scalable."
    },
    {
        id: "mobile-apps",
        icon: Smartphone,
        title: "Mobile Apps",
        description: "Native and cross-platform mobile applications for iOS and Android.",
        details: "Reach your customers on the go with our custom mobile app development services. We prefer React Native and Flutter to deliver smooth, native-like experiences across all devices without compromising on performance."
    },
    {
        id: "custom-soft",
        icon: Code,
        title: "Custom Software",
        description: "Tailored software solutions to streamline your business operations.",
        details: "Off-the-shelf software often falls short. We engineer bespoke software solutions designed specifically for your workflows, helping you automate processes, integrate systems, and boost operational efficiency."
    },
    {
        id: "ui-ux",
        icon: PenTool,
        title: "UI/UX Design",
        description: "User-centric design that drives engagement and satisfaction.",
        details: "Great software starts with great design. Our design team focuses on intuitive user journeys, accessibility, and stunning visuals to create interfaces that users love to interact with."
    },
    {
        id: "cloud-serv",
        icon: Cloud,
        title: "Cloud Services",
        description: "Scalable cloud infrastructure and migration services.",
        details: "Leverage the power of the cloud. We assist with cloud migration, architecture design, and serverless implementation on AWS, Azure, or Google Cloud to ensure your infrastructure is secure and scalable."
    },
    {
        id: "data-analytics",
        icon: Database,
        title: "Data Analytics",
        description: "Turn data into actionable insights with advanced analytics.",
        details: "Unlock the value of your data. We build data pipelines, dashboards, and reporting tools that give you real-time visibility into your key performance indicators and business metrics."
    },
    {
        id: "cybersecurity",
        icon: Shield,
        title: "Cybersecurity",
        description: "Protect your digital assets with robust security measures.",
        details: "Security is non-negotiable. We conduct vulnerability assessments, implement encryption, and ensure compliance with industry standards to safeguard your critical business data."
    },
    {
        id: "digital-marketing",
        icon: BarChart,
        title: "Digital Marketing",
        description: "Grow your reach with targeted digital marketing strategies.",
        details: "Drive traffic and convert leads. Our data-driven marketing strategies include SEO, content marketing, and PPC campaigns designed to maximize your ROI and brand visibility."
    },
    {
        id: "automation",
        icon: Zap,
        title: "Automation",
        description: "Automate repetitive tasks to save time and resources.",
        details: "Work smarter, not harder. We identify bottlenecks in your processes and implement intelligent automation solutions using scripts, bots, and AI to free up your team for high-value work."
    }
]

export function ServicesPreview() {
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const ref = useRef<HTMLDivElement>(null)
    const sectionRef = useRef<HTMLElement>(null)

    useOutsideClick(ref, () => setSelectedId(null))

    const selectedService = services.find(s => s.id === selectedId)

    // Scroll-based width animation
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 0.8", "start 0.3"]
    })

    // Transform scroll progress to width percentage (80% to 100%)
    const width = useTransform(scrollYProgress, [0, 1], ["80%", "100%"])

    return (
        <section ref={sectionRef} className="relative overflow-hidden pt-0 pb-10 bg-background">
            <motion.div
                style={{ width }}
                transition={{ type: "spring", stiffness: 100, damping: 30 }}
                className="mx-auto bg-muted/50 dark:bg-muted/30 rounded-3xl shadow-xl"
            >
                <div className="px-4 py-8">
                    <div className="mb-6 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold tracking-tight sm:text-4xl"
                        >
                            Our Services
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mx-auto mt-4 max-w-2xl text-muted-foreground"
                        >
                            Comprehensive digital solutions for every stage of your business growth. Click on a card to learn more.
                        </motion.p>
                    </div>

                    <div className="container mx-auto">
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {services.map((service) => (
                                <motion.div
                                    layoutId={`card-${service.id}`}
                                    key={service.id}
                                    onClick={() => setSelectedId(service.id)}
                                    whileHover={{ scale: 1.02 }}
                                    className="group relative cursor-pointer overflow-hidden rounded-xl bg-card p-4 shadow-sm border transition-colors hover:border-primary/50 dark:hover:border-primary/50"
                                >
                                    <motion.div
                                        layoutId={`icon-container-${service.id}`}
                                        className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                                    >
                                        <service.icon className="h-6 w-6" />
                                    </motion.div>
                                    <motion.h3 layoutId={`title-${service.id}`} className="mb-1 text-lg font-bold leading-tight">{service.title}</motion.h3>
                                    <motion.p layoutId={`desc-${service.id}`} className="text-sm text-muted-foreground line-clamp-2">{service.description}</motion.p>

                                    <div className="mt-2 flex items-center text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                                        Learn more <ChevronRight className="ml-1 h-3 w-3" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {selectedId && selectedService && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                            onClick={() => setSelectedId(null)}
                        />

                        {/* Expanded Card */}
                        <motion.div
                            layoutId={`card-${selectedId}`}
                            ref={ref}
                            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-card p-6 shadow-2xl border border-primary/20"
                        >
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute right-4 top-4 rounded-full p-2 hover:bg-muted"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <motion.div
                                layoutId={`icon-container-${selectedId}`}
                                className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary"
                            >
                                <selectedService.icon className="h-8 w-8" />
                            </motion.div>

                            <motion.h3 layoutId={`title-${selectedId}`} className="mb-2 text-2xl font-bold">
                                {selectedService.title}
                            </motion.h3>

                            <motion.p layoutId={`desc-${selectedId}`} className="mb-6 text-lg text-muted-foreground">
                                {selectedService.description}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-4"
                            >
                                <div className="rounded-lg bg-muted p-4">
                                    <h4 className="mb-2 font-semibold text-foreground">Why choose this service?</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {selectedService.details}
                                    </p>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                                    >
                                        Close Details
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    )
}
