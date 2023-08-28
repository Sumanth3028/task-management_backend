import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const SignupForm = () => {
  const [success, setSuccess] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      const response = await axios.post(
        "http://34.230.16.104:5000/Signup",
        userData,{returnSecureToken:true}
      );
      if (response.status === 201) {
        setSuccess(true);
        toast.success('Succesfully Registered')
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      toast.error('Something went wrong!')
      return err;
    }
  };
  return (
    <div className="flex justify-center text-left items-center h-screen bg-gray-100">
      <div className="bg-white p-[41px] rounded-md shadow-md w-[700px]">
        <h2 className="text-2xl font-semibold mb-4">Signup</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Username:</label>
            <input
              type="text"
              id="name"
              name="Username"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your Username"
              ref={nameRef}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your email"
              ref={emailRef}
              required
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
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 font-bold text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Sign up
          </button>
          
        </form>
        <p className="mt-3 text-lg text-gray-600">
          have an account?{" "}
          <a href="/login" className="text-blue-500 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
