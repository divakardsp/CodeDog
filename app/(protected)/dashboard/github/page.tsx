import { requireAuth } from "@/features/auth/actions";
import { getInstallationStatus } from "@/features/github/server/installation";
import { Metadata } from "next";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { GithubConnectCard } from "@/features/github/components/github-connect-card";

export const metadata: Metadata = {
    title: "Github App . Dashboard",
};

export default async function DashboardGithubPage() {
    const session = await requireAuth();
    const installation = await getInstallationStatus(session.user.id);

    return (
        <>
            <DashboardHeader
                title="Github App"
                description="Install or disconnect the reviewer app on your GitHub account."
            />
            <GithubConnectCard
                userId={session.user.id}
                installation={installation}
            />
        </>
    );
}
