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
                    company_name: string | null
                    project_details: string
                    status: string
                }
                Insert: {
                    id?: string
                    created_at?: string
                    name: string
                    email: string
                    company_name?: string | null
                    project_details: string
                    status?: string
                }
                Update: {
                    id?: string
                    created_at?: string
                    name?: string
                    email?: string
                    company_name?: string | null
                    project_details?: string
                    status?: string
                }
            }
            case_studies: {
                Row: {
                    id: string
                    created_at: string
                    title: string
                    description: string
                    content: string
                    image_url: string | null
                    tags: string[]
                }
                Insert: {
                    id?: string
                    created_at?: string
                    title: string
                    description: string
                    content: string
                    image_url?: string | null
                    tags?: string[]
                }
                Update: {
                    id?: string
                    created_at?: string
                    title?: string
                    description?: string
                    content?: string
                    image_url?: string | null
                    tags?: string[]
                }
            }
        }
    }
}
