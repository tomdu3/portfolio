import OpenAI from "openai";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import dotenv from "dotenv";
import { formatResponseText } from "../utils/formatText";
import path from "path";

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
    const DATA_RESUME = await fs.readFile(
      path.join(process.cwd(), "public", "docs", "cv.txt"),
      "utf-8",
    );
    // Setup system message with resume
    messages.unshift({
      role: "system",
      content: `
            You are a helpful Portfolio GPT, answering only questions based on the resume provided.
            Resume:
            ${DATA_RESUME}
            Help users learn more about Tomislav from his resume. Remove formatting or markdown from the response. Remove *, [, ]. add new line character where appropriate.
            If you don't know the answer, say "I don't know" or "I can't answer that".
            `,
    });

    // Call OpenRouter API (using DeepSeek model)
    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1", // or "deepseek/deepseek-chat"
      messages: messages,
      max_tokens: 3000,
    });

    return NextResponse.json({
      message: response.choices[0].message.content,
      formatted: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: "An error occurred",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
