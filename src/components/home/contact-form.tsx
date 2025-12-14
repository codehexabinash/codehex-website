import { useState } from "react"
import { motion } from "framer-motion"
// import { supabase } from "../../lib/supabase"
import { Loader2, Send, Mail, Phone } from "lucide-react"

interface ContactFormProps {
    embedded?: boolean
    serviceTitle?: string
}

export function ContactForm({ embedded = false, serviceTitle }: ContactFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        business_description: "",
        requirements: serviceTitle ? `I'm interested in ${serviceTitle} services.` : ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setStatus("idle")

        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Mock success for demonstration
            // const { error } = await supabase
            //     .from("contacts")
            //     .insert([formData])
            // if (error) throw error

            setStatus("success")
            setFormData({
                name: "",
                email: "",
                phone: "",
                business_description: "",
                requirements: ""
            })
        } catch (error) {
            console.error("Error submitting form:", error)
            setStatus("error")
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const content = (
        <div className={embedded ? "w-full" : "container px-4 max-w-3xl mx-auto"}>
            {!embedded && (
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4"
                    >
                        Start Your Project
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-lg"
                    >
                        Ready to transform your ideas into reality? Let's build something amazing together.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 flex flex-wrap justify-center gap-6 md:gap-12"
                    >
                        <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                            <Mail className="w-5 h-5 text-primary" />
                            <span>codehex@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                            <Phone className="w-5 h-5 text-primary" />
                            <span>+1 (555) 123-4567</span>
                        </div>
                    </motion.div>
                </div>
            )}

            {embedded && (
                <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-2">Interested in {serviceTitle}?</h3>
                    <p className="text-muted-foreground">
                        Get a quote or schedule a consultation specifically for this service.
                    </p>
                </div>
            )}

            <motion.div
                initial={embedded ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={embedded ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className={`bg-card border border-border/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden ${embedded ? "shadow-none border-0 bg-transparent p-0" : ""}`}
            >
                {!embedded && (
                    <>
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                    </>
                )}

                <form onSubmit={handleSubmit} className="relative space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="ml-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Name
                            </label>
                            <input
                                required
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:border-primary/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phone" className="ml-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Phone
                            </label>
                            <input
                                required
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 (555) 000-0000"
                                className="flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:border-primary/50"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="ml-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Email
                        </label>
                        <input
                            required
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@company.com"
                            className="flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:border-primary/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="business_description" className="ml-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Business Description
                        </label>
                        <textarea
                            required
                            id="business_description"
                            name="business_description"
                            value={formData.business_description}
                            onChange={handleChange}
                            placeholder="Tell us about your company and what you do..."
                            className="flex min-h-[100px] w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y transition-all focus:border-primary/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="requirements" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Project Requirements
                        </label>
                        <textarea
                            required
                            id="requirements"
                            name="requirements"
                            value={formData.requirements}
                            onChange={handleChange}
                            placeholder="What validation do you need? Specific features, timeline, etc."
                            className="flex min-h-[120px] w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y transition-all focus:border-primary/50"
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <Send className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </button>
                    </div>

                    {status === "success" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-xl bg-green-500/10 text-green-500 text-sm text-center font-medium border border-green-500/20"
                        >
                            Thank you! Your message has been sent successfully. We'll be in touch soon.
                        </motion.div>
                    )}

                    {status === "error" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm text-center font-medium border border-destructive/20"
                        >
                            Something went wrong. Please try again later.
                        </motion.div>
                    )}
                </form>
            </motion.div>
        </div>
    )

    if (embedded) {
        return content
    }

    return (
        <section className="pt-0 pb-24 relative overflow-hidden">
            {content}
        </section>
    )
}
