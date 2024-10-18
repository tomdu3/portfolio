import OpenAI from "openai";
import { NextResponse } from "next/server";

const openAPIKey=process.env.OPENAI_API_KEY;
// const completion = await openai.chat.completions.create({
//     model: "gpt-4o",
//     messages: [
//         {"role": "user", "content": "write a haiku about ai"}
//     ]
// });

export async function GET() {
    const client = new OpenAI({openAPIKey});

    const mesages = [
        {
            role: "system",
            content: 'You are a helpful assistant.',
        },
        {
            role: "user",
            content: 'Which is the best: Javascript or Python?',
        }
    ];

    const response = await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: mesages,
    })

    return NextResponse.json({
        message: response.choices[0].message.content
    });
}