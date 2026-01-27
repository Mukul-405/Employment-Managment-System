import React from "react";
import Header from "../other/Header";
import CreateTask from "../other/CreateTask";
import AllTask from "../other/AllTask";
import RegisterEmployee from "../other/RegisterEmployee";

const AdminDashboard = (props) => {
  return (
    <div className="h-screen w-full p-7">
      <Header changeUser={props.changeUser} name="Admin" />
      <CreateTask />
      <RegisterEmployee />
      <AllTask />
    </div>
  );
};

export default AdminDashboard;