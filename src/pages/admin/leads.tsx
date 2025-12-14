import { useEffect, useState } from "react"
import { AdminLayout } from "../../components/admin/admin-layout"
import { AuthGuard } from "../../components/admin/auth-guard"
import { supabase } from "../../lib/supabase"
import { Loader2, Mail, Phone, Calendar } from "lucide-react"

export function LeadsPage() {
    const [leads, setLeads] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchLeads()
    }, [])

    async function fetchLeads() {
        try {
            const { data, error } = await supabase
                .from("leads")
                .select("*")
                .order("created_at", { ascending: false })

            if (error) throw error
            setLeads(data || [])
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    async function updateStatus(id: string, status: string) {
        try {
            await supabase.from("leads").update({ status } as any).eq("id", id)
            fetchLeads()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <AuthGuard>
            <AdminLayout>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Project Leads</h1>
                    <p className="text-muted-foreground">Manage incoming project requests</p>
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
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Client</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Contact</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Project Details</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {leads.map((lead) => (
                                        <tr key={lead.id} className="border-b transition-colors hover:bg-muted/50">
                                            <td className="p-4 align-top">
                                                <div className="flex items-center gap-2 text-muted-foreground whitespace-nowrap">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(lead.created_at).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="p-4 align-top">
                                                <div className="font-medium">{lead.name}</div>
                                            </td>
                                            <td className="p-4 align-top">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-xs">
                                                        <Mail className="h-3 w-3" />
                                                        {lead.email}
                                                    </div>
                                                    {lead.phone && (
                                                        <div className="flex items-center gap-2 text-xs">
                                                            <Phone className="h-3 w-3" />
                                                            {lead.phone}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4 align-top max-w-md">
                                                <div className="space-y-2">
                                                    {lead.business_description && (
                                                        <p className="text-muted-foreground text-xs line-clamp-2" title={lead.business_description}>
                                                            <span className="font-semibold text-foreground">Biz:</span> {lead.business_description}
                                                        </p>
                                                    )}
                                                    {lead.requirements && (
                                                        <p className="text-muted-foreground text-xs line-clamp-2" title={lead.requirements}>
                                                            <span className="font-semibold text-foreground">Req:</span> {lead.requirements}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4 align-top">
                                                <select
                                                    className="h-8 rounded-md border border-input bg-transparent px-2 text-xs font-medium shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                                    value={lead.status}
                                                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                                                >
                                                    <option value="new">New</option>
                                                    <option value="contacted">Contacted</option>
                                                    <option value="closed">Closed</option>
                                                </select>
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
