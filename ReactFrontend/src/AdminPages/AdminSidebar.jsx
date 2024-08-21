// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { HiChartPie, HiViewBoards, HiInbox, HiUser, HiLogout } from 'react-icons/hi';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session storage
    localStorage.clear();

    // Redirect to login page
    navigate('/admin-login');
  };

  return (
    <Nav className="flex-column" style={{ width: '250px', padding: '20px' }}>
      <Nav.Link as={Link} to="/active-orders">
        <HiChartPie /> Active Orders
      </Nav.Link>
      <Nav.Link as={Link} to="/all-partners">
        <HiViewBoards /> Partners List
      </Nav.Link>
      <Nav.Link as={Link} to="/partner-approval">
        <HiInbox /> Partner Approval
      </Nav.Link>
      <Nav.Link as={Link} to="/add-package">
        <HiInbox /> Add Service Package
      </Nav.Link>
      <Nav.Link as={Link} to="/admin-change-password">
        <HiUser /> Change Password
      </Nav.Link>
      <Nav.Link onClick={handleLogout}>
        <HiLogout /> Logout
      </Nav.Link>
    </Nav>
  );
};

export default AdminSidebar;
