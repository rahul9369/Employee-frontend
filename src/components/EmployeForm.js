import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../GlobalContext/Authcontext";
import { toast } from "react-toastify";

const EmployeeForm = () => {
  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "", // Store a single course as a string
    img: null,
  });

  const { user } = useAuthContext(); // Get user state and dispatch function

  useEffect(() => {
    if (user === null) {
      Navigate("/login");
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, course: value }); // Update the course to the selected checkbox value
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, img: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData for API call
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("mobile", formData.mobile);
    form.append("designation", formData.designation);
    form.append("gender", formData.gender);
    form.append("course", formData.course); // Send the course directly as a string
    if (formData.img) {
      form.append("img", formData.img);
    }

    try {
      // Send POST request with FormData
      const response = await axios.post("http://localhost:8080/employe", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data);

      // Navigate to the employee list page on success
      Navigate("/employees");
      toast.success("Employee added successfully");
    } catch (error) {
      console.error("Error submitting form:", error.response || error.message);
      toast.error("Error submitting form");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Create Employee
        </h2>

        {/* Name Field */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Mobile Number */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">
            Mobile No
          </label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your mobile number"
            required
          />
        </div>

        {/* Designation */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">
            Designation
          </label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required>
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        {/* Gender */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">
            Gender
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleInputChange}
                className="mr-2"
                required
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleInputChange}
                className="mr-2"
                required
              />
              Female
            </label>
          </div>
        </div>

        {/* Course */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">
            Course
          </label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="course"
                value="MCA"
                checked={formData.course === "MCA"}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              MCA
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="course"
                value="BCA"
                checked={formData.course === "BCA"}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              BCA
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="course"
                value="BSC"
                checked={formData.course === "BSC"}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              BSC
            </label>
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
