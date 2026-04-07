"use server";

import Groq from 'groq-sdk';

export async function analyzePrescriptionImage(base64Image: string) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("Missing GROQ_API_KEY in .env.local file");
  }

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const prompt = `You are a medical AI. Read this prescription image. 
  Extract the medicines and return ONLY a raw JSON array of objects with "name" and "dosage" keys.
  Do not include markdown blocks, just the JSON.
  Example:[{"name": "Paracetamol", "dosage": "500mg"}]`;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.2-90b-vision-instruct", // 🟢 UPDATED: Current Production Vision Model
      messages:[
        {
          role: "user",
          content:[
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: base64Image } },
          ],
        },
      ],
      temperature: 0.1,
    });

    let resultText = response.choices[0]?.message?.content || "";
    
    // Strip out markdown (```json ... ```) if the AI includes it
    resultText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();

    return resultText ? JSON.parse(resultText) : null;
    
  } catch (error) {
    console.error("Groq AI Error:", error);
    throw new Error("Failed to analyze image");
  }
}