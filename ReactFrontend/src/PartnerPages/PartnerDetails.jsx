
import React, { useEffect, useState } from 'react';
import { GetAllPartnerDetails, UpdatePartnerEmail, UpdatePartnerMobileNo } from '../services/Partner';
import { toast } from 'react-toastify';
import { Card, Row, Col, CardTitle, CardText, FormControl, Button } from 'react-bootstrap';
import ModalImage from 'react-modal-image';
import config from '../config';
import { FaEdit } from 'react-icons/fa'; // Import the edit icon

function PartnerDetails() {
  const partnerId = "P0001";
  // const partnerId = localStorage.getItem('partnerId') || '';
  const [partnersDetails, setPartnersDetails] = useState([]);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingMobile, setIsEditingMobile] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newMobile, setNewMobile] = useState('');

  useEffect(() => {
    LoadPartnersDetails(partnerId).catch((error) => {
      console.error("Error fetching partner details:", error);
    });
  }, [partnerId]);

  const LoadPartnersDetails = async (partnerId) => {
    try {
      const partnerData = await GetAllPartnerDetails(partnerId);
      if (partnerData && typeof partnerData === 'object' && partnerData.partnerId) {
        setPartnersDetails([partnerData]); // Wrap the object in an array
      } else if (partnerData.data && Array.isArray(partnerData.data) && partnerData.data.length > 0) {
        setPartnersDetails(partnerData.data); // If data is an array
      } else {
        toast.error("Empty list or invalid data format");
      }
    } catch (error) {
      console.error('Error loading partners list:', error);
      toast.error("Error loading partners");
    }
  };

  const handleEmailUpdate = async () => {
    try {
      const response = await UpdatePartnerEmail({ partnerId, email: newEmail });
      toast.success("Email updated successfully");
      setIsEditingEmail(false);
      LoadPartnersDetails(partnerId); // Reload the details
    } catch (error) {
      console.error('Error updating email:', error);
      toast.error("Error updating email");
    }
  };

  const handleMobileUpdate = async () => {
    try {
      const response = await UpdatePartnerMobileNo({ partnerId, mobileNo: newMobile });
      toast.success("Mobile number updated successfully");
      setIsEditingMobile(false);
      LoadPartnersDetails(partnerId); // Reload the details
    } catch (error) {
      console.error('Error updating mobile number:', error);
      toast.error("Error updating mobile number");
    }
  };

  return (
    <div className='content'>
      <h1 className='mb-4' style={{ marginTop: '80px' }}>Partner Details</h1>
      <Row>
        {partnersDetails.map((partner, index) => (
          <Col key={index} md={6} className="mb-4">
            <Card>
              <Row noGutters>
                <Col md={4} style={{ paddingLeft: '20px', width : '300px' , height : '200px' }}>
                  <div style={{ width: '150px', height: '50px', overflow: 'hidden', marginTop: '50px' }}>
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
                <Col md={8} style={{width : '600px'}}>
                  <Card.Body>
                    <Card.Title>{partner.firstName} {partner.lastName}</Card.Title>
                    <Card.Text>
                      Email: 
                      {isEditingEmail ? (
                        <>
                          <FormControl
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="Enter new email"
                            style={{ display: 'inline-block', width: 'auto', marginRight: '10px' }}
                          />
                          <Button variant="primary" onClick={handleEmailUpdate}>Save</Button>
                          <Button variant="secondary" onClick={() => setIsEditingEmail(false)}>Cancel</Button>
                        </>
                      ) : (
                        <>
                          {partner.email || 'N/A'}
                          <FaEdit onClick={() => {
                            setIsEditingEmail(true);
                            setNewEmail(partner.email || '');
                          }} style={{ marginLeft: '10px', cursor: 'pointer' }} />
                        </>
                      )}
                    </Card.Text>
                    <Card.Text>
                      Mobile No:
                      {isEditingMobile ? (
                        <>
                          <FormControl
                            type="text"
                            value={newMobile}
                            onChange={(e) => setNewMobile(e.target.value)}
                            placeholder="Enter new mobile number"
                            style={{ display: 'inline-block', width: 'auto', marginRight: '10px' }}
                          />
                          <Button variant="primary" onClick={handleMobileUpdate}>Save</Button>
                          <Button variant="secondary" onClick={() => setIsEditingMobile(false)}>Cancel</Button>
                        </>
                      ) : (
                        <>
                          {partner.mobileNo || 'N/A'}
                          <FaEdit onClick={() => {
                            setIsEditingMobile(true);
                            setNewMobile(partner.mobileNo || '');
                          }} style={{ marginLeft: '10px', cursor: 'pointer' }} />
                        </>
                      )}
                    </Card.Text>
                    <Card.Text>Service Title: {partner.serviceTitle || 'N/A'}</Card.Text>
                    <Card.Text>Card Number: {partner.card?.cardNumber || 'N/A'}</Card.Text>
                    <Card.Text>Card Type: {partner.card?.cardType || 'N/A'}</Card.Text>
                    <Card.Text>
                      Address: {partner.address?.addressLineOne || 'N/A'}, 
                      {partner.address?.addressLineTwo || ''}, 
                      {partner.address?.city || 'N/A'}, 
                      {partner.address?.state || 'N/A'}, 
                      {partner.address?.country || 'N/A'}, 
                      {partner.address?.zipCode || 'N/A'}, 
                      {partner.address?.landmark || ''}
                    </Card.Text>
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

export default PartnerDetails;