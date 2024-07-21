import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

import global from "../../components/global";
import axiosInstance from '../../components/axiosInstance';
// Notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    useParams,
    useNavigate
  } from "react-router-dom";

const AddDeliveryBoy = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const {id} = useParams();

    const [deliveryBoyObj, setCategoryObj] = useState({
        id: 0,
        name: "",
        father_name: "",
        sex: "",
        mobile_no: "",
        whatsappNumber: "",
        aadhar_number: "",
        pan_number: "",
        email: ""
    });

    const [errorDeliveryBoyObj, setErrorDeliveryBoyObj] = useState({
        name: "",
        father_name: "",
        mobile_no: "",
        whatsappNumber: "",
        email: ""
    });

    const navigate = useNavigate();
    const [pinCodeArray, setPincode] = useState([])

    useEffect(() => {
        getPinCode();
        if(id !== undefined){
            getDeliveryBoyDetails(id);
        }

    }, []);


    function getPinCode(){
        axiosInstance.post('/getPinCode', {})
        .then((response) => {
            setIsLoading(false);
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

    const deliveryBoyValidation = () => {
        let validationFlag = true;
        if(deliveryBoyObj.name ==="" ){
            validationFlag = false;
            setErrorDeliveryBoyObj(prevState => ({
                ...prevState,
                name: "This Field is Required"
            }))
        }else{
            setErrorDeliveryBoyObj(prevState => ({
                ...prevState,
                name: ""
            }))
        }
        
        if(deliveryBoyObj.father_name ==="" ){
            validationFlag = false;
            setErrorDeliveryBoyObj(prevState => ({
                ...prevState,
                father_name: "This Field is Required"
            }))
        }else{
            setErrorDeliveryBoyObj(prevState => ({
                ...prevState,
                father_name: ""
            }))
        }
        
        if(deliveryBoyObj.mobile_no ==="" ){
            validationFlag = false;
            setErrorDeliveryBoyObj(prevState => ({
                ...prevState,
                mobile_no: "This Field is Required"
            }))
        }else{
            setErrorDeliveryBoyObj(prevState => ({
                ...prevState,
                mobile_no: ""
            }))
        }
        
        if(deliveryBoyObj.whatsappNumber ==="" ){
            validationFlag = false;
            setErrorDeliveryBoyObj(prevState => ({
                ...prevState,
                whatsappNumber: "This Field is Required"
            }))
        }else{
            setErrorDeliveryBoyObj(prevState => ({
                ...prevState,
                whatsappNumber: ""
            }))
        }
        
        if(deliveryBoyObj.email ==="" ){
            validationFlag = false;
            setErrorDeliveryBoyObj(prevState => ({
                ...prevState,
                email: "This Field is Required"
            }))
        }else{
            setErrorDeliveryBoyObj(prevState => ({
                ...prevState,
                email: ""
            }))
        }
        
        if(deliveryBoyObj.email !=="" ){
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!regex.test(deliveryBoyObj.email)){
                validationFlag = false;
                setErrorDeliveryBoyObj(prevState => ({
                    ...prevState,
                    email: "Invalid email address"
                }))
            }else{
                setErrorDeliveryBoyObj(prevState => ({
                    ...prevState,
                    email: ""
                }))
            }
        }
        return validationFlag
    }

    const addDeliveryBoyFn = () => {
        if(deliveryBoyValidation()){
            setIsLoading(true);
            //let data = {};
            axiosInstance.post('/deliveryBoyDataSave', deliveryBoyObj)
            .then((response) => {
                setIsLoading(false);
                alert(response.data['successMessage']);
                navigate("../admin/delivery_person/");
            }).catch((error) => {
                console.log(error);
                setIsLoading(false);
            })
        }
    }
    
   /* const onSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        //let data = {};
        axiosInstance.post('/deliveryBoyDataSave', deliveryBoyObj)
        .then((response) => {
            setIsLoading(false);
            alert("Save Successfully");
            navigate("../admin/delivery_person/");
        }).catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    };*/

    return (
        <>
            <div className='addNewAddress' style={{padding: '10px'}}>
                
                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="name.ControlInput1">Name: <span className='requiredfield'> *</span></label>
                        <input 
                            type="text" 
                            name='name'
                            id="name.ControlInput1" 
                            className="form-control"
                            defaultValue={deliveryBoyObj.name}
                            onBlur={(e) => { 
                                if(e.target.value !==""){
                                    setCategoryObj(prevState => ({
                                        ...prevState,
                                        name: e.target.value
                                    }))

                                    setErrorDeliveryBoyObj(prevState => ({
                                        ...prevState,
                                        name: ""
                                    }))
                                }else{
                                    setErrorDeliveryBoyObj(prevState => ({
                                        ...prevState,
                                        name: "This Field is Required"
                                    }))
                                }
                            }}
                        />
                        {
                            errorDeliveryBoyObj.name !=="" ?<label className='error'>{errorDeliveryBoyObj.name}</label>: ""
                        }
                    </div>

                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="name.ControlInput1">Email Address: <span className='requiredfield'> *</span></label>
                        <input 
                            type="text" 
                            name='email'
                            id="email.ControlInput1" 
                            className="form-control"
                            defaultValue={deliveryBoyObj.email}
                            onBlur={(e) => { 
                                let email = e.target.value
                                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                if(email !=="" && regex.test(email)){
                                    setCategoryObj(prevState => ({
                                        ...prevState,
                                        email: e.target.value
                                    }))

                                    setErrorDeliveryBoyObj(prevState => ({
                                        ...prevState,
                                        email: ""
                                    }))
                                }else{
                                    setErrorDeliveryBoyObj(prevState => ({
                                        ...prevState,
                                        email: "This Field is Required"
                                    }))
                                }
                            }}
                        />
                        {
                            errorDeliveryBoyObj.email !=="" ?<label className='error'>{errorDeliveryBoyObj.email}</label>: ""
                        }
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
                                if(e.target.value !== ""){
                                    setCategoryObj(prevState => ({
                                        ...prevState,
                                        father_name: e.target.value
                                    }))
                                    setErrorDeliveryBoyObj(prevState => ({
                                        ...prevState,
                                        father_name: ""
                                    }))
                                }else{
                                    setErrorDeliveryBoyObj(prevState => ({
                                        ...prevState,
                                        father_name: "This Field is Required"
                                    }))
                                }
                            }}
                        />
                        {
                            errorDeliveryBoyObj.father_name !=="" ?<label className='error'>{errorDeliveryBoyObj.father_name}</label>: ""
                        }
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
                                if(e.target.value !== ""){
                                    setCategoryObj(prevState => ({
                                        ...prevState,
                                        mobile_no: e.target.value
                                    }))

                                    setErrorDeliveryBoyObj(prevState => ({
                                        ...prevState,
                                        mobile_no: ""
                                    }))
                                }else{
                                    setErrorDeliveryBoyObj(prevState => ({
                                        ...prevState,
                                        mobile_no: "This Field is Required"
                                    }))
                                }
                            }}
                        />
                        {
                            errorDeliveryBoyObj.mobile_no !=="" ?<label className='error'>{errorDeliveryBoyObj.mobile_no}</label>: ""
                        }
                    </div>

                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="whatsappNumber.ControlInput1">Whatsapp No: <span className='requiredfield'> *</span></label>
                        <input 
                            type="text" 
                            name='whatsappNumber'whatsappNumber
                            id="whatsappNumber.ControlInput1" 
                            className="form-control"
                            defaultValue={deliveryBoyObj.whatsappNumber}
                            onBlur={(e) => { 
                                if(e.target.value !== ""){
                                    setCategoryObj(prevState => ({
                                        ...prevState,
                                        whatsappNumber: e.target.value
                                    }))

                                    setErrorDeliveryBoyObj(prevState => ({
                                        ...prevState,
                                        whatsappNumber: ""
                                    }))
                                }else{
                                    setErrorDeliveryBoyObj(prevState => ({
                                        ...prevState,
                                        whatsappNumber: "This Field is Required"
                                    }))
                                }
                            }}
                        />
                        {
                            errorDeliveryBoyObj.whatsappNumber !=="" ?<label className='error'>{errorDeliveryBoyObj.whatsappNumber}</label>: ""
                        }
                    </div>

                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="aadhar_number.ControlInput1">Aadhar No:</label>
                        <input 
                            type="text" 
                            name='aadhar_number'
                            id="aadhar_number.ControlInput1" 
                            className="form-control"
                            defaultValue={deliveryBoyObj.aadhar_number}
                            onBlur={(e) => { 
                                setCategoryObj(prevState => ({
                                    ...prevState,
                                    aadhar_number: e.target.value
                                }))
                            }}
                        />
                    </div>

                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="pan_number.ControlInput1">Pan No:</label>
                        <input 
                            type="text" 
                            name='pan_number'
                            id="pan_number.ControlInput1" 
                            className="form-control"
                            defaultValue={deliveryBoyObj.pan_number}
                            onBlur={(e) => { 
                                setCategoryObj(prevState => ({
                                    ...prevState,
                                    pan_number: e.target.value
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
                        <button type="submit" className="signupButton btn btn-primary" onClick={(e) => { 
        addDeliveryBoyFn();
      }}    >Save Address</button>
                    </div>
                
            </div>
        </>
    )
}

export default AddDeliveryBoy