import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const RegisterEmployee = () => {
    const [userData, setUserData] = useContext(AuthContext);
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const baseUrl = import.meta.env.VITE_API_URL || 'https://employment-managment-system-backend.onrender.com';
            const response = await fetch(`${baseUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: firstName,
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (data.success) {
                alert("Employee Registered Successfully");
                setFirstName('');
                setEmail('');
                setPassword('');

                // Instant Context Update
                const newUser = {
                    ...data.data,
                    tasks_new: [],
                    tasks_active: [],
                    tasks_completed: [],
                    tasks_failed: [],
                    taskCounts: { newTask: 0, active: 0, completed: 0, failed: 0 } // Legacy support if needed
                };
                setUserData([...(userData || []), newUser]);

            } else {
                alert("Failed to register employee: " + data.message);
            }
        } catch (error) {
            console.error("Error registering employee:", error);
            alert("Error registering employee");
        }
    }

    return (
        <div className='p-5 bg-[#1c1c1c] mt-5 rounded'>
            <form onSubmit={submitHandler} className='flex flex-wrap w-full items-start justify-between'>
                <div className='w-full mb-4'>
                    <h3 className='text-lg font-medium text-white mb-2'>Register New Employee</h3>
                </div>
                <div className='w-1/2 pr-4'>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Full Name</h3>
                    <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className='text-sm py-1 px-2 w-full rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 text-white'
                        type="text"
                        placeholder="Employee Name"
                    />
                </div>
                <div className='w-1/2 pl-4'>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Email</h3>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='text-sm py-1 px-2 w-full rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 text-white'
                        type="email"
                        placeholder="employee@example.com"
                    />
                </div>
                <div className='w-1/2 pr-4'>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Password</h3>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='text-sm py-1 px-2 w-full rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 text-white'
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <div className='w-full mt-4'>
                    <button className='bg-emerald-500 py-2 px-6 rounded text-sm text-white hover:bg-emerald-600 font-medium'>
                        Register Employee
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RegisterEmployee
