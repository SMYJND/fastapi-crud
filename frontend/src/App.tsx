import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import Sales from "./pages/Sales";
import SalesList from "./pages/SalesList";


const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
          <Sidebar />
        <div className="w-full h-screen p-4">
          <Routes>
            <Route path="/" element={<Main />} />
             <Route path="/sales" element={<Sales />} />
             <Route path="/sales-list" element={<SalesList />} />
            {/* <Route path="/form" element={<Form />} />
            <Route path="/sales-forecast" element={<SalesForecast />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
