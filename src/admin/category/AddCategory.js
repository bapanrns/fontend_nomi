import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

import {
    useParams
  } from "react-router-dom";

const AddCategory = () => {
    const [editData, setEditData] = useState({
        name: "",
        status: 1
    });
    const {id} = useParams();
    // Edit section
    if(id !== undefined){
        const headers = {
            'Content-Type': 'application/json'
        }
        let data = {};
        data["id"] = id;
        axios.post('http://localhost:8081/api/categoryFindId', data, {
            headers: headers
        })
        .then((response) => {
            console.log(response.data.length);
            /*setEditData({
                name: response.data.category_name,
                status: response.data.active_status
            })*/
        })
        .catch((error) => {
            console.log(error)
        })
    }
    

    const [categoryObj, setCategoryObj] = useState({
        name: "",
        status: 0
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        const headers = {
            'Content-Type': 'application/json'
        }
        console.log(categoryObj);
        let data = {};
        data["name"] = categoryObj.name
        data["status"] = categoryObj.status
        axios.post('http://localhost:8081/api/categoryAdd', data, {
            headers: headers
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error)
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
                        <label className="form-label" htmlFor="buyPrice.ControlInput1">Category Name: <span className='requiredfield'> *</span></label>
                        <input 
                            type="text" 
                            name='buyPrice'
                            id="buyPrice.ControlInput1" 
                            className="form-control"
                            onBlur={(e) => { 
                                console.log(e.target.value);
                                setCategoryObj(prevState => ({
                                    ...prevState,
                                    ['name']: e.target.value
                                }))
                            }}
                        />
                    </div>
                    
                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="customer_name.ControlInput1">Category Status: <span className='requiredfield'> *</span></label>
                        <select
                            className='form-select'
                            id="pickup_place"
                            name="pickup_place"
                            onChange={(e) => { 
                                console.log(e.target.value);
                                setCategoryObj(prevState => ({
                                    ...prevState,
                                    ['status']: e.target.value
                                }))
                            }}
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>

                    <div className="mb-3 formValidation">
                        <button type="submit" className="signupButton btn btn-primary">Save Address</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddCategory