import { activeWindow } from "active-win";

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

export default async function getActiveWindow() {
  const window = await activeWindow();
  const windowTitle = window ? window.title : "";

  if (windowTitle) {
    const isTracked = TRACKED_PROJECTS.some((name) =>
      windowTitle.toLowerCase().includes(name.toLowerCase())
    );

    if (isTracked) {
      console.log(`🟢 Detected project : ${windowTitle}`);
    }
  }
}
