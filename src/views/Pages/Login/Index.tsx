import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import React from "react";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-indigo-500 mb-6">TASK Scheduler</h1>

        <LoginForm />

      </div>
    </div>
  );
};

export default Login;
