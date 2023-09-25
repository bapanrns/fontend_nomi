import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

import Loader from '../../components/Loader'
import global from "../../components/global";
import axiosInstance from '../../components/axiosInstance';
// Notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    useParams,
    useNavigate
  } from "react-router-dom";

const AddDeliveryBoy = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const {id} = useParams();

    useEffect(() => {
        getPinCode();
        if(id !== undefined){
            getDeliveryBoyDetails(id);
        }

    }, []);

    const [pinCodeArray, setPincode] = useState([])

    function getPinCode(){
        axiosInstance.post('/getPinCode', {})
        .then((response) => {
            setIsLoading(false); 
            console.log(response)
            setPincode(response.data.pinCodes);
        })
        .catch((error) => {
            toast.warn(error.data.message, {
                position: toast.POSITION.TOP_CENTER,
            });
            setIsLoading(false);
        })
    }



    // Edit section
    function getDeliveryBoyDetails(id){
        setIsLoading(true);
        const headers = {
            'Content-Type': 'application/json'
        }
        
        let data = {};
        data["id"] = id;
        axios.post(global["axios_url"]+'/categoryFindId', data, {
            headers: headers
        })
        .then((response) => {
            //console.log(response.data);
            setIsLoading(false);
            console.log(response.data.id);
            setCategoryObj({...deliveryBoyObj, 
                id: response.data.id,
                category_name: response.data.category_name, 
                active_status: response.data.active_status
            });
        }).catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

    const [deliveryBoyObj, setCategoryObj] = useState({
        id: 0,
        name: "",
        father_name: "",
        sex: "",
        mobile_no: "",
        whatsappNumber: "",
        aadhar_number: "",
        pan_number: ""
    });

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        let data = {};
        axiosInstance.post('/deliveryBoyDataSave', deliveryBoyObj)
        .then((response) => {
            setIsLoading(false);
            alert("Save Successfully");
            navigate("../admin/delivery_person/");
        }).catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    };

    return (
        <>
            <div className='addNewAddress' style={{padding: '10px'}}>
                <form
                    className="myForm"
                    noValidate
                    autoComplete="off"
                    onSubmit={onSubmit}
                >
                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="name.ControlInput1">Name: <span className='requiredfield'> *</span></label>
                        <input 
                            type="text" 
                            name='name'
                            id="name.ControlInput1" 
                            className="form-control"
                            defaultValue={deliveryBoyObj.name}
                            onBlur={(e) => { 
                                setCategoryObj(prevState => ({
                                    ...prevState,
                                    ['name']: e.target.value
                                }))
                            }}
                        />
                    </div>

                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="father_name.ControlInput1">Father Name: <span className='requiredfield'> *</span></label>
                        <input 
                            type="text" 
                            name='father_name'
                            id="father_name.ControlInput1" 
                            className="form-control"
                            defaultValue={deliveryBoyObj.father_name}
                            onBlur={(e) => { 
                                setCategoryObj(prevState => ({
                                    ...prevState,
                                    ['father_name']: e.target.value
                                }))
                            }}
                        />
                    </div>

                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="mobile_no.ControlInput1">Mobile No: <span className='requiredfield'> *</span></label>
                        <input 
                            type="text" 
                            name='mobile_no'
                            id="mobile_no.ControlInput1" 
                            className="form-control"
                            defaultValue={deliveryBoyObj.mobile_no}
                            onBlur={(e) => { 
                                setCategoryObj(prevState => ({
                                    ...prevState,
                                    ['mobile_no']: e.target.value
                                }))
                            }}
                        />
                    </div>

                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="whatsappNumber.ControlInput1">Whatsapp No: <span className='requiredfield'> *</span></label>
                        <input 
                            type="text" 
                            name='whatsappNumber'
                            id="whatsappNumber.ControlInput1" 
                            className="form-control"
                            defaultValue={deliveryBoyObj.whatsappNumber}
                            onBlur={(e) => { 
                                setCategoryObj(prevState => ({
                                    ...prevState,
                                    ['whatsappNumber']: e.target.value
                                }))
                            }}
                        />
                    </div>

                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="aadhar_number.ControlInput1">Aadhar No: <span className='requiredfield'> *</span></label>
                        <input 
                            type="text" 
                            name='aadhar_number'
                            id="aadhar_number.ControlInput1" 
                            className="form-control"
                            defaultValue={deliveryBoyObj.aadhar_number}
                            onBlur={(e) => { 
                                setCategoryObj(prevState => ({
                                    ...prevState,
                                    ['aadhar_number']: e.target.value
                                }))
                            }}
                        />
                    </div>

                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="pan_number.ControlInput1">Pan No: <span className='requiredfield'> *</span></label>
                        <input 
                            type="text" 
                            name='pan_number'
                            id="pan_number.ControlInput1" 
                            className="form-control"
                            defaultValue={deliveryBoyObj.pan_number}
                            onBlur={(e) => { 
                                setCategoryObj(prevState => ({
                                    ...prevState,
                                    ['pan_number']: e.target.value
                                }))
                            }}
                        />
                    </div>

                    <div className="mb-3 formValidation">
                            <label className="form-label" htmlFor="color.ControlInput1">Pin Code: <span className='requiredfield'> *</span></label>
                            <br></br>

                            {
                                pinCodeArray.length > 0  &&
                                pinCodeArray.map((pinCode, index)=>{
                                    return (
                                        <div className='form-check' style={{ float: 'left', marginLeft: '5px', minWidth: '100px' }} key={index}>
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                value={ pinCode } 
                                                id={"flexCheckDefaul"+index} 
                                                style={{marginTop: '10px', marginLeft: '-15px'}} 
                                               // checked={productObj['color'].includes(pinCode)}
                                               // onChange={handleCheckboxChange}
                                                />
                                            <label 
                                                className="form-check-label" 
                                                htmlFor={"flexCheckDefaul"+index} 
                                                style={{padding: '5px', cursor: 'pointer'}}
                                                >
                                                {pinCode}
                                            </label>
                                        </div>
                                    );
                                })

                            }
                        </div>
                    
                    <div className="mb-3 formValidation">
                        <button type="submit" className="signupButton btn btn-primary">Save Address</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddDeliveryBoy