import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Swal from 'sweetalert2';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import "./Login.css";

const Login = () => {

  // Component States
  const navigate = useNavigate();


  // Zod Schema
  const schema = z.object({
    email: z.string().nonempty("Email is required").email("Invalid email address"),
    password: z.string().nonempty("Password is required"),
  });


  // Destruct From React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched', resolver: zodResolver(schema) });


  // Login Function
  const onSubmit = async (data) => {
    try {
      // Success Case
      const response = await axios.post("http://localhost:3000/api/auth/login", data);
      const token = response.data.accessToken;
      if (token) {
        localStorage.setItem("token", token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        Swal.fire({
          title: 'Success!',
          text: 'You have logged in successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate("/system");
        });
      }
    }
    // Error Cases
    catch (error) {
      console.error("Login failed:", error);
      let errorMessage = 'Login failed. Invalid Email Or Password.';
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = 'Invalid Email or Password.';
        } else {
          errorMessage = `Error ${error.response.status}: ${error.response.data.message || 'Something went wrong.'}`;
        }
      } else if (error.request) {
        errorMessage = 'Unable to connect to the server. Please try again later.';
      } else {
        errorMessage = `An error occurred: ${error.message || 'Unknown error'}`;
      }
      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };


  return (
    <div className="login d-flex justify-content-center align-items-center">
      <div className="form-container">
        <h1 className="text-center pt-2 pb-2 fw-bold" style={{color: 'black'}}>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">


            {/* Email */}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && <p className="text-danger mt-2">{errors.email.message}</p>}
          </div>


          {/* Password */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && <p className="text-danger mt-2">{errors.password.message}</p>}
          </div>


          <button type="submit" className="btn">Login</button>
        </form>
        <p className="register-link text-end">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;