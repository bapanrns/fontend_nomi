import React, {  useEffect } from 'react'
import {Form } from 'react-bootstrap';
import { Lang, useFormInputValidation } from "react-form-input-validation";
import { useNavigate } from "react-router-dom";


const SignUp = (e) => {
  
    /* Form Validation start */

    const [fields, errors, form] = useFormInputValidation(
        {
            firstName: "",
            email_address: "",
            mobile_no: "",
            password: "",
            password_confirmation: ""
        },
        {
            firstName: "required",
            email_address: "required|email",
            mobile_no: "required",
            password: "required|confirmed",
            password_confirmation: "required|same:password"
        }
      );
    
      useEffect(() => {
       /* form.registerAsync("username_available", function (
          username,
          attribute,
          req,
          passes
        ) {
          setTimeout(() => {
            if (username === "foo")
              passes(false, "Username has already been taken.");
            // if username is not available
            else passes();
          }, 1000);
        });*/
      }, []);
    
        form.useLang(Lang.en);
        const navigate = useNavigate();
        const onSubmit = async (event) => {
        const isValid = await form.validate(event);

        if (isValid) {
            console.log("MAKE AN API CALL", fields, errors);
            localStorage.setItem("login", true);
            navigate("/profiledetails/1");
            e.modalHide();
            window.location.reload(false);
        }
    };
    
      useEffect(() => {
        /*if (form.isValidForm) {
          console.log("MAKE AN API CALL ==> useEffect", fields, errors, form);
        }*/
      }, []);
 

    /* Form Validation end */

    let myStyle = {
        display: "block",
        backgroundColor: "#cccc"
    };

    return (
     <>
        <div role="dialog" aria-modal="true" className="fade modal show" style={myStyle}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header modalHeader">
                        <div className="modal-title h4">Sign Up Free</div>
                        <button type="button" className="btn-close closeBtn"  aria-label="Close" onClick={e.modalHide}></button>
                    </div>
                    <div className="modal-body" style={{paddingBottom: 0}}>
                        <form 
                        className="myForm"
                        noValidate
                        autoComplete="off"
                        onSubmit={onSubmit}>
                            <div className="mb-3 formValidation">
                                 <label className="form-label" htmlFor="firstName.ControlInput1">First Name: <span className='requiredfield'> *</span></label>
                                <input 
                                    type="text" 
                                    name='firstName'
                                    id="firstName.ControlInput1" 
                                    className="form-control" 
                                    onBlur={form.handleBlurEvent}
                                    onChange={form.handleChangeEvent}
                                    value={fields.firstName}
                                    />
                                    {errors.firstName ? <label className="error"> {errors.firstName} </label> : ""}
                            </div>
                            
                            <div className="mb-3 formValidation">
                                 <label className="form-label" htmlFor="firstName.ControlInput1">Last Name: </label>
                                <input 
                                    placeholder="" 
                                    type="text" 
                                    name='lastName'
                                    id="lastName.ControlInput1" 
                                    className="form-control" 
                                    onBlur={form.handleBlurEvent}
                                    onChange={form.handleChangeEvent}
                                    value={fields.lastName}
                                    />
                                    {errors.lastName ? <label className="error"> {errors.lastName} </label> : ""}
                            </div>
                            <div className="mb-3 formValidation">
                                <label className="form-label" htmlFor="exampleForm.ControlInput1">Email address: <span className='requiredfield'> *</span></label>
                                <input 
                                    placeholder="name@example.com" 
                                    type="email" 
                                    name='email_address'
                                    id="exampleForm.ControlInput1" 
                                    className="form-control" 
                                    onBlur={form.handleBlurEvent}
                                    onChange={form.handleChangeEvent}
                                    value={fields.email_address}
                                    />
                                    {errors.email_address ? <label className="error"> {errors.email_address} </label> : ""}
                                    
                            </div>
                            <div className="mb-3 formValidation">
                                <Form.Label style={{marginRight: 20}}>Gender: </Form.Label> 
                                <Form.Check
                                    inline
                                    label="Male"
                                    name="group1"
                                    type="radio"
                                    id="male"
                                    value="male"
                                />
                                <Form.Check
                                    inline
                                    label="Female"
                                    name="group1"
                                    type="radio"
                                    id="female"
                                    value="female"
                                    defaultChecked 
                                /> 
                            </div>
                            <div className="mb-3 formValidation">
                                 <label className="form-label" htmlFor="firstName.ControlInput1">Mobile number: <span className='requiredfield'> *</span></label>
                                <input 
                                    type="text" 
                                    name='mobile_no'
                                    id="mobile_no.ControlInput1" 
                                    className="form-control" 
                                    onBlur={form.handleBlurEvent}
                                    onChange={form.handleChangeEvent}
                                    value={fields.mobile_no}
                                    />
                                    {errors.mobile_no ? <label className="error"> {errors.mobile_no} </label> : ""}
                            </div>
                            <div className="mb-3 formValidation">
                                 <label className="form-label" htmlFor="firstName.ControlInput1">Whatsapp Number: </label>
                                <input 
                                    type="text" 
                                    name='whatsappNumber'
                                    id="whatsappNumber.ControlInput1" 
                                    className="form-control" 
                                    onBlur={form.handleBlurEvent}
                                    onChange={form.handleChangeEvent}
                                    value={fields.whatsappNumber}
                                    />
                                    {errors.whatsappNumber ? <label className="error"> {errors.whatsappNumber} </label> : ""}
                            </div>
                            <div className="mb-3 formValidation">
                                <label className="form-label" htmlFor="exampleForm.ControlInput2">Password: <span className='requiredfield'> *</span></label>
                                <input 
                                    placeholder="********" 
                                    type="password" 
                                    name='password'
                                    id="exampleForm.ControlInput2" 
                                    className="form-control" 
                                    onBlur={form.handleBlurEvent}
                                    onChange={form.handleChangeEvent}
                                    value={fields.password}
                                />
                                {errors.password ? <label className="error"> {errors.password} </label> : ""}
                            </div>
                            <div className="mb-3 formValidation">
                                <label className="form-label" htmlFor="exampleForm.ControlInputc">Confirm password: </label>
                                <input 
                                    placeholder="********" 
                                    type="password" 
                                    name='password_confirmation'
                                    id="exampleForm.ControlInputc" 
                                    className="form-control" 
                                    onBlur={form.handleBlurEvent}
                                    onChange={form.handleChangeEvent}
                                    value={fields.password_confirmation}
                                />
                                {errors.password_confirmation ? <label className="error"> {errors.password_confirmation} </label> : ""}
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="signupButton btn btn-primary">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     </>
    )
 // }
}

export default SignUp
