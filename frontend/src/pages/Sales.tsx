import AddSaleForm from "../components/AddSaleForm";


const Sales = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Sales Page</h1>
            <p className="text-gray-700">This is the sales page where you can manage and view sales data.</p>
            <AddSaleForm onAdd={(sale) => { 
                // handle the added sale here, e.g., send to API or update state
                console.log("Sale added:", sale);
            }} />
        </div>
    )
}
export default Sales;