import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Alert, Form } from 'react-bootstrap';
import { getAllActiveOrders } from '../services/Admin'; 

function ActiveOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadActiveOrders();
  }, []);

  const loadActiveOrders = async () => {
    try {
      const result = await getAllActiveOrders();
      setOrders(result);
      setFilteredOrders(result);

    } catch (error) {
      console.error('Error loading active orders:', error);
      setError('An error occurred while fetching the orders');
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = orders.filter(order =>
      order.orderId.toLowerCase().includes(term) ||
      order.packageTitle.toLowerCase().includes(term) ||
      order.partner.email.toLowerCase().includes(term) ||
      order.customer.email.toLowerCase().includes(term) ||
      order.customer.mobileNo.toLowerCase().includes(term)

    );
    setFilteredOrders(filtered);
  };

  return (
    <div>
      <h1 style={{marginTop:'100px'}}>Active Orders</h1>
      <Form className="mb-4">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search Orders..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form.Group>
      </Form>
      <Row>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <Col key={index} md={12} className="mb-4">
              <Card className="order-card">
                <Card.Body>
                  <Row>
                    <Col md={3} className="border-right">
                      <Card.Subtitle className="mb-2 text-muted">Customer Details</Card.Subtitle>
                      <Card.Text>
                        <strong>Name:</strong> {order.customer.firstName} {order.customer.lastName}<br />
                        <strong>Email:</strong> {order.customer.email}<br />
                        <strong>Mobile No:</strong> {order.customer.mobileNo}
                      </Card.Text>
                    </Col>
                    <Col md={3} className="border-right">
                      <Card.Subtitle className="mb-2 text-muted">Customer Address</Card.Subtitle>
                      <Card.Text>
                        <strong>Address:</strong> {order.address.addressLineOne}, {order.address.addressLineTwo}, {order.address.city}, {order.address.state}, {order.address.country}<br />
                        <strong>Zip Code:</strong> {order.address.zipCode}<br />
                        <strong>Landmark:</strong> {order.address.landmark}
                      </Card.Text>
                    </Col>
                    <Col md={3} className="border-right">
                      <Card.Subtitle className="mb-2 text-muted">Order Details</Card.Subtitle>
                      <Card.Text>
                      <strong>Order Id:</strong> {order.orderId}<br />
                        <strong>Package Title:</strong> {order.packageTitle}<br />
                        <strong>Quantity:</strong> {order.packageQty}<br />
                        <strong>Total Amount:</strong> ₹{order.totalAmount}<br />
                        <strong>Order Date:</strong> {order.orderDate}<br />
                        <strong>Service Date:</strong> {order.serviceDate}
                      </Card.Text>
                    </Col>
                    <Col md={3}>
                      <Card.Subtitle className="mb-2 text-muted">Partner Details</Card.Subtitle>
                      <Card.Text>
                        <strong>Name:</strong> {order.partner.firstName} {order.partner.lastName}<br />
                        <strong>Email:</strong> {order.partner.email}<br />
                        <strong>Mobile No:</strong> {order.partner.mobileNo}
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No orders available</p>
        )}
      </Row>
    </div>
  );
}

export default ActiveOrders;
