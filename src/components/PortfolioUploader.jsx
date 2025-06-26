// components/PortfolioUploader.jsx
import React, { useState } from "react";
import Papa from "papaparse";

const PortfolioUploader = ({ onUpload }) => {
  const [fileName, setFileName] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file?.name || null);

    if (!file || !file.name.endsWith(".csv")) {
      setError("❌ Please upload a valid CSV file.");
      return;
    }

    setError(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data.map((row) => ({
          name: row.name,
          symbol: row.symbol,
          asset_type: row.asset_type || "stock",
          quantity: parseFloat(row.quantity),
          avg_buy_price: parseFloat(row.avg_buy_price),
          current_price: parseFloat(row.current_price),
          buy_date: row.buy_date,
          sector: row.sector || "unknown",
        }));
        onUpload(parsedData);
      },
      error: () => setError("❌ Failed to parse the CSV file."),
    });
  };

  return (
    <div className="mt-6 bg-white p-5 rounded shadow-md space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Upload Portfolio CSV
      </label>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="border p-2 rounded w-full"
      />
      {fileName && <p className="text-sm text-gray-500">📁 Selected: {fileName}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
      <p className="text-sm text-gray-400">
        Format: name, symbol, quantity, avg_buy_price, current_price, buy_date, sector
      </p>
    </div>
  );
};

export default PortfolioUploader;
