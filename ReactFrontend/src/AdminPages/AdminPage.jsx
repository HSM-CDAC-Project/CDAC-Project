import React from 'react';
import { Container } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';


const AdminPage = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div className='sidebar'><AdminSidebar /></div>
      <Container  style={{marginLeft: '150px',marginRight:'-30px', padding: '10px' }}>
      {children}
      </Container>
    </div>
  );
};

export default AdminPage;
