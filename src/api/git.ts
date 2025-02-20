import simpleGit from "simple-git";

export async function getGitChanges(repoPath: string) {
    const git = simpleGit(repoPath);
    try {
        const logs = await git.log({ maxCount: 5 });
        return logs.all.map((commit) => ({
            hash: commit.hash,
            message: commit.message,
            date: commit.date,
        }));
    } catch (error) {
        console.error("Error fetching git changes:", error);
        return [];
    }
}
