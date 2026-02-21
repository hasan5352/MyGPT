import dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config()

async function getAIResponse(message) {
    const openai = new OpenAI({
        baseURL: "https://router.huggingface.co/v1",
        apiKey: process.env.HF_TOKEN,
    });

    const response = await openai.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [{ role: "user", content: message }],
        max_completion_tokens: Number(process.env.MAX_TOKENS)
    });

    return response.choices[0].message.content;
}

export default getAIResponse;
