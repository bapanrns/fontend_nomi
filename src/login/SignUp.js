import React, {  useEffect, useState } from 'react'
import {Form } from 'react-bootstrap';
import Joi from 'joi';
import Loader from '../components/Loader'
import global from "../components/global";
import axios from "axios";
// Notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 
const SignUp = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {

    }, []);

    const schema = Joi.object({
        email_address: Joi.string().required().messages({
            'string.empty': 'Email address is required'
          }),
        mobile_no: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required().messages({
            'string.pattern.base': 'Please enter a valid phone number',
            'string.empty': 'Phone number is required'
          }),
        firstName: Joi.string().required().messages({
            'string.empty': 'First name is required'
          }),
        password: Joi.string().required().messages({
            'string.empty': 'Password is required'
        }),
       // password_confirmation: Joi.ref('password')
       password_confirmation: Joi.any()
        .valid(Joi.ref('password'))
        .required()
        .label('Confirm Password')
        .messages({
            'any.only': 'Passwords do not match',
            'any.required': 'Please confirm your password',
        }),
    });

    const [formData, setFormData] = useState({
        email_address: '',
        mobile_no: '',
        firstName: '',
        password: '',
        password_confirmation: ''
    });

    const [signUpData, setsignUpData] = useState({
        firstName: '',
        lastName: '',
        email_address: '',
        mobile_no: '',
        password: '',
        password_confirmation: '',
        whatsappNumber: "",
        gender: "female"
    });
      
    const [errors, setErrors] = useState({});   
    
    const signUp = () => {
        const validation = schema.validate(formData, { abortEarly: false });
        if (validation.error) {
            const validationErrors = {};
            for (let item of validation.error.details) {
                validationErrors[item.path[0]] = item.message;
            }
            setErrors(validationErrors);
        } else {
            const validationErrors = {};
            setErrors(validationErrors);

            setIsLoading(true);
            const headers = {
                'Content-Type': 'application/json'
            }
            
            axios.post(global["axios_url"]+'/saveUserRecord', signUpData, {
                headers: headers
            })
            .then((response) => {
                setIsLoading(false);
                if(response.data.succ === 1){
                    toast.success(response.data.message, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    props.modalHide();
                }else{
                    toast.error(response.data.message, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error("Error creating user. Please try again", {
                    position: toast.POSITION.TOP_CENTER,
                });
                setIsLoading(false);
            })
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        if(!["lastName", "whatsappNumber", "gender"].includes(name)){
            setFormData((prevState) => ({
            ...prevState,
            [name]: value,
            }));
        }

        setsignUpData((prevState) => ({
            ...prevState,
            [name]: value,
          }));
    };
 
    let myStyle = {
        display: "block",
        backgroundColor: "#cccc"
    };

    return (
     <>
        {isLoading ? <Loader /> : ""}
        <div role="dialog" aria-modal="true" className="fade modal show" style={myStyle}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header modalHeader">
                        <div className="modal-title h4">Sign Up Free</div>
                        <button type="button" className="btn-close closeBtn"  aria-label="Close" onClick={props.modalHide}></button>
                    </div>
                    <div className="modal-body" style={{paddingBottom: 0}}>
                        
                            <div className="mb-3 formValidation">
                                 <label className="form-label" htmlFor="firstName.ControlInput1">First Name: <span className='requiredfield'> *</span></label>
                                <input 
                                    type="text" 
                                    name='firstName'
                                    id="firstName.ControlInput1" 
                                    className="form-control" 
                                    onChange={handleChange}
                                    />
                                    {errors.firstName && <span className="error">{errors.firstName}</span>}
                            </div>
                            
                            <div className="mb-3 formValidation">
                                 <label className="form-label" htmlFor="firstName.ControlInput1">Last Name: </label>
                                <input 
                                    placeholder="" 
                                    type="text" 
                                    name='lastName'
                                    id="lastName.ControlInput1" 
                                    className="form-control" 
                                    onChange={handleChange}
                                    />
                            </div>
                            <div className="mb-3 formValidation">
                                <label className="form-label" htmlFor="exampleForm.ControlInput1">Email address: <span className='requiredfield'> *</span></label>
                                <input 
                                    placeholder="name@example.com" 
                                    type="email" 
                                    name='email_address'
                                    id="exampleForm.ControlInput1" 
                                    className="form-control" 
                                    onChange={handleChange}
                                    />
                                   {errors.email_address && <span className="error">{errors.email_address}</span>}
                            </div>
                            <div className="mb-3 formValidation">
                                <Form.Label style={{marginRight: 20}}>Gender: </Form.Label> 
                                <Form.Check
                                    inline
                                    label="Male"
                                    name="gender"
                                    type="radio"
                                    id="male"
                                    value="male"
                                    onChange={handleChange}
                                />
                                <Form.Check
                                    inline
                                    label="Female"
                                    name="gender"
                                    type="radio"
                                    id="female"
                                    value="female"
                                    defaultChecked 
                                    onChange={handleChange}
                                /> 
                            </div>
                            <div className="mb-3 formValidation">
                                 <label className="form-label" htmlFor="firstName.ControlInput1">Mobile number: <span className='requiredfield'> *</span></label>
                                <input 
                                    type="text" 
                                    name='mobile_no'
                                    id="mobile_no.ControlInput1" 
                                    className="form-control" 
                                    onChange={handleChange}
                                    />
                                    {errors.mobile_no && <span className="error">{errors.mobile_no}</span>}
                            </div>
                            <div className="mb-3 formValidation">
                                 <label className="form-label" htmlFor="firstName.ControlInput1">Whatsapp Number: </label>
                                <input 
                                    type="text" 
                                    name='whatsappNumber'
                                    id="whatsappNumber.ControlInput1" 
                                    className="form-control" 
                                    onChange={handleChange}
                                    />
                            </div>
                            <div className="mb-3 formValidation">
                                <label className="form-label" htmlFor="exampleForm.ControlInput2">Password: <span className='requiredfield'> *</span></label>
                                <input 
                                    placeholder="********" 
                                    type="password" 
                                    name='password'
                                    id="exampleForm.ControlInput2" 
                                    className="form-control" 
                                    onChange={handleChange}
                                />
                                {errors.password && <span className="error">{errors.password}</span>}
                            </div>
                            <div className="mb-3 formValidation">
                                <label className="form-label" htmlFor="exampleForm.ControlInputc">Confirm password: </label>
                                <input 
                                    placeholder="********" 
                                    type="password" 
                                    name='password_confirmation'
                                    id="exampleForm.ControlInputc" 
                                    className="form-control" 
                                    onChange={handleChange}
                                />
                                {errors.password_confirmation && <span className="error">{errors.password_confirmation}</span>}
                            </div>
                            <div className="mb-3">
                                <button type="button" className="signupButton btn btn-primary" onClick={signUp}>Sign Up</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
     </>
    )
 // }
}

export default SignUp
