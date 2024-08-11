"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const res = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('A password reset link has been sent to your email.');
                setTimeout(() => {
                    router.push('/reset-password'); 
                }, 2000); 
            } else {
                setError(data.error || 'Password reset failed');
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
                    <h1 className="text-4xl font-extrabold mb-2 text-[#2B3674]">Forgot Password</h1>
                    <p className="mb-6 text-[#A3AED0]">Enter your email to reset your password.</p>

                    {message && <p className="text-green-500 mb-4">{message}</p>}
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-1">
                                <span className="font-bold text-[#2B3674]">Email</span>
                                <span className="text-[#4318FF]">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="p-3 border border-gray-300 rounded-xl bg-transparent"
                                placeholder="mail@simmmply.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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

export default ForgotPassword;
