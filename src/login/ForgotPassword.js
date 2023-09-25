import React, { Component } from 'react'
import ReactFormInputValidation from "react-form-input-validation";

import '../components/css/profile.css';

import Loader from '../components/Loader'
import global from "../components/global";
import axiosInstance from '../components/axiosInstance';
// Notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.getOTP = this.getOTP.bind(this);
        this.state = {
            email: "",
            resendOtp: "",
            myStyle: {
                display: "block"
            },
            fields: {
                name: "",
                email: "",
                phone_number: ""
            },
            errors: {}
        }

        this.form = new ReactFormInputValidation(this);
        this.form.useRules({
            name: "required",
            email: "required|email",
            phone_number: "required|numeric|digits_between:10,12",
        });
        this.form.onformsubmit = (fields) => {
            console.log(this.state.errors)
            if(Object.keys(this.state.errors).length === 0){
                this.getOTP()
            }
        }


    }

    // OTP Request
    getOTP = () => {
        if(Object.keys(this.state.errors).length === 0){
            axiosInstance.post('/forgotPassword', {email: this.state.fields.email})
            .then((response) => {
                if(response.data.messageStatus === 0){
                    toast.success(response.data.message, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    localStorage.setItem("forgotEmail", this.state.fields.email);
                    this.setState({resendOtp: 'Resend OTP'});
                    this.props.modalHide();
                    this.props.openNewPassword()
                }else{
                    toast.error(response.data.message, {
                        position: toast.POSITION.TOP_CENTER,
                    }); 
                }
            })
            .catch((error) => {
                console.log('Error:', error);
            });
        }
    }

    // Resend OTP 
    resendOTP = () => {
       // console.log("resendOTP");
    }
    


    render() {
    return (
        <div>
            <div role="dialog" aria-modal="true" className="fade modal show" style={this.state.myStyle}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header modalHeader">
                            <div className="modal-title h4">Forgot Password</div>
                            <button type="button" className="btn-close closeBtn" aria-label="Close" onClick={this.props.modalHide}></button>
                        </div>
                        <div className="modal-body" style={{paddingBottom: 0}}>
                            <form onSubmit={this.form.handleSubmit}>
                                <div className="mb-3 formValidation">
                                    <label className="form-label" htmlFor="exampleForm.ControlInput1">Email address</label>
                                        <input 
                                        placeholder="name@example.com" 
                                        type="email" 
                                        name="email"
                                        id="exampleForm.ControlInput1" 
                                        className="form-control" 
                                        onBlur={this.form.handleBlurEvent}
                                        onChange={this.form.handleChangeEvent}
                                        value={this.state.fields.email}
                                        />
                                    {this.state.errors.email ? <label className="error"> {this.state.errors.email} </label> : ""}
                                </div>
                                <div className="mb-3">
                                    <div className='resendOTP' onClick={this.resendOTP}> &nbsp; {this.state.resendOtp}</div>
                                    <button type="submit" className="loginButton btn btn-primary">GET OTP {this.state.newPasswordModal}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default ForgotPassword
