import React, { useEffect, useState, useCallback } from 'react';
import { GetAllCustomerAddress, DeleteCustomerAddress, AddCustomerAddress, UpdateCustomerAddress } from '../services/Customer';
import { Card, Button, Form, Row, Col, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddressList() {
  const [addresses, setAddresses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    addressLineOne: '',
    addressLineTwo: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    landmark: ''
  });

  

  const customerId = localStorage.getItem('customerId')

  

  const loadAddressList =  async () => {
    try {
      const result = await GetAllCustomerAddress(customerId);

      setAddresses(result);
    } catch (error) {
      console.error('Error loading addresses:', error);
    }
  };

  useEffect(() => {
    loadAddressList();
  }, []);

  const handleDeleteAddress = async (addressId) => {
    try {
      await DeleteCustomerAddress(addressId);
      loadAddressList();
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleAddAddress = async () => {
    try {
      await AddCustomerAddress(
        newAddress.addressLineOne,
        newAddress.addressLineTwo,
        newAddress.city,
        newAddress.state,
        newAddress.country,
        newAddress.zipCode,
        newAddress.landmark,
        customerId
      );
      setShowAddModal(false);
      loadAddressList();
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const handleUpdateAddress = async () => {
    try {
      await UpdateCustomerAddress(selectedAddress.id, newAddress);
      setShowUpdateModal(false);
      loadAddressList();
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const openUpdateModal = (address) => {
    setSelectedAddress(address);
    setNewAddress(address);
    setShowUpdateModal(true);
  };

  return (
    <div className='content'>
      <h1 className='mb-4' style={{ marginTop: '100px' }}>Address List</h1>
      
      <Button variant="primary" onClick={() => setShowAddModal(true)} className="mb-4">Add Address</Button>

      <Row>
        {addresses.map((address, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Text>{address.addressLineOne}, {address.addressLineTwo}</Card.Text>
                <Card.Text>City: {address.city}</Card.Text>
                <Card.Text>State: {address.state}</Card.Text>
                <Card.Text>Country: {address.country}</Card.Text>
                <Card.Text>ZipCode: {address.zipCode}</Card.Text>
                <Card.Text>Landmark: {address.landmark}</Card.Text>

                <Button variant="danger"  onClick={() => handleDeleteAddress(address.id)}>Delete</Button>
                <Button variant="warning" className='ms-4' onClick={() => openUpdateModal(address)}>Update</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add Address Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="addressLineOne">
              <Form.Label>Address Line One</Form.Label>
              <Form.Control type="text" name="addressLineOne" value={newAddress.addressLineOne} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="addressLineTwo">
              <Form.Label>Address Line Two</Form.Label>
              <Form.Control type="text" name="addressLineTwo" value={newAddress.addressLineTwo} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="city" value={newAddress.city} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" name="state" value={newAddress.state} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" name="country" value={newAddress.country} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="zipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control type="text" name="zipCode" value={newAddress.zipCode} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="landmark">
              <Form.Label>Landmark</Form.Label>
              <Form.Control type="text" name="landmark" value={newAddress.landmark} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddAddress}>Add Address</Button>
        </Modal.Footer>
      </Modal>

      {/* Update Address Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="addressLineOne">
              <Form.Label>Address Line One</Form.Label>
              <Form.Control type="text" name="addressLineOne" value={newAddress.addressLineOne} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="addressLineTwo">
              <Form.Label>Address Line Two</Form.Label>
              <Form.Control type="text" name="addressLineTwo" value={newAddress.addressLineTwo} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="city" value={newAddress.city} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" name="state" value={newAddress.state} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" name="country" value={newAddress.country} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="zipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control type="text" name="zipCode" value={newAddress.zipCode} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="landmark">
              <Form.Label>Landmark</Form.Label>
              <Form.Control type="text" name="landmark" value={newAddress.landmark} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Close</Button>
          <Button variant="primary"  onClick={handleUpdateAddress}>Update Address</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddressList;
