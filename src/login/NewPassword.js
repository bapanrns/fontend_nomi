import React, { Component } from 'react'
import ReactFormInputValidation from "react-form-input-validation";

export class NewPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            modalStyle: {
                display: "block"
            }
        }

        this.state = {
            fields: {
                password: "",
                confirmPassword: ""
            },
            errors: {}
        };

        this.form = new ReactFormInputValidation(this);
        this.form.useRules({
            password: "required",
            confirmPassword: "required"
        });
        this.form.onformsubmit = (fields) => {
            console.log(fields)
            if(fields.password === fields.confirmPassword){
                if(Object.keys(this.state.errors).length === 0){
                /* this.getOTP()
                    this.setState ( {
                        NewPassword: true
                    } );*/
                }
            }else{
                this.setState({
                    errors: {
                        confirmPassword: "Password and confirm password does not match"
                    }
                })
            }
        }
    }

    render() {
        return (
            <>
                <div role="dialog" aria-modal="true" className="fade modal show" style={{display: "block"}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header modalHeader">
                                <div className="modal-title h4">Password Update</div>
                                <button type="button" className="btn-close closeBtn" aria-label="Close" onClick={this.props.modalHide}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.form.handleSubmit}>
                                    <div className="mb-3 formValidation">
                                        <label className="form-label" htmlFor="password">Password</label>
                                            <input 
                                            type="password" 
                                            name="password"
                                            id="password" 
                                            className="form-control" 
                                            onBlur={this.form.handleBlurEvent}
                                            onChange={this.form.handleChangeEvent}
                                            value={this.state.fields.password}
                                            />
                                        {this.state.errors.password ? <label className="error"> {this.state.errors.password} </label> : ""}
                                    </div>
                                    <div className="mb-3 formValidation">
                                        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                                            <input 
                                            type="password" 
                                            name="confirmPassword"
                                            id="confirmPassword" 
                                            className="form-control" 
                                            onBlur={this.form.handleBlurEvent}
                                            onChange={this.form.handleChangeEvent}
                                            value={this.state.fields.confirmPassword}
                                            />
                                        {this.state.errors.confirmPassword ? <label className="error"> {this.state.errors.confirmPassword} </label> : ""}
                                    </div>
                                    <div className="mb-3">
                                        
                                        <button type="submit" className="loginButton btn btn-primary">Update Password</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default NewPassword
