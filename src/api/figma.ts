import axios from "axios";

export async function getFigmaChanges(fileKey: string) {
    try {
        const response = await axios.get(
            `https://api.figma.com/v1/files/${fileKey}/versions`,
            {
                headers: {
                    "X-Figma-Token": process.env.FIGMA_TOKEN,
                },
            }
        );
        return response.data.versions.slice(0, 5);
    } catch (error) {
        console.error("Error fetching Figma changes:", error);
        return [];
    }
}
