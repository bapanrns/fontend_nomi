import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
//import axios from "axios";

import Joi from 'joi';
import Loader from '../../components/Loader';
//import global from "../../components/global";
import axiosInstance from '../../components/axiosInstance';

import {
    useParams,
    useNavigate
  } from "react-router-dom";

const BuyDetailsAdd = () => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [editData, setEditData] = useState({
        id: "",
        shop_name: "",
        shop_phone_no: "",
        shop_whatsapp_no: "",
        calling_time: "",
        address: ""
    });
    const [formData, setFormData] = useState({
        shop_name: ''
    });
    const schema = Joi.object({
        shop_name: Joi.string().required()
    });
    const [errors, setErrors] = useState({});

    const {id} = useParams();

    useEffect(() => {
        if(id !== undefined){
            getShopById(id);
        }
    }, []);

    const getShopById = async (shop_id) => {
        setIsLoading(true);
        /*const headers = {
            'Content-Type': 'application/json'
        }*/
        
        let data = {id: shop_id};
        await axiosInstance.post('/findShop', data)
        /*await axios.post(global["axios_url"]+'/findShop', data, {
            headers: headers
        })*/
        .then((response) => {
            setEditData(response.data);
            setFormData({
                ...formData,
                ["shop_name"]: response.data.shop_name,
            });
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
            alert('Error');
        })
    }
    const navigate = useNavigate();
    const onSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const validationResult = schema.validate(formData, { abortEarly: false });
       // console.log(validationResult.error);
        if (validationResult.error) {
            const validationErrors = {};
            validationResult.error.details.forEach((error) => {
                validationErrors[error.path[0]] = error.message;
            });
            console.log(validationResult.error);
            setErrors(validationErrors);
        } else {
            /*const headers = {
                'Content-Type': 'application/json'
            }*/
            
            axiosInstance.post('/shopAdd', editData)
           /* axios.post(global["axios_url"]+'/shopAdd', editData, {
                headers: headers
            })*/
            .then((response) => {
                setIsLoading(false);
                alert(response.data)
                if(response.data !== "Shop name already exists"){
                    navigate("../admin/shop/");
                }
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                alert('Error');
            })
        }

    };

    const AcceptNumericValue = e => {
        var key = e.key;
        var regex = /[0-9]|\./;
        if( !regex.test(key) ) {
            e.preventDefault();
        }
    }

    const handalChange = (e) =>{
        if (Object.keys(formData).includes(e.target.name)) {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
        setEditData({...editData, [e.target.name]: e.target.value});
        if (e.target.name === "category_id"){
            console.log(e.target.value);
        }
    }

    return (
        <>
            {isLoading ? <Loader /> : ""}
            <h3 style={{textAlign: 'center'}}>Shop {editData.id === ""?"Add":"Edit"}</h3>
            <div className='addNewAddress' style={{padding: '10px'}}>
                <form
                    className="myForm"
                    noValidate
                    autoComplete="off"
                    onSubmit={onSubmit}
                >
                    
                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="shop_name.ControlInput1">shop Name: <span className='requiredfield'> *</span></label>
                        <input 
                            type="text" 
                            name='shop_name'
                            id="shop_name.ControlInput1" 
                            className="form-control"
                            value={editData['shop_name']}
                            onChange={handalChange}
                        />
                        {errors.shop_name && <span className="error">This is a required field</span>}
                    </div>
                    
                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="shop_phone_no.ControlInput1">Phone Number:</label>
                        <input 
                            type="text" 
                            name='shop_phone_no'
                            id="shop_phone_no.ControlInput1" 
                            className="form-control"
                            value={editData['shop_phone_no']}
                            onKeyPress={(e) => AcceptNumericValue(e)}
                            onChange={handalChange}
                        />
                        {errors.shop_phone_no && <span className="error">Only numeric values are allowed</span>}
                    </div>
                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="shop_whatsapp_no.ControlInput1">Whatsapp Price:</label>
                        <input 
                            type="text" 
                            name='shop_whatsapp_no'
                            id="shop_whatsapp_no.ControlInput1" 
                            className="form-control"
                            value={editData['shop_whatsapp_no']}
                            onKeyPress={(e) => AcceptNumericValue(e)}
                            onChange={handalChange}
                        />
                        {errors.shop_whatsapp_no && <span className="error">Only numeric values are allowed</span>}
                    </div>
                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="calling_time.ControlInput1">calling Time:</label>
                        <input 
                            type="text" 
                            name='calling_time'
                            id="calling_time.ControlInput1" 
                            className="form-control"
                            value={editData['calling_time']}
                            onChange={handalChange}
                        />
                    </div>
                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="address.ControlInput1">Address: </label>
                        <textarea
                            value={editData['address']}
                            name='address'
                            className='form-control'
                            onChange={handalChange}
                            placeholder="Enter your text here"
                        />
                    </div>
                    <div className="mb-3 formValidation">
                        <button type="submit" className="signupButton btn btn-primary">Save Address</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default BuyDetailsAdd