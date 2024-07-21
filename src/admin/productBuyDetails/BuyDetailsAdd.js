import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
//import axios from "axios";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Joi from 'joi';
import Loader from '../../components/Loader';
import global from "../../components/global";
import axiosInstance from '../../components/axiosInstance';

import {
    useParams,
    useNavigate
  } from "react-router-dom";

const BuyDetailsAdd = () => {
    const navigate = useNavigate();
    const [editData, setEditData] = useState({
        id: "",
        shop_id: "",
        buy_price: "",
        payment_amount: "",
        discount_amount: "",
        transport_amount: "",
        no_of_product: "",
        notes: "",
        transition_type: "",
        transition_date: "",
        bill: ""
    });
    const [formData, setFormData] = useState({
        shop_id: '',
        buy_price: '',
        transition_type: '',
        transition_date: ''
    });
    const schema = Joi.object({
        shop_id: Joi.string().required(),
        buy_price: Joi.number().integer().required(),
        transition_type: Joi.string().required(),
        transition_date: Joi.date().required()
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [originalBill, setOriginalBill] = useState("");

    const {id} = useParams();

    useEffect(() => {
        getShopList();
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
        await axiosInstance.post('/findBuyProductByPK', data)
        /*await axios.post(global["axios_url"]+'/findBuyProductByPK', data, {
            headers: headers
        })*/
        .then((response) => {
            console.log(response.data);
            setEditData({...editData, 
                    'buy_price': response.data.buy_price, 
                    'bill': response.data.bill,
                    'discount_amount': response.data.discount_amount,
                    'id': response.data.id,
                    'no_of_product': response.data.no_of_product,
                    'notes': response.data.notes,
                    'payment_amount': response.data.payment_amount,
                    'shop_id': response.data.shop_id,
                    'transition_date': new Date(response.data.transition_date),
                    'transition_type': response.data.transition_type,
                    'transport_amount': response.data.transport_amount
                });
            setOriginalBill(response.data.bill);
            //setEditData(response.data);
            setFormData({
                ...formData,
                "shop_id": response.data.shop_id.toString(),
                "buy_price": response.data.buy_price,
                "transition_type": response.data.transition_type,
                "transition_date": response.data.transition_date,

            });
            
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
            alert('Error');
        })
    }    

    const [shopList, getShops] = useState([]);

    const getShopList = async () => {
        setIsLoading(true);
        /*const headers = {
            'Content-Type': 'application/json'
        }*/
        
        let data = {};
        axiosInstance.post('/allShopList', data)
        /*axios.post(global["axios_url"]+'/allShopList', data, {
            headers: headers
        })*/
        .then((response) => {
            setIsLoading(false);
            getShops(response.data)
           // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const validationResult = schema.validate(formData, { abortEarly: false });
        console.log(validationResult.error);
        console.log("editData: ", editData);
        if (validationResult.error) {
            const validationErrors = {};
            validationResult.error.details.forEach((error) => {
                validationErrors[error.path[0]] = error.message;
            });
            setErrors(validationErrors);
        } else {
            /*const headers = {
                'Content-Type': 'application/json'
            }*/
            
            axiosInstance.post('/saveBuyProduct', editData)
            /*axios.post(global["axios_url"]+'/saveBuyProduct', editData, {
                headers: headers
            })*/
            .then((response) => {
                //console.log(response);
                setIsLoading(false);
                setOriginalBill("");
                alert(response.data);
                navigate("../admin/buy_details/");
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
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

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            "transition_date": date,
        });
        setEditData({...editData, "transition_date": date});
        //console.log(date.toISOString().split('T')[0]);
        console.log(date);
    };
    /* Image Upload */
    const [previewImage, setPreviewImage] = useState({
        bill: null
    });
    const handelFile = (e) =>{
        const file = e.target.files[0];
        //console.log(file);
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result;
            
            setEditData({...editData, [e.target.name]: base64String})
            setPreviewImage({...previewImage, [e.target.name]: reader.result});
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const initialValue = new Date("2023-06-27");
    return (
        <>
            {isLoading ? <Loader /> : ""}
            <div className='addNewAddress' style={{padding: '10px'}}>
                <form
                    className="myForm"
                    noValidate
                    autoComplete="off"
                    onSubmit={onSubmit}
                >
                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="transition_date.ControlInput1">Date: <span className='requiredfield'> *</span></label><br />
                        <DatePicker
                            selected={editData.transition_date}
                            name='transition_date'
                            className='form-control'
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd" // Specify the desired date format
                            placeholderText="Date"
                            value={editData.transition_date || initialValue}
                        />
                        <br></br>
                        {errors.transition_date && <span className="error">This is a required field.</span>}
                    </div>
                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="transition_type.ControlInput1">Transition Type: <span className='requiredfield'> *</span></label>
                        <select
                            className='form-select'
                            id="transition_type"
                            name="transition_type"
                            onChange={handalChange}
                            value={editData.transition_type}
                        >
                            <option value="">Select Transition</option>
                            <option value="Buy">Buy</option>
                            <option value="Payment">Payment</option>
                        </select>
                        {errors.transition_type && <span className="error">This is a required field</span>}
                    </div>
                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="shop_id.ControlInput1">shop Name: <span className='requiredfield'> *</span></label>
                        <select
                            className='form-select'
                            id="shop_id"
                            name="shop_id"
                            onChange={handalChange}
                            value={editData.shop_id}
                        >
                            <option value="">Select Shop</option>
                            {
                                shopList.map((data, index)=>{
                                    return (<option key={index} value={data.id} >{data.shop_name}</option>);
                                })
                            }
                            
                        </select>
                        {errors.shop_id && <span className="error">This is a required field</span>}
                    </div>
                    
                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="buy_price.ControlInput1">Buy Price: <span className='requiredfield'> *</span></label>
                        <input 
                            type="text" 
                            name='buy_price'
                            id="buy_price.ControlInput1" 
                            className="form-control"
                            value={editData['buy_price']}
                            onKeyPress={(e) => AcceptNumericValue(e)}
                            onChange={handalChange}
                        />
                        {errors.buy_price && <span className="error">This is a required field, Only numeric values are allowed</span>}
                    </div>
                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="discount_amount.ControlInput1">Discount Price:</label>
                        <input 
                            type="text" 
                            name='discount_amount'
                            id="discount_amount.ControlInput1" 
                            className="form-control"
                            value={editData['discount_amount']}
                            onKeyPress={(e) => AcceptNumericValue(e)}
                            onChange={handalChange}
                        />
                        
                    </div>
                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="payment_amount.ControlInput1">Payment Price: </label>
                        <input 
                            type="text" 
                            name='payment_amount'
                            id="payment_amount.ControlInput1" 
                            className="form-control"
                            value={editData['payment_amount']}
                            onKeyPress={(e) => AcceptNumericValue(e)}
                            onChange={handalChange}
                        />
                    </div>
                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="transport_amount.ControlInput1">Transport price: </label>
                        <input 
                            type="text" 
                            name="transport_amount"
                            id="transport_amount.ControlInput1" 
                            className="form-control"
                            value={editData['transport_amount']}
                            onKeyPress={(e) => AcceptNumericValue(e)}
                            onChange={handalChange}
                        />
                    </div>
                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="no_of_product.ControlInput1">No. of Products: </label>
                        <input 
                            type="text" 
                            name="no_of_product"
                            id="no_of_product.ControlInput1" 
                            className="form-control"
                            value={editData['no_of_product']}
                            onChange={handalChange}
                        />
                    </div>
                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="notes.ControlInput1">Note: </label>
                        <textarea
                            value={editData['notes']}
                            name='notes'
                            className='form-control'
                            onChange={handalChange}
                            placeholder="Enter your text here"
                        />
                    </div>

                    <div className="mb-3 formValidation" key="billDiv" style={{clear: 'both'}}>
                        <label className="form-label" htmlFor="billDiv.ControlInput">Images: </label>
                        <input type="file" name="bill" onChange={handelFile}></input>
                        <div>
                            {originalBill && (
                                <div style={{border: "1px dashed", float: 'right'}}>
                                    <img 
                                        //src={require("../../images/bill/"+originalBill)} 
                                        src={`${global.billImageUrl}${originalBill}`}
                                        alt="No found" 
                                        style={{ width: '200px', height: '200px'}}
                                    ></img>
                                </div>
                            )}
                            {previewImage['bill'] && (
                                
                                <img src={previewImage['bill']} alt="Selected" style={{ width: '200px', height: '200px', float: 'left' }} />
                            )}
                        </div>
                    </div>

                    <div className="mb-3 formValidation" style={{clear: 'both'}}>
                        <button type="submit" className="signupButton btn btn-primary">Save Address</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default BuyDetailsAdd