import { config } from "dotenv";
import getActiveWindow from "./src/tracker";
config();

import generateSummary from "./src/summary";
import { createPost } from "./src/linkedin_api";

// Call Example
const projectDetails =
    "VelvetDream is working on KitsunePoster. A project to post automatically on Linkedin.";
generateSummary(projectDetails).then((r) => {
    console.log(r);
});

createPost("test");

Bun.serve({
    fetch(req: Request): Response | Promise<Response> {
        console.debug(req);

        return new Response("Hello World!");
    },
    port: 3000,
});

// Execute every 5 seconds
setInterval(getActiveWindow, 5000);
