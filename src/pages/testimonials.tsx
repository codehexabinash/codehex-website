import { PageTransition } from "../components/layout/page-transition"


export function Testimonials() {
    return (
        <PageTransition>
            <div className="pt-24 min-h-screen">
                <div className="container px-4 text-center mb-16">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                        Client Stories
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Hear from the visionary leaders and companies we've had the privilege to work with.
                    </p>
                </div>
                {/* Reusing the slider component but modifying it slightly usually, 
                    or for now just reusing it as it contains the data. 
                    Ideally we would map all testimonials in a grid here.
                    For MVP speed request, I will reuse the slider and maybe add a grid below if needed, 
                    but let's make a grid view for the dedicated page. 
                */}
                <TestimonialsGrid />
            </div>
        </PageTransition>
    )
}

function TestimonialsGrid() {
    // Reusing data from slider would be best by exporting it, 
    // but to avoid massive refactors right now I'll duplicate/adapt the data list 
    // or arguably better, I can just mock it here for the new page.

    // Let's grab the data from the slider if possible or just use the same set.
    // I will duplicate for safety and speed as user wants "direct go for code" 

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
        // ... adding more for a full page feel
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
    ]

    return (
        <div className="container px-4 pb-20">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/50 bg-card/50 p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-2"
                    >
                        <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${testimonial.gradient}`} />
                        <div>
                            <blockquote className="mb-6 text-lg font-medium leading-relaxed text-card-foreground">
                                "{testimonial.quote}"
                            </blockquote>
                        </div>
                        <div className="flex items-center gap-4 mt-auto">
                            <div className={`h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br ${testimonial.gradient} text-white font-bold text-sm shadow-md`}>
                                {testimonial.initials}
                            </div>
                            <div>
                                <div className="font-bold text-base text-foreground">{testimonial.author}</div>
                                <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
