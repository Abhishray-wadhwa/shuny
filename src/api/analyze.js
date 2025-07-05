import config from '../config/config.js';

export async function analyzePortfolio(data) {
  const apiUrl = `${config.apiUrl}/recommendation/analyze/portfolio`;
  const existingUserId = sessionStorage.getItem("userId");
  
  // Create payload with user_id added to the profile
  const payload = {
    ...data,
    profile: {
      ...data.profile,
      user_id: existingUserId ? parseInt(existingUserId) : null,
    }
  };
  
  if (config.debug) {
    console.log(`📡 Making request to: ${apiUrl}`);
    console.log(`🌍 Environment: ${config.environment}`);
    console.log(`👤 User ID: ${existingUserId}`);
    console.log(`📊 Payload:`, payload);
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload), // Use payload instead of data
  });

  if (!response.ok) throw new Error("Failed to analyze portfolio");

  const responseData = await response.json();
  
  // Save user_id if it's returned in the response and we don't have one stored
  if (responseData.user_id && !existingUserId) {
    sessionStorage.setItem("userId", responseData.user_id.toString());
    if (config.debug) {
      console.log(`💾 Saved new user ID: ${responseData.user_id}`);
    }
  }
  
  return responseData;
}