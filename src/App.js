import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './Components/Auth/Auth.jsx';
import Login from './Components/Auth/Login/Login.jsx';
import Register from './Components/Auth/Register/Register.jsx';
import System from './Components/System/System.jsx';
import HelloComponent from './Shared/Hello-component/HelloComponent.jsx';
import Todos from './Components/System/Todos/Todos.jsx';
import GetAllTodos from './Components/System/Todos/Get-all-todos/GetAllTodos.jsx';



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
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;