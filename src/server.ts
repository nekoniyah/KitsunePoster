import express from "express";
import { Database } from "./database/sqlite";
import { post } from "./post";

const app = express();
const db = new Database();

app.use(express.json());
app.use(express.static("public"));

// Get all stored posts
app.get("/api/posts", async (req, res) => {
    const posts = await db.getAllPosts();
    res.json(posts);
});

// Share selected post
app.post("/api/share", async (req, res) => {
    const { content } = req.body;
    try {
        await post(content);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "Failed to share post" });
    }
});

export function startServer() {
    app.listen(3000, () => {
        console.log("Server running on http://localhost:3000");
    });
}
