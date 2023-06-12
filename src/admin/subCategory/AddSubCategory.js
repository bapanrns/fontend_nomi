import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

import {
    useParams,
    useNavigate
  } from "react-router-dom";

const AddSubCategory = () => {
    
    const [categoryObj, setCategoryObj] = useState([]);
    async function getCategory(){
        const headers = {
            'Content-Type': 'application/json'
        }
        
        let data = {};
        await axios.post('http://localhost:8081/api/AllCategory', data, {
            headers: headers
        })
        .then((response) => {
            if(response.data.length > 0){
                setCategoryObj(response.data)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    const {id} = useParams();
    useEffect(() => {
        getCategory();

        if(id !== undefined){
            getSubCategoryById(id);
        }

    }, []);

    const [editData, setEditData] = useState({
        id: "",
        category_id: "",
        sub_category_name: "",
        active_status: ""
    });

    // Edit section
    async function getSubCategoryById(id){
        const headers = {
            'Content-Type': 'application/json'
        }
        let data = {};
        data["id"] = id;
        await axios.post('http://localhost:8081/api/SubCategoryFindId', data, {
            headers: headers
        })
        .then((response) => {
            console.log(response.data);
          //  if(response.data.length > 0){
                setEditData(response.data);

                setSubCategoryObj({
                    id: response.data.id,
                    category_id: response.data.category_id,
                    subCategory: response.data.sub_category_name,
                    status: response.data.active_status,
                });

            //}
           // console.log(editData);
        })
        .catch((error) => {
            console.log(error)
        })
    }
    
    // Edit section

    const [subCategoryObj, setSubCategoryObj] = useState({
        id: 0,
        category_id: "",
        subCategory: "",
        status: ""
    });
    
    const navigate = useNavigate();

    const handalChange = (e) =>{
        setSubCategoryObj({...subCategoryObj, [e.target.name]:e.target.value})
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const headers = {
            'Content-Type': 'application/json'
        }
        axios.post('http://localhost:8081/api/subCategoryAdd', subCategoryObj, {
            headers: headers
        })
        .then((response) => {
            alert(response.data);
            //console.log(JSON.parse(JSON.stringify(response)))
            navigate("../admin/sub_category/");
        })
        .catch((error) => {
            console.log(error)
            alert(error);
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
                        <label className="form-label" htmlFor="customer_name.ControlInput1">Category: <span className='requiredfield'> *</span></label>
                        <select
                            defaultValue={editData.category_id}
                            className='form-select'
                            id="category_id"
                            name="category_id"
                            onChange={handalChange}
                        >
                            <option value="">Select Category</option>
                            {
                               categoryObj.length > 0  &&
                               categoryObj.map((data, index)=>{
                                    return (<option key={index} selected={editData.category_id === data.id?"selected":""} value={data.id} >{data.category_name}</option>);
                               })

                            }
                        </select>
                    </div>

                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="buyPrice.ControlInput1">Sub Category Name: <span className='requiredfield'> *</span></label>
                        <input 
                            type="text" 
                            name='subCategory'
                            id="subCategory.ControlInput1" 
                            className="form-control"
                            defaultValue={editData.sub_category_name}
                            onChange={handalChange}
                        />
                    </div>
                    
                    <div className="mb-3 formValidation">
                        <label className="form-label" htmlFor="customer_name.ControlInput1">Category Status: <span className='requiredfield'> *</span></label>
                        <select
                            defaultValue={editData.active_status}
                            className='form-select'
                            id="active_status"
                            name="status"
                            onChange={handalChange}
                        >
                            <option value="1" selected={editData.active_status === 1?"selected":""}>Active</option>
                            <option value="0" selected={editData.active_status === 0?"selected":""}>Inactive</option>
                        </select>
                    </div>

                    <div className="mb-3 formValidation">
                        <button type="submit" className="signupButton btn btn-primary">{editData.sub_category_name === ""?"Save":"Update"} Address</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddSubCategory