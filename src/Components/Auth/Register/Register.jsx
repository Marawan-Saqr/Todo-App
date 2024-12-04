import React, {useContext, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Swal from "sweetalert2";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "../../../Redux/Query/Auth.query";
import { titleName } from '../../../Contexts/TitleCont';
import "./Register.css";

const Register = () => {

  // Component States
  const navigate = useNavigate();
  const { title, changeTitle } = useContext(titleName);
  const [registerUser, { isLoading }] = useRegisterMutation();


  // Zod Schema
  const schema = z.object({
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
  });


  // Destruct From React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onTouched", resolver: zodResolver(schema) });


  // Register Function
  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data).unwrap();
      Swal.fire({
        title: "Success!",
        text: response.message || "You have registered successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error?.data?.message || "Registration failed. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };


  // useEffect To Change Title
  useEffect(() => {
    changeTitle("register");
  }, [changeTitle]);


  return (
    <div className="register d-flex justify-content-center align-items-center">
      <div className="form-container">
        <h1 className="text-center pt-2 pb-2 mb-0 fw-bold" style={{ color: "black" }}>{title}</h1>
        <h6 className="text-center text-danger mb-4">Note That After Registration You Will Login</h6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            {/* First Name */}
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-danger mt-2">{errors.firstName.message}</p>
            )}
          </div>

          <div className="input-group">
            {/* Last Name */}
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-danger mt-2">{errors.lastName.message}</p>
            )}
          </div>

          <div className="input-group">
            {/* Email */}
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
            {/* Password */}
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
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="register-link text-end">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};



export default Register;