import OpenAI from "openai";
import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import dotenv from "dotenv";

dotenv.config();

const openAPIKey=process.env.OPENAI_API_KEY;

export async function POST(req) {
    try {
        const { messages } = await req.json();
        const client = new OpenAI({ apiKey: openAPIKey });

        // Read the resume from the file system
        const DATA_RESUME = await fs.readFile('public/docs/cv.txt', 'utf-8');


        // Setup proper System message and include the resume if needed
        messages.unshift({
            role: "system",
            content: `
            You are a helpful Portfolio GPT, answering only questions based on the resume provided.
        Resume:
        ${DATA_RESUME }
        Help users learn more about Tomislav from his resume.
            `
        });

        // Call OpenAI API
        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 128
        });

        return NextResponse.json({
            message: response.choices[0].message.content
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}