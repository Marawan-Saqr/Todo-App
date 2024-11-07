import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import components from '../../../Shared/Styled-components/Buttons';
import './TopBar.css';

const TopBar = () => {

  // Component States
  const [isDarkMode, setIsDarkMode] = useState(false);


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


  return (
    <div>
      <Navbar expand="lg" className="topbar">
        <Container>
          <Navbar.Brand href="#"><i class="fa-solid fa-clipboard-list"></i>MY TODO</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="m-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link href="#todos">Todos</Nav.Link>
              <Nav.Link href="#statistics">Statistics</Nav.Link>
            </Nav>
            <div className='options'>
              <h6 className="welcome-text">{email ? email : "Guest"}</h6>
              <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'} theme-icon`} onClick={toggleDarkMode} style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
              <components.DangerButton className="logout-btn">Logout</components.DangerButton>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default TopBar;