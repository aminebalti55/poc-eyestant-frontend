"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
const ResetPassword = () => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const router = useRouter(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
      
        try {
          const res = await fetch('/api/reset-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, password: newPassword }),
          });
      
          const data = await res.json();
      
          if (res.ok) {
            setMessage('Password has been successfully reset.');
            setTimeout(() => router.push('/login'), 2000);
          } else {
            setError(data.error || 'Password reset failed. Please check your reset code and try again.');
          }
        } catch (err) {
          console.error('An error occurred:', err);
          setError('An error occurred. Please try again.');
        }
      };

    return (
        <div className="flex h-screen bg-white">
            <div className="flex-1 p-12 flex items-center justify-center bg-white">
                <div className="w-full max-w-md">
                    <h1 className="text-4xl font-extrabold mb-2 text-[#2B3674]">Reset Password</h1>
                    <p className="mb-6 text-[#A3AED0]">Enter the reset code and your new password.</p>

                    {message && <p className="text-green-500 mb-4">{message}</p>}
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label htmlFor="code" className="mb-1">
                                <span className="font-bold text-[#2B3674]">Reset Code</span>
                                <span className="text-[#4318FF]">*</span>
                            </label>
                            <input
                                type="text"
                                id="code"
                                name="code"
                                className="p-3 border border-gray-300 rounded-xl bg-transparent"
                                placeholder="Enter reset code"
                                required
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="newPassword" className="mb-1">
                                <span className="font-bold text-[#2B3674]">New Password</span>
                                <span className="text-[#4318FF]">*</span>
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                className="p-3 border border-gray-300 rounded-xl bg-transparent"
                                placeholder="Enter new password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="bg-[#2C73FF] text-white py-3 px-4 rounded-xl mt-6">
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
