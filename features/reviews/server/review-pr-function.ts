import { inngest } from "@/features/inngest/client";
import { prisma } from "@/lib/db";
import { getPullRequestFiles } from "./pr-files";
import { chunkPrFiles } from "../utils/chunk-codes";



export const reviewPullRequest = inngest.createFunction(
    {id: "review-pull-request", triggers: {event: "github/pr-recieved"}},
    async ({event, step}) => {
        const pullRequestId = event.data.pullRequestId

        const pullRequest = await step.run("mark-processing", async () => {
            return prisma.pullRequest.update({
                where: {id: pullRequestId},
                data: {status: "processing"}
            })
        });

        const chunks = await step.run("chunking-data", async () => {
            const files = await getPullRequestFiles(
                pullRequest.installationId,
                pullRequest.repoFullName,
                pullRequest.prNumber,
            )

            return chunkPrFiles(pullRequest.prNumber, files);
        })
    }
)