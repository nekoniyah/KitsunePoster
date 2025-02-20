import { config } from "dotenv";
import getActiveWindow from "./src/tracker";
import { startServer } from "./src/server";

config();

// Start the web server
startServer();

// Continue monitoring windows
setInterval(getActiveWindow, 5000);
