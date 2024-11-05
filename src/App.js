import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './Components/Auth/Auth.jsx';
import Login from './Components/Auth/Login/Login.jsx';
import Register from './Components/Auth/Register/Register.jsx';



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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;