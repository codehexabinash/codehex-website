import { useRef } from "react"
import { motion, useMotionValue } from "framer-motion"
import { FloatingCard } from "../ui/floating-card"
import { ArrowRight, Code2, Database, Layout, Sparkles, Terminal, Globe, Shield, GitBranch, Cloud, Blocks, Package, Server, Workflow } from "lucide-react"

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // No scroll animations - keep it simple and smooth

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e
        const { innerWidth, innerHeight } = window
        const x = clientX - innerWidth / 2
        const y = clientY - innerHeight / 2
        mouseX.set(x)
        mouseY.set(y)
    }

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e.touches[0]
        const { innerWidth, innerHeight } = window
        // Increase sensitivity on mobile by multiplying the offset
        const x = (clientX - innerWidth / 2) * 2.5
        const y = (clientY - innerHeight / 2) * 2.5
        mouseX.set(x)
        mouseY.set(y)
    }

    // 16 Cards Configuration - Uniform Grid Distribution with Varied Sizes
    // Fixed spacing: 4 columns x 4 rows covering entire panoramic area
    // Column spacing: ~60% intervals | Row spacing: ~28% intervals
    // Sizes: 'sm' = 4x4cm (w-40 h-40), 'md' = 6x6cm (w-60 h-60), 'lg' = 8x8cm (w-80 h-80)
    const cards = [
        // === ROW 1 (Top - y: 8%) ===
        { icon: Terminal, label: "Bash", x: 10, y: -5, rot: -3, color: "bg-orange-500/10 text-orange-400", size: "md", className: "hidden md:flex" },
        { icon: Code2, label: "React", x: -25, y: -42, rot: 2, color: "bg-blue-500/10 text-blue-400", size: "lg", className: "hidden sm:flex" },
        { icon: Database, label: "SQL", x: -20, y: 25, rot: -2, color: "bg-emerald-500/10 text-emerald-400", size: "sm", className: "flex" },
        { icon: Sparkles, label: "AI", x: 115, y: -40, rot: 3, color: "bg-purple-500/10 text-purple-400", size: "md", className: "hidden lg:flex" },

        // === ROW 2 (Upper-Middle - y: 36%) ===
        { icon: Layout, label: "UI/UX", x: -34, y: 118, rot: 2, color: "bg-pink-500/10 text-pink-400", size: "sm", className: "hidden sm:flex" },
        { icon: Package, label: "NPM", x: -25, y: 75, rot: -3, color: "bg-red-600/10 text-red-500", size: "lg", className: "hidden md:flex" },
        { icon: Globe, label: "Web", x: 50, y: -30, rot: 3, color: "bg-cyan-500/10 text-cyan-400", size: "md", className: "flex" },
        { icon: Shield, label: "Sec", x: 100, y: 20, rot: -2, color: "bg-red-500/10 text-red-400", size: "sm", className: "hidden sm:flex" },

        // === ROW 3 (Lower-Middle - y: 64%) ===
        // { icon: Cpu, label: "API", x: -60, y: 64, rot: -3, color: "bg-indigo-500/10 text-indigo-400", size: "lg" },
        { icon: Server, label: "Server", x: 120, y: 50, rot: 4, color: "bg-green-600/10 text-green-500", size: "sm", className: "hidden md:flex" },
        { icon: Workflow, label: "Flow", x: 50, y: 64, rot: -2, color: "bg-violet-500/10 text-violet-400", size: "md", className: "flex" },
        // { icon: Zap, label: "Fast", x: 160, y: 64, rot: 3, color: "bg-yellow-500/10 text-yellow-400", size: "sm" },

        // === ROW 4 (Bottom - y: 92%) ===
        { icon: GitBranch, label: "Git", x: 65, y: 110, rot: -4, color: "bg-orange-600/10 text-orange-500", size: "sm", className: "hidden sm:flex" },
        { icon: Cloud, label: "Cloud", x: 25, y: 110, rot: 2, color: "bg-sky-500/10 text-sky-400", size: "md", className: "flex" },
        { icon: Blocks, label: "Docker", x: 110, y: 100, rot: -3, color: "bg-blue-600/10 text-blue-500", size: "lg", className: "hidden lg:flex" },
        // { icon: Settings, label: "DevOps", x: 160, y: 92, rot: 4, color: "bg-slate-500/10 text-slate-400", size: "md" }
    ]

    return (
        <div
            ref={containerRef}
            className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
        >
            {/* Background Gradient/Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />

            {/* Parallax Floating Cards Layer */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {cards.map((card, i) => {
                    // Define size classes based on card size
                    const sizeClasses = {
                        sm: 'w-40 h-40 p-5 gap-3',  // 4x4cm (~160px)
                        md: 'w-60 h-60 p-7 gap-4',  // 6x6cm (~240px)
                        lg: 'w-80 h-80 p-9 gap-5'   // 8x8cm (~320px)
                    }
                    const iconSizes = {
                        sm: 'w-12 h-12',   // Small icon
                        md: 'w-16 h-16',   // Medium icon
                        lg: 'w-20 h-20'    // Large icon
                    }
                    const textSizes = {
                        sm: 'text-xs',
                        md: 'text-sm',
                        lg: 'text-base'
                    }

                    return (
                        <FloatingCard
                            key={i}
                            mouseX={mouseX}
                            mouseY={mouseY}
                            depth={1.2}
                            initialX={card.x}
                            initialY={card.y}
                            initialRotate={card.rot}
                            className={`z-10 ${sizeClasses[card.size as keyof typeof sizeClasses]} flex flex-col items-center justify-center pointer-events-auto ${card.color} ${card.className || ""}`}
                        >
                            <card.icon className={`${iconSizes[card.size as keyof typeof iconSizes]} opacity-80`} />
                            <span className={`${textSizes[card.size as keyof typeof textSizes]} font-bold opacity-70 uppercase tracking-wider`}>{card.label}</span>
                        </FloatingCard>
                    )
                })}
            </div>

            {/* Main Content (Center) */}
            <div className="relative z-20 container px-4 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Available for new projects
                    </span>

                    <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.9]">
                        CODE<span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">HEX</span>
                    </h1>

                    <p className="mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl font-light">
                        Turning complex problems into elegant
                        <span className="mx-2 font-medium text-foreground">Digital Reality</span>
                    </p>

                    <div className="mt-10 flex gap-4">
                        <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-primary px-8 font-medium text-primary-foreground transition-all hover:w-40 hover:bg-primary/90 min-w-[140px]">
                            <span className="mr-2">Start Project</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                        <button className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background/50 backdrop-blur-sm px-8 font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                            View Work
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
