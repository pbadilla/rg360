"use client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/services/axiosConfig";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EyeClosed, Eye } from "lucide-react";

import { AuthLayout } from "@/components/layout/AuthLayout"; // wrapper layout

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    console.log("ENV:", import.meta.env.VITE_ENV);
    
    // Local login bypass for development
    if (import.meta.env.VITE_ENV === "local"){
      if (email && password) {
        console.log("Logging in locally, bypassing API...");
        localStorage.setItem("token", "fake-local-token");
        navigate("/index");
        return;
      } else {
        console.warn("Email and password required even for local bypass.");
        return;
      }
    }
  
    // Regular login flow
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
  
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/index");
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
    }
  };
  

  return (
    <AuthLayout>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Sign In
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your email and password to sign in!
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label>Email <span className="text-red-500">*</span></Label>
          <Input
            type="email"
            placeholder="info@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <Label>Password <span className="text-red-500">*</span></Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
            >
              {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Keep me logged in
            </span>
          </div>
          <Link
            to="/reset-password"
            className="text-sm text-brand-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>

      <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-brand-500 hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
