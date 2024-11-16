import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import "./UpdateTodo.css";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateTodo = () => {

  // Component States
  const { state } = useLocation();
  const navigate = useNavigate();


  // Zod schema
  const todoSchema = z.object({
    title: z
      .string()
      .nonempty("Title is required")
      .min(3, { message: "Title must be at least 3 characters long" })
      .max(30, { message: "Title max characters 30 char" }),
    description: z
      .string()
      .nonempty("Description is required")
      .min(5, { message: "Description must be at least 5 characters long" })
      .max(50, { message: "Description max characters 50 char" }),
    done: z.boolean().refine((val) => typeof val === "boolean", {
      message: "Status must be a boolean value",
    }),
  });


  // React Hook Form Destruct
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({ 
    mode: "onTouched", 
    resolver: zodResolver(todoSchema) 
  });


  // Update Todo Function
  const updateTodo = async (data) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    };
    await axios.put(`http://localhost:3000/api/todos/${state.id}`, data, {
      headers,
    });
    Swal.fire(
      "Success", 
      `Todo Marked as ${data.done ? "Completed" : "Not Completed"}!`, 
      "success"
    );
    navigate("/system/todos");
  };


  // UseEffect to Set Initial Values
  useEffect(() => {
    if (state) {
      setValue("title", state.title);
      setValue("description", state.description);
      setValue("done", state.done);
    }
  }, [state]);


  return (
    <div className="update-todo">
      <h2>Update Todo</h2>
      <div className="container">
        <form className="todo-form" onSubmit={handleSubmit(updateTodo)}>
          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            className="input-field"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
          )}

          {/* Description */}
          <textarea
            placeholder="Description"
            className="input-field"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}

          {/* Status */}
          <select
            className="input-field"
            {...register("done", {
              setValueAs: (value) => value === "true",
            })}
          >
            <option value="true">Completed</option>
            <option value="false">Not Completed</option>
          </select>
          {errors.done && (
            <p className="text-danger">{errors.done.message}</p>
          )}

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTodo;