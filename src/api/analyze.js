export async function analyzePortfolio(data) {
    const response = await fetch("http://localhost:8000/recommendation/analyze/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) throw new Error("Failed to analyze portfolio");
  
    return response.json();
  }
  