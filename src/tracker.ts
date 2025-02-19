import { activeWindow } from "active-win";

// Liste des projets à surveiller
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
  const window = await activeWindow(); // Récupère la fenêtre active
  const windowTitle = window ? window.title : "";

  if (windowTitle) {
    const isTracked = TRACKED_PROJECTS.some((name) =>
      windowTitle.toLowerCase().includes(name.toLowerCase())
    );

    if (isTracked) {
      console.log(`🟢 Projet détecté : ${windowTitle}`);
    }
  }
}
