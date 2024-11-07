import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import axios from 'axios';
import './GetAllTodos.css';

const GetAllTodos = () => {

  // Component States
  const [todos, setTodos] = useState([]);


  // Get All Todos
  const getAllTodos = async () => {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': token ? `Bearer ${token}` : '',  // Fixing Bearer token syntax
      'Content-Type': 'application/json',
    }
    try {
      const response = await axios.get("http://ec2-16-171-24-86.eu-north-1.compute.amazonaws.com/api/todos", { headers });
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }


  // UseEffect
  useEffect(() => {
    getAllTodos();
  }, []);


  return (
    <div className="table-container">
      <h2>My Todos</h2>
      {/* Todo Add Form */}
      <form className="todo-form">
        <input
          type="text"
          placeholder="Title"
          className="input-field"
        />
        <textarea
          placeholder="Description"
          className="input-field"
        />
        <button type="submit" className="submit-button">Add Todo</button>
      </form>
      {/* Todos Table */}
      <table className="todos-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>Action</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllTodos;