import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../GlobalContext/Authcontext";
import { toast } from "react-toastify";
import { NODEAPI } from "../utils/utils";
import { ColorRing } from "react-loader-spinner";

const EmployeeEditForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    img: null,
    file: null,
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const { user } = useAuthContext(); // Get user state and dispatch function

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user]);

  // Fetch employee data by ID and pre-fill form fields
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${NODEAPI}/employe/${id}`);
        const { Empl2 } = response.data;

        // Set form data with the response values
        setFormData({
          name: Empl2.name || "",
          email: Empl2.email || "",
          mobile: Empl2.mobile?.toString() || "",
          designation: Empl2.designation || "",
          gender: Empl2.gender || "",
          course: Empl2.course || "",
          img: Empl2.img || null, // Use image URL for display purposes
          file: null, // Cannot pre-fill file input
        });
      } catch (error) {
        console.error("Error fetching employee data:", error.message);
      }
    };

    if (id) {
      fetchEmployee();
    }
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("mobile", formData.mobile);
    form.append("designation", formData.designation);
    form.append("gender", formData.gender);
    form.append("course", formData.course);
    if (formData.file) {
      form.append("file", formData.file);
    } else {
      form.append("isUpload", false);
    }
    try {
      setLoading(true);
      await axios.put(`${NODEAPI}/employe/edit/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);

      navigate("/employees");
      toast.success("Employee updated successfully");
    } catch (error) {
      console.error("Error updating employee:", error.message);
      toast.error("Error updating employee");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r p-5 from-blue-50 to-blue-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-6 bg-blue-300 p-5 rounded-md text-center text-blue-600">
          Edit Employee Details
        </h2>

        {/* Display current image */}
        {formData.img ? (
          <div className="mb-5 text-center">
            <h3 className="text-gray-700 font-semibold mb-2">Current Image</h3>
            <img
              src={formData.img}
              alt="Employee"
              className="w-32 h-32 rounded-full mx-auto border border-gray-300 shadow-sm"
            />
          </div>
        ) : (
          <div className="mb-5 text-center">
            <p className="text-gray-500">No image available</p>
          </div>
        )}

        {/* Name */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter name"
            required
          />
        </div>

        {/* Email */}
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
            placeholder="Enter email"
            required
          />
        </div>

        {/* Mobile */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">
            Mobile
          </label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter mobile number"
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
            <option value="Software Engineer">Software Engineer</option>
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
                checked={formData.gender === "Male"}
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
                checked={formData.gender === "Female"}
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
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter course"
            required
          />
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Upload New Image
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Update Employee
        </button> */}

        <button
          type="submit"
          className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition relative flex items-center justify-center ${
            loading ? "opacity-75 pointer-events-none" : ""
          }`}>
          {loading ? (
            <ColorRing visible={true} height="40" width="40" colors={[]} />
          ) : (
            " Update Employee"
          )}
        </button>
      </form>
    </div>
  );
};

export default EmployeeEditForm;
