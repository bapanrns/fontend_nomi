import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

import global from "../components/global";
// Notification
import { toast } from 'react-toastify';
import Joi from 'joi';

import axiosInstance from '../components/axiosInstance';


const MyModal = (props) => {
    const [isLoading, setIsLoading] = useState(false);
//class MyModal extends Component {
  console.log(props);
    const { show, onClose, returnItemId, returnOrderItemId } = props;

    const [saveData, setSaveData] = useState({
        order_item_id: 0,
        order_id: 0,
        reason_for_cancellation: global["reasonsForCancellation"]["1"],
        bank_name: "",
        ifsc_code: "",
        account_number: "",
        caccount_number: ""
    });


    const handalChange = (e) =>{
        if(e.target.name !=="reason_for_cancellation"){
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
        console.log(e.target.name, e.target.value);
        setSaveData({
            ...saveData,
            [e.target.name]: e.target.value,
        });
        if(saveData['order_item_id'] === 0){
            setSaveData({
                ...saveData,
                ["order_item_id"]: returnItemId,
                ["order_id"]: returnOrderItemId
            });
        }
    }

    const AcceptNumericValue = e => {
        var key = e.key;
        var regex = /[0-9]|\./;
        if( !regex.test(key) ) {
            e.preventDefault();
        }
    }


    
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        bank_name: '',
        ifsc_code: '',
        account_number: '',
        caccount_number: ''
    });

    const schema = Joi.object({
        bank_name: Joi.string().required().messages({
            'string.empty': 'Bank name is required'
        }),
        ifsc_code: Joi.string().required().messages({
            'string.empty': 'Bank IFSC is required'
        }),
        account_number: Joi.number().required(),
        caccount_number: Joi.number()
        .valid(Joi.ref('account_number'))
        .required()
        .label('Confirm Account Number')
        .messages({
            'any.only': 'Account Number do not match',
            'any.required': 'Please confirm your Account Number',
        }),
    });

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
            const confirmed = window.confirm('Are you sure you want to return this item?');
            if (confirmed) {
                setIsLoading(true);
                axiosInstance.post('/returnOrderItem', saveData)
                .then((response) => {
                    setIsLoading(false);
                    toast.success('Return placed successfully.', {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    props.onClose(true);
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
                })
            }
        }
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton className='modalHeader'>
                <Modal.Title>Return Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <>
                    <div className="col-md-12" style={{float: 'left', paddingRight: '10px'}}>
                        <label className="form-label" htmlFor="reason_for_cancellation">Reasons For Cancellation: <span className='requiredfield'> *</span></label>
                        <select
                            className='form-select'
                            id="reason_for_cancellation"
                            name="reason_for_cancellation"
                            onChange={handalChange}
                        >
                            {
                            Object.keys(global["reasonsForCancellation"]).map((key) => (
                                <>
                                    <option value={key}>{global["reasonsForCancellation"][key]}</option>
                                </>
                            ))
                            }
                           
                        </select>
                        {errors.reason_for_cancellation ? <label className="error"> {errors.reason_for_cancellation} </label> : ""}
                    </div>

                    <div className="col-md-12" style={{float: 'left', paddingRight: '10px'}}>
                        <label className="form-label" htmlFor="category_id.bank_name">Bank Name: <span className='requiredfield'> *</span></label>
                        <input 
                            type="text" 
                            name='bank_name'
                            id="bank_name" 
                            className="form-control"
                            onChange={handalChange}
                        />
                        {errors.bank_name ? <label className="error"> {errors.bank_name} </label> : ""}
                    </div>

                    <div className="col-md-12" style={{float: 'left', paddingRight: '10px'}}>
                        <label className="form-label" htmlFor="category_id.ifsc_code">IFSC Code: <span className='requiredfield'> *</span></label>
                        <input 
                            type="text" 
                            name='ifsc_code'
                            id="ifsc_code" 
                            className="form-control"
                            onChange={handalChange}
                        />
                        {errors.ifsc_code ? <label className="error"> {errors.ifsc_code} </label> : ""}
                    </div>

                    <div className="col-md-12" style={{float: 'left', paddingRight: '10px'}}>
                        <label className="form-label" htmlFor="category_id.account_number">Account Number: <span className='requiredfield'> *</span></label>
                        <input 
                            type="password" 
                            name='account_number'
                            id="account_number" 
                            className="form-control"
                            onChange={handalChange}
                            onKeyPress={(e) => AcceptNumericValue(e)}
                        />
                        {errors.account_number ? <label className="error"> {errors.account_number} </label> : ""}
                    </div>

                    <div className="col-md-12" style={{float: 'left', paddingRight: '10px'}}>
                        <label className="form-label" htmlFor="category_id.caccount_number">Confirm Account Number: <span className='requiredfield'> *</span></label>
                        <input 
                            type="text" 
                            name='caccount_number'
                            id="caccount_number" 
                            className="form-control"
                            onChange={handalChange}
                            onKeyPress={(e) => AcceptNumericValue(e)}
                        />
                        {errors.caccount_number ? <label className="error"> {errors.caccount_number} </label> : ""}
                    </div>
                    <div className="mb-3 formValidation">
                        <button type="button" onClick={onSubmit} className="signupButton btn btn-primary">Save Address</button>
                    </div>
                    
                </>
            </Modal.Body>
        </Modal>
    );
}

export default MyModal;
