import { useEffect, useState } from "react";
import SalesTable from "../components/SalesTable";

type Sale = {
  id: number;
  date: string;
  product: string;
  customer: string;
  amount: number;
  productName: string; // for compatibility with SalesTable
};
const SalesList = () => {
    const [sales, setSales] = useState<Sale[]>([]);

  // Fetch data from FastAPI on component mount
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch("http://localhost:8000/sales");
        const data = await response.json();

        // Add ID and productName to each sale object for compatibility
        const salesWithId = data.map((item: Omit<Sale, "id" | "productName">, index: number) => ({
          ...item,
          id: index + 1,
          productName: item.product,
        }));
        setSales(salesWithId);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    fetchSales();
  }, []);

    return (
           <div>
            <h1 className="text-2xl font-bold mb-4">Sales List Page</h1>
            <p className="text-gray-700">This is the sales list page where you can manage and view sales data.</p>
                  <SalesTable sales={sales} />

        </div>
    )
}
export default SalesList;
