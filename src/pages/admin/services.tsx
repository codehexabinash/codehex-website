import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import { Plus, Trash2, Loader2, AlertCircle } from "lucide-react"
import { AdminLayout } from "../../components/admin/admin-layout"
import { AuthGuard } from "../../components/admin/auth-guard"

interface Service {
    id: string
    name: string
    created_at: string
}

export function ServicesPage() {
    const [services, setServices] = useState<Service[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [newName, setNewName] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        fetchServices()
    }, [])

    async function fetchServices() {
        try {
            const { data, error } = await supabase
                .from("services")
                .select("*")
                .order("created_at", { ascending: false })

            if (error) throw error
            setServices(data || [])
        } catch (err: any) {
            console.error("Error fetching services:", err)
            setError("Failed to load services")
        } finally {
            setIsLoading(false)
        }
    }

    async function handleAddService(e: React.FormEvent) {
        e.preventDefault()
        if (!newName.trim()) return

        setIsSubmitting(true)
        setError("")

        try {
            const { error } = await supabase
                .from("services")
                .insert([{ name: newName.trim() }] as any)

            if (error) throw error

            setNewName("")
            fetchServices()
        } catch (err: any) {
            console.error("Error adding service:", err)
            setError(err.message || "Failed to add service")
        } finally {
            setIsSubmitting(false)
        }
    }

    async function handleDeleteService(id: string) {
        if (!window.confirm("Are you sure you want to delete this service?")) return

        try {
            const { error } = await supabase
                .from("services")
                .delete()
                .eq("id", id)

            if (error) throw error
            fetchServices()
        } catch (err: any) {
            console.error("Error deleting service:", err)
            alert("Failed to delete service")
        }
    }

    return (
        <AuthGuard>
            <AdminLayout>
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Services</h1>
                        <p className="text-muted-foreground">Manage the service categories available for featured work.</p>
                    </div>

                    {/* Add Service Form */}
                    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                        <form onSubmit={handleAddService} className="flex gap-4 items-end">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <label htmlFor="service-name" className="text-sm font-medium">
                                    New Service Name
                                </label>
                                <input
                                    id="service-name"
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="e.g. Web Development"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting || !newName.trim()}
                                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 h-10"
                            >
                                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                                Add Service
                            </button>
                        </form>
                        {error && (
                            <div className="mt-4 flex items-center text-destructive text-sm bg-destructive/10 p-3 rounded-md">
                                <AlertCircle className="h-4 w-4 mr-2" />
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Services List */}
                    <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                        <div className="p-6 border-b">
                            <h3 className="font-semibold">Existing Services</h3>
                        </div>
                        {isLoading ? (
                            <div className="p-8 flex justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : services.length === 0 ? (
                            <div className="p-8 text-center text-muted-foreground">
                                No services found. Add one above.
                            </div>
                        ) : (
                            <div className="divide-y">
                                {services.map((service) => (
                                    <div key={service.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                                        <span className="font-medium">{service.name}</span>
                                        <button
                                            onClick={() => handleDeleteService(service.id)}
                                            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                                            title="Delete Service"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </AdminLayout>
        </AuthGuard>
    )
}
