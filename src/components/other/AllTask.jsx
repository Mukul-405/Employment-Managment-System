import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import TaskListModal from "./TaskListModal";

const AllTask = () => {
  const [userData, setUserData] = useContext(AuthContext);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleDeleteTask = async (email, title) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'https://employment-managment-system-backend.onrender.com';
      const response = await fetch(`${baseUrl}/delete_task`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, title })
      });
      const data = await response.json();

      if (data.success) {
        // Update Context
        const updatedUserData = userData.map(user => {
          if (user.email === email) {
            return data.data[0];
          }
          return user;
        });
        setUserData(updatedUserData);

        // Update Modal State
        const updatedEmployee = updatedUserData.find(u => u.email === email);
        setSelectedEmployee(updatedEmployee);

        alert("Task deleted successfully");
      } else {
        alert("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div className="bg-[#1c1c1c] p-5 rounded mt-5">
      <div className="bg-red-400 mb-2 py-2 px-4 flex justify-between rounded">
        <h2 className="text-lg font-medium w-1/5">Employee Name</h2>
        <h3 className="text-lg font-medium w-1/5">New Task</h3>
        <h5 className="text-lg font-medium w-1/5">Active Task</h5>
        <h5 className="text-lg font-medium w-1/5">Completed</h5>
        <h5 className="text-lg font-medium w-1/5">Failed</h5>
        <h5 className="text-lg font-medium w-1/5">Action</h5>
      </div>
      <div className="">
        {userData.map(function (elem, idx) {
          return (
            <div
              key={idx}
              className="border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded items-center"
            >
              <h2 className="text-lg font-medium  w-1/5">{elem.name}</h2>
              <h3 className="text-lg font-medium w-1/5 text-blue-400">
                {(elem.tasks_new || []).length}
              </h3>
              <h5 className="text-lg font-medium w-1/5 text-yellow-400">
                {(elem.tasks_active || []).length}
              </h5>
              <h5 className="text-lg font-medium w-1/5 text-white">
                {(elem.tasks_completed || []).length}
              </h5>
              <h5 className="text-lg font-medium w-1/5 text-red-600">
                {(elem.tasks_failed || []).length}
              </h5>
              <div className="w-1/5">
                <button
                  onClick={() => setSelectedEmployee(elem)}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                >
                  View
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedEmployee && (
        <TaskListModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default AllTask;