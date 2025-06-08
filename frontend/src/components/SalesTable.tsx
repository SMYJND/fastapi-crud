 
type SalesData = {
  id: number;
  date: string;
  productName: string;
  amount: number;
  customer: string;
}
type SalesTableProps = {
  sales: SalesData[];
};

const SalesTable = ({sales}: SalesTableProps) => {
  return (
    <div className="w-full bg-white shadow-md p-6 rounded">
      <table className="min-w-full gray-200">
        <thead className="bg-gray-50 text-center">
          <tr>
            <th className="p-2">Date</th>
            <th className="p-2">Product Name</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Amount</th> 
          </tr>
          </thead>
          <tbody>
          {sales.map((sale) => (
            <tr key={sale.id} className="hover:bg-gray-100 text-center">
              <td className="p-2">{sale.date}</td>
              <td className="p-2">{sale.productName}</td>
              <td className="p-2">{sale.customer}</td>
              <td className="p-2">rs.{sale.amount.toFixed(2)}</td>
            </tr>
          ))}
            </tbody>
      </table>
     </div>
  )
}
export default SalesTable;