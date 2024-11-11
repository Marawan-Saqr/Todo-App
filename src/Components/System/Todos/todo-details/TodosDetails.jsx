import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import "./TodoDetails.css";

const TodosDetails = () => {

  // Component States
  const param = useParams();
  const [todo, setTodo] = useState(null);


  // Get Todo Id From Url
  const getTodo = async () => {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    };
    try {
      const response = await axios.get(`http://localhost:3000/api/todos/${param.TODOID}`, { headers });
      setTodo(response.data);
    } catch (error) {
      console.error("Error fetching todo:", error);
    }
  };


  // UseEffect
  useEffect(() => {
    getTodo();
  }, [param]);


  // Check if the todo data is loaded
  if (!todo) {
    return <div>Loading...</div>;
  }


  return (
    <div className="todo-details">
      <div className="outer">
        <div className="dot"></div>
        <div className="card">
          <div className="ray"></div>
          <div className="text">{todo.title}</div>
          <p>{todo.description}</p>
          <p>{todo.done ? 'Completed' : 'Not Completed'}</p>
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