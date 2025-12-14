import { PageTransition } from "../components/layout/page-transition"
import { Calendar, Clock, ArrowRight } from "lucide-react"

export function Blog() {
    return (
        <PageTransition>
            <div className="pt-24 min-h-screen">
                <div className="container px-4 text-center mb-16">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                        Our Blog
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Insights, thoughts, and trends from the world of software development and design.
                    </p>
                </div>
                <BlogGrid />
            </div>
        </PageTransition>
    )
}

function BlogGrid() {
    const posts = [
        {
            id: 1,
            title: "The Future of React: Server Components and Beyond",
            excerpt: "Exploring the shift towards server-side rendering and what it means for frontend performance.",
            date: "Dec 12, 2024",
            readTime: "5 min read",
            category: "Development",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Designing for Accessibility in 2025",
            excerpt: "Why inclusive design is not just a trend but a necessity for modern digital products.",
            date: "Nov 28, 2024",
            readTime: "4 min read",
            category: "Design",
            image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Scaling Node.js Applications for Enterprise",
            excerpt: "Best practices for microservices architecture and managing high-load systems.",
            date: "Nov 15, 2024",
            readTime: "7 min read",
            category: "Backend",
            image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop"
        }
    ]

    return (
        <div className="container px-4 pb-20">
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <article key={post.id} className="group flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card transition-all hover:shadow-xl hover:-translate-y-1">
                        <div className="aspect-video w-full overflow-hidden">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                            <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
                                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
                                    {post.category}
                                </span>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {post.readTime}
                                    </div>
                                </div>
                            </div>
                            <h3 className="mb-2 text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                                {post.title}
                            </h3>
                            <p className="mb-4 flex-1 text-muted-foreground text-sm">
                                {post.excerpt}
                            </p>
                            <div className="mt-auto flex items-center text-sm font-medium text-primary group-hover:underline">
                                Read Article <ArrowRight className="ml-1 h-4 w-4" />
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}
