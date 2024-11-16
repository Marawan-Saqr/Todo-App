import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../../../Shared/Loader/Loader';
import "./TodoDetails.css";

const TodosDetails = () => {

  // Component States
  const param = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);


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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching todo:", error);
      setLoading(false);
    }
  };


  // UseEffect
  useEffect(() => {
    getTodo();
  }, [param]);


  return (
    <div className="todo-details">
      {loading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <div className="outer">
          <div className="dot"></div>
          <div className="card">
            <div className="ray"></div>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <p>{todo.done ? 'Completed' : 'Not Completed'}</p>
            <div className="line topl"></div>
            <div className="line leftl"></div>
            <div className="line bottoml"></div>
            <div className="line rightl"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodosDetails;