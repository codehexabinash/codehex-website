import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Code2, Users, Rocket, Trophy } from "lucide-react"

const teamMembers = [
    {
        name: "Alex Morgan",
        role: "Founder & CEO",
        bio: "Visionary leader with 10+ years in tech innovation. Passionate about building scalable solutions.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop",
        socials: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
        name: "Sarah Chen",
        role: "CTO",
        bio: "Full-stack architect specializing in cloud infrastructure and AI integration. Former Google engineer.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
        socials: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
        name: "Marcus Johnson",
        role: "Creative Director",
        bio: "Award-winning designer ensuring every pixel serves a purpose. Obsessed with user experience.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop",
        socials: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
        name: "Elena Rodriguez",
        role: "Lead Frontend Dev",
        bio: "React & Animation wizard. Turns complex designs into buttery smooth interfaces.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop",
        socials: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
        name: "David Kim",
        role: "Backend Lead",
        bio: "Database guru and API security expert. scaling systems to millions of requests.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop",
        socials: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
        name: "Olivia Patel",
        role: "Head of Product",
        bio: "Strategist bridging the gap between business goals and technical feasibility.",
        image: "https://images.unsplash.com/photo-1598550874175-4d7112ee7f19?q=80&w=2670&auto=format&fit=crop",
        socials: { linkedin: "#", twitter: "#", github: "#" }
    }
]

const stats = [
    { label: "Years Experience", value: "5+", icon: Rocket },
    { label: "Projects Shipped", value: "50+", icon: Code2 },
    { label: "Team Members", value: "12", icon: Users },
    { label: "Awards Won", value: "8", icon: Trophy },
]

export function About() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden">
            {/* Mission / Hero Section */}
            <section className="pt-24 pb-20 relative">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent -z-10" />
                <div className="container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">
                            We Build The <span className="text-primary">Extraordinary</span>
                        </h1>
                        <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed">
                            CodeHex is a premium digital agency tailored for forward-thinking brands.
                            We combine cutting-edge technology with immersive design to create digital
                            experiences that captivate and convert.
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="flex flex-col items-center"
                            >
                                <div className="p-3 bg-primary/10 rounded-2xl mb-4 text-primary">
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <span className="text-4xl font-bold mb-2">{stat.value}</span>
                                <span className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
                                    {stat.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-primary font-medium tracking-widest uppercase text-sm">The Minds Behind CodeHex</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-4">Meet Our Team</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative bg-card border border-border/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
                        >
                            {/* Image with overlay effect */}
                            <div className="relative h-80 overflow-hidden">
                                <motion.img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />

                                {/* Floating Socials */}
                                <div className="absolute bottom-4 right-4 flex gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <a href={member.socials.linkedin} className="p-2 bg-background/80 backdrop-blur rounded-full hover:text-primary transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                    <a href={member.socials.twitter} className="p-2 bg-background/80 backdrop-blur rounded-full hover:text-primary transition-colors">
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                    <a href={member.socials.github} className="p-2 bg-background/80 backdrop-blur rounded-full hover:text-primary transition-colors">
                                        <Github className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-6 relative">
                                <div className="absolute top-0 right-6 -translate-y-1/2 w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg rotate-12 group-hover:rotate-0 transition-transform duration-300">
                                    <span className="text-xl font-bold text-primary-foreground">
                                        {member.name.split(" ")[0][0]}{member.name.split(" ")[1][0]}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                                <p className="text-primary font-medium mb-4">{member.role}</p>
                                <p className="text-muted-foreground leading-relaxed">
                                    {member.bio}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>


        </div>
    )
}
