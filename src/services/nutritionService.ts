import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export interface NutritionData {
  foodName: string;
  servingSize: string;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  micros: {
    name: string;
    amount: string;
    percentage: number;
  }[];
  healthScore: number;
  insights: string[];
}

export const analyzeNutrition = async (foodDescription: string): Promise<NutritionData> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following food item or meal and provide detailed nutritional information: "${foodDescription}"`,
    config: {
      systemInstruction: "You are a professional nutritionist. Provide accurate, real-world estimates for macro and micro nutrients. Return the response in strict JSON format.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          foodName: { type: Type.STRING },
          servingSize: { type: Type.STRING },
          calories: { type: Type.NUMBER },
          macros: {
            type: Type.OBJECT,
            properties: {
              protein: { type: Type.NUMBER, description: "grams" },
              carbs: { type: Type.NUMBER, description: "grams" },
              fats: { type: Type.NUMBER, description: "grams" }
            },
            required: ["protein", "carbs", "fats"]
          },
          micros: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                amount: { type: Type.STRING },
                percentage: { type: Type.NUMBER, description: "Daily Value percentage" }
              },
              required: ["name", "amount", "percentage"]
            }
          },
          healthScore: { type: Type.NUMBER, description: "Score from 1 to 100" },
          insights: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["foodName", "servingSize", "calories", "macros", "micros", "healthScore", "insights"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Failed to parse nutrition data:", error);
    throw new Error("Invalid response from AI nutritionist.");
  }
};
