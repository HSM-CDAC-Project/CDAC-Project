import React, { useEffect, useState } from 'react';
import { getPendingApprovalList, approvePartner, showIdImage, showProfileImage } from '../services/Admin';
import { Card, Form, Row, Col, CardTitle, CardText, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import config from '../config';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalImage from 'react-modal-image';

function ApprovalPending() {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [imageUrls, setImageUrls] = useState({}); // State to store multiple partner image URLs
  const [imageProfileUrl, setImageProfileUrl] = useState({});

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
        // Download ID images for all partners once the list is loaded
        partnersList.forEach(partner => {
          downloadPartnerId(partner.partnerId); // Fetch and set image URLs
          downloadPartnerProfile(partner.partnerId)
        })
      } else {
        toast.error("Empty list");
      }
    } catch (error) {
      // console.error('Error loading partners list:', error);
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
      // console.error('Error approving partner:', error);
      toast.error("error while approving the partner");
    }
  };

  const downloadPartnerId = async (partnerId) => {
    try {
      const result = await showIdImage(partnerId);
      if (imageUrls) {
        setImageUrls(prev => ({ ...prev, [partnerId]: result })); // Store image URLs for each partner
      }
    } catch (error) {
      toast.error("Error while loading the ID image");
    }
  };

  const downloadPartnerProfile = async (partnerId) => {
    try {
      const result = await showProfileImage(partnerId);
      if (imageProfileUrl) {
        setImageProfileUrl(prev => ({ ...prev, [partnerId]: result })); // Store image URLs for each partner
      }
    } catch (error) {
      toast.error("Error while loading the ID image");
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
              <Row >
                {/* Image Column */}
                <Col md={4} style={{ paddingLeft: '20px' }}>
                  <div style={{ width: '150px', height: 'auto', overflow: 'hidden' }}>
                    {imageUrls[partner.partnerId] ? (
                      <ModalImage
                        small={imageUrls[partner.partnerId]}
                        large={imageUrls[partner.partnerId]}
                        alt="Partner ID Card"
                        className="img-fluid"
                      />
                    ) : (
                      <img
                        src="placeholder.jpg"
                        alt="Partner ID Card"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    )}
                  </div>
                  <CardText>Partner ID Card</CardText>

                  <div style={{ width: '150px', height: 'auto', overflow: 'hidden' }}>
                    {imageProfileUrl[partner.partnerId] ? (
                      <ModalImage
                        small={imageProfileUrl[partner.partnerId]}
                        large={imageProfileUrl[partner.partnerId]}
                        alt="Partner ID Card"
                        className="img-fluid"
                      />
                    ) : (
                      <img
                        src="placeholder.jpg"
                        alt="Partner profile image"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    )}
                  </div>
                  <CardText>Partner Profile Image</CardText>

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
