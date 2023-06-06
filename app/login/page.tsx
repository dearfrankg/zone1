"use client";
import React, { useState } from "react";
import { Input, Button, Switch } from "antd";
import "./login.css";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";

const LoginForm = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClass = isDarkMode ? "dark" : "light";

  return (
    <div className={`container mx-auto px-4 py-8 ${themeClass}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Login Form</h1>
        <div className="flex items-center">
          <span className="text-sm mr-2">Day Mode</span>
          <Switch
            checkedChildren={<SunIcon className="h-5 w-5 text-yellow-500" />}
            unCheckedChildren={<MoonIcon className="h-5 w-5 text-gray-500" />}
            checked={isDarkMode}
            onChange={handleThemeChange}
          />
          <span className="text-sm ml-2">Night Mode</span>
        </div>
      </div>

      <form className="w-full max-w-sm  bg-gray-700  shadow-md rounded px-8 pt-6 pb-8 mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <Input
            className="w-full"
            type="email"
            id="email"
            placeholder="Enter your email"
            size="large"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <Input.Password
            className="w-full"
            id="password"
            placeholder="Enter your password"
            size="large"
          />
        </div>

        <div className="flex items-center justify-between">
          <Button className="w-full" type="primary" size="large">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
