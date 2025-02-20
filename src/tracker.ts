import { activeWindow } from "active-win";
import { getGitChanges } from "./api/git";
import generateSummary from "./summary";
import { Database } from "./database/sqlite";
import takeScreenshot from "./utils/screenshot";

const TRACKED_PROJECTS = [
    "VelvetDream",
    "Blatant",
    "BSOG",
    "Figma",
    "Godot",
    "Photoshop",
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
        console.log("ok0");
        const screenshot = await takeScreenshot();

        if (projectType === "figma") {
            console.log("ok");
            // For Figma, just use screenshot and generate summary from it
            const summary = await generateSummary("figma", windowTitle);
            console.log("ok1");
            if (summary) {
                await db.savePost(
                    {
                        type: projectType,
                        title: windowTitle,
                        changes: ["Visual update"], // Simple placeholder since we're focusing on the screenshot
                        timestamp: new Date(),
                    },
                    summary,
                    screenshot!
                );
                console.log("Figma update saved to database");
            }
        } else {
            // For Git projects, get changes and generate summary as before
            const changes = await getGitChanges(process.env.GIT_REPO_PATH!);
            console.log("ok2");
            const summary = await generateSummary(
                JSON.stringify(changes),
                windowTitle
            );

            if (summary) {
                await db.savePost(
                    {
                        type: projectType,
                        title: windowTitle,
                        changes: changes.map((c) => c.message),
                        timestamp: new Date(),
                    },
                    summary,
                    screenshot!
                );
                console.log("Git update saved to database");
            }
        }
    } catch (error) {
        console.error("Error processing project update:", error);
    }
}
