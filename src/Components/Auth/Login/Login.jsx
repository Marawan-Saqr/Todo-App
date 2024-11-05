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
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onTouched',
    resolver: zodResolver(schema),
  });


  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://ec2-16-171-24-86.eu-north-1.compute.amazonaws.com/api/auth/login", data);
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
          navigate("/register");
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'No token received. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Login failed. Please check your credentials and try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };


  return (
    <div className="login d-flex justify-content-center align-items-center">
      <div className="form-container">
        <h1 className="text-center pt-2 pb-2 fw-bold">Login</h1>
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
            {errors.email && <p className="text-danger mt-2">{errors.email.message}</p>} {/* Use text-danger for error message */}
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
            {errors.password && <p className="text-danger mt-2">{errors.password.message}</p>} {/* Use text-danger for error message */}
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