"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { FaEye, FaMoon } from 'react-icons/fa';

const Signup = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                console.log('Signup successful:', data);
                window.location.href = '/login';
            } else {
                setError(data.error || 'Signup failed');
            }
        } catch (err) {
            console.error('An error occurred:', err);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className={`flex h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#182358]' : 'bg-white'}`}>
            <div className={`flex-1 p-12 flex items-center justify-center transition-colors duration-500 ${isDarkMode ? 'bg-[#182358]' : 'bg-white'}`}>
                <div className="w-full max-w-md">
                    <h1 className={`text-4xl font-extrabold mb-2 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-[#2B3674]'}`}>Sign Up</h1>
                    <p className={`mb-6 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-[#A3AED0]'}`}>Create an account to get started!</p>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label htmlFor="username" className="mb-1">
                                <span className={`font-bold transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-[#2B3674]'}`}>Username</span>
                                <span className="text-[#4318FF]">*</span>
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className={`p-3 border transition-colors duration-500 ${isDarkMode ? 'border-white' : 'border-gray-300'} rounded-xl bg-transparent`}
                                placeholder="Your username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-1">
                                <span className={`font-bold transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-[#2B3674]'}`}>Email</span>
                                <span className="text-[#4318FF]">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={`p-3 border transition-colors duration-500 ${isDarkMode ? 'border-white' : 'border-gray-300'} rounded-xl bg-transparent`}
                                placeholder="mail@simmmply.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password" className="mb-1">
                                <span className={`font-bold transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-[#2B3674]'}`}>Password</span>
                                <span className="text-[#4318FF]">*</span>
                            </label>
                            <div className="relative mt-1">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className={`p-3 border transition-colors duration-500 ${isDarkMode ? 'border-white' : 'border-gray-300'} rounded-xl w-full bg-transparent`}
                                    placeholder="Min. 8 characters"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <FaEye className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-white' : 'text-gray-400'}`} />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="confirm-password" className="mb-1">
                                <span className={`font-bold transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-[#2B3674]'}`}>Confirm Password</span>
                                <span className="text-[#4318FF]">*</span>
                            </label>
                            <div className="relative mt-1">
                                <input
                                    type="password"
                                    id="confirm-password"
                                    name="confirm-password"
                                    className={`p-3 border transition-colors duration-500 ${isDarkMode ? 'border-white' : 'border-gray-300'} rounded-xl w-full bg-transparent`}
                                    placeholder="Re-enter your password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <FaEye className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-white' : 'text-gray-400'}`} />
                            </div>
                        </div>

                        <button type="submit" className="bg-[#2C73FF] text-white py-3 px-4 rounded-xl mt-6">Sign Up</button>

                        <div className="mt-4">
                            <span className={`mr-2 ${isDarkMode ? 'text-white' : ''}`}>Already have an account?</span>
                            <a href="/login" className="font-bold text-[#4318FF]">Sign In</a>
                        </div>
                    </form>
                </div>
            </div>

            <div className={`flex-1 transition-colors duration-500 ${isDarkMode ? 'bg-white' : 'bg-[#182358]'} flex items-center justify-center relative rounded-bl-[100px]`}>
                <div className="text-2xl">
                    <Image src={isDarkMode ? "/bluelogo.png" : "/whitelogo.png"} alt="Logo" width={300} height={50} />
                </div>
                <div className="absolute bottom-6 right-6">
                    <button onClick={handleToggle} className="bg-[#6A53FF] text-white p-3 rounded-full shadow-md">
                        <FaMoon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
