import { config } from "dotenv";
import getActiveWindow from "./src/tracker";
config();

import generateSummary from "./src/summary";

// Call Example
const projectDetails =
  "VelvetDream is working on KitsunePoster. A project to post automatically on Linkedin.";
generateSummary(projectDetails).then((r) => {
  console.log(r);
});
// Execute every 5 seconds
setInterval(getActiveWindow, 5000);
