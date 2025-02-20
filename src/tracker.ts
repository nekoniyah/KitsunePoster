import { activeWindow } from "active-win";
import { getGitChanges } from "./api/git";
import { getFigmaChanges } from "./api/figma";
import generateSummary from "./summary";
import { Database } from "./database/sqlite";
import takeScreenshot from "./utils/screenshot";

const TRACKED_PROJECTS = [
    "VelvetDream",
    "Blatant",
    "BSOG",
    "Raoronia",
    "Personal & Projects",
];

const db = new Database();

export default async function getActiveWindow() {
    const window = await activeWindow();
    const windowTitle = window ? window.title : "";

    if (!windowTitle) return;

    const trackedProject = TRACKED_PROJECTS.find((name) =>
        windowTitle.toLowerCase().includes(name.toLowerCase())
    );

    if (!trackedProject) return;

    console.log(`🟢 Detected project: ${windowTitle}`);

    try {
        const projectType = windowTitle.includes("Figma") ? "figma" : "git";
        const changes =
            projectType === "figma"
                ? await getFigmaChanges(process.env.FIGMA_FILE_KEY!)
                : await getGitChanges(process.env.GIT_REPO_PATH!);

        const screenshot = await takeScreenshot();
        const summary = await generateSummary(JSON.stringify(changes));

        if (summary) {
            // Only save to database, don't post automatically
            await db.savePost(
                {
                    type: projectType,
                    title: windowTitle,
                    changes: changes.map(
                        (c: any) => c.message || c.description
                    ),
                    timestamp: new Date(),
                },
                summary,
                screenshot
            );
            console.log("Update saved to database");
        }
    } catch (error) {
        console.error("Error processing project update:", error);
    }
}
