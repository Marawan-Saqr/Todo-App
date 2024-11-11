import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import "./TodoDetails.css";

const TodosDetails = () => {
  // Component States
  const param = useParams();
  console.log(param);
  const [todo, setTodo] = useState(null);
  const [error, setError] = useState(null);

  const getTodo = async () => {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.get(`http://localhost:3000/api/todos/${param.id}`, { headers });
      setTodo(response.data);
    } catch (error) {
      console.error("Error fetching todo:", error);
      setError("Failed to fetch the todo details.");
    }
  };

  useEffect(() => {
    getTodo();
  }, [param]);

  if (error) return <div className="error-message">{error}</div>;

  if (!todo) return <div>Loading...</div>;

  return (
    <div className="todo-details">
      <div className="outer">
        <div className="dot"></div>
        <div className="card">
          <div className="ray"></div>
          <div className="text">{todo.title}</div>
          <div>{todo.description}</div>
          <div className="line topl"></div>
          <div className="line leftl"></div>
          <div className="line bottoml"></div>
          <div className="line rightl"></div>
        </div>
      </div>
    </div>
  );
};

export default TodosDetails;
