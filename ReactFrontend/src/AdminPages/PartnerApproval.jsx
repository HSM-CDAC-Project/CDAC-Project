import React, { useEffect, useState } from 'react';
import { getPendingApprovalList, approvePartner } from '../services/Admin';
import { Card, Form, Row, Col, CardTitle, CardText, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import config from '../config';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalImage from 'react-modal-image';

function ApprovalPending() {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPartnersList();
  }, []);

  const loadPartnersList = async () => {
    try {
      const result = await getPendingApprovalList();
      if (result.status === 'success') {
        const partnersList = result.data;
        setPartners(partnersList);
        setFilteredPartners(partnersList);
      } else {
        toast.error("Empty list");
      }
    } catch (error) {
      console.error('Error loading partners list:', error);
      toast.error("Error loading partners");
    }
  };

  const handleApprovePartner = async (partnerId) => {
    try {
      const result = await approvePartner(partnerId);
      if (result.status === 'success') {
        loadPartnersList(); 
        toast.success("partner approved")
      }
    } catch (error) {
      console.error('Error approving partner:', error);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = partners.filter(partner =>
      partner.firstName.toLowerCase().includes(term) ||
      partner.lastName.toLowerCase().includes(term) ||
      partner.email.toLowerCase().includes(term) ||
      partner.serviceTitle.toLowerCase().includes(term)
    );
    setFilteredPartners(filtered);
  };

  return (
    <div className='content'>
      <h1 className='mb-4' style={{ marginTop: '100px' }}>Partner Approval Pending</h1>
      <Form className="mb-4">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search partners..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form.Group>
      </Form>
      <Row>
        {filteredPartners.map((partner, index) => (
          <Col key={index} md={6} className="mb-4">
            <Card>
              <Row noGutters>
                {/* Image Column */}
                <Col md={4} style={{paddingLeft:'20px'}}>
                <div
                    style={{
                      width: '150px',
                      height: '50px',
                      overflow: 'hidden',
                    }}
                  >
                    <ModalImage
                      small={`${config.url}/admin/image/${partner.partnerId}`}
                      large={`${config.url}/admin/image/${partner.partnerId}`}
                      alt={`${partner.firstName} ${partner.lastName}`}
                      className="img-fluid"
                    />
                      
                  </div>
                  <CardText>Click on image to view</CardText>
                  <CardTitle>Partner Id Card</CardTitle>

                  <div
                    style={{
                      width: '150px',
                      height: '50px',
                      overflow: 'hidden',
                      marginTop: '50px'
                    }}
                  >
                    <ModalImage
                      small={`${config.url}/partner/image/${partner.partnerId}`}
                      large={`${config.url}/partner/image/${partner.partnerId}`}
                      alt={`${partner.firstName} ${partner.lastName}`}
                      className="img-fluid"
                    />
                      
                  </div>
                  <CardText>Click on image to view</CardText>
                  <CardTitle>Partner Profile Image</CardTitle>
               
                </Col>
                {/* Data Column */}
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>{partner.firstName} {partner.lastName}</Card.Title>
                    <Card.Text>Email: {partner.email}</Card.Text>
                    <Card.Text>Mobile No: {partner.mobileNo}</Card.Text>
                    <Card.Text>Service Title: {partner.serviceTitle}</Card.Text>
                    <Card.Text>Card Number: {partner.card.cardNumber}</Card.Text>
                    <Card.Text>Card Type: {partner.card.cardType}</Card.Text>
                    <Card.Text>
                      Address: {partner.address.addressLineOne}, {partner.address.addressLineTwo}, {partner.address.city}, {partner.address.state}, {partner.address.country}, {partner.address.zipCode}, {partner.address.landmark}
                    </Card.Text>
                    <Button variant="success" onClick={() => handleApprovePartner(partner.partnerId)}>Approve</Button>

                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ApprovalPending;
