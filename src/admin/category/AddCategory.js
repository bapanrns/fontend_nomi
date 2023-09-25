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

const AddCategory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [editData, setEditData] = useState({
        name: "",
        status: 1
    });
    const {id} = useParams();

    useEffect(() => {

        if(id !== undefined){
            getCategory(id);
        }

    }, []);
    // Edit section
    function getCategory(id){
       /* const headers = {
            'Content-Type': 'application/json'
        }
        let data = {};
        data["id"] = id;
        axios.post('http://localhost:8081/api/categoryFindId', data, {
            headers: headers
        })
        .then((response) => {
            console.log(response.data.id);
            setCategoryObj({...categoryObj, 
                id: response.data.id,
                category_name: response.data.category_name, 
                active_status: response.data.active_status
            });
        })
        .catch((error) => {
            console.log(error)
        })*/




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
            setCategoryObj({...categoryObj, 
                id: response.data.id,
                category_name: response.data.category_name, 
                active_status: response.data.active_status
            });
        }).catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

    const [categoryObj, setCategoryObj] = useState({
        id: 0,
        category_name: "",
        active_status: 0
    });

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        /*const headers = {
            'Content-Type': 'application/json'
        }
        console.log(categoryObj);
        axios.post('http://localhost:8081/api/categoryAdd', categoryObj, {
            headers: headers
        })
        .then((response) => {
            alert(response.data);
            navigate("../admin/Category/");
        })
        .catch((error) => {
            console.log(error)
        })
        */

        setIsLoading(true);
        /*const headers = {
            'Content-Type': 'application/json'
        }*/
        
        let data = {};
        axiosInstance.post('/categoryAdd', categoryObj)
        /*axios.post(global["axios_url"]+'/categoryAdd', categoryObj, {
            headers: headers
        })*/
        .then((response) => {
            //console.log(response.data);
            setIsLoading(false);
            alert("Save Successfully");
            navigate("../admin/Category/");
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
                        <label className="form-label" htmlFor="category_name.ControlInput1">Category Name: <span className='requiredfield'> *</span></label>
                        <input 
                            type="text" 
                            name='category_name'
                            id="category_name.ControlInput1" 
                            className="form-control"
                            defaultValue={categoryObj.category_name}
                            onBlur={(e) => { 
                                console.log(e.target.value);
                                setCategoryObj(prevState => ({
                                    ...prevState,
                                    ['category_name']: e.target.value
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
                                setCategoryObj(prevState => ({
                                    ...prevState,
                                    ['active_status']: e.target.value
                                }))
                            }}
                            value={categoryObj.active_status}
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