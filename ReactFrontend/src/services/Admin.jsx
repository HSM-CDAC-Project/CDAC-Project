import axios from "axios";
import config from "../config";


const token = localStorage.getItem('jwt')
export async function GetAllApprovedPartner() {

    const response = await axios.get(`${config.url}/admin/partnerList`,{headers: {
        Authorization: `Bearer ${token}`, // Instead of 'jwt' or just 'token'
    }})
    return response.data
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

export async function deletePartner(partnerId) {
    const response = await axios.delete(`${config.url}/admin/delete/${partnerId}`,{headers: {
        Authorization: `Bearer ${token}`, // Instead of 'jwt' or just 'token'
    }})
    return response.data
}

export async function approvePartner(partnerId) {
    const response = await axios.put(`${config.url}/admin/approve/${partnerId}`,{headers: {
        Authorization: `Bearer ${token}`, // Instead of 'jwt' or just 'token'
    }})
    return response.data
} 

export async function getPendingApprovalList() {
        const response = await axios.get(`${config.url}/admin/partnerPendingList`,{headers: {
            Authorization: `Bearer ${token}`, // Instead of 'jwt' or just 'token'
        }});
        return response.data;
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