import { GoogleGenAI, Type } from "@google/genai";
import type { ColorSwatch, PaintFormula, Language } from "../types";
import { locales } from "../locales";

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  description: "A list of paint pigments, their proportions, and their corresponding hex color codes.",
  items: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: "Name of the paint pigment." },
      proportion: { type: Type.NUMBER, description: "Percentage of this pigment in the mix." },
      hex: { type: Type.STRING, description: "The hex color code of the pure pigment (e.g., '#FF0000' for a red pigment)." }
    },
    required: ["name", "proportion", "hex"],
  },
};

export const translateColorToPigments = async (color: ColorSwatch, language: Language): Promise<PaintFormula> => {
  const t = locales[language];
  const prompt = `You are an expert art supplier and paint mixer. Your task is to provide a single mixing formula to create a specific color using common artist's paints.
The target color is HEX: ${color.hex} (RGB: ${color.r}, ${color.g}, ${color.b}).

The response must be a JSON array of pigment objects.
Each pigment object must have a 'name' (string), a 'proportion' (number), and a 'hex' (string representing the pigment's own color, which must be a valid hex code).
The proportions for the pigments in the array must sum to 100.
${t.geminiLanguageInstruction}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text.trim();
    const parsedPigments = JSON.parse(jsonText);
    
    if (!Array.isArray(parsedPigments)) {
      throw new Error("Invalid formula structure received from API. Expected an array.");
    }

    return { pigments: parsedPigments } as PaintFormula;
  } catch (error) {
    console.error(t.geminiErrorLog, error);
    return {
      pigments: [{ name: t.pigmentError, proportion: 100, hex: '#888888' }],
    };
  }
};