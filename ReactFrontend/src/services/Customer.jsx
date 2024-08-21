import axios from "axios";
import config from "../config";



const customerId = localStorage.getItem('customerId');
const token  = localStorage.getItem('jwt');
export async function login(email, password) {
    const body = {
        email,
        password,
    }
    const response = await axios.post(`${config.url}/customers/login`,body)
    return response.data
}


export async function register(firstName, lastName, email,mobileNo, password) {
    const body = {
        firstName, 
        lastName, 
        email,
        mobileNo, 
        password
    }
    const response = await axios.post(`${config.url}/customers/register`,body)
    return response.data
}

export async function getAllCartItems() {
    try {
        // const customerId = localStorage.getItem('customerId');

        if (!customerId) {
            throw new Error('Customer ID not found in localStorage');
          }

           // Make the API call to get cart items by customerId
        
        const response = await axios.get(`${config.url}/customers/cart/items/?customerId=${customerId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,     
                           },
                // headers:{'jwt' : token}
            }
        );
        return response.data; // Ensure this matches your API response structure
      } catch (error) {
        console.error('Error fetching active orders:', error);
        throw error; // Propagate error to be handled in the component
      }
  }

  export async function removeCartItem(customerId,packageId) {
    try {

      // const customerId = localStorage.getItem('customerId');

      const body = {
          customerId ,
          packageId 
      }

      if (!customerId) {
          throw new Error('Customer ID not found in localStorage');
        }
      //   http://localhost:8080/customers/cart/remove?customerId=C0001&packageId=1
        const response = await axios.delete(`${config.url}/customers/cart/remove`,{
          data: body,
          headers: {
            Authorization: `Bearer ${token}`,     
                   },      });
        return response.data;
    } catch (error) {
        console.error('Error removing cart item:', error);
        throw error;
    }
}

export async function decrementCartItemQuantity(customerId, packageId, currentQuantity) {
    try {
        const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;
        const body = {
            customerId,
            quantity: newQuantity,
            packageId,
        };

        if (!customerId) {
            throw new Error('Customer ID not found in localStorage');
        }

        // http://localhost:8080/customers/cart/minus
        const response = await axios.post(`${config.url}/customers/cart/minus`, body, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,            },
        });

        return response.data;
    } catch (error) {
        console.error('Error decrementing cart item quantity:', error);
        throw error;
    }
}

export async function incrementCartItemQuantity(customerId, packageId, currentQuantity) {
    try {
        const newQuantity = currentQuantity + 1;
        const body = {
            customerId,
            quantity: newQuantity,
            packageId,
        };

        if (!customerId) {
            throw new Error('Customer ID not found in localStorage');
        }

        // http://localhost:8080/customers/cart/plus
        const response = await axios.post(`${config.url}/customers/cart/plus`, body, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,            },
        });

        return response.data;
    } catch (error) {
        console.error('Error incrementing cart item quantity:', error);
        throw error;
    }
}


//for cart functionality
export async function getCustomerAddresses(customerId) {
    try {

        // http://localhost:8080/customers/C0002/address
        const response = await axios.get(`${config.url}/customers/${customerId}/address`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching customer addresses:', error);
        throw error;
    }
}


//for customer pages
export async function GetAllCustomerAddress(customerId) {
    console.log('Function called with customerId:', customerId);

    const response = await axios.get(`${config.url}/customers/${customerId}/address`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    console.log(response.data)

    return response.data
}

export async function DeleteCustomerAddress(addressId) {
    const response = await axios.delete(`${config.url}/customers/address/delete/${addressId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return response.data
}

export async function AddCustomerAddress(addressLineOne,addressLineTwo,city,state,country,zipCode,landmark
,customerId) {
    const body ={
       addressLineOne,addressLineTwo,city,state,country,zipCode,landmark
    }
    const response = await axios.post(`${config.url}/customers/address/add/${customerId}`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return response.data
}

export async function UpdateCustomerAddress(addressLineOne,addressLineTwo,city,state,country,zipCode,landmark
,addressId) {
    const body ={
        addressLineOne,addressLineTwo,city,state,country,zipCode,landmark
     }
    const response = await axios.put(`${config.url}/customers/address/update/${addressId}`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return response.data
}


export async function placeOrder(orderDetails) {
    try {
        const response = await axios.post(`${config.url}/customers/placeOrder`, orderDetails, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error placing order:', error);
        throw error;
    }
}



export const UpdateCustomerEmail = async ({ customerId, email }) => {
    const body = {
        customerId,
        email
    }
    try {
      const response = await axios.put(`${config.url}/customers/updateEmail`,body, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
      return response.data;
    } catch (error) {
      console.error("Error updating customer's email:", error);
      throw error;
    }
  };
  
  // Function to update customer's mobile number
  export const UpdateCustomerMobileNo = async ({ customerId, mobileNo }) => {
    const body ={
        customerId, mobileNo
    }
    try {
      const response = await axios.put(`${config.url}/customers/updateMobileNo`,body, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
      });
      return response.data;
    } catch (error) {
      console.error("Error updating customer's mobile number:", error);
      throw error;
    }
  };

  export async function GetAllCustomerDetails(customerId) {
    try {
        const response = await axios.get(`${config.url}/customers/details/${customerId}`,{
            headers: {
                Authorization: `Bearer ${token}`, // Instead of 'jwt' or just 'token'
            }
        });
        return response.data; // Return the data directly
    } catch (error) {
        console.error("Error fetching customer's details:", error);
        throw error; // Re-throw to handle in the calling function
    }
}

export async function GetAllOrderDetails(customerId) {
  try {
    const response = await axios.get(`${config.url}/customers/${customerId}/orders`,{
        headers: {
            Authorization: `Bearer ${token}`, // Instead of 'jwt' or just 'token'
        }
    })
    return response.data; 
  }
  catch (error) {
    console.error("Error fetching orders details:", error);
    throw error; // Re-throw to handle in the calling function
  }
  
}

export async function changePassword(oldPassword, newPassword, customerId) {
    const body = {
        oldPassword,
        newPassword,
    }
    const response = await axios.post(`${config.url}/customers/updatepassword/${customerId}`, body,{
        headers: {
            Authorization: `Bearer ${token}`, // Instead of 'jwt' or just 'token'
        }
    });
    return response.data
  }