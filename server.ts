import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// API Routes
app.post("/api/nutrition", async (req, res) => {
  try {
    const { foodDescription } = req.body;

    if (!foodDescription) {
      return res.status(400).json({ error: "Food description is required" });
    }

    const responseSchema = {
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
    };

    const prompt = `Analyze the following food item or meal and provide detailed nutritional information: "${foodDescription}"`;
    
    const result = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        systemInstruction: "You are a professional nutritionist. Provide accurate, real-world estimates for macro and micro nutrients. Return the response in strict JSON format.",
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const response = result.response;
    res.json(JSON.parse(response.text));
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({ error: "Failed to analyze nutrition data" });
  }
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
