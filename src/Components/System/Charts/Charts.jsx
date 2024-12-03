import React, { useState, useEffect, useContext } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { titleName } from '../../../Contexts/TitleCont';

const Charts = () => {

  // Component States
  const [loginHistory, setLoginHistory] = useState([]);
  const { title, changeTitle } = useContext(titleName);


  // useEffect
  useEffect(() => {
    changeTitle("TODO LOGIN COUNT");
  }, [changeTitle]);


  // useEffect
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
      </div>
    </div>
  );
};




export default Charts;