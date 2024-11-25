import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EmployeeForm from "./components/EmployeForm";
// import EmployeeTable from "./components/EmployeTable";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import EmployeeEditForm from "./components/EditEmployeForm";
import EmployeeList from "./components/EmployeList";
import HomePage from "./components/Home";

// Define a layout with Navbar and Outlet

// Define routes
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // Layout with Navbar
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login", // Default route
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/add-employee",
        element: <EmployeeForm />,
      },
      {
        path: "/edit/:id",
        element: <EmployeeEditForm />,
      },

      {
        path: "/employees",
        element: <EmployeeList />,
      },
    ],
  },
]);

// Main App Component
function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
