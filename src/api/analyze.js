import config from '../config/config.js';
export async function analyzePortfolio(data) {
  const apiUrl = `${config.apiUrl}/recommendation/analyze/portfolio`;

  if (config.debug) {
    console.log(`📡 Making request to: ${apiUrl}`);
    console.log(`🌍 Environment: ${config.environment}`);
  }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) throw new Error("Failed to analyze portfolio");
  
    return response.json();
  }
  