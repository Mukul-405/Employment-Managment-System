import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";

const TaskList = ({ data }) => {
  return (
    <div
      id="tasklist"
      className="h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-16"
    > 
      {data.tasks.map((elem, idx) => {
        if (elem.active) {
          return <AcceptTask key={idx} data={elem} />;
        }
        if (elem.newTask) {
          return <NewTask key={idx} data={elem} />;
        }
        if (elem.completed) {
          return <CompleteTask key={idx} data={elem} />;
        }
        if (elem.failed) {
          return <FailedTask key={idx} data={elem} />;
        }
      })}
    </div>
  );
};

export default TaskList;

// import React from "react";

// const TaskList = () => {
//   return (
//     <div
//       id="tasklist"
//       className="h-[55%] overflow-x-auto flex items-centre w-full justify-start py-5 gap-5 flex-nowrap mt-10"
//     >
//       <div className="flex-shrink-0 h-full w-[300px] p-5 bg-red-400 rounded-xl">
//         <div className="flex justify-between items-centre">
//           <h3 className="bg-red-600 text-sm px-3 py-1 rounded">High</h3>
//           <h4 className="text-sm">2 Dec 2024</h4>
//         </div>
//         <h2 className="mt-5 text-2xl font-semibold" >Make a Youtube Video</h2>
//         <p className="text-sm mt-2">
//           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus
//           magnam sit nihil, sunt voluptate earum
//         </p>
//       </div>
//       <div className="flex-shrink-0 h-full w-[300px] p-5 bg-red-400 rounded-xl">
//         <div className="flex justify-between items-centre">
//           <h3 className="bg-red-600 text-sm px-3 py-1 rounded">High</h3>
//           <h4 className="text-sm">2 Dec 2024</h4>
//         </div>
//         <h2 className="mt-5 text-2xl font-semibold" >Make a Youtube Video</h2>
//         <p className="text-sm mt-2">
//           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus
//           magnam sit nihil, sunt voluptate earum
//         </p>
//       </div>
//       <div className="flex-shrink-0 h-full w-[300px] p-5 bg-red-400 rounded-xl">
//         <div className="flex justify-between items-centre">
//           <h3 className="bg-red-600 text-sm px-3 py-1 rounded">High</h3>
//           <h4 className="text-sm">2 Dec 2024</h4>
//         </div>
//         <h2 className="mt-5 text-2xl font-semibold" >Make a Youtube Video</h2>
//         <p className="text-sm mt-2">
//           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus
//           magnam sit nihil, sunt voluptate earum
//         </p>
//       </div>
//       <div className="flex-shrink-0 h-full w-[300px] p-5 bg-red-400 rounded-xl">
//         <div className="flex justify-between items-centre">
//           <h3 className="bg-red-600 text-sm px-3 py-1 rounded">High</h3>
//           <h4 className="text-sm">2 Dec 2024</h4>
//         </div>
//         <h2 className="mt-5 text-2xl font-semibold" >Make a Youtube Video</h2>
//         <p className="text-sm mt-2">
//           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus
//           magnam sit nihil, sunt voluptate earum
//         </p>
//       </div>
//     </div>
//   );
// };

// export default TaskList;