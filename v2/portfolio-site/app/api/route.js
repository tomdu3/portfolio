import OpenAI from "openai";
import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import dotenv from "dotenv";
import { formatResponseText } from '../utils/formatText';


dotenv.config();

const openRouterKey = process.env.OPENROUTER_API_KEY;
const yourSiteUrl = process.env.YOUR_SITE_URL || "http://localhost:3000";
const yourSiteName = process.env.YOUR_SITE_NAME || "Tomislav's Portfolio Chat";

export async function POST(req) {
    try {
        const { messages } = await req.json();

        // Initialize OpenRouter client (OpenAI-compatible)
        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: openRouterKey,
            defaultHeaders: {
                "HTTP-Referer": yourSiteUrl,
                "X-Title": yourSiteName,
            },
        });

        // Read the resume from the file system
        const DATA_RESUME = await fs.readFile('public/docs/cv.txt', 'utf-8');

        // Setup system message with resume
        messages.unshift({
            role: "system",
            content: `
            You are a helpful Portfolio GPT, answering only questions based on the resume provided.
            Resume:
            ${DATA_RESUME}
            Help users learn more about Tomislav from his resume.
            `
        });

        // Call OpenRouter API (using DeepSeek model)
        const response = await openai.chat.completions.create({
            model: "deepseek/deepseek-chat", // or "deepseek/deepseek-r1"
            messages: messages,
            max_tokens: 128
        });

        return NextResponse.json({
            message: response.choices[0].message.content,
            formatted: formatResponseText(response.choices[0].message.content)
          });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ 
            error: "An error occurred",
            details: error.message 
        }, { status: 500 });
    }
}