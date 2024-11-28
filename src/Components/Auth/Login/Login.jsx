import "./Login.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useLoginMutation } from "../../../Redux/Query/Auth.query";

const Login = () => {

  // Component States
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();


  // Zod Schema
  const schema = z.object({
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
    password: z.string().nonempty("Password is required"),
  });


  // React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onTouched", resolver: zodResolver(schema) });


  // Login Function
  const onSubmit = async (data) => {
    try {
      // Sucess Case
      const response = await login(data).unwrap();
      const token = response.accessToken;
      if (token) {
        localStorage.setItem("token", token);
        Swal.fire({
          title: "Success!",
          text: "You have logged in successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/system");
        });
      }
    } catch (error) {
      // Invalid Email Or Password
      let errorMessage = "Login failed. Invalid Email Or Password.";
      // Check for "Connection refused" in the error message
      if (error.message && error.message.includes("Connection refused")) {
        errorMessage =
          "Unable to reach the server. The server might be down. Please try again later.";
      } else if (error.data && error.status === 400) {
        errorMessage = error.data.message || "Invalid Email or Password.";
      }
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };


  return (
    <div className="login d-flex justify-content-center align-items-center">
      <div className="form-container">
        <h1
          className="text-center pt-2 pb-2 fw-bold"
          style={{ color: "black" }}
        >
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-danger mt-2">{errors.email.message}</p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-danger mt-2">{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <p className="register-link text-end">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};



export default Login;