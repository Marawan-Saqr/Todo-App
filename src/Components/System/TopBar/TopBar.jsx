import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import components from '../../../Shared/Styled-components/Buttons';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import './TopBar.css';

const TopBar = () => {

  // Component States
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();


  // Dark Mode Function
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
    localStorage.setItem('darkMode', !isDarkMode);
  };
  useEffect(() => {
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference) {
      setIsDarkMode(darkModePreference === 'true');
      document.body.classList.toggle('dark-mode', darkModePreference === 'true');
    }
  }, []);


  // Extract Token To Get Email
  const getEmailFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const payload = JSON.parse(jsonPayload);
      return payload.email || null;
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  };
  const email = getEmailFromToken();


  // Logout Function
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      dangerMode: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    });
  };


  return (
    <div>
      <Navbar className="topbar" expand="lg">
        <Container>
          <Navbar.Brand><i className="fa-solid fa-clipboard-list"></i>
            <Link style={{color: '#fff', textDecoration: 'none'}} to={"/system"}>TODO</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" style={{backgroundColor: '#fff', color: 'mediumvioletred'}} />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="m-auto my-2 my-lg-0" navbarScroll>
              <Link className="nav-link" to={"todos"}><i className="fa-solid fa-pencil"></i>Todos</Link>
              <Link className="nav-link" to={"/system/profile"}><i className="fa-solid fa-user"></i>Profile</Link>
              <Link className="nav-link" to={"/system/charts"}><i className="fa-solid fa-chart-simple"></i>Statistics</Link>
              <Link className="nav-link" to={"/system/wisdoms"}><i className="fa-solid fa-file-word"></i>Wisdoms</Link>
              <Link className="nav-link" to={"/system/settings"}><i className="fa-solid fa-gear"></i>Settings</Link>
            </Nav>
            <div className='options'>
              <h6 className="welcome-text">{email ? email : "Guest"}</h6>
              <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'} theme-icon`} onClick={toggleDarkMode} style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
              <components.DangerButton onClick={()=> handleLogout()} className="logout-btn"><i className="fa-solid fa-right-from-bracket"></i>Logout</components.DangerButton>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default TopBar;