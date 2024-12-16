import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { AuthContext } from "./context/AuthProvider";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData, SetUserData] = useContext(AuthContext);

  // console.log(userData);
 
  useEffect(()=>{
    const loggedInUser = localStorage.getItem('loggedInUser')

    if(loggedInUser){
      const userData = JSON.parse(loggedInUser)
      setUser(userData.role)
      setLoggedInUserData(userData.data)
    }

  },[])

  const handleLogin = (email, password) => {
    if (email == "a@a.com" && password == "123") {
      setUser("admin");
      // setLoggedInUserData(userData);
      localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin",data : null }));
    } else if (userData) {
      const employee = userData.find(
        (e) => email == e.email && e.password == password
      );
      if (employee) {
        setUser("employee");
        setLoggedInUserData(employee);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employee", data: employee })
        );
      }
    } else {
      alert("Invalid Credentials");
    }
  }; 

  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ""}
      {user == "admin" ? (
        <AdminDashboard changeUser={setUser} />
      ) : user == "employee" ? (
        <EmployeeDashboard changeUser={setUser} data={loggedInUserData} />
      ) : null}
    </>
  );
};

export default App;

// import React, { useContext, useEffect, useState } from "react";
// import Login from "./components/Auth/Login";
// import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
// import AdminDashboard from "./components/Dashboard/AdminDashboard";
// import { getLocalStorage, setLocalStorage } from "./utils/localStorage";
// import { AuthContext } from "./context/AuthProvider";

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loggedInUserData, setLoggedInUserData] = useState(null);
//   const [userData,setUserData] = useContext(AuthContext);

//   // console.log(authData.employees);
//   // useEffect(() => {
//   //   const loggedInUser = localStorage.getItem("loggedInUser");

//   //   if (loggedInUser) {
//   //     const userData = JSON.parse(loggedInUser);
//   //     setUser(userData.role);
//   //     setLoggedInUserData(userData.data);
//   //   }
//   // }, []);

//   const handleLogin = (email, password) => {
//     if (email == "a@a.com" && password == "123") {
//       setUser("admin");
//       localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin" }));
//     } else if (userData) {
//       const employee = userData.find(
//         (e) => email == e.email && password == e.password
//       );

//       if (employee) {
//         setUser("employee");
//         setLoggedInUserData(employee);
//         localStorage.setItem(
//           "loggedInUser",
//           JSON.stringify({ role: "employee", data: employee })
//         );
//       }
//     } else {
//       alert("invalid person");
//     }
//   };

//   return (
//     <>
//       {!user ? <Login handleLogin={handleLogin} /> : ""}
//       {user == "admin" ? (
//         <AdminDashboard />
//       ) : user == "employee" ? (
//         <EmployeeDashboard data={loggedInUserData} />
//       ) : null}
//     </>
//   );
// };

// export default App;
