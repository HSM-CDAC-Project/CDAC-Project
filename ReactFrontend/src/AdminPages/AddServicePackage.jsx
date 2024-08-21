import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Alert } from 'react-bootstrap';
import { AddPackages } from '../services/Admin';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function AddServicePackage() {
    const [categoryTitle, setCategoryTitle] = useState('');
    const [serviceTitle, setServiceTitle] = useState('');
    const [packageTitle, setPackageTitle] = useState('');
    const [packagePrice, setPackagePrice] = useState('');

    const serviceOptions = {
        HomeCleaning: ['BATH_CLEAN', 'KITCH_CLEAN','HOME_CLEAN','ROOM_CLEAN'],
        HomeService: ['GARDENING', 'HOME_DECO','PEST_CONT'],
        Maintenance: ['AC_REAPIR', 'REFRI_REPAIR','WM_REPAIR'],
        other: ['ELECTRICIAN', 'CARPENTER','PLUMBER']


    };


    const onCancel = () => {
        setCategoryTitle('');
        setServiceTitle('');
        setPackageTitle('');
        setPackagePrice('');    }

    const onAddnewPackage = async () => {
        if (!categoryTitle) {
            toast.warning('Select category');
        } else if (!serviceTitle) {
            toast.warning('Select service');
        } else if (!packageTitle) {
            toast.warning('Enter the package title');
        } else if (!packagePrice) {
            toast.warning('Enter package price');
        } else {
            try {
                const result = await AddPackages(categoryTitle, serviceTitle, packageTitle, packagePrice);
                if (result.status === "success") {
                    toast.success("package is added successfully!");
                    setCategoryTitle('');
                    setServiceTitle('');
                    setPackageTitle('');
                    setPackagePrice('');
                }
            } catch (error) {
                toast.error('Failed to add package');
            }
        }
    }

    return (
        <div>
            <h1 style={{ marginTop: '100px', marginBottom: '20px' }}>Add Service Package</h1>

            <div className='row'>
                {/* <div className='col'></div> */}

                <div className='col'>
                    <div className='form'>
                        <div className='mb-3'>
                            <label htmlFor='category'>Category</label>
                            <select
                                onChange={(e) => setCategoryTitle(e.target.value)}
                                className='form-control'
                                value={categoryTitle}
                            >
                                <option value=''>Select Category</option>
                                <option value='HomeCleaning'>Home Cleaning</option>
                                <option value='HomeService'>Home Services</option>
                                <option value='Maintenance'>Appl Maintenance</option>
                                <option value='other'>Other</option>


                            </select>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='service'>Service</label>
                            <select
                                onChange={(e) => setServiceTitle(e.target.value)}
                                className='form-control'
                                value={serviceTitle}
                                disabled={!categoryTitle}
                            >
                                <option value=''>Select Service</option>
                                {categoryTitle && serviceOptions[categoryTitle].map((service, index) => (
                                    <option key={index} value={service}>
                                        {service}
                                        </option>
                                ))}
                            </select>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='packageTitle'>Package Title</label>
                            <input
                                onChange={(e) => setPackageTitle(e.target.value)}
                                type='text'
                                className='form-control'
                                value={packageTitle}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='packagePrice'>Package Price</label>
                            <input
                                onChange={(e) => setPackagePrice(e.target.value)}
                                type='number'
                                className='form-control'
                                value={packagePrice}
                            />
                        </div>

                        <div className='mb-3'>
                            <button onClick={onAddnewPackage} className='ms-2 btn btn-success'>
                                Add Package
                            </button>
                            <button onClick={onCancel} className='ms-4 btn btn-danger'>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

                <div className='col'></div>
                                <div className='col'></div>

            </div>
        </div>
    );
}

export default AddServicePackage;