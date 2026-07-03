import { UserSubscription } from "@/features/dashboard/lib/types";
import { prisma } from "@/lib/db";
import { use } from "react";

export async function getUserSubscription(
    userId: string,
): Promise<UserSubscription> {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            plan: true,
            subscriptionStatus: true,
            subscriptionRenewsAt: true,
        },
    });

    if (!user) {
        return { plan: "free", renewsAt: null, status: "active" };
    }

    const renewsAt = user.subscriptionRenewsAt?.toISOString() ?? null;

    if (user.plan !== "pro") {
        return { plan: "free", status: "active", renewsAt };
    }

    if (user.subscriptionStatus === "pending") {
        return { plan: "free", status: "trialing", renewsAt };
    }

    if (user.subscriptionStatus === "canceled") {
        const stillActive =
            user.subscriptionRenewsAt !== null &&
            user.subscriptionRenewsAt > new Date();

        if (stillActive) {
            return { plan: "pro", status: "active", renewsAt };
        }

        return { plan: "free", status: "canceled", renewsAt };
    }

    if (user.subscriptionStatus === "active") {
        return { plan: "pro", status: "active", renewsAt };
    }

    return { plan: "free", status: "canceled", renewsAt };
}
