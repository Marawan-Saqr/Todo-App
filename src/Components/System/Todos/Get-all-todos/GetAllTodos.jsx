import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "../../../../Shared/Loader/Loader";
import axios from "axios";
import "./GetAllTodos.css";
import { titleName } from '../../../../Contexts/TitleCont';
import { useAddTodosMutation, useGetTodosMutation, useDeleteTodoMutation } from '../../../../Redux/Query/Auth.query';

const GetAllTodos = () => {

  // Component States
  const [todos, setTodos] = useState([]);
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [addTodo] = useAddTodosMutation();
  const [fetchTodos] = useGetTodosMutation();
  const [deleteTodos] = useDeleteTodoMutation();
  const { title, changeTitle } = useContext(titleName);
  const navigate = useNavigate();



  // Zod Scheme Validation
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



  // React Hook Form Setup
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onChange", resolver: zodResolver(todoSchema) });



  // Add Todo Function
  const onAddTodo = async (data) => {
    try {
      await addTodo(data).unwrap();
      Swal.fire("Success", "Todo added successfully!", "success");
      reset();
      loadTodos();
    } catch (error) {
      Swal.fire("Error", "Failed to add todo", "error");
    }
  };



  // Load All Todos Function
  const loadTodos = async () => {
    setLoadingTodos(true);
    try {
      const data = await fetchTodos().unwrap();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoadingTodos(false);
    }
  };



  // Update Todo Toggle Function
  const toggleTodoDone = async (todoId, currentStatus, title, description) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    };
    const updatedTodo = {
      title,
      description,
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



  // Delete Todo Function
  const handleDeleteTodo = async (todoId) => {
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
      try {
        await deleteTodos({ id: todoId }).unwrap();
        Swal.fire("Deleted!", "Your todo has been deleted.", "success");
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
      } catch (error) {
        Swal.fire("Error", "There was an issue deleting the todo.", "error");
        console.error(error);
      }
    }
  };



  // useEffect For Change Title
  useEffect(() => {
    changeTitle("Add Todos");
  }, [changeTitle]);



  // useEffect For Load Todos When Changed
  useEffect(() => {
    loadTodos();
  }, []);



  return (
    <div className="table-container">
      <h2>{title}</h2>
      <form className="todo-form" onSubmit={handleSubmit(onAddTodo)}>
        <input
          type="text"
          placeholder="Title"
          className="input-field"
          {...register("title")}
        />
        {errors.title && <p className="text-danger">{errors.title.message}</p>}
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

      <hr />
      <h3>{title}</h3>
      <h6>
        You Have Now <span>{todos.length}</span>
        {todos.length > 1 ? " Tasks" : " Task"}
      </h6>
      {!loadingTodos && todos.length === 0 && (
        <h3>
          No todos found. Enjoy your day!{" "}
          <i className="fa-regular fa-face-smile"></i>
        </h3>
      )}
      <div className="table-responsive">
        {loadingTodos ? (
          <Loader />
        ) : (
          todos.length > 0 && (
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Status</th>
                  <th scope="col">Created Time</th>
                  <th scope="col">Updated Time</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo) => (
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
                    <td>
                      <div className="btn-group" role="group">
                        <Link
                          to={`/system/todos/todo-details/${todo.id}`}
                          className="btn btn-sm btn-outline-primary"
                        >
                          <i className="fa-solid fa-eye"></i>
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() =>
                            navigate(`/system/todos/update-todo/${todo.id}`, {
                              state: todo,
                            })
                          }
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteTodo(todo.id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </div>
  );
};



export default GetAllTodos;