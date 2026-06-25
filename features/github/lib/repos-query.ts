import { infiniteQueryOptions } from "@tanstack/react-query";

export const githubRepoKeys = {
    all: ["github", "repos"] as const,
};

const REPOS_STALE_TIME = 10 * 60 * 1000; // 10 minutes
const REPOS_REFETCH_INTERVAL = 5_000;

export const githubReposInfiniteQuery = infiniteQueryOptions({
    queryKey: [...githubRepoKeys.all, "list"],
    queryFn: async ({ pageParam }) => {
        const response = await fetch(`/api/github/repos?page=${pageParam}`);

        if (!response.ok) {
            throw new Error("Failed to load Repositories");
        }

        return response.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
        if (lastPage.hasMore) {
            return lastPage.page + 1;
        }
    },
    refetchInterval: REPOS_REFETCH_INTERVAL,
    staleTime: REPOS_STALE_TIME,
});
