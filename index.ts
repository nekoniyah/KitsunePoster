import { config } from "dotenv";
import getActiveWindow from "./src/tracker";
config();

// Execute every 5 seconds
setInterval(getActiveWindow, 5000);
