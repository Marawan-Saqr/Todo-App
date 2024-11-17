import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="container">
        <div className="notfound-card">
          <h1>404</h1>
          <p>Oops! The page you're looking for isn't here.</p>
          <div className="todo-suggestions">
            <h2>Make Sure:</h2>
            <ul>
              <li>✔️ Check the URL</li>
              <li>🔄 Refresh the page</li>
            </ul>
          </div>
          <button className="back-home">
            <Link style={{ color: "#fff", textDecoration: "none" }} to={"/system/todos"}>Go Back To Todos</Link>
          </button>
        </div>
      </div>
    </div>
  )
}




export default NotFound;