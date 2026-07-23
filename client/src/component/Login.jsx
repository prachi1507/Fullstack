import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userBaseUrl } from "../../axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [loignForm, setLoginForm] = useState({
    Email: "",
    Password: "",
  });
  const navigate = useNavigate();
  const userAuth = localStorage.getItem("userAuth");
  const authUser = JSON.parse(userAuth);

  useEffect(() => {
    if (authUser?.isLogin) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await userBaseUrl.post("/login", loignForm);
      const authData = {
        isLogin: true,
        token: data?.token,
      };
      if (data?.success) {
        localStorage.setItem("userAuth", JSON.stringify(authData));
        navigate("/");
      }
      console.log("login-response", data);
    } catch (error) {
      console.log("login-err", error);
      const errorMessage = error?.response?.data;

      if (!errorMessage?.success) {
        toast.error(errorMessage.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
              name="Email"
              value={loignForm.Email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
              name="Password"
              value={loignForm.Password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <NavLink to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};
export default Login;
