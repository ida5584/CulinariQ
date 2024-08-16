require("dotenv").config("..");

import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are a culinary assistant chatbot. Provide a recipe based on given ingredients, skill level, and cuisine type. The response must ONLY be a JSON object with the following structure:
                        {
                        "recipeName": "Recipe Name",
                        "ingredients": "Ingredients list",
                        "instructions": "Step-by-step instructions",
                        "cookingTips": "Cooking tips"
                        }
                        `

export async function POST(req){
    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_API_KEY})
    const data = await req.json()

    const completion = await openai.chat.completions.create({
        model: "meta-llama/llama-3.1-8b-instruct:free",//"gpt-4o-mini",
        stream: true,
        messages: [
            {
                role: 'system', 
                content: systemPrompt, 
            }, 
            ...data, 
        ],
    })

    let TEMP = ""

    const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder()
            try {
                for await (const chunk of completion){
                    const content = chunk.choices[0]?.delta?.content
                    if (content){
                        const text = encoder.encode(content)
                        TEMP+=content
                        controller.enqueue(text)
                    }
                }
            } catch (err) {
                controller.error(err)
            } finally {
                controller.close()
            }
        },
    })
    console.log(TEMP)          
                   
    return new NextResponse(stream)
}
