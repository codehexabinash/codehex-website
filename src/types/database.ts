export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            leads: {
                Row: {
                    id: string
                    created_at: string
                    name: string
                    email: string
                    phone: string | null
                    business_description: string | null
                    requirements: string | null
                    status: 'new' | 'contacted' | 'closed'
                }
                Insert: {
                    id?: string
                    created_at?: string
                    name: string
                    email: string
                    phone?: string | null
                    business_description?: string | null
                    requirements?: string | null
                    status?: 'new' | 'contacted' | 'closed'
                }
                Update: {
                    id?: string
                    created_at?: string
                    name?: string
                    email?: string
                    phone?: string | null
                    business_description?: string | null
                    requirements?: string | null
                    status?: 'new' | 'contacted' | 'closed'
                }
            }
            feedbacks: {
                Row: {
                    id: string
                    created_at: string
                    name: string
                    email: string
                    subject: string | null
                    message: string
                    status: 'unread' | 'read'
                }
                Insert: {
                    id?: string
                    created_at?: string
                    name: string
                    email: string
                    subject?: string | null
                    message: string
                    status?: 'unread' | 'read'
                }
                Update: {
                    id?: string
                    created_at?: string
                    name?: string
                    email?: string
                    subject?: string | null
                    message?: string
                    status?: 'unread' | 'read'
                }
            }
            blog_posts: {
                Row: {
                    id: string
                    created_at: string
                    updated_at: string
                    title: string
                    slug: string
                    excerpt: string | null
                    content: string | null
                    cover_image: string | null
                    published: boolean
                    views: number
                    author_id: string | null
                }
                Insert: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    title: string
                    slug: string
                    excerpt?: string | null
                    content?: string | null
                    cover_image?: string | null
                    published?: boolean
                    views?: number
                    author_id?: string | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    title?: string
                    slug?: string
                    excerpt?: string | null
                    content?: string | null
                    cover_image?: string | null
                    published?: boolean
                    views?: number
                    author_id?: string | null
                }
            }
            profiles: {
                Row: {
                    id: string
                    email: string | null
                    role: string | null
                    created_at: string
                }
                Insert: {
                    id: string
                    email?: string | null
                    role?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    email?: string | null
                    role?: string | null
                    created_at?: string
                }
            }
            services: {
                Row: {
                    id: string
                    name: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    created_at?: string
                }
            }
            featured_work: {
                Row: {
                    id: string
                    title: string
                    subject: string
                    image_url: string
                    blog_post_url: string | null
                    category: string
                    color: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    subject: string
                    image_url: string
                    blog_post_url?: string | null
                    category: string
                    color?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    subject?: string
                    image_url?: string
                    blog_post_url?: string | null
                    category?: string
                    color?: string | null
                    created_at?: string
                }
            }
        }
    }
}
