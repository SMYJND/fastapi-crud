import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type CombinedData = {
  date: string;
  actual?: number;
  predicted?: number;
};

const ForecastChart = () => {
  const [data, setData] = useState<CombinedData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [salesRes, forecastRes] = await Promise.all([
        fetch("http://localhost:8000/sales"),
        fetch("http://localhost:8000/sales/forecast"),
      ]);

      const sales = await salesRes.json();
      const forecast = await forecastRes.json();

      type SalesItem = { date: string; amount: number };
      type ForecastItem = { date: string; predicted_amount: number };

      const actualData = (sales as SalesItem[]).map((item) => ({
        date: item.date,
        actual: item.amount,
      }));

      const forecastData = (forecast as ForecastItem[]).map((item) => ({
        date: item.date,
        predicted: item.predicted_amount,
      }));

      // Combine both datasets by date
      const combinedMap = new Map<string, CombinedData>();

      actualData.forEach((item) => {
        combinedMap.set(item.date, { ...combinedMap.get(item.date), ...item });
      });

      forecastData.forEach((item) => {
        combinedMap.set(item.date, { ...combinedMap.get(item.date), ...item });
      });

      const combinedArray = Array.from(combinedMap.values()).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      setData(combinedArray);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">📊 Sales & Forecast Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#8884d8"
            name="Actual Sales"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#82ca9d"
            strokeDasharray="5 5"
            name="Forecast"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;
