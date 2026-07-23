import React, { useEffect } from "react";
import { useState } from "react";
import { userBaseUrl } from "../../axiosInstance";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupForm, setSignupForm] = useState({
    FirstName: "",
    LastName: "",
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
    setSignupForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  console.log("signupForm", signupForm);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const { data } = await userBaseUrl.post("/create", signupForm);
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      }
      console.log("singupRespose", data);
    } catch (error) {
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
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
              name="FirstName"
              value={signupForm.FirstName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              placeholder="Enter last name"
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
              name="LastName"
              value={signupForm.LastName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
              name="Email"
              value={signupForm.Email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter Your Password"
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
              name="Password"
              value={signupForm.Password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};
export default Signup;
