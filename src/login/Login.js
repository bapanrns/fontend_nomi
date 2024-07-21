import React, { useState } from 'react'
import { Lang, useFormInputValidation } from "react-form-input-validation";

import Loader from '../components/Loader'
import global from "../components/global";
import axios from "axios";
// Notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axiosInstance from '../components/axiosInstance';



//export class Index extends Component {
const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false);
    /* Form Validation start */

    const [fields, errors, form] = useFormInputValidation(
        {
         
          email_address: "",
          password: ""
        },
        {
          //email_address: "required|email",
          email_address: "required",
          password: "required"
        }
      );
    
      form.useLang(Lang.en);

      const onSubmit = async (event) => {
        const isValid = await form.validate(event);

        if (isValid) {
            //loginUser()
          console.log("MAKE AN API CALL", fields, errors);

          setIsLoading(true);
          const headers = {
              'Content-Type': 'application/json'
          }
          
          axios.post(global["axios_url"]+'/loginUser', fields, {
            headers: headers
          })
          .then((response) => {
            setIsLoading(false);
            //console.log(response.data.token);
            localStorage.setItem("login", true);
            let responseData = response.data;
            const jsonData = JSON.stringify(responseData);
            // Encode the JSON string using Base64
            const encodedData = window.btoa(jsonData);
            localStorage.setItem("ioc", encodedData);

            let cartArray = JSON.parse(localStorage.getItem('cart')) || [];
            if(cartArray.length > 0){
              saveCartDataWhenLogin(cartArray);
            }
            const mergedArray = cartArray.concat(responseData.product_ids);
            
            localStorage.setItem('cart', JSON.stringify(Array.from(new Set(mergedArray))));

            toast.success("Login successfully", {
              position: toast.POSITION.TOP_CENTER,
            });
            props.modalHide();
            if(cartArray.length === 0){
              window.location.reload();
            }
          })
          .catch((error) => {
            //console.log(error);
            toast.error("User not found. Please Register", {
                position: toast.POSITION.TOP_CENTER,
            });
            setIsLoading(false);
          })
        }
      };

    // Before login cat data to be insert
    const saveCartDataWhenLogin = (cartArray) =>{
      let data = {product_ids: cartArray};
      axiosInstance.post('/saveCartDataWhenLogin', data)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
          console.log('Error:', error);
      });
    }
    
    /* Form Validation end */
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
                        <div className="modal-title h4">Login to continue</div>
                        <button type="button" className="btn-close closeBtn" aria-label="Close" onClick={props.modalHide}></button>
                    </div>
                    <div className="modal-body" style={{paddingBottom: 0}}>
                        <form 
                            className="myForm"
                            noValidate
                            autoComplete="off"
                            onSubmit={onSubmit}>
                            <div className="mb-3 formValidation">
                                <label className="form-label" htmlFor="exampleForm.ControlInput1">Email address</label>
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
                                <label className="form-label" htmlFor="exampleForm.ControlInput2">Password</label>
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
                            <div className="mb-3">
                                <button type="submit" className="loginButton btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                    <div className="forgotPassword" onClick={props.forgotPassword} style={{cursor: 'pointer', margin: '0px auto'}}>Forgot Password</div>
                     | <div className="forgotPassword" onClick={props.signUp} style={{cursor: 'pointer', margin: '0px auto'}}>New costomer?    <b></b>Register</div>
                    </div>
                </div>
            </div>
        </div>
      </>
    )
   // }
}

export default Login
