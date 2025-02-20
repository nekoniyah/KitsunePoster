export interface PostTemplate {
    title: string;
    body: string;
}

export const templates = {
    gitUpdate: (changes: any) => `🚀 Latest Updates:
${changes.map((c: any) => `- ${c.message}`).join("\n")}`,

    figmaUpdate: (changes: any) => `🎨 Design Updates:
Latest changes: ${changes[0].description}`,
};
