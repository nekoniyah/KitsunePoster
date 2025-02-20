import sqlite3 from "sqlite3";
import type { ProjectUpdate } from "../types";

export class Database {
    private db: sqlite3.Database;

    constructor() {
        this.db = new sqlite3.Database("posts.db");
        this.init();
    }

    private async init() {
        this.db.run(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        title TEXT,
        content TEXT,
        screenshot TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    }

    async savePost(update: ProjectUpdate, content: string, screenshot: string) {
        return new Promise((resolve, reject) => {
            this.db.run(
                "INSERT INTO posts (type, title, content, screenshot) VALUES (?, ?, ?, ?)",
                [update.type, update.title, content, screenshot],
                (err) => {
                    if (err) reject(err);
                    else resolve(true);
                }
            );
        });
    }

    async getAllPosts() {
        return new Promise((resolve, reject) => {
            this.db.all(
                "SELECT * FROM posts ORDER BY timestamp DESC",
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
    }
}
