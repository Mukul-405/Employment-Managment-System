import React, { useState, useEffect } from "react";

const Header = (props) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (props.name === "Admin") {
      setUsername("Mukul");
    } else if (props.data && props.data.firstName) {
      setUsername(props.data.firstName);
    }
  }, [props.name, props.data]); // Dependency array ensures this runs only when props change

  const logOutUser = () => {
    localStorage.setItem("loggedInUser", "");
    props.changeUser("");
  };

  return (
    <div className="flex items-end justify-between">
      <h1 className="text-2xl font-medium">
        Hello <br />{" "}
        <span className="text-3xl font-semibold">{username} 👋</span>
      </h1>
      <button
        onClick={logOutUser}
        className="bg-red-600 text-base font-medium text-white px-5 py-2 rounded-sm"
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;

// import React from "react";

// const Header = (probs) => {
//   return (
//     <div className="flex items-end justify-between">
//       <h1 className="text-2xl font-medium">
//         Hello, <br />
//         <span className="text-3xl font-bold">firstName</span>
//       </h1>
//       <button className="bg-red-600 text-white px-5 py-2">Log Out</button>
//     </div>
//   );
// };

// export default Header;
