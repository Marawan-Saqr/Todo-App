import './App.css';
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



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="system" element={<System />}>
            <Route index element={<HelloComponent />} />
            <Route path="todos" element={<Todos />}>
              <Route index element={<GetAllTodos />} />
              <Route path="get-all-todos" element={<GetAllTodos />} />
              <Route path="todo-details/:TODOID" element={<TodoDetails />} />
              <Route path="update-todo/:TODOID" element={<UpdateTodo />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;