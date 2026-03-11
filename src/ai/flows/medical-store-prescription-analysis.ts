'use server';
/**
 * @fileOverview An AI agent for medical stores to analyze prescription images using Groq.
 */

import Groq from 'groq-sdk';
import { z } from 'zod';

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MedicineItemSchema = z.object({
  name: z.string().describe('The name of the medicine.'),
  dosage: z.string().describe('The dosage of the medicine, including strength and frequency (e.g., "500mg, twice daily").'),
  instructions: z.string().describe('Any special instructions for the medicine (e.g., "Take with food", "Before bed").'),
});

const AnalyzePrescriptionOutputSchema = z.object({
  medicineItems: z.array(MedicineItemSchema).describe('A list of medicine items extracted from the prescription.'),
  notes: z.string().optional().describe('Any additional notes or observations from the prescription.'),
});

export type AnalyzePrescriptionInput = {
  prescriptionImageDataUri: string; // Format: 'data:image/jpeg;base64,...'
};

export type AnalyzePrescriptionOutput = z.infer<typeof AnalyzePrescriptionOutputSchema>;

export async function analyzePrescription(
  input: AnalyzePrescriptionInput
): Promise<AnalyzePrescriptionOutput> {
  
  const prompt = `You are an expert at analyzing medical prescriptions. Your task is to extract medicine names, their dosage, and any specific instructions from the provided prescription image.

  Return ONLY a valid JSON object matching this exact schema:
  {
    "medicineItems":[
      {
        "name": "string",
        "dosage": "string",
        "instructions": "string"
      }
    ],
    "notes": "string"
  }
  
  If you cannot find any specific instructions, return an empty string for that field. If no medicine items are found, return an empty array for medicineItems.`;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.2-90b-vision-preview", // Groq's powerful vision model
      messages:[
        {
          role: "user",
          content:[
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: input.prescriptionImageDataUri,
              },
            },
          ],
        },
      ],
      temperature: 0.1, 
      response_format: { type: "json_object" }, // Forces Groq to return clean JSON
    });

    const resultText = response.choices[0]?.message?.content;
    
    if (!resultText) {
      throw new Error('Failed to generate response from the Groq model.');
    }

    // Parse the JSON string returned by Groq
    const parsedData = JSON.parse(resultText) as AnalyzePrescriptionOutput;
    return parsedData;

  } catch (error) {
    console.error("Error analyzing prescription with Groq:", error);
    throw new Error("Failed to analyze prescription image.");
  }
}