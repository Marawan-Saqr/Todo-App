import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Charts = () => {
  const [accessData, setAccessData] = useState([]);

  useEffect(() => {
    // Check if the token exists (user is logged in)
    const token = localStorage.getItem('token');
    
    if (token) {
      // Get the current date (in a consistent format)
      const currentDate = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

      // Get stored login date from localStorage
      const storedLoginDate = localStorage.getItem('loginDate');

      // Check if the loginDate in localStorage is the same as the current date
      if (storedLoginDate !== currentDate) {
        // The user hasn't logged in today yet, so it's a new day
        // Mark the current date as logged in
        localStorage.setItem('loginDate', currentDate);

        // Proceed with the access count logic
        const storedData = JSON.parse(localStorage.getItem('accessData')) || [];

        // Check if the current date exists in the access data
        const todayData = storedData.find(item => item.date === currentDate);

        if (todayData) {
          // Increment the count if today's data exists
          todayData.count += 1;
        } else {
          // Otherwise, add new entry for today with count 1
          storedData.push({ date: currentDate, count: 1 });
        }

        // Save updated access data
        localStorage.setItem('accessData', JSON.stringify(storedData));
      }

      // Always update accessData state after processing
      const updatedAccessData = JSON.parse(localStorage.getItem('accessData')) || [];
      setAccessData(updatedAccessData);
    }
  }, []); // Empty dependency array to run this only once after mount

  return (
    <div className='charts mt-4'>
      <div className="container">
        <h2>TODO Access Count</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={accessData}>
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
