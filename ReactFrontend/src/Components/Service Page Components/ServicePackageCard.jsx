import { useEffect, useState } from "react";
import { getPackages } from "../../services/servicePackages";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import config from "../../config";

function ServicePackageCard({ serviceId }) {
    const [items, setItems] = useState([]);
    const customerId = localStorage.getItem('customerId');
    // const jwt = localStorage.getItem('jwt');

    const loadPackages = async () => {
        try {
            const result = await getPackages({ serviceId });
            setItems(result);
        } catch (error) {
            console.error("Error in data loading", error);
        }
    };

    useEffect(() => {
        loadPackages();
    }, []);

    const token = localStorage.getItem('jwt');
    const addServiceToCart = async (packageId) => {
        const body = {
            customerId: customerId,
                packageId: packageId,
        }
        try {
            await axios.post(`${config.url}/customers/cart/add`,body ,{
                
               
           headers: {
                Authorization: `Bearer ${token}`,
            }
        });
            alert("Item added to cart successfully!");
        } catch (error) {
            console.error("Error adding item to cart", error);
            alert("Failed to add item to cart.");
        }
    };

    return (
        items && items.length > 0 ? (
            items.map((item, index) => (
                <div key={index}>
                    <Card style={{width:"15rem", height:"12rem", marginLeft:"10px", marginRight:"10px"}}>
                        <Card.Body>
                            <Card.Title>{item['packageTitle']}</Card.Title>
                            <Card.Text>
                                ₹{item['packagePrice']}
                            </Card.Text>
                            <Card.Text>
                                ★{item['avgRating']}/5 - {item['totalRatings']} Reviews
                            </Card.Text>
                            <Button 
                                onClick={() => addServiceToCart(item['id'])}
                                variant="primary"
                                disabled={!customerId}
                            >
                                Add to Cart
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            ))
        ) : (
            <p>No packages available</p>
        )
    );
}

export default ServicePackageCard;



























// import axios from "axios";
// import { useEffect, useState } from "react";
// // import { useHistory } from "react-router-dom";v
// import { getPackages } from "../../services/servicePackages";
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// // import { toast } from "react-toastify";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";


// function ServicePackageCard({serviceId}) {
//     const [items, setItems] = useState([]);
//     // const [cartItems, setCartItems] = useState([]);
//     const customerId = localStorage.getItem('customerId')
//     const loginStatus = useSelector((state) => state.customer.loginStatus);
//     console.log(loginStatus);


//     // Access Redux store to check login status
//     // const loginStatus = useSelector(state => state.customer.loginStatus);
//     const navigate = useNavigate();

//     // Fetch cart items from server
//     // const fetchCartItems = async () => {
//     //     try {
//     //         const response = await axios.get(`http://localhost:8080/customers/cart/items?customerId=${customerId}`);
//     //         setCartItems(response.data); // Assuming response.data contains an array of packageIds
//     //     } catch (error) {
//     //         console.error("Error fetching cart items", error);
//     //     }
//     // };

//     const loadPackages = async () => {
//         try {
//             const result = await getPackages({serviceId});
//             setItems(result);
//         } catch (error) {
//             console.error("Error in data loading", error);
//         }
//     };

//     useEffect(() => {
//         loadPackages();
//         // fetchCartItems()S; // Fetch cart items on component mount
//     }, []);


//     // Add service to cart

//     const addServiceToCart = async (service) => {
//         if (!loginStatus) {
//             console.log("User not logged in");
//             return;
//         }

//         try {
//             const response = await axios.post(`${config.url}/customers/cart/add`, {
//                 customerId,
//                 packageId: service.packageId,
//             });

//             if (response.status === 200) {
//                 console.log("Item added to cart");
//                 // You can add further logic here if needed
//             } else {
//                 console.error("Failed to add item to cart");
//             }
//         } catch (error) {
//             console.error("Error adding item to cart", error);
//         }
//     };
//     // const addServiceToCart = async (packageId) => {
//     //     if (!loginStatus) {
//     //         // If the user is not logged in, navigate to the login page
//     //         navigate('/login');
//     //         return;
//     //     }

//     //     try {
//     //         const response = await axios.post("http://localhost:8080/customers/cart/add", {
//     //             customerId: customerId,
//     //             packageId: packageId
//     //         });

//     //         if (response.status === 200) {
//     //             console.log("Service added to cart successfully.");
//     //             fetchCartItems(); // Refresh cart items after adding to the cart
//     //         } else {
//     //             console.error("Failed to add service to cart.");
//     //         }
//     //     } catch (error) {
//     //         console.error("Error in adding service to cart", error);
//     //     }
//     // };

//     return (
//         items && items.length > 0 ? (
            
//             items.map((item, index) => (
//                 <div>
//                 <Card key={index}>
//                     <Card.Body>
//                         <Card.Title>{item['packageTitle']}</Card.Title>
//                         <Card.Text>
//                             ₹{item['packagePrice']}
//                         </Card.Text>
//                         <Card.Text>
//                             ★{item['avgRating']}/5 - {item['totalRatings']} Reviews
//                         </Card.Text>
//                         {
//                                 cartItems.includes(item['packageId']) ? (
//                                     <Button variant="success" onClick={() => window.location.href='/cart'}>
//                                         Go to Cart
//                                     </Button>
//                                 ) : (
//                                     <Button
//                                         variant="primary"
//                                         onClick={() => addServiceToCart(item['packageId'])}
//                                         disabled={!loginStatus} // Disable button if not logged in
//                                     >
//                                         {loginStatus ? "Add to Cart" : "Login to Add"}
//                                     </Button>
//                                 )
//                             }
//                     </Card.Body>
//                 </Card>
//                 </div>
//             ))
//         ) : (
//             <p>No packages available</p>
//         )
//     );
// }

// export default ServicePackageCard;
