// src/api/recommendation.js

export async function getRecommendation(userProfile) {
    try {
      const response = await fetch("http://localhost:8000/recommendation/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userProfile),
      });
  
      if (!response.ok) {
        // Log response body in case of error
        const errorData = await response.json().catch(() => null);
        console.error("API Error Response:", errorData || response.statusText);
        throw new Error("Failed to fetch recommendation from backend.");
      }
  
      const data = await response.json();
      console.log("✅ Recommendation Response:", data);
      return data;
  
    } catch (error) {
      console.error("❌ Exception in getRecommendation:", error.message || error);
      throw error;
    }
  }
  