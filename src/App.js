import './App.css';
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './Components/Auth/Auth.jsx';
import Login from './Components/Auth/Login/Login.jsx';
import Register from './Components/Auth/Register/Register.jsx';
import System from './Components/System/System.jsx';
import HelloComponent from './Shared/Hello-component/HelloComponent.jsx';
import Todos from './Components/System/Todos/Todos.jsx';
import GetAllTodos from './Components/System/Todos/Get-all-todos/GetAllTodos.jsx';
import TodoDetails from './Components/System/Todos/todo-details/TodosDetails.jsx';
import UpdateTodo from './Components/System/Todos/Update-todo/UpdateTodo.jsx';
import NotFound from './Shared/Not-found/NotFound.jsx';
import Profile from './Components/System/Profile/Profile.jsx';


// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<Auth />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* Protected System Routes */}
          <Route path="system" element={<ProtectedRoute><System /></ProtectedRoute>}>
            <Route index element={<HelloComponent />} />
              <Route path="todos" element={<Todos />}>
                <Route index element={<GetAllTodos />} />
                <Route path="get-all-todos" element={<GetAllTodos />} />
                <Route path="todo-details/:TODOID" element={<TodoDetails />} />
                <Route path="update-todo/:TODOID" element={<UpdateTodo />} />
              </Route>
              <Route path="profile" element={<Profile />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;