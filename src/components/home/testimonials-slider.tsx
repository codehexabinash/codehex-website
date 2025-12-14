import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
    {
        id: 1,
        quote: "CodeHex transformed our digital presence. Their attention to detail and technical expertise is unmatched.",
        author: "Sarah Johnson",
        role: "CTO, FinTech Solutions",
        initials: "SJ",
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        id: 2,
        quote: "The team delivered our mobile app ahead of schedule. The performance improvements exceeded all expectations.",
        author: "Michael Chen",
        role: "Founder, ShopEasy",
        initials: "MC",
        gradient: "from-purple-500 to-pink-500"
    },
    {
        id: 3,
        quote: "Professional, creative, and reliable. They are the strategic partner you want for complex software projects.",
        author: "Emily Davis",
        role: "Director, HealthTech Inc.",
        initials: "ED",
        gradient: "from-green-500 to-emerald-500"
    },
    {
        id: 4,
        quote: "Our operational efficiency increased by 40% thanks to their custom automation tools. Simply brilliant.",
        author: "Robert Chang",
        role: "VP, Global Logistics",
        initials: "RC",
        gradient: "from-orange-500 to-red-500"
    },
    {
        id: 5,
        quote: "Secure, scalable, and stunning. They built exactly what we needed for our next-gen banking portal.",
        author: "Amanda Williams",
        role: "Head of Digital, Prime Bank",
        initials: "AW",
        gradient: "from-indigo-500 to-blue-500"
    },
    {
        id: 6,
        quote: "A game-changer for our manufacturing line. The IoT dashboard is intuitive, fast, and reliable.",
        author: "Thomas Brown",
        role: "Ops Manager, BuildRight",
        initials: "TB",
        gradient: "from-yellow-500 to-orange-500"
    },
    {
        id: 7,
        quote: "They captured our brand voice perfectly. The design is award-winning quality and users love it.",
        author: "Jessica Lee",
        role: "CMO, Vogue Fashion",
        initials: "JL",
        gradient: "from-pink-500 to-rose-500"
    },
    {
        id: 8,
        quote: "User engagement is up 200%. The UX improvements were spot on and brought immediate results.",
        author: "David Wilson",
        role: "Product Lead, SaaS Flow",
        initials: "DW",
        gradient: "from-teal-500 to-green-500"
    },
    {
        id: 9,
        quote: "Reliable support and cutting-edge tech. We love working with CodeHex on all our major initiatives.",
        author: "Ryan Martinez",
        role: "Founder, Creative Agency",
        initials: "RM",
        gradient: "from-violet-500 to-purple-500"
    },
]

export function TestimonialsSlider() {
    const [startIndex, setStartIndex] = useState(0)

    const nextSlide = () => {
        setStartIndex((prev) => (prev + 3 >= testimonials.length ? 0 : prev + 3))
    }

    const prevSlide = () => {
        setStartIndex((prev) => (prev - 3 < 0 ? testimonials.length - 3 : prev - 3))
    }

    const visibleTestimonials = testimonials.slice(startIndex, startIndex + 3)

    return (
        <section className="bg-background pt-0 pb-12 relative overflow-hidden z-10">
            <div className="container px-4 text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
                >
                    Client Testimonials
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="mt-4 text-muted-foreground text-lg"
                >
                    See what industry leaders are saying about us.
                </motion.p>
            </div>

            <div className="container px-4 max-w-6xl mx-auto">
                <div className="relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-20 hidden lg:flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-background text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg"
                        aria-label="Previous testimonials"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-20 hidden lg:flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-background text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg"
                        aria-label="Next testimonials"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>

                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <AnimatePresence mode="wait">
                            {visibleTestimonials.map((testimonial) => (
                                <motion.div
                                    key={testimonial.id}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/50 bg-card/50 p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-2 lg:min-h-[450px]"
                                >
                                    {/* Gradient Border Line */}
                                    <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${testimonial.gradient}`} />

                                    <div>
                                        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                            <Quote className="h-6 w-6 fill-current" />
                                        </div>

                                        <blockquote className="mb-8 text-lg font-medium leading-relaxed text-card-foreground">
                                            "{testimonial.quote}"
                                        </blockquote>
                                    </div>

                                    <div className="flex items-center gap-4 mt-auto">
                                        <div className={`h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-br ${testimonial.gradient} text-white font-bold text-lg shadow-md`}>
                                            {testimonial.initials}
                                        </div>
                                        <div>
                                            <div className="font-bold text-lg text-foreground">{testimonial.author}</div>
                                            <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Navigation (Dots) */}
                    <div className="mt-8 flex justify-center gap-2 lg:hidden">
                        <button onClick={prevSlide} className="p-2 rounded-full bg-muted">
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button onClick={nextSlide} className="p-2 rounded-full bg-muted">
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
