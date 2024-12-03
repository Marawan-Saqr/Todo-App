import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/Store/Store.js";
import { TitleContextProvider } from "./Contexts/TitleCont.jsx";
import Auth from "./Components/Auth/Auth.jsx";
import Register from "./Components/Auth/Register/Register.jsx";
import Login from "./Components/Auth/Login/Login.jsx";
import System from "./Components/System/System.jsx";
import HelloComponent from "./Components/System/Hello-component/HelloComponent.jsx";
import Todos from "./Components/System/Todos/Todos.jsx";
import GetAllTodos from "./Components/System/Todos/Get-all-todos/GetAllTodos.jsx";
import TodoDetails from "./Components/System/Todos/todo-details/TodosDetails.jsx";
import UpdateTodo from "./Components/System/Todos/Update-todo/UpdateTodo.jsx";
import Profile from "./Components/System/Profile/Profile.jsx";
import Charts from "./Components/System/Charts/Charts.jsx";
import Settings from "./Components/System/Settings/Settings.jsx";
import NotFound from "./Shared/Not-found/NotFound.jsx";
import { WisdomContextProvider } from "./Contexts/WisdomCont.jsx";

// ProtectedRoute Component Conditional
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Provider store={store}>
      <WisdomContextProvider>
        <TitleContextProvider>
          <BrowserRouter>
            <Routes>
              {/* Auth Routes */}
              <Route path="/" element={<Auth />}>
                <Route index element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>

              {/* System Routes */}
              <Route
                path="system"
                element={
                  <ProtectedRoute>
                    <System />
                  </ProtectedRoute>
                }
              >
                <Route index element={<HelloComponent />} />
                <Route path="todos" element={<Todos />}>
                  <Route index element={<GetAllTodos />} />
                  <Route path="get-all-todos" element={<GetAllTodos />} />
                  <Route
                    path="todo-details/:TODOID"
                    element={<TodoDetails />}
                  />
                  <Route path="update-todo/:TODOID" element={<UpdateTodo />} />
                </Route>
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="charts" element={<Charts />} />
              </Route>

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TitleContextProvider>
      </WisdomContextProvider>
    </Provider>
  );
}

export default App;
