import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // localStorage.clear()

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setLocalStorage();
    const { employees } = getLocalStorage();
    setUserData(employees);
  }, []);

  return (
    <div>
      <AuthContext.Provider value={[userData, setUserData]}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;

// import React, { createContext, useEffect, useState } from "react";
// import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     setLocalStorage();
//     const { employees, admin } = getLocalStorage();
//     setUserData({ employees, admin });
//     // console.log(employees);
//   }, []);

//   return (
//     <div>
//       <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
//     </div>
//   );
// };

// export default AuthProvider;
