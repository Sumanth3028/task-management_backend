import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { ToastContainer,toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const [jwttoken, setToken] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      const response = await axios.post(
        "http://34.230.16.104:5000/login",
        userData
      );
      if (response.data.success === true) {
        window.localStorage.setItem("token", response.data.token);
        setToken(localStorage.getItem("token"));
        toast.success("Succesfully logged in");
        setTimeout(() => {
          navigate("/task");
        }, 2000);
      }
    } catch (err) {
      toast.error("Incorrect credentials");
      return err;
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-[40px] rounded-md shadow-md w-[700px]">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your email"
              ref={emailRef}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your password"
              ref={passwordRef}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 font-bold text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Login
          </button>
        </form>
        <p className="mt-3 text-gray-600">
          don't have an account?{" "}
          <a href="/" className="text-blue-500 underline">
            Register Here
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
