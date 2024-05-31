"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { FaEye, FaMoon } from 'react-icons/fa';

const Login = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`flex h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#182358]' : 'bg-white'}`}>
      <div className={`flex-1 p-12 flex items-center justify-center transition-colors duration-500 ${isDarkMode ? 'bg-[#182358]' : 'bg-white'}`}>
        <div className="w-full max-w-md">
          <h1 className={`text-4xl font-extrabold mb-2 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-[#2B3674]'}`}>Sign In</h1>
          <p className={`mb-6 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-[#A3AED0]'}`}>Enter your email and password to sign in!</p>
          
          <form className="flex flex-col space-y-4">
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
                />
                <FaEye className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-white' : 'text-gray-400'}`} />
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <label className={`flex items-center ${isDarkMode ? 'text-white' : 'text-[#4318FF]'}`}>
                <input type="checkbox" name="keep-logged-in" className="mr-2" />
                Keep me logged in
              </label>
              <a href="/forgot-password" className="font-bold text-[#4318FF]">Forgot password?</a>
            </div>
            
            <button type="submit" className="bg-[#2C73FF] text-white py-3 px-4 rounded-xl mt-6">Sign In</button>
            
            <div className="mt-4">
              <span className={`mr-2 ${isDarkMode ? 'text-white' : ''}`}>Not registered yet?</span> 
              <a href="/register" className="font-bold text-[#4318FF]">Create an Account</a>
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

export default Login;
