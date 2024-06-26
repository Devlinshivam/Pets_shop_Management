"use client"
import { useState } from "react";

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    animalId: "",
    customerId: "",
    cost: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://pets-shop-management.onrender.com/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Transaction data submitted successfully!");
        // Reset form fields
        setFormData({
          animalId: "",
          customerId: "",
          cost: "",
          date: "",
        });
      } else {
        console.error("Failed to submit transaction data");
      }
    } catch (error) {
      console.error("Error submitting transaction data:", error);
    }
  };

  return (
    <div className="my-5">
    <div className="max-w-5xl relative flex flex-col items-center justify-center mx-auto mb-10  w-full  ">
    <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
      Transaction Form
    </h1>
  </div>
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-8 bg-black p-8 rounded-lg shadow-lg"
    >
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="animalId"
        >
          Animal ID:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
          id="animalId"
          type="text"
          name="animalId"
          value={formData.animalId}
          onChange={handleChange}
          placeholder="Enter Animal ID"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="customerId"
        >
          Customer ID:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
          id="customerId"
          type="text"
          name="customerId"
          value={formData.customerId}
          onChange={handleChange}
          placeholder="Enter Customer ID"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="cost"
        >
          Cost:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
          id="cost"
          type="text"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
          placeholder="Enter Cost"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="date"
        >
          Date:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
          id="date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Submit
      </button>
    </form>
    </div>
  );
};

export default TransactionForm;