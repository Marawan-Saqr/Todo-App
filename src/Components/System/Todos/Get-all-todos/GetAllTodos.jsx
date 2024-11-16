import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "../../../../Shared/Loader/Loader";
import axios from "axios";
import "./GetAllTodos.css";

const GetAllTodos = () => {

  // Component States
  const [todos, setTodos] = useState([]);
  const [loadingTodos, setLoadingTodos] = useState(false);
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
  });


  // React Hook Form Destruct
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onChange", resolver: zodResolver(todoSchema) });


  // Add Todo Function
  const addTodo = async (data) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    };
    try {
      await axios.post("http://localhost:3000/api/todos", data, { headers });
      Swal.fire("Success", "Todo added successfully!", "success");
      reset();
      getAllTodos();
    } catch (error) {
      Swal.fire("Error", "Failed to add todo", "error");
    }
  };


  // Get All Todos
  const getAllTodos = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    };
    setLoadingTodos(true);
    try {
      const response = await axios.get("http://localhost:3000/api/todos", {
        headers,
      });
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoadingTodos(false);
    }
  };


  // Update Todo
  const toggleTodoDone = async (todoId, currentStatus, title, description) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    };
    const updatedTodo = {
      title: title,
      description: description,
      done: !currentStatus,
    };
    try {
      await axios.put(
        `http://localhost:3000/api/todos/${todoId}`,
        updatedTodo,
        { headers }
      );
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId ? { ...todo, done: !currentStatus } : todo
        )
      );
      Swal.fire("Success", "Todo status updated!", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update todo status", "error");
      console.error("Error updating todo status:", error);
    }
  };


  // Delete todo Function
  const deleteTodo = async (todoId) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    };
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3000/api/todos/${todoId}`, {
          headers,
        });
        Swal.fire("Deleted!", "Your todo has been deleted.", "success");
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
      }
    } catch (error) {
      Swal.fire("Error", "There was an issue deleting the todo.", "error");
      console.error(error);
    }
  };


  // UseEffect
  useEffect(() => {
    getAllTodos();
  }, []);


  return (
    <div className="table-container">
      <h2>Add Todos</h2>
      <form className="todo-form" onSubmit={handleSubmit(addTodo)}>
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          className="input-field"
          {...register("title")}
        />
        {errors.title && <p className="text-danger">{errors.title.message}</p>}


        {/* Description */}
        <textarea
          placeholder="Description"
          className="input-field"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      {/* My Todos */}
      <hr />
      <h3>My Todos</h3>
      <h6>
        You Have Now <span>{todos.length}</span>
        {todos.length > 1 ? " Tasks" : " Task"}
      </h6>
      <table className="todos-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created Time</th>
            <th>Updated Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loadingTodos ? (
            <div className="col-md-9 d-flex justify-content-center align-items-center">
              <Loader />
            </div>
          ) : todos.length > 0 ? (
            todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() =>
                      toggleTodoDone(
                        todo.id,
                        todo.done,
                        todo.title,
                        todo.description
                      )
                    }
                  />
                </td>
                <td>{todo.createdAt}</td>
                <td>{todo.updatedAt}</td>
                <td className="actions">
                  <Link to={`/system/todos/todo-details/${todo.id}`}>
                    <i className="fa-solid fa-eye"></i>
                  </Link>
                  <button style={{background: 'none', border: 'none'}}
                    onClick={() =>
                      navigate(`/system/todos/update-todo/${todo.id}`, {
                        state: todo,
                      })
                    }
                  >
                    <Link style={{ color: "white", textDecoration: "none" }}>
                      <i className="fa-solid fa-pen"></i>
                    </Link>
                  </button>
                  <i
                    onClick={() => deleteTodo(todo.id)}
                    className="fa-solid fa-trash"
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <h3 style={{ textAlign: "center", marginTop: "30px" }}>
              No Todos Enjoy Your Day{" "}
              <i className="fa-regular fa-face-smile"></i>
            </h3>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllTodos;