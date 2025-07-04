// src/api/recommendation.js
import config from '../config/config.js';
export async function getRecommendation(userProfile) {
    try {
      const existingUserId = sessionStorage.getItem("userId");
      const payload = {
        ...userProfile,
        user_id: existingUserId,
      };
      const apiUrl = `${config.apiUrl}/recommendation/recommend`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        // Log response body in case of error
        const errorData = await response.json().catch(() => null);
        console.error("API Error Response:", errorData || response.statusText);
        throw new Error("Failed to fetch recommendation from backend.");
      }
  
      const data = await response.json();
      console.log("✅ Recommendation Response:", data);
      if (data.user_id && !existingUserId) {
        sessionStorage.setItem("userId", data.user_id);
      }
      return data;
  
    } catch (error) {
      console.error("❌ Exception in getRecommendation:", error.message || error);
      throw error;
    }
  }
  