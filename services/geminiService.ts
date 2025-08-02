import { GoogleGenAI, Type } from "@google/genai";
import type { ColorSwatch, PaintFormula, Language } from "../types";
import { locales } from "../locales";

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    acrylic: {
      type: Type.ARRAY,
      description: "A list of acrylic paint pigments and their proportions.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Name of the acrylic paint pigment." },
          proportion: { type: Type.NUMBER, description: "Percentage of this pigment in the mix." },
        },
        required: ["name", "proportion"],
      },
    },
    oil: {
      type: Type.ARRAY,
      description: "A list of oil paint pigments and their proportions.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Name of the oil paint pigment." },
          proportion: { type: Type.NUMBER, description: "Percentage of this pigment in the mix." },
        },
        required: ["name", "proportion"],
      },
    },
  },
  required: ["acrylic", "oil"],
};

export const translateColorToPigments = async (color: ColorSwatch, language: Language): Promise<PaintFormula> => {
  const t = locales[language];
  const prompt = `You are an expert art supplier and paint mixer. Your task is to provide a mixing formula to create a specific color using common artist's paints.
The target color is HEX: ${color.hex} (RGB: ${color.r}, ${color.g}, ${color.b}).

The response must be a JSON object containing two properties: 'acrylic' and 'oil'.
Each property should be an array of pigment objects.
Each pigment object must have a 'name' (string) and a 'proportion' (number).
The proportions for the pigments within each array (acrylic and oil) must sum to 100.
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
    const parsedFormula = JSON.parse(jsonText);
    
    if (
      !parsedFormula ||
      !Array.isArray(parsedFormula.acrylic) ||
      !Array.isArray(parsedFormula.oil)
    ) {
      throw new Error("Invalid formula structure received from API.");
    }

    return parsedFormula as PaintFormula;
  } catch (error) {
    console.error(t.geminiErrorLog, error);
    return {
      acrylic: [{ name: t.pigmentError, proportion: 100 }],
      oil: [{ name: t.pigmentError, proportion: 100 }],
    };
  }
};