import React, { useState } from 'react';
import { registerPartner } from '../services/Partner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const RegisterPartner = () => {
  const [partnerData, setPartnerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    password: '',
    serviceTitle: '',
    cardNumber: '',
    cardType: '',
    addressLineOne: '',
    addressLineTwo: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    landmark: ''
  });

  const [profileImage, setProfileImage] = useState(null);
  const [idImage, setIdImage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPartnerData({
      ...partnerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (name === 'profileImage') setProfileImage(files[0]);
    if (name === 'idImage') setIdImage(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerPartner(partnerData, profileImage, idImage);
      toast.success('Partner registered successfully!');
      navigate('/partner-login'); // Redirect to partners list or desired page
    } catch (error) {
      toast.error('Failed to register partner');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="text-center">Register New Partner</h2>
          <Form onSubmit={handleSubmit}>
            
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={partnerData.firstName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={partnerData.lastName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={partnerData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formMobileNo">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobileNo"
                    value={partnerData.mobileNo}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={partnerData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formServiceTitle">
                  <Form.Label>Service Title</Form.Label>
                  <Form.Control
                    as="select"
                    name="serviceTitle"
                    value={partnerData.serviceTitle}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Service Title</option>
                    <option value="ELECTRICIAN">ELECTRICIAN</option>
                    <option value="GARDENING">GARDENING</option>
                    <option value="BATH_CLEAN">BATHROOM CLEANING</option>
                    <option value="HOME_DECO">HOME DECOR</option>
                    <option value="KITCH_CLEAN">KITCHEN CLEANING</option>
                    <option value="PEST_CONT">PEST CONTROL</option>
                    <option value="PLUMBER">PLUMBER</option>
                    <option value="HOME_CLEAN">HOME CLEANING</option>
                    <option value="ROOM_CLEAN">ROOM CLEANING</option>          
                    <option value="AC_REAPIR">AC REPAIR</option>      
                    <option value="REFRI_REPAIR">REFRIGERATOR REPAIR</option>      
                    <option value="WM_REPAIR">WM_REPAIR</option>     

                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formCardNumber">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="cardNumber"
                    value={partnerData.cardNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formCardType">
                  <Form.Label>Card Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="cardType"
                    value={partnerData.cardType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Card Type</option>
                    <option value="AADHAAR_CARD">AADHAAR CARD</option>
                    <option value="PAN_CARD">PAN CARD</option>
                    <option value="DRIVING_LICENSE">DRIVING LICENSE</option>
                    <option value="PASSPORT">PASSPORT</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formAddressLineOne">
                  <Form.Label>Address Line 1</Form.Label>
                  <Form.Control
                    type="text"
                    name="addressLineOne"
                    value={partnerData.addressLineOne}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formAddressLineTwo">
                  <Form.Label>Address Line 2</Form.Label>
                  <Form.Control
                    type="text"
                    name="addressLineTwo"
                    value={partnerData.addressLineTwo}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={partnerData.city}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={partnerData.state}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={partnerData.country}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formZipCode">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="zipCode"
                    value={partnerData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="formLandmark">
                  <Form.Label>Landmark</Form.Label>
                  <Form.Control
                    type="text"
                    name="landmark"
                    value={partnerData.landmark}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formProfileImage">
                  <Form.Label>Profile Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="profileImage"
                    onChange={handleImageChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formIdImage">
                  <Form.Label>ID Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="idImage"
                    onChange={handleImageChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12} className="text-center">
              <Button variant="primary" type="submit" >Submit</Button>

                <Button variant="secondary" className="ms-4" onClick={() => setPartnerData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  mobileNo: '',
                  password: '',
                  serviceTitle: '',
                  cardNumber: '',
                  cardType: '',
                  addressLineOne: '',
                  addressLineTwo: '',
                  city: '',
                  state: '',
                  country: '',
                  zipCode: '',
                  landmark: ''
                })}>Cancel</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPartner;
