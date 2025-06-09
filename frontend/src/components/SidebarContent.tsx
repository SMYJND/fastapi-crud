import { Link } from "react-router-dom";

const SidebarContent = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Sidebar</h2>
      <ul className="space-y-2">
        <li>
            <Link to="/" className="block px-4 py-2 rounded hover:bg-blue-100 hover:text-blue-600 transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/sales-list" className="block px-4 py-2 rounded hover:bg-blue-100 hover:text-blue-600 transition">
            Sales List
          </Link>
        </li>
        <li>
          <Link
            to="/sales"
            className="block px-4 py-2 rounded hover:bg-blue-100 hover:text-blue-600 transition"
          >
            Form
          </Link>
        </li>
        <li>
          <Link to="/sales-forecast" className="block px-4 py-2 rounded hover:bg-blue-100 hover:text-blue-600 transition">
            Sales Forecast
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarContent;
