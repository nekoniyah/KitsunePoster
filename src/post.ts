import axios from "axios";
export async function post(text: string) {
    axios
        .post(
            "https://api.linkedin.com/v2/posts",
            {
                author: "urn:li:organization:104913969",
                commentary: text,
                visibility: "PUBLIC",
                distribution: {
                    feedDistribution: "MAIN_FEED",
                    targetEntities: [],
                    thirdPartyDistributionChannels: [],
                },
                lifecycleState: "PUBLISHED",
                isReshareDisabledByAuthor: false,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.LD_TOKEN}`,
                    "X-Restli-Protocol-Version": "2.0.0",
                },
            }
        )
        .catch((err) => {
            console.error(err);
        });
}
