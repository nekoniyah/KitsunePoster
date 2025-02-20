export interface ProjectUpdate {
    type: "git" | "figma";
    title: string;
    changes: string[];
    timestamp: Date;
}

export interface PostTemplate {
    title: string;
    body: string;
}
