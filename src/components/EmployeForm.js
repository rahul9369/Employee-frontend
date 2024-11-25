import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../GlobalContext/Authcontext";
import { toast } from "react-toastify";
import { NODEAPI } from "../utils/utils";
import { ColorRing } from "react-loader-spinner";

const EmployeeForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "", // Changed to a single string
    img: null,
  });

  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCourseChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, course: value }); // Set course directly to the selected value
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, img: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("mobile", formData.mobile);
    form.append("designation", formData.designation);
    form.append("gender", formData.gender);
    form.append("course", formData.course); // Send course as a string
    if (formData.img) {
      form.append("img", formData.img);
    }

    try {
      await axios.post(`${NODEAPI}/employe`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Employee added successfully");
      navigate("/employees");
    } catch (error) {
      console.error("Error submitting form:", error.response || error.message);
      toast.error("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 p-5 to-indigo-200 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl px-8 py-10 w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-8 text-center bg-blue-300 p-5 rounded-md text-indigo-600">
          Create Employee
        </h2>

        <div className={`${loading ? "opacity-50 pointer-events-none" : ""}`}>
          {/* Name */}
          <div className="mb-6">
            <label className="block text-gray-800 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-gray-800 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Mobile */}
          <div className="mb-6">
            <label className="block text-gray-800 font-medium mb-2">
              Mobile
            </label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          {/* Designation */}
          <div className="mb-6">
            <label className="block text-gray-800 font-medium mb-2">
              Designation
            </label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required>
              <option value="">Select</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          {/* Gender */}
          <div className="mb-6">
            <label className="block text-gray-800 font-medium mb-2">
              Gender
            </label>
            <div className="flex space-x-6">
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

          {/* Courses */}
          <div className="mb-6">
            <label className="block text-gray-800 font-medium mb-2">
              Courses
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="course"
                  value="MCA"
                  checked={formData.course === "MCA"}
                  onChange={handleCourseChange}
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
                  onChange={handleCourseChange}
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
                  onChange={handleCourseChange}
                  className="mr-2"
                />
                BSC
              </label>
            </div>
          </div>

          {/* Image */}
          <div className="mb-8">
            <label className="block text-gray-800 font-medium mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition relative flex items-center justify-center ${
              loading ? "opacity-75 pointer-events-none" : ""
            }`}>
            {loading ? (
              <ColorRing visible={true} height="40" width="40" colors={[]} />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
