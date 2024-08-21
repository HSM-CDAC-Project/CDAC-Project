import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import { getAllCartItems, removeCartItem, incrementCartItemQuantity, decrementCartItemQuantity, placeOrder, getCustomerAddresses } from '../services/Customer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';



const MyCart = () => {
    const [cartItems, setCartItems] = useState([]);
    // const [pid, setPid] = useState('')
    const [error, setError] = useState('');
    const [deliveryDate, setDeliveryDate] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState({});

    const customerId = localStorage.getItem('customerId')
    
    const navigate = useNavigate();

    useEffect(() => {
        loadCartItems();
        loadCustomerAddresses(customerId);
    }, [customerId]);

    const loadCartItems = async () => {
        try {
            const items = await getAllCartItems();
            setCartItems(items);
        } catch (err) {
            setError('Failed to load cart items.');
        }
    };

    const loadCustomerAddresses = async (customerId) => {
      try {
          const customerAddresses = await getCustomerAddresses(customerId);
          setAddresses(customerAddresses);
          if (customerAddresses.length > 0) {
              setSelectedAddress(customerAddresses[0]); // Set the first address as the default selection
          }
      } catch (err) {
          setError('Failed to load addresses.');
      }
  };

  const handleAddressChange = (event) => {
        const selectedAddressId = event.target.value;
        const selectedAddressByID = addresses.filter((address) => {
            console.log(`${address} -> ${address.id} -> ${selectedAddressId}`);
            return address.id === selectedAddressId;
        });
        console.log('Selected Address ID:', selectedAddressByID);
        setSelectedAddress(selectedAddressByID[0]);
};

    const handleRemoveItem = async(packageId) => {
        try { 
          console.log(packageId)
             await removeCartItem(customerId,packageId);
            const updatedItems = cartItems.filter(item => item.packageId !== packageId);
            setCartItems(updatedItems);
            toast.success('Item removed from cart.');
        } catch (err) {
            setError('Failed to remove item.');
            toast.error('Failed to remove item.');
        }
    };

    const handleIncrement = async (packageId, currentQuantity) => {
      try {
          const updatedItem = await incrementCartItemQuantity(customerId, packageId, currentQuantity);
          const updatedItems = cartItems.map(item =>
              item.packageId === packageId ? { ...item, quantity: updatedItem.quantity, totalAmount: item.packagePrice * updatedItem.quantity } : item
          );
          setCartItems(updatedItems);
          toast.success('Item quantity increased.');
      } catch (err) {
          setError('Failed to update quantity.');
          toast.error('Failed to update quantity.');
      }
  };

  const handleDecrement = async (packageId, currentQuantity) => {
    try {
        const updatedItem = await decrementCartItemQuantity(customerId, packageId, currentQuantity);
        const updatedItems = cartItems.map(item =>
            item.packageId === packageId ? { ...item, quantity: updatedItem.quantity, totalAmount: item.packagePrice * updatedItem.quantity } : item
        );
        setCartItems(updatedItems);
        toast.success('Item quantity decreased.');
    } catch (err) {
        setError('Failed to update quantity.');
        toast.error('Failed to update quantity.');
    }
};

    const calculateTotalAmount = () => {
        return cartItems.reduce((acc, item) => acc + item.totalAmount, 0);
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            toast.error('Please select an address to place the order.');
            return;
        }
    
        if (!deliveryDate) {
            toast.error('Please select a delivery date.');
            return;
        }
    
        try {
            console.log(deliveryDate)
                const formattedDate = deliveryDate ? deliveryDate.toISOString().split('T')[0] : null;
    console.log(formattedDate)
            const orderDetails = {
                addressId: selectedAddress.id,
                serviceDate: formattedDate,
                cartId: cartItems[0]?.cartId,
                cartItems: cartItems.map(item => ({
                    packageId: item.packageId,
                    packageTitle: item.packageTitle,
                    packagePrice: item.packagePrice,
                    quantity: item.quantity
                }))
            };
    
            console.log('Placing Order:', orderDetails);
            await placeOrder(orderDetails);
            navigate("/order-success")
            toast.success('Order placed successfully!');
            // You can redirect or clear the cart after placing the order
        } catch (err) {
            console.error('Error placing order:', err);
            toast.error('Failed to place the order.');
        }
    };
    
//   const handlePlaceOrder =  () => {
//     navigate("/order-success");
//   };

    return (
        <div>
<h2>My Cart</h2>
            {cartItems.length > 0 ? (
                <Row>
                    {cartItems.map((item) => (
                        <Col md={6} lg={4} className="mb-4" key={`${item.cartId}-${item.packageId}`}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{item.packageTitle}</Card.Title>
                                    <Card.Text>Package Price: ₹{item.packagePrice}</Card.Text>
                                    <Card.Text>
                                        Quantity:
                                        <Button 
                                            variant="outline-secondary" 
                                            size="sm" 
                                            onClick={() => handleDecrement(item.packageId, item.quantity - 1)} 
                                            disabled={item.quantity <= 1}
                                            className="mx-2"
                                        >
                                            -
                                        </Button>
                                        {item.quantity}
                                        <Button 
                                            variant="outline-secondary" 
                                            size="sm" 
                                            onClick={() => handleIncrement(item.packageId, item.quantity + 1)} 
                                            className="mx-2"
                                        >
                                            +
                                        </Button>
                                    </Card.Text>
                                    <Card.Text>Total Amount: ₹{item.totalAmount}</Card.Text>
                                    <Button 
                                        variant="danger" 
                                        onClick={() => handleRemoveItem(item.packageId)}
                                        className="mt-2"
                                    >
                                        Remove Item
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p>Your cart is empty.</p>
            )}
            
            
                    <Card className="text-center shadow-lg">
                        <Card.Body>
                            <Card.Title as="h4x" className="mb-3">
                                Total Amount
                            </Card.Title>
                            <Card.Text as="h6" className="font-weight-bold text-success">
                                ₹{calculateTotalAmount()}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                

            <div className="order-details">
                <h3>Order Details</h3>
                <div className="form-group">
                    <label>Select Delivery Date:</label>
                    <DatePicker
                        selected={deliveryDate}
                        onChange={date => setDeliveryDate(date)}
                        dateFormat="yyyy/MM/dd"
                        minDate={new Date()}
                        className="form-control"
                    />
                </div>
                
              </div>
              <h2>Delivery Addresses</h2>
            {addresses.length > 0 ? (
                <Form.Group controlId="addressSelect">
                    <Form.Label>Select Address</Form.Label>
                    <Form.Control as="select" value={selectedAddress.id} onChange={handleAddressChange}>
                        {addresses.map((address) => (
                            <option key={address.addressId} value={address.id}>
                                {`${address.addressLineOne}, ${address.addressLineTwo}, ${address.city}, ${address.state} - ${address.zipCode}, ${address.country}, ${address.landmark}`}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            ) : (
                <p>No addresses found.</p>
            )}

            <button onClick={handlePlaceOrder} className="btn btn-primary mt-3">
                Place Order
            </button>
        </div>
    );
};

export default MyCart;
