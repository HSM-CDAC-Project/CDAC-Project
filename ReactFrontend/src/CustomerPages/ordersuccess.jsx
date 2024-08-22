import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
    const navigate = useNavigate();

    const handleGoBackToHome = () => {
        navigate('/');
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Card className="text-center shadow-lg p-4">
                <Card.Body>
                    <Card.Title>Order Successfully Placed!</Card.Title>
                    <Card.Text>
                        Thank you for your purchase. Your order has been successfully placed and will be processed shortly.
                    </Card.Text>
                    <Button variant="success" onClick={handleGoBackToHome}> 
                        Go Back to Home
                     </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default OrderSuccess;
