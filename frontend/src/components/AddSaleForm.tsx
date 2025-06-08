import { useState } from "react";

type SalesFormData = {
  date: string;
  product: string;
  customer: string;
  amount: string | number;
}

const AddSalesForm = ({onAdd}:{onAdd: (sale:SalesFormData) => void}) => {
   const [formData, setFormData] = useState<SalesFormData>({
    date: new Date().toISOString().split("T")[0],
    product: "",
    customer: "",
    amount: ""
  });

  const [errors, setErrors] = useState({
    product: "",
    customer: "",
    amount: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, [name]: value }));
    setErrors(prev => ({
      ...prev, [name]:  ""
    }));
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      product: "",
      customer: "",
      amount: ""
    };

    if (!formData.product.trim()) newErrors.product = "Product name is required.";
    if (!formData.customer.trim()) newErrors.customer = "Customer name is required.";
    if (!formData.amount || Number(formData.amount) <= 0) newErrors.amount = "Enter a valid amount.";
 
    setErrors(newErrors);
    // Only proceed if there are no validation errors
    if (!newErrors.product && !newErrors.customer && !newErrors.amount) {
      try {
        const response = await fetch ("http://localhost:8000/sales", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          alert("Sale added successfully!");
          setFormData({
            date: new Date().toISOString().split("T")[0],
            product: "",
            customer: "",
            amount: ""
          });
      } else {
          alert("Failed to add sale. Please try again.");
        } }
        catch (error) {
          console.error("Error submitting form:", error);
          alert("An error occurred while adding the sale. Please try again.");
        }
      if (typeof onAdd === "function") {
        onAdd(formData);
      }
      setFormData({
        date: new Date().toISOString().split("T")[0],
        product: "",
        customer: "",
        amount: ""
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label htmlFor="date" className="mb-2">Date</label>
        <input 
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="product" className="mb-2">
          Product Name
        </label>
        <input
          type="text"
          id="product"
          name="product"
          value={formData.product}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        {errors.product && <span className="text-red-500">{errors.product}</span>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="customer" className="mb-2">
          Customer Name
        </label>
        <input
          type="text"
          id="customer"
          name="customer"
          value={formData.customer}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        {errors.customer && <span className="text-red-500">{errors.customer}</span>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="amount" className="mb-2">
          Amount($)
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        {errors.amount && <span className="text-red-500">{errors.amount}</span>}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Sale
      </button>
    </form>
  );
};
export default AddSalesForm;
