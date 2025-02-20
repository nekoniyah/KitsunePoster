import axios from "axios";
import takeScreenshot from "./utils/screenshot";

const GROQ_KEY = process.env.GROQ_KEY!;

const generateSummary = async (projectDetails: string) => {
    const screenshot = await takeScreenshot();

    // Different prompt for Figma vs Git projects
    const isFigmaProject = projectDetails.includes("figma");
    const prompt = isFigmaProject
        ? `Looking at this screenshot of my Figma work, describe the visual design and layout changes shown. Keep it concise and engaging for a LinkedIn post, under 3-4 sentences.`
        : `Summarize the latest progress on my project based on the following details: ${projectDetails}. \nMake it concise and engaging for a LinkedIn post. Highlight key improvements and features in a professional yet accessible tone. Keep it under 3-4 sentences.`;

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
