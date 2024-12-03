import React, { useState, useEffect, useContext } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { titleName } from '../../../Contexts/TitleCont';

const Charts = () => {

  // Component States
  const [loginHistory, setLoginHistory] = useState([]);
  const { title, changeTitle } = useContext(titleName);


  // useEffect To Change Title
  useEffect(() => {
    changeTitle("TODO LOGIN COUNT");
  }, [changeTitle]);


  // useEffect To Get Login Data
  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData && loginData.history) {
      const formattedData = loginData.history.map((entry) => ({
        date: entry.date,
        count: entry.count,
      }));
      setLoginHistory(formattedData);
    }
  }, []);


  return (
    <div className="charts mt-4">
      <div className="container">
        <h3 style={{textTransform: 'uppercase'}}>{title}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={loginHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
        <hr />
        <div className="login-data-show">
          <h4>Your Login Data</h4>
          <ul>
            {loginHistory.map((entry, index) => (
              <li key={index}>
                <strong>Date:</strong> {entry.date} <br />
                <strong>Login Count:</strong> {entry.count}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};




export default Charts;