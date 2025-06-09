import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type ForecastData = {
  date: string;
  predicted_amount: number;
};

const ForecastChart = () => {
  const [forecast, setForecast] = useState<ForecastData[]>([]);

  useEffect(() => {
    const fetchForecast = async () => {
      const res = await fetch("http://localhost:8000/sales/forecast");
      const data = await res.json();
      setForecast(data);
    };

    fetchForecast();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">📈 7-Day Sales Forecast</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={forecast}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="predicted_amount" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;
