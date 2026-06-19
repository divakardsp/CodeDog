import { requireAuth } from "@/features/auth/actions";
import { DashboardShell } from "@/features/dashboard/components/dashboard-shell";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await requireAuth();
    console.log("Reaching layout")
    return (
        <DashboardShell user={session.user} plan="Pro">
            {children}
        </DashboardShell>
    );
}
