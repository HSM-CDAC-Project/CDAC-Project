import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Card, Row, Col, CardTitle, CardText, FormControl, Button } from 'react-bootstrap';
import { GetAllOrderDetails } from '../services/Customer';

function CustomerOrderDetails() {
    const [orderDetails, setOrderDetails] = useState([]);

    const customerId = localStorage.getItem('customerId')

    useEffect(()=>{
        LoadOrderDetails(customerId).catch((error)=> {
            console.error("Error fetching order details : ", error);
        });
    },[customerId])

    const LoadOrderDetails = async(customerId) => {
        try {
            const orderData = await GetAllOrderDetails(customerId);
            if(orderData){
                setOrderDetails(orderData);
            }
            else {
                toast.error("Empty list or invalid data format");
                setOrderDetails([]);
            }
        }
        catch (error) {
            console.error('Error loading order details:', error);
            toast.error("Error loading order details");
        }    
    };

  return (
<div className='content'>
      <h1 className='mb-4' style={{ marginTop: '80px' }}>Customer Order Details</h1>
      <Row>
        {orderDetails.map((order, index) => (
          <Col key={index} md={6} className="mb-4">
            <Card>
              <Row noGutters>
               
                <Col md={8} style={{width : '600px'}}>
                  <Card.Body>
                    <Card.Title>PackageTitle : {order.packageTitle}</Card.Title>
                    <Card.Text>Package Quantity: {order.packageQty || 'N/A'}</Card.Text>
                    <Card.Text>Total Amount: {order.totalAmount || 'N/A'}</Card.Text>
                    <Card.Text>Order Date: {order.orderDate || 'N/A'}</Card.Text>
                    <Card.Text>Order Status: {order.orderStatus || 'N/A'}</Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default CustomerOrderDetails