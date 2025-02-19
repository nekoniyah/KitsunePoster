import axios from "axios";

let root = "https://api.linkedin.com/v2/rest";
let access_token = process.env.LD_TOKEN;

export async function createPost(text: string, file?: string) {
    let res = await axios.post(
        `https://api.linkedin.com/v2/ugcPosts`,
        {
            author: "urn:li:organization:104913969",
            lifecycleState: "PUBLISHED",
            text: text,
            visibility: "PUBLIC",
        },
        {
            headers: {
                "Content-Type": "application/json",
                "X-Restli-Protocol-Version": "2.0.0",
                "LinkedIn-Version": "202501",
                Authorization: `Bearer ${access_token}`,
            },
        }
    );
}
