import axios from "axios";
import config from "../config";

const token = localStorage.getItem('jwt')
const partnerId = localStorage.getItem('partnerId')


export async function login(email, password) {
    const body = {
        email,
        password,
    }
    const response = await axios.post(`${config.url}/partner/login`,body)
    return response.data
}


export async function GetAllPartnerDetails(partnerId) {

    const response = await axios.get(`${config.url}/partner/details/${partnerId}`,{headers: {
      Authorization: `Bearer ${token}`,     
             },})
    return response.data
}

export async function showProfileImage(partnerId) {
  try {
    const response = await axios.get(`${config.url}/partner/image/${partnerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    });
    const imageProfileUrl = URL.createObjectURL(response.data);
    return imageProfileUrl;
  } catch (error) {
    console.error('Error while downloading partner profile image:', error);
    throw error;
  }
}


export const registerPartner = async (partnerData, profileImage, idImage) => {
  const formData = new FormData();
  
  formData.append('partnerDTO', new Blob([JSON.stringify(partnerData)], { type: 'application/json' }));
  formData.append('profileImage', profileImage);
  formData.append('idImage', idImage);

  const response = await axios.post(`${config.url}/partner/register`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',

    },
  });

  return response.data;
};


export const UpdatePartnerEmail = async ({ partnerId, email }) => {
  const body = {
    partnerId,
    email,
  }
  try {
    const response = await axios.put(`${config.url}/partner/updateEmail`,body, {
      
      headers: {
        Authorization: `Bearer ${token}`, // Instead of 'jwt' or just 'token'
    }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating partner email:', error);
    throw error;
  }
};


export const UpdatePartnerMobileNo = async ({ partnerId, mobileNo }) => {
  const body = {
    partnerId,
    mobileNo,
  }
  try {
    const response = await axios.put(`${config.url}/partner/updateMobileNo`,body, {
      headers: {
        Authorization: `Bearer ${token}`, // Instead of 'jwt' or just 'token'
    }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating partner mobile number:', error);
    throw error;
  }
};


export async function changePassword(oldPassword, newPassword, partnerId) {
  const body = {
      oldPassword,
      newPassword,
  }
  const response = await axios.post(`${config.url}/partner/updatepassword/${partnerId}`, body,{headers: {
    Authorization: `Bearer ${token}`, // Instead of 'jwt' or just 'token'
}});
  return response.data
}

export async function GetAllAssignedServices(partnerId) {
  const response = await axios.get(`${config.url}/partner/assignedorders/${partnerId}`,{headers: {
    Authorization: `Bearer ${token}`, // Instead of 'jwt' or just 'token'
}});
  return response.data
}