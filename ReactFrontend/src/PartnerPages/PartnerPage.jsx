import React from 'react';
import { Container } from 'react-bootstrap';
import PartnerSidebar from './PartnerSidebar';


const PartnerPage = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div className='sidebar'><PartnerSidebar /></div>
      <Container  style={{marginLeft: '150px',marginRight:'-30px', padding: '10px' }}>
      {children}
      </Container>
    </div>
  );
};

export default PartnerPage;
