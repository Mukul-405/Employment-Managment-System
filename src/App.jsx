import { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { AuthContext } from "./context/AuthProvider";
import Loader from "./components/other/Loader";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData, SetUserData] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  // console.log(userData);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')

    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser)
      setUser(userData.role)
      // setLoggedInUserData(userData.data) 

      // Fetch fresh data
      if (userData.role === 'admin') {
        // isLoading not strictly needed here as it's background refresh usually, 
        // but can add if we want to block initial load.
        // For now, keeping it background/silent mostly or we can block if user is null.
        const baseUrl = import.meta.env.VITE_API_URL || 'https://employment-managment-system-backend.onrender.com';
        fetch(`${baseUrl}/employees`)
          .then(res => res.json())
          .then(resData => {
            if (resData.success) {
              SetUserData(resData.data);
              localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin", data: resData.data }));
            }
          })
          .catch(err => console.error("Failed to refresh admin data", err));
      } else if (userData.role === 'employee') {
        const email = userData.data.email;
        const baseUrl = import.meta.env.VITE_API_URL || 'https://employment-managment-system-backend.onrender.com';
        fetch(`${baseUrl}/employee/${email}`)
          .then(res => res.json())
          .then(resData => {
            if (resData.success) {
              const employee = resData.data[0];
              setLoggedInUserData(employee);
              localStorage.setItem("loggedInUser", JSON.stringify({ role: "employee", data: employee }));
            }
          })
          .catch(err => console.error("Failed to refresh employee data", err));
      }
    }

  }, [])

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'https://employment-managment-system-backend.onrender.com';
      const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (data.success) {
        // Backend returns "Employee" but frontend uses "employee" / "admin"
        const role = data.role.toLowerCase();
        setUser(role);

        // Update context for Admin view (needs all employees)
        if (role === 'admin') {
          // For admin, data.data contains all employees
          SetUserData(data.data);
          localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin", data: data.data }));
        } else {
          // For employee, data.user_details is the user, data.data is array of self
          const employee = data.user_details;
          setLoggedInUserData(employee);
          localStorage.setItem("loggedInUser", JSON.stringify({ role: "employee", data: employee }));
        }
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptTask = async (taskTitle) => {
    setIsLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'https://employment-managment-system-backend.onrender.com';
      const response = await fetch(`${baseUrl}/accept_task`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loggedInUserData.email, title: taskTitle })
      });
      const data = await response.json();
      if (data.success) {
        // Update state with new data. data.data is array of employees.
        // For employee dashboard, we need the specific employee object.
        const updatedEmployee = data.data.find(e => e.email === loggedInUserData.email) || data.data[0];
        setLoggedInUserData(updatedEmployee);
        // Also update localStorage to persist changes
        localStorage.setItem("loggedInUser", JSON.stringify({ role: "employee", data: updatedEmployee }));
      } else {
        alert("Failed to accept task");
      }
    } catch (error) {
      console.error("Error accepting task", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteTask = async (taskTitle) => {
    setIsLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'https://employment-managment-system-backend.onrender.com';
      const response = await fetch(`${baseUrl}/complete_task`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loggedInUserData.email, title: taskTitle })
      });
      const data = await response.json();
      if (data.success) {
        const updatedEmployee = data.data.find(e => e.email === loggedInUserData.email) || data.data[0];
        setLoggedInUserData(updatedEmployee);
        localStorage.setItem("loggedInUser", JSON.stringify({ role: "employee", data: updatedEmployee }));
      } else {
        alert("Failed to complete task");
      }
    } catch (error) {
      console.error("Error completing task", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFailTask = async (taskTitle) => {
    setIsLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'https://employment-managment-system-backend.onrender.com';
      const response = await fetch(`${baseUrl}/fail_task`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loggedInUserData.email, title: taskTitle })
      });
      const data = await response.json();
      if (data.success) {
        const updatedEmployee = data.data.find(e => e.email === loggedInUserData.email) || data.data[0];
        setLoggedInUserData(updatedEmployee);
        localStorage.setItem("loggedInUser", JSON.stringify({ role: "employee", data: updatedEmployee }));
      } else {
        alert("Failed to mark task as failed");
      }
    } catch (error) {
      console.error("Error failing task", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!user ? <Login handleLogin={handleLogin} /> : ""}
      {user == "admin" ? (
        <AdminDashboard changeUser={setUser} />
      ) : user == "employee" && loggedInUserData ? (
        <EmployeeDashboard changeUser={setUser} data={loggedInUserData} handleAcceptTask={handleAcceptTask} handleCompleteTask={handleCompleteTask} handleFailTask={handleFailTask} />
      ) : null}
    </>
  );
};

export default App;
