import { useEffect, useState } from "react"
import { AdminLayout } from "../../components/admin/admin-layout"
import { AuthGuard } from "../../components/admin/auth-guard"
import { supabase } from "../../lib/supabase"
import { Loader2, Mail, Calendar } from "lucide-react"

export function FeedbackPage() {
    const [feedbacks, setFeedbacks] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchFeedbacks()
    }, [])

    async function fetchFeedbacks() {
        try {
            const { data, error } = await supabase
                .from("feedbacks")
                .select("*")
                .order("created_at", { ascending: false })

            if (error) throw error
            setFeedbacks(data || [])
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    async function toggleStatus(id: string, currentStatus: string) {
        try {
            const newStatus = currentStatus === 'unread' ? 'read' : 'unread'
            await supabase.from("feedbacks").update({ status: newStatus } as any).eq("id", id)
            fetchFeedbacks()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <AuthGuard>
            <AdminLayout>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
                    <p className="text-muted-foreground">Listen to your users</p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="rounded-xl border bg-card text-card-foreground shadow">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm text-left">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Date</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">From</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Message</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {feedbacks.map((item) => (
                                        <tr key={item.id} className={`border-b transition-colors hover:bg-muted/50 ${item.status === 'unread' ? 'bg-primary/5' : ''}`}>
                                            <td className="p-4 align-top">
                                                <div className="flex items-center gap-2 text-muted-foreground whitespace-nowrap">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(item.created_at).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="p-4 align-top">
                                                <div className="font-medium">{item.name}</div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Mail className="h-3 w-3" />
                                                    {item.email}
                                                </div>
                                            </td>
                                            <td className="p-4 align-top max-w-lg">
                                                <div className="space-y-1">
                                                    {item.subject && (
                                                        <div className="font-semibold text-foreground">{item.subject}</div>
                                                    )}
                                                    <p className="text-muted-foreground">{item.message}</p>
                                                </div>
                                            </td>
                                            <td className="p-4 align-top">
                                                <button
                                                    onClick={() => toggleStatus(item.id, item.status)}
                                                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${item.status === 'unread'
                                                            ? 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80'
                                                            : 'text-foreground hover:bg-muted'
                                                        }`}
                                                >
                                                    {item.status === 'unread' ? 'Mark Read' : 'Read'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </AdminLayout>
        </AuthGuard>
    )
}
