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
  try {
    const response = await fetch("/api/nutrition", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ foodDescription }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to analyze nutrition");
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to analyze nutrition data:", error);
    throw error;
  }
};
