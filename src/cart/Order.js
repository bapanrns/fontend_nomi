import React, {  useEffect, useState } from 'react'
import { Container, Row, Col, Accordion, Form, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/css/checkout.css';
import Select from 'react-select';
import axios from "axios";
import global from "../components/global";
// Notification
import { ToastContainer, toast } from 'react-toastify';
import Joi from 'joi';

import {
    useNavigate
  } from "react-router-dom";

import axiosInstance from '../components/axiosInstance';

import ReturnModal from './ReturnModal';

const MyOrder = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        getOrderRecord();
    }, []);

    const [orderDetails, setOrderDetails] = useState({});
    const [orderPriceDetails, setOrderPriceDetails] = useState({});
    const [orderAddress, setOrderAddress] = useState({});
    const getOrderRecord=()=>{
        setIsLoading(true);
        let data = {};
        axiosInstance.post('/getOrderData', data)
        .then((response) => {
            setIsLoading(false);
            setOrderDetails(response.data.orderItemList);
            setOrderPriceDetails(response.data.orderPrice);
            setOrderAddress(response.data.deliveryAddress);
            console.log(response.data.deliveryAddress);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

    const cancelOrder =(order_item_id, order_id, p_id)=>{
        const confirmed = window.confirm('Are you sure you want to cancel this item?');
        if (confirmed) {
            console.log('Item deleted');
            setIsLoading(true);
            let data = {order_item_id: order_item_id, order_id: order_id, pid: p_id};
            axiosInstance.post('/cancelOrderItem', data)
            .then((response) => {
                setIsLoading(false);
                if(response.data[0] === 0){
                    toast.warning('It is not possible to cancel the item due to a status change.', {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
                getOrderRecord();
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            })
        } else {
            console.log('Deletion cancelled');
        }
    }
    

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        mobile_no: '',
        pincode: '',
        alternative_mobile_no: '',
        village: '',
        city: '',
        landmark: ''
    });

    const schema = Joi.object({
        name: Joi.string().required(),
        mobile_no: Joi.number().required(),
        pincode: Joi.string().required(),
        alternative_mobile_no: Joi.number().required(),
        village: Joi.string().required(),
        city: Joi.string().required(),
        landmark: Joi.string().required()
    });

    const [saveData, setSaveData] = useState({
        id: 0,
        name: "",
        mobile_no: "",
        alternative_mobile_no: "",
        pincode: "",
        landmark: "",
        city: "",
        village: ""
    });

    const [openNewAddress, setOpenNewAddress] = useState("none");
    const editDeliveryAddress =(id)=>{
        setOpenNewAddress("block");
        setIsLoading(true);
        let data = {addressId: id};
        axiosInstance.post('/getAddressById', data)
        .then((response) => {
            setIsLoading(false);

            setSaveData({
                id: response.data.id,
                name: response.data.name,
                mobile_no: response.data.mobile_no,
                alternative_mobile_no: response.data.alternative_mobile_no,
                pincode: response.data.pincode,
                landmark: response.data.landmark,
                city: response.data.city,
                village: response.data.village
            });
            setFormData({
                ...formData,
                name: response.data.name,
                mobile_no: response.data.mobile_no,
                alternative_mobile_no: response.data.alternative_mobile_no,
                pincode: response.data.pincode,
                landmark: response.data.landmark,
                city: response.data.city,
                village: response.data.village
            });
        })
        .catch((error) => {
            console.log('Error:', error);
        });
    }

    const handalChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setSaveData({
            ...saveData,
            [e.target.name]: e.target.value,
        });
    }


    const onSubmit = async (event) => {
        const validationResult = schema.validate(formData, { abortEarly: false });
        //console.log(validationResult.error);
        if (validationResult.error) {
            const validationErrors = {};
            validationResult.error.details.forEach((error) => {
                validationErrors[error.path[0]] = error.message;
            });
            setErrors(validationErrors);

            console.log(errors)
        } else {
            if(["721648", "721636"].includes(saveData.pincode)){
            // console.log("MAKE AN API CALL", fields);
                event.preventDefault();
                
                axiosInstance.post('/new_address', saveData)
                .then((response) => {
                    if(response.data.success > 0){
                        toast.success('Delivery address save successfully.', {
                            position: toast.POSITION.TOP_CENTER,
                        });
                        setOpenNewAddress("none");
                    }else{
                        toast.error('Error.', {
                            position: toast.POSITION.TOP_CENTER,
                        });
                    }
                })
                .catch((error) => {
                    console.log('Error:', error);
                });
            }else{
                toast.warn('We are not available in the '+saveData.pincode+' postal code.', {
                    position: toast.POSITION.TOP_CENTER,
                });
            }


        }
    };

    let myStyle = {
        display: "block",
        backgroundColor: "#cccc"
    };

    const [returnItemId, setReturnItemId] = useState(0);
    const [returnOrderItemId, setOrderReturnItemId] = useState(0);
    const returnOrder =(order_item_id, order_id)=>{
        setReturnItemId(order_item_id);
        setOrderReturnItemId(order_id);
        handleShowModal();
    }

    const [returnModal, setReturnModal] = useState(false)
    
    
    const handleShowModal = () => {
        setReturnModal(true);
      };
    
    const handleCloseModal = (dataload=false) => {
        setReturnModal(false);
        if(dataload){
            getOrderRecord();
        }
    };


    return (
        <>
        <ReturnModal
        show={returnModal}
        onClose={handleCloseModal}
        returnItemId={returnItemId} 
        returnOrderItemId={returnOrderItemId}
        />
            <Container className='HomeContainer'>
                <Row>
                {Object.keys(orderDetails).length > 0 ?
                Object.keys(orderDetails).map((product_id, key) => (
                    <Col md={12} className={"OrderWise OrderWise"+(key%2===0?"1":"2")}>
                        <div className='col-md-8 orderItemListDiv'>
                            {orderDetails[product_id].map((obj, index) => (
                                <div className='OrderItemMainDiv' md={12}>
                                    <div className='col-md-12'>
                                        <div className='OrderItemDiv' style={{position: "relative"}}>
                                            <Image
                                                className='OrderImage'
                                                //src={require(`../images/product/${obj.image_name}`)} 
                                                src={`${global.productImageUrl}${obj.image_name}`}
                                                alt='No Image Found'
                                            />
                                            <span className='nId'>N{obj.p_id}</span>
                                        </div>
                                        <div className='OrderItemDiv'>{obj.company_name}</div><br></br>
                                        <div className='OrderItemDiv'>Quantity: {obj.quantity}</div><br></br>
                                        <div className='OrderItemDiv'>Price: {obj.price}</div><br></br>
                                        { obj.size !=="" &&
                                        <><div className='OrderItemDiv'>Size: {obj.size}</div><br></br></>
                                        }
                                        <div className='OrderItemDiv'>Statue: <span className={"orderStatus"+obj.order_status}>{obj.order_status}</span></div><br></br>
                                        {
                                        ["Pending", "Confirm"].includes(obj.order_status) &&
                                        <>
                                            <div className='editDelivaryDiv' onClick={(e) => { 
                                                    editDeliveryAddress(obj.delivery_address_id);
                                                }}><span className='editDelivary'>Edit Delivary Address</span></div>
                                            <div className='editDelivaryDiv' onClick={(e) => { 
                                                    cancelOrder(obj.order_item_id, obj.order_id, obj.p_id);
                                                }}><span className='cancelDelivary'>Cancel Order</span></div>
                                        </>
                                        }
                                        {
                                            (obj.order_status === "Complete" && obj.return_available === 1 && obj.returnDay <= 5) &&
                                            <>
                                                <div className='editDelivaryDiv'>
                                                    <span 
                                                        className='cancelDelivary' 
                                                        onClick={(e) => { 
                                                            returnOrder(obj.order_item_id, obj.order_id);
                                                        }}
                                                    >Return</span>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='col-md-4 orderPriceDetailsDiv'>
                            <div className='PriceDetails'>
                                <div className='orderPriceDetails'>Order Price Details</div>
                                <div className='PriceDetailsItemCount'>
                                    <div className='PriceDetailsLeft'>Items: {orderPriceDetails[product_id]['itemCount']}</div>
                                    <div className='PriceDetailsRight'>Rs: {orderPriceDetails[product_id]["total_price"]}/-</div>
                                </div>
                                
                                <div className='PriceDetailsDeliveryCharge'>
                                    <div className='PriceDetailsLeft'>Delivery Charges: </div>
                                    <div className='PriceDetailsRight'>Rs: {orderPriceDetails[product_id]["deliveryCharge"]}/-</div>
                                </div>

                                <div className='PriceDetailsTotalAmount'>
                                    <div className='PriceDetailsLeft'>Total Amount: </div>
                                    <div className='PriceDetailsRight'>Rs: {orderPriceDetails[product_id]["grossTotal"]}/-</div>
                                </div>

                                <div style={{paddingLeft: '10px', paddingRight: '10px'}}>
                                    <div className='PriceDetailsLeft' style={{fontWeight: "bold", color: "#00cfff"}}>Delivary Address: </div>
                                    {orderAddress[product_id][0]["name"]}, {orderAddress[product_id][0]["village"]}, {orderAddress[product_id][0]["landmark"]}, {orderAddress[product_id][0]["pincode"]}, {orderAddress[product_id][0]["mobile_no"]} - {orderAddress[product_id][0]["alternative_mobile_no"]}
                                </div>
                            </div>
                        </div>
                    </Col>
                )):"No Record Found"
            }
                </Row>

                <Row>
                    <div className='addNewAddress' style={{display: openNewAddress, marginBottom: '70px'}}>
                        <div role="dialog" aria-modal="true" className="fade modal show" style={myStyle}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header modalHeader">
                                        <div className="modal-title h4">Delivery Address</div>
                                        <button type="button" className="btn-close closeBtn" aria-label="Close"
                                        onClick={(e) => { 
                                            setOpenNewAddress("none")
                                        }}
                                        ></button>
                                    </div>
                                    <div className="modal-body" style={{paddingBottom: 0}}>  
                                        <div className="mb-3 formValidation">
                                            <label className="form-label" htmlFor="name.ControlInput1">Name: <span className='requiredfield'> *</span></label>
                                            <input 
                                                placeholder="" 
                                                type="text" 
                                                name='name'
                                                id="name.ControlInput1" 
                                                className="form-control" 
                                                onChange={handalChange}
                                                value={saveData.name}
                                                maxLength={255}
                                                // To override the attribute name
                                            data-attribute-name="Customer Name"
                                            data-async
                                                />
                                                {errors.name ? <label className="error"> {errors.name} </label> : ""}
                                        </div>

                                        <div className="mb-3 formValidation">
                                            <label className="form-label" htmlFor="mobile_no.ControlInput1">Mobile No: <span className='requiredfield'> *</span></label>
                                            <input 
                                                placeholder="" 
                                                type="tel" 
                                                name='mobile_no'
                                                id="mobile_no.ControlInput1" 
                                                className="form-control" 
                                                onChange={handalChange}
                                                value={saveData.mobile_no}
                                                maxLength={10}
                                                // To override the attribute name
                                            data-attribute-name="Mobile No."
                                            data-async
                                                />
                                                {errors.mobile_no ? <label className="error"> {errors.mobile_no} </label> : ""}
                                        </div>

                                        <div className="mb-3 formValidation">
                                            <label className="form-label" htmlFor="alternative_mobile_no.ControlInput1">Alternative Mobile No.<span style={{fontSize: "10px", fontWeight: 'bold'}}>( or Whatsapp No.)</span>: </label>
                                            <input 
                                                placeholder="" 
                                                type="tel" 
                                                name='alternative_mobile_no'
                                                id="alternative_mobile_no.ControlInput1" 
                                                className="form-control" 
                                                
                                                onChange={handalChange}
                                                value={saveData.alternative_mobile_no}
                                                maxLength={10}
                                                // To override the attribute name
                                            data-attribute-name="Alternative Mobile No."
                                            data-async
                                                />
                                                {errors.alternative_mobile_no ? <label className="error"> {errors.alternative_mobile_no} </label> : ""}
                                        </div>
                                        
                                        <div className="mb-3 formValidation">
                                            <label className="form-label" htmlFor="landmark.village">Village/Ward no.: <span className='requiredfield'> *</span></label>
                                            <input 
                                                placeholder="" 
                                                type="text" 
                                                name='village'
                                                id="landmark.village" 
                                                className="form-control"  
                                                
                                                onChange={handalChange}
                                                value={saveData.village}
                                                // To override the attribute name
                                                maxLength={255}
                                                />
                                            {errors.village ? <label className="error"> {errors.village} </label> : ""}
                                        </div>

                                        <div className="mb-3 formValidation">
                                            <label className="form-label" htmlFor="pincode.ControlInput1">Pincode: <span className='requiredfield'> *</span></label>
                                            <input 
                                                placeholder="" 
                                                type="text" 
                                                name='pincode'
                                                id="pincode.ControlInput1" 
                                                className="form-control" 
                                                
                                                onChange={handalChange}
                                                value={saveData.pincode}
                                                maxLength={6}
                                                // To override the attribute name
                                                />
                                                {errors.pincode ? <label className="error"> {errors.pincode} </label> : ""}
                                        </div>

                                        <div className="mb-3 formValidation">
                                            <label className="form-label" htmlFor="landmark.ControlInput1">Landmark: <span className='requiredfield'> *</span></label>
                                            <input 
                                                placeholder="" 
                                                type="text" 
                                                name='landmark'
                                                id="landmark.ControlInput1" 
                                                className="form-control"  
                                                
                                                onChange={handalChange}
                                                value={saveData.landmark}
                                                // To override the attribute name
                                                maxLength={255}
                                                />

                                                {errors.landmark ? <label className="error"> {errors.landmark} </label> : ""}
                                                
                                        </div>
                                        <div className="mb-3 formValidation">
                                            <label className="form-label" htmlFor="city.ControlInput1">City / Town: <span className='requiredfield'> *</span></label>
                                            <input 
                                                placeholder="" 
                                                type="text" 
                                                name='city'
                                                id="city.ControlInput1" 
                                                className="form-control"  
                                                
                                                onChange={handalChange}
                                                value={saveData.city}
                                                maxLength={255}
                                                // To override the attribute name
                                                />
                                                {errors.city ? <label className="error"> {errors.city} </label> : ""}
                                        </div>
                                        
                                        <div className="mb-3 formValidation">
                                            <button type="button" onClick={onSubmit} className="signupButton btn btn-primary">Save Address</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    
                </Row>
            </Container>
        </>
    )
}

export default MyOrder