import React, { useEffect, useState } from 'react';

import { GetAllAssignedServices } from '../services/Partner';
import { Card, Form, Row, Col, CardTitle, CardText, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';



function FetchAssignedOrders() {
  
    const [orderDetails, setOrderDetails] = useState([]);
    const partnerId = localStorage.getItem('partnerId')

       const loadAssignedServices = async (partnerId) => {
        try {
            const result = await GetAllAssignedServices(partnerId);
            console.log("API Response:", result);  // Log the response to verify the data
            if (result && result.length > 0) {
                setOrderDetails(result);
            } else {
                toast.error("No orders found");
            }
        } catch (error) {
            console.error('Error loading order list:', error);
            toast.error("Error loading orders");
        }
    };

    useEffect(() => {
      loadAssignedServices(partnerId);
  }, [partnerId]);

    return (
      <div className='content'>
          <h1 className='mb-4' style={{ marginTop: '80px' }}>Order Details</h1>
          <Row>
              {orderDetails.map((orderDetail) => (
                  <Col key={orderDetail.orderId} md={6} className="mb-4">
                      <Card>
                          <Row noGutters>
                              <Col md={8}>
                                  <Card.Body>
                                      <Card.Title>{orderDetail.orderId} ({orderDetail.packageQty} items)</Card.Title>
                                      <Card.Text>Service Date: {orderDetail.serviceDate}</Card.Text>
                                      <Card.Text>Package Title: {orderDetail.packageTitle}</Card.Text>
                                      <Card.Text>Total Amount: ${orderDetail.totalAmount.toFixed(2)}</Card.Text>
                                      <Card.Text>Customer Name: {orderDetail.customerName}</Card.Text>
                                      <Card.Text>Mobile No: {orderDetail.mobileNo}</Card.Text>
                                      <Card.Text>
                                          Address: {orderDetail.addressLineOne || 'N/A'}, {orderDetail.addressLineTwo || 'N/A'}, {orderDetail.city || 'N/A'}, {orderDetail.state || 'N/A'}, {orderDetail.country || 'N/A'}, {orderDetail.zipCode || 'N/A'}
                                          {orderDetail.landmark && `, Landmark: ${orderDetail.landmark}`}
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


export default FetchAssignedOrders


