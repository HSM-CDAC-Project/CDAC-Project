import React, { useEffect, useState } from 'react';
import { GetAllCustomerDetails, UpdateCustomerEmail, UpdateCustomerMobileNo } from '../services/Customer';
import { toast } from 'react-toastify';
import { Card, Row, Col, CardTitle, CardText, FormControl, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa'; // Import the edit icon

function CustomerDetails() {
  // const customerId = localStorage.getItem('customerId') || '';
  const [customerDetails, setCustomerDetails] = useState([]);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingMobile, setIsEditingMobile] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newMobile, setNewMobile] = useState('');

  const customerId = localStorage.getItem('customerId')

  useEffect(() => {
    LoadCustomerDetails(customerId).catch((error) => {
      console.error("Error fetching customer details:", error);
    });
  }, [customerId]);


  const LoadCustomerDetails = async (customerId) => {
    try {
      const customerData = await GetAllCustomerDetails(customerId);
      console.log('Customer Data:', customerData);
      console.log('Type of customerData:', typeof customerData);
      console.log('Full customerData:', JSON.stringify(customerData, null, 2));
    
    if (Array.isArray(customerData)) {
      console.log('Data is an array');
    } else if (typeof customerData === 'object') {
      console.log('Data is an object');
    } else {
      console.log('Data is of type:', typeof customerData);
    }
  
      // Check if customerData is an object with customerId
      if (customerData && typeof customerData === 'object') {
        setCustomerDetails([customerData]); // Wrap the object in an array
      } 
      // Check if customerData has a data property that is an array
      else if (customerData && Array.isArray(customerData)) {
        setCustomerDetails(customerData); // Directly set it if it's an array
    } else if (customerData && customerData.data && Array.isArray(customerData.data)) {
        setCustomerDetails(customerData.data);
    } else {
        toast.error("Empty list or invalid data format");
        setCustomerDetails([]);
    }
    } catch (error) {
      console.error('Error loading customer details:', error);
      toast.error("Error loading customer details");
    }
  };

  const handleEmailUpdate = async () => {
    try {
      await UpdateCustomerEmail({ customerId, email: newEmail });
      toast.success("Email updated successfully");
      setIsEditingEmail(false);
      LoadCustomerDetails(customerId); // Reload the details
    } catch (error) {
      console.error('Error updating email:', error);
      toast.error("Error updating email");
    }
  };

  const handleMobileUpdate = async () => {
    try {
      await UpdateCustomerMobileNo({ customerId, mobileNo: newMobile });
      toast.success("Mobile number updated successfully");
      setIsEditingMobile(false);
      LoadCustomerDetails(customerId); // Reload the details
    } catch (error) {
      console.error('Error updating mobile number:', error);
      toast.error("Error updating mobile number");
    }
  };

  return (
    <div className='content'>
      <h1 className='mb-4' style={{ marginTop: '80px' }}>Customer Details</h1>
      <Row>
        {customerDetails.map((customer, index) => (
          <Col key={index} md={6} className="mb-4">
            <Card>
              <Row noGutters>
               
                <Col md={8} style={{width : '600px'}}>
                  <Card.Body>
                    <Card.Title>{customer.firstName} {customer.lastName}</Card.Title>
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
                          {customer.email || 'N/A'}
                          <FaEdit onClick={() => {
                            setIsEditingEmail(true);
                            setNewEmail(customer.email || '');
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
                          {customer.mobileNo || 'N/A'}
                          <FaEdit onClick={() => {
                            setIsEditingMobile(true);
                            setNewMobile(customer.mobileNo || '');
                          }} style={{ marginLeft: '10px', cursor: 'pointer' }} />
                        </>
                      )}
                    </Card.Text>
                  
                    {/* <Card.Text>
                      Address: {customer.address?.addressLineOne || 'N/A'}, 
                      {customer.address?.addressLineTwo || ''}, 
                      {customer.address?.city || 'N/A'}, 
                      {customer.address?.state || 'N/A'}, 
                      {customer.address?.country || 'N/A'}, 
                      {customer.address?.zipCode || 'N/A'}, 
                      {customer.address?.landmark || ''}
                    </Card.Text> */}
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

export default CustomerDetails;
