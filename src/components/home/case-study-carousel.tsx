import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const caseStudies = [
    {
        id: 1,
        title: "FinTech Dashboard Revamp",
        category: "Web Application",
        description: "Modernizing a legacy financial platform with React and real-time data visualization. We improved performance by 300% and redesigned the UX for better data accessibility.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        color: "#1e293b" // slate-800
    },
    {
        id: 2,
        title: "E-Commerce Mobile App",
        category: "Mobile Development",
        description: "A seamless shopping experience built with React Native for iOS and Android. Features include AI-powered recommendations, AR product preview, and one-tap checkout.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2670&auto=format&fit=crop",
        color: "#0f172a" // slate-900 (darker)
    },
    {
        id: 3,
        title: "Healthcare Patient Portal",
        category: "Custom Software",
        description: "Secure and intuitive portal for patient management and appointment scheduling. Fully HIPAA compliant with telemedicine integration and electronic health record syncing.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop",
        color: "#172554" // blue-950
    },
    {
        id: 4,
        title: "Smart Logistics Tracker",
        category: "IoT Solution",
        description: "Real-time fleet tracking and supply chain management system using IoT sensors. Reduced delivery delays by 40% through predictive route optimization algorithms.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop",
        color: "#111827" // gray-900
    }
]

interface CardProps {
    title: string
    description: string
    image: string
    category: string
    color: string
    progress: MotionValue<number>
    range: number[]
    targetScale: number
    isLast: boolean
}

const Card = ({ title, description, image, category, color, progress, range, targetScale, isLast }: CardProps) => {
    const container = useRef(null)
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    })

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
    const scale = useTransform(progress, range, [1, targetScale])

    // Delay opacity fade: stay at 1 for first 50% of range, then fade to 0
    // If it's the last card, Opacity should stay at 1
    const rangeStart = range[0]
    const rangeEnd = range[1] || 1 // Fallback just in case
    const fadeStart = rangeStart + (rangeEnd - rangeStart) * 0.5

    const opacityTransform = useTransform(progress, [rangeStart, fadeStart, rangeEnd], [1, 1, 0])
    const opacity = isLast ? 1 : opacityTransform

    // For the last card, we want it to move UP to touch the title before scrolling away
    // Sequence: Title moves first (0.85-0.92), then Card follows (0.92-1.0)
    const yTransform = useTransform(progress, range, [0, 100])
    const lastCardY = useTransform(progress, [0.90, 1], [0, -172]) // Starts slightly overlapping with title end
    const y = isLast ? lastCardY : yTransform

    return (
        <div ref={container} className="flex h-[80vh] items-center justify-center sticky top-48 sm:h-screen">
            <motion.div
                style={{
                    scale,
                    backgroundColor: color,
                    // All cards stop at the same top position
                    top: `calc(-5vh + 10px)`,
                    opacity,
                    y
                }}
                className="relative flex h-[420px] w-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 p-4 shadow-2xl sm:h-[600px] md:h-[650px] lg:h-[700px] md:flex-row md:p-12 origin-top"
            >
                <div className="flex flex-col justify-between md:w-[40%]">
                    <div>
                        <span className="mb-2 inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white/80 backdrop-blur-sm">
                            {category}
                        </span>
                        <h2 className="mb-4 mt-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">{title}</h2>
                        <p className="text-sm text-white/70 leading-relaxed sm:text-base md:text-lg">{description}</p>
                    </div>

                    <div className="mt-8 flex items-center gap-2 group cursor-pointer">
                        <span className="text-sm font-medium text-white transition-colors group-hover:text-primary-foreground sm:text-base">Read Case Study</span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-all group-hover:bg-white group-hover:text-black">
                            <ArrowUpRight className="h-4 w-4" />
                        </div>
                    </div>
                </div>

                <div className="relative mt-6 h-full overflow-hidden rounded-2xl md:mt-0 md:w-[55%]">
                    <motion.div className="h-full w-full" style={{ scale: imageScale }}>
                        <img
                            src={image}
                            alt={title}
                            className="h-full w-full object-cover"
                        />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

export function CaseStudyCarousel() {
    const container = useRef(null)
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    const titleY = useTransform(scrollYProgress, [0.80, 0.90], [0, -200])

    return (
        <section className="bg-background pt-0 pb-20">
            <motion.div style={{ y: titleY }} className="sticky top-5 z-20 bg-background/40 backdrop-blur-xl pt-10 pb-10 mb-6">
                <div className="container px-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Work</h2>
                    <p className="mt-2 text-muted-foreground">See how we transform ideas into reality. Scroll to explore.</p>
                </div>
            </motion.div>

            <div ref={container} className="px-4 w-full">
                {caseStudies.map((project, i) => {
                    // Standardize target scale - all cards scale down to same size when leaving
                    const targetScale = 0.9
                    return (
                        <Card
                            key={project.id}
                            // i passed only for key in map, not prop
                            {...project}
                            progress={scrollYProgress}
                            range={[i * 0.25, 1]}
                            targetScale={targetScale}
                            isLast={i === caseStudies.length - 1}
                        />
                    )
                })}
            </div>


        </section>
    )
}
