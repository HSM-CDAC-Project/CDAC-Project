import axios from "axios";
import config from "../config";


const token = localStorage.getItem('jwt')
export async function GetAllApprovedPartner() {
try{
    const response = await axios.get(`${config.url}/admin/partnerList`,{headers: {
        Authorization: `Bearer ${token}`, // Instead of 'jwt' or just 'token'
    }})
    return response.data
}catch (error) {
    console.error('Error fetching approval list:', error);
    throw error; 
  }
    
}

export async function getAllActiveOrders() {
    try {
        const response = await axios.get(`${config.url}/admin/ActiveOrders`,{headers: {
            Authorization: `Bearer ${token}`, // Instead of 'jwt' or just 'token'
        }});
        return response.data; // Ensure this matches your API response structure
      } catch (error) {
        console.error('Error fetching active orders:', error);
        throw error; // Propagate error to be handled in the component
      }
}

export async function getPendingApprovalList() {
    try{
        const response = await axios.get(`${config.url}/admin/partnerPendingList`,{headers: {
            Authorization: `Bearer ${token}`, // Instead of 'jwt' or just 'token'
        }});
        return response.data;
    }catch (error) {
        console.error('Error while fetching unapproved partner list:', error);
        throw error; 
      }
}

export async function approvePartner(partnerId) {
    try{
        const response = await axios.put(`${config.url}/admin/approve/${partnerId}`,{},{headers: { //as there is no request body for put...keep {} and then write header
            Authorization: `Bearer ${token}`, 
            
        }})

        return response.data
    }catch (error) {
        // console.error('Error while approving partner:', error);
        throw error; 
      }
} 

export async function showIdImage(partnerId){
    try{
        const response = await axios.get(`${config.url}/admin/image/${partnerId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: 'blob' // Ensure the response is treated as a binary large object
        });
        console.log(response); // Check if the response contains the expected image data

        // Convert Blob to Object URL (for image rendering)
        const imageUrl = URL.createObjectURL(response.data);
        return imageUrl;
    }
    catch (error) {
        console.error('Error while downloading partner profile image:', error);
        throw error; 
    }
}

export async function showProfileImage(partnerId){
    try{
        const response = await axios.get(`${config.url}/partner/image/${partnerId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: 'blob' // Ensure the response is treated as a binary large object
        });
        console.log(response); // Check if the response contains the expected image data

        // Convert Blob to Object URL (for image rendering)
        const imageProfileUrl = URL.createObjectURL(response.data);
        return imageProfileUrl;
    }
    catch (error) {
        console.error('Error while downloading partner profile image:', error);
        throw error; 
    }
}



export async function deletePartner(partnerId) {
    const response = await axios.delete(`${config.url}/admin/delete/${partnerId}`,{headers: {
        Authorization: `Bearer ${token}`, // Instead of 'jwt' or just 'token'
    }})
    return response.data
}







export async function login(email, password) {
    const body = {
        email,
        password,
    }
    const response = await axios.post(`${config.url}/admin/login`,body)
    return response.data
}

export async function changePassowrd(oldPassword, newPassword, empId) {
    const body = {
        oldPassword,
        newPassword,
    }
    const response = await axios.post(`${config.url}/admin/updatepassword/${empId}`, body,{headers: {
        Authorization: `Bearer ${token}`, // Instead of 'jwt' or just 'token'
    }});
    return response.data
}

export async function AddPackages(categoryTitle, serviceTitle, packageTitle, packagePrice) {
    const body = {
        categoryTitle, 
        serviceTitle, 
        packageTitle, 
        packagePrice
    }
    const response = await axios.post(`${config.url}/admin/addPackage`, body,{headers: {
        Authorization: `Bearer ${token}`, // Instead of 'jwt' or just 'token'
    }})
    return response.data
}