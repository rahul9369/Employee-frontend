import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../GlobalContext/Authcontext";
import { NODEAPI } from "../utils/utils";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthContext(); // Get user state and dispatch function

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`${NODEAPI}/employe`);
        const data = await response.json();
        setEmployees(data.Empl);
        setFilteredEmployees(data.Empl);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(query)
    );
    setFilteredEmployees(filtered);
  };

  const onEdit = (_id) => {
    navigate(`/edit/${_id}`);
  };

  const onDelete = async (id) => {
    try {
      const response = await fetch(`${NODEAPI}/employe/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Employee deleted successfully!");
        setEmployees((prev) => prev.filter((employee) => employee._id !== id));
        setFilteredEmployees((prev) =>
          prev.filter((employee) => employee._id !== id)
        );
      } else {
        throw new Error("Failed to delete employee");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Employee List</h2>

      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="font-medium">
            Total Employees: {employees.length}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/add-employee"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add New User
          </Link>

          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border border-gray-300 p-2 rounded w-60"
          />
        </div>
      </div>

      <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">S. No.</th>
            <th className="border px-2 py-1">Image</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Mobile No</th>
            <th className="border px-2 py-1">Designation</th>
            <th className="border px-2 py-1">Gender</th>
            <th className="border px-2 py-1">Course</th>
            <th className="border px-2 py-1">Create Date</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr key={employee._id}>
              <td className="border px-2 py-1">{index + 1}</td>
              <td className="border px-2 py-1">
                <img
                  src={employee.img || "https://via.placeholder.com/50"}
                  alt="Employee"
                  className="w-8 h-8 rounded-full"
                />
              </td>
              <td className="border px-2 py-1">{employee.name}</td>
              <td className="border px-2 py-1">
                <a
                  href={`mailto:${employee.email}`}
                  className="text-blue-500 underline">
                  {employee.email}
                </a>
              </td>
              <td className="border px-2 py-1">{employee.mobile}</td>
              <td className="border px-2 py-1">{employee.designation}</td>
              <td className="border px-2 py-1">{employee.gender}</td>
              <td className="border px-2 py-1">{employee.course}</td>
              <td className="border px-2 py-1">{employee.createDate}</td>
              <td className="border px-2 py-1">
                <button
                  className="text-blue-500 hover:underline mr-2"
                  onClick={() => onEdit(employee._id)}>
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => onDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
