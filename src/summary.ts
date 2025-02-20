import axios from "axios";
import takeScreenshot from "./utils/screenshot";

const GROQ_KEY = process.env.GROQ_KEY!;

const generateSummary = async (
    projectDetails: string,
    projectTitle: string
) => {
    const screenshot = await takeScreenshot();

    const isFigmaProject = projectDetails.includes("figma");
    const prompt = `${
        isFigmaProject
            ? "Looking at this Figma screenshot"
            : `Based on these changes: ${projectDetails}`
    }, write ONLY a LinkedIn post in this exact format:

[Exciting project update] 🚀 [What was done/achieved]. [Impact or future plans]. #Hashtag1 #Hashtag2

Rules:
- Start directly with the post
- Use first person ("I", "my")
- No introductory phrases like "Here's"
- No explanations or meta-commentary
- Just the post text itself

Additionnal informations:
- The project name/title is "${projectTitle}"
`;

    try {
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.2-90b-vision-preview",
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: prompt,
                            },
                            {
                                type: "image_url",
                                image_url: {
                                    url: screenshot,
                                },
                            },
                        ],
                    },
                ],
                max_tokens: 200,
            },
            {
                headers: {
                    Authorization: `Bearer ${GROQ_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const summary = response.data.choices[0].message.content;
        return summary;
    } catch (error) {
        console.error("Error generating summary:", error);
    }
};

export default generateSummary;
