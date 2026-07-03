import { getUserInstallationId } from "@/features/github/server/installation";
import { prisma } from "@/lib/db";
import { startOfMonth } from "date-fns";
import { getUserSubscription } from "./subscription";

export type UsageSummary = {
    used: number;
    limit: number | null;
};

export const FREE_MONTHLY_LIMIT = 5;

export async function getReviewsThisMonths(userId: string): Promise<number> {
    const installationId = await getUserInstallationId(userId);

    if (!installationId) {
        return 0;
    }

    return prisma.pullRequest.count({
        where: {
            installationId,
            status: "reviewed",
            reviewedAt: {
                gte: startOfMonth(new Date()),
            },
        },
    });
}

export async function canUserReview(userId: string): Promise<boolean> {
    const subscription = await getUserSubscription(userId);

    if (subscription.plan === "pro" && subscription.status === "active") {
        return true;
    }

    const used = await getReviewsThisMonths(userId);
    return used < FREE_MONTHLY_LIMIT;
}

export async function getUsageSummary(userId: string): Promise<UsageSummary> {
    const subscription = await getUserSubscription(userId);
    const used = await getReviewsThisMonths(userId);

    if(subscription.plan === "pro" && subscription.status === "active"){
        return {used, limit: null}
    }

    return {used, limit: FREE_MONTHLY_LIMIT}
}
