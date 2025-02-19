import { config } from "dotenv";
import getActiveWindow from "./src/tracker";
config();

import generateSummary from "./src/summary";

// Exemple d'appel
const projectDetails =
  "VelvetDream travaille sur KitsunePoster, un projet du créateur Nekoniyah. KitsunePoster servira à poster automatiquement sur Linkedin.";
generateSummary(projectDetails).then((r) => {
  console.log(r);
});
// Exécuter toutes les 5 secondes
setInterval(getActiveWindow, 5000);
