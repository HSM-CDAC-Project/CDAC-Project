import React from 'react';
import { Container } from 'react-bootstrap';
import CustomerSidebar from './CustomerSidebar';


const CustomerPage = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div className='sidebar'><CustomerSidebar /></div>
      <Container  style={{marginLeft: '150px',marginRight:'-30px', padding: '10px' }}>
      {children}
      </Container>
    </div>
  );
};

export default CustomerPage;
