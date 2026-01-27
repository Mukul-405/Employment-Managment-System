import React from 'react';

const TaskListModal = ({ employee, onClose, onDeleteTask }) => {
    if (!employee) return null;

    // Combine all tasks into one list for display, or show by category
    const allTasks = [
        ...(employee.tasks_new || []).map(t => ({ ...t, status: 'New', color: 'bg-blue-400' })),
        ...(employee.tasks_active || []).map(t => ({ ...t, status: 'Active', color: 'bg-green-400' })),
        ...(employee.tasks_completed || []).map(t => ({ ...t, status: 'Completed', color: 'bg-yellow-400' })),
        ...(employee.tasks_failed || []).map(t => ({ ...t, status: 'Failed', color: 'bg-red-400' }))
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#1c1c1c] p-5 rounded-lg w-1/2 h-2/3 overflow-y-auto relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white bg-red-600 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700"
                >
                    &times;
                </button>
                <h2 className="text-2xl text-white mb-4">Tasks for {employee.name}</h2>

                <div className="flex flex-col gap-3">
                    {allTasks.length === 0 ? (
                        <p className="text-gray-400">No active tasks.</p>
                    ) : (
                        allTasks.map((task, idx) => (
                            <div key={idx} className={`p-3 rounded flex justify-between items-center bg-gray-800 border-l-4 ${task.color.replace('bg-', 'border-')}`}>
                                <div className='text-white'>
                                    <h3 className="font-bold">{task.title}</h3>
                                    <p className="text-sm text-gray-300">{task.description}</p>
                                    <span className="text-xs bg-gray-700 px-2 py-0.5 rounded mt-1 inline-block">{task.date}</span>
                                    <span className={`ml-2 text-xs px-2 py-0.5 rounded text-black font-semibold ${task.color}`}>{task.status}</span>
                                </div>
                                <button
                                    onClick={() => onDeleteTask(employee.email, task.title)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskListModal;
