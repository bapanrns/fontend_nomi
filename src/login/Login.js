import React, { useEffect } from 'react'
import { Lang, useFormInputValidation } from "react-form-input-validation";
import { useNavigate } from "react-router-dom";


//export class Index extends Component {
const Login = (e) => {

    /* Form Validation start */

    const [fields, errors, form] = useFormInputValidation(
        {
         
          email_address: "",
          password: ""
        },
        {
          email_address: "required|email",
          password: "required"
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

      const onSubmit = async (event) => {
        const isValid = await form.validate(event);

        if (isValid) {
            loginUser()
          console.log("MAKE AN API CALL", fields, errors);
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
    const navigate = useNavigate();
    function loginUser(){
        localStorage.setItem("login", true);
        navigate("/");
        e.modalHide();
        window.location.reload(false);
    }
        
    return (
      <>
        <div role="dialog" aria-modal="true" className="fade modal show" style={myStyle}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header modalHeader">
                        <div className="modal-title h4">Login to continue</div>
                        <button type="button" className="btn-close closeBtn" aria-label="Close" onClick={e.modalHide}></button>
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
                    <div className="forgotPassword" onClick={e.forgotPassword} style={{cursor: 'pointer', margin: '0px auto'}}>Forgot Password</div>
                     | <div className="forgotPassword" onClick={e.signUp} style={{cursor: 'pointer', margin: '0px auto'}}>New costomer?    <b></b>Register</div>
                    </div>
                </div>
            </div>
        </div>
      </>
    )
   // }
}

export default Login
