import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";

const TaskList = ({ data, handleAcceptTask, handleCompleteTask, handleFailTask }) => {
  return (
    <div
      id="tasklist"
      className="h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-16"
    >
      {data.tasks_active && data.tasks_active.map((elem, idx) => {
        return <AcceptTask key={idx} data={elem} handleCompleteTask={handleCompleteTask} handleFailTask={handleFailTask} />;
      })}
      {data.tasks_new && data.tasks_new.map((elem, idx) => {
        return <NewTask key={idx} data={elem} handleAcceptTask={handleAcceptTask} />;
      })}
      {data.tasks_completed && data.tasks_completed.map((elem, idx) => {
        return <CompleteTask key={idx} data={elem} />;
      })}
      {data.tasks_failed && data.tasks_failed.map((elem, idx) => {
        return <FailedTask key={idx} data={elem} />;
      })}
    </div>
  );
};

export default TaskList;