import axios from "axios";
import takeScreenshot from "./utils/screenshot";

const GROQ_KEY = process.env.GROQ_KEY!;

const generateSummary = async (projectDetails: string) => {
    const prompt = `Summarize the latest progress on my project based on the following details: ${projectDetails}. \nMake it concise and engaging for a LinkedIn post. Highlight key improvements and features in a professional yet accessible tone. Keep it under 3-4 sentences. Write it without comments.`;

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
                                    url: await takeScreenshot(),
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
        console.error("Erreur lors de la génération du résumé:", error);
    }
};

export default generateSummary;
