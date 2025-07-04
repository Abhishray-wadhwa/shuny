import config from '../config/config.js';
export async function submitFeedback(userId, feedbackText, optionType) {
    try {
      const apiUrl = `${config.apiUrl}/feedback/submit-feedback`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: parseInt(userId),
          feedback_text: feedbackText,
          option_type: optionType
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Feedback API Error:", errorData || response.statusText);
        throw new Error("Failed to submit feedback.");
      }
  
      const data = await response.json();
      console.log("✅ Feedback submitted:", data);
      return data;
  
    } catch (error) {
      console.error("❌ Feedback submission failed:", error.message || error);
      throw error;
    }
  }
  