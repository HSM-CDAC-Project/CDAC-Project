// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { HiChartPie, HiViewBoards, HiInbox, HiUser, HiLogout } from 'react-icons/hi';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CustomerSidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session storage
    localStorage.clear();

    // Redirect to login page
    navigate('/customer-login');
  };

  return (
    <Nav className="flex-column" style={{ width: '250px', padding: '20px' }}>
      <Nav.Link as={Link} to="/customer-details">
        <HiChartPie /> My Details
      </Nav.Link>
      <Nav.Link as={Link} to="/customer-orders">
        <HiViewBoards /> My Orders
      </Nav.Link>
      <Nav.Link as={Link} to="/customer-addresses">
        <HiInbox /> Saved addresses
      </Nav.Link>
      <Nav.Link as={Link} to="/customer-change-password">
        <HiUser /> Change Password
      </Nav.Link>
      <Nav.Link onClick={handleLogout}>
        <HiLogout /> Logout
      </Nav.Link>
    </Nav>
  );
};

export default CustomerSidebar;
