import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetTodoByIdQuery } from "../../../../Redux/Query/Auth.query";
import Loader from "../../../../Shared/Loader/Loader";
import "./TodoDetails.css";

const TodosDetails = () => {

  // Component States
  const param = useParams();
  const { data: todo, error, isLoading, refetch } = useGetTodoByIdQuery(param.TODOID);


  useEffect(() => {
    refetch();
  }, [refetch]);

  // Show Loader While Data Fetched
  if (isLoading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }


  // Return Error If Error In Fetching
  if (error) {
    return <p>Error fetching todo details</p>;
  }


  return (
    <div className="todo-details">
      <div className="outer">
        <div className="dot"></div>
        <div className="card">
          <div className="ray"></div>
          <h2>{todo.title}</h2>
          <p>{todo.description}</p>
          <p>{todo.done ? "Completed" : "Not Completed"}</p>
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