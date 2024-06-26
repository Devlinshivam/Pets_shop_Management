"use client"
import React, { useState } from "react";

const AnimalForm = () => {
  const [formData, setFormData] = useState({
    type: "",
    breed: "",
    weight: "",
    age: "",
    id: "",
    gender: "male",
    sold: 0,
    food_suitable: [], // Corrected attribute name
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "food_suitable") {
      // Split the input value by commas and trim spaces
      const foodArray = value.split(",").map((item) => item.trim());
      setFormData({ ...formData, [name]: foodArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked ? 1 : 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await fetch("https://pets-shop-management.onrender.com/api/animals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Animal data submitted successfully!");
        setFormData({
          type: "",
          breed: "",
          weight: "",
          age: "",
          id: "",
          gender: "male",
          sold: 0,
          food_suitable: [],
        });
      } else {
        console.error("Failed to submit animal data");
      }
    } catch (error) {
      console.error("Error submitting animal data:", error);
    }
  };

  return (
    <>
    <div className="max-w-5xl relative flex flex-col items-center justify-center mx-auto mb-10  w-full  ">
    <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
      Animal Form
    </h1>
  </div>
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-8 bg-black p-8 rounded-lg shadow-lg"
    >
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="type"
        >
          Animal Type:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
          id="type"
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Enter animal type"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="breed"
        >
          Breed:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
          id="breed"
          type="text"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          placeholder="Enter breed"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="weight"
        >
          Weight:
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
        >
          <option value="">Select weight</option>
          {[...Array(100)].map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1} kg
            </option>
          ))}
        </select>
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
          {[...Array(30)].map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1} years
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="id">
          ID:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
          id="id"
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="Enter ID"
        />
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
        <label className="block text-white text-sm font-bold mb-2" htmlFor="food_suitable">
          Food (Separated by commas):
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
          type="text"
          name="food_suitable"
          value={formData.food_suitable.join(",")}
          onChange={handleChange}
          placeholder="Enter food separated by commas"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="sold"
        >
          Sold:
        </label>
        <input
          type="checkbox"
          id="sold"
          name="sold"
          checked={formData.sold === 1} // Check if sold is 1 (true)
          onChange={handleCheckboxChange}
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

export default AnimalForm;
