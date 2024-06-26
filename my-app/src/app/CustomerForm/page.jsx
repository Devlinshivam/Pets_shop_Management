"use client"
import { useState } from "react";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    numbers: [],
    address: "",
    age: "",
    gender: "male",
    customer_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumbersChange = (e) => {
    const numbers = e.target.value.split(",");
    setFormData({ ...formData, numbers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await fetch("https://pets-shop-management.onrender.com/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Customer data submitted successfully!");
        setFormData({
          name: "",
          numbers: [],
          address: "",
          age: "",
          gender: "male",
          customer_id: "",
        });
      } else {
        console.error("Failed to submit customer data");
      }
    } catch (error) {
      console.error("Error submitting customer data:", error);
    }
  };

  return (
    <>
      <div className="max-w-5xl relative flex flex-col items-center justify-center mx-auto mb-10  w-full  ">
        <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
          Customer Form
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto mt-8 bg-black p-8 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="numbers"
          >
            Numbers:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            id="numbers"
            type="text"
            name="numbers"
            value={formData.numbers.join(",")}
            onChange={handleNumbersChange}
            placeholder="Enter numbers separated by comma"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="address"
          >
            Address:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            id="address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="age"
          >
            Age:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          >
            <option value="">Select age</option>
            {[...Array(20)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="gender"
          >
            Gender:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="customer_id"
          >
            Customer ID:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            id="customer_id"
            type="text"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            placeholder="Enter customer ID"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CustomerForm;