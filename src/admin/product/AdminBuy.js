import React, { useCallback, useState } from 'react'
import {Container, Row, Col, Image, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import global from "../../components/global";
import Loader from '../../components/Loader'
// Notification
import { ToastContainer, toast } from 'react-toastify';


import axiosInstance from '../../components/axiosInstance';

import {
    useNavigate,
    useParams
  } from "react-router-dom";

const Categories = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [ProductObj, setProductObj] = useState({
        quantity: 0,
        quantity_buy_price: 0,
        quantity_selling_price: 0,
        quantityS: 0,
        quantityS_buy_price: 0,
        quantityS_selling_price: 0,
        quantityL: 0,
        quantityL_buy_price: 0,
        quantityL_selling_price: 0,
        quantityM: 0,
        quantityM_buy_price: 0,
        quantityM_selling_price: 0,
        quantityXl: 0,
        quantityXl_buy_price: 0,
        quantityXl_selling_price: 0,
        quantity2Xl: 0,
        quantity2Xl_buy_price: 0,
        quantity2Xl_selling_price: 0,
        quantity32: 0,
        quantity32_buy_price: 0,
        quantity32_selling_price: 0,
        quantity34: 0,
        quantity34_buy_price: 0,
        quantity34_selling_price: 0,
        quantity36: 0,
        quantity36_buy_price: 0,
        quantity36_selling_price: 0
    })
    const [pid, setPid] = useState(0);
    const [size, setSize] = useState("");
    const handalChange = (e) =>{
        if(e.target.name === "size"){
            setSize(e.target.value);
        }else{
            setPid(e.target.value);
        }
    }

    function getProductById(){

        if(pid > 0){
            setIsLoading(true);
            
            let data = {id: pid};
            axiosInstance.post('/ProductFindById', data)
            .then((response) => {
                setProductObj(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            })
        }
    }

    const saveCartData=()=>{
        setIsLoading(true);
        let data = {itemIds: pid, itemSize: size};
        axiosInstance.post('/saveCartData', data)
        .then((response) => {
            if(response.data.errorMessage !==""){
              // Items are not available.
              toast.warn(response.data.errorMessage, {
                position: toast.POSITION.TOP_CENTER,
              }); 
              setIsLoading(false);
            }else{
                toast.success('Item added to cart successfully.', {
                    position: toast.POSITION.TOP_CENTER,
                }); 
                continueToBuy();
            }
        })
        .catch((error) => {
            console.log('Error:', error);
        });
    }


    const continueToBuy =()=>{
        if(pid === 0){
            toast.warn('There are no items in the cart. Please add items to your cart.', {
                position: toast.POSITION.TOP_CENTER,
            });
        }else{

            let data = {deliveryAddress: "1-721648", items: [pid+"@"+size]};
            axiosInstance.post('/continueToBuy', data)
            .then((response) => {
                setIsLoading(false);
                if(parseInt(data.items.length) === parseInt(response.data.outOfStockItemArray.length)){
                    toast.warn('All items are out of stack.', {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }else{
                    toast.success('Order place successfully.', {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
            })
            .catch((error) => {
                console.log('Error:', error);
                setIsLoading(false);
            });
        }
    }


    return (
        <>
            {isLoading ? <Loader /> : ""}
            <div style={{padding: "20px"}}>
                <div style={{textAlign: 'center', fontWeight: "bold"}}>Product Buy</div>
                <div className="col-md-4"style={{float: 'left', paddingRight: '10px'}}>
                    <label className="form-label" htmlFor="p_id.ControlInput1">Product Id: </label>
                    <input 
                        type="text" 
                        name='p_id'
                        id="p_id.ControlInput1" 
                        className="form-control"
                        onChange={handalChange}
                    />
                </div>
                <div className="col-md-4"style={{float: 'left', paddingRight: '10px'}}>
                    <button className='btn btn-info' style={{marginTop: '30px'}} onClick={getProductById}>Search</button>
                </div>
                
                <div className="col-md-12">
                    <table className='table'>
                    <thead className='thead-dark'>
                        <tr>
                            <th scope="col">Size</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Buy Price</th>
                            <th scope="col">Sell Price</th>
                        </tr>
                    </thead>
                        <tbody>
                        <tr>
                            <td>Free Size</td>
                            <td>{ProductObj.quantity}</td>
                            <td>{ProductObj.quantity_buy_price}</td>
                            <td>{ProductObj.quantity_selling_price}</td>
                        </tr>
                        <tr>
                            <td>S</td>
                            <td>{ProductObj.quantityS}</td>
                            <td>{ProductObj.quantityS_buy_price}</td>
                            <td>{ProductObj.quantityS_selling_price}</td>
                        </tr>
                        <tr>
                            <td>L</td>
                            <td>{ProductObj.quantityL}</td>
                            <td>{ProductObj.quantityL_buy_price}</td>
                            <td>{ProductObj.quantityL_selling_price}</td>
                        </tr>
                        <tr>
                            <td>M</td>
                            <td>{ProductObj.quantityM}</td>
                            <td>{ProductObj.quantityM_buy_price}</td>
                            <td>{ProductObj.quantityM_selling_price}</td>
                        </tr>
                        <tr>
                            <td>XL</td>
                            <td>{ProductObj.quantityXl}</td>
                            <td>{ProductObj.quantityXl_buy_price}</td>
                            <td>{ProductObj.quantityXl_selling_price}</td>
                        </tr>
                        <tr>
                            <td>2XL</td>
                            <td>{ProductObj.quantity2Xl}</td>
                            <td>{ProductObj.quantity2Xl_buy_price}</td>
                            <td>{ProductObj.quantity2Xl_selling_price}</td>
                        </tr>
                        <tr>
                            <td>32</td>
                            <td>{ProductObj.quantity32}</td>
                            <td>{ProductObj.quantity32_buy_price}</td>
                            <td>{ProductObj.quantity32_selling_price}</td>
                        </tr>
                        <tr>
                            <td>34</td>
                            <td>{ProductObj.quantity34}</td>
                            <td>{ProductObj.quantity34_buy_price}</td>
                            <td>{ProductObj.quantity34_selling_price}</td>
                        </tr>
                        <tr>
                            <td>36</td>
                            <td>{ProductObj.quantity36}</td>
                            <td>{ProductObj.quantity36_buy_price}</td>
                            <td>{ProductObj.quantity36_selling_price}</td>
                        </tr>
                        </tbody>
                    </table>

                    <div className="col-md-4" style={{float: 'left', paddingRight: '10px'}}>
                        <label className="form-label" htmlFor="size.ControlInput1">Bill: <span className='requiredfield'> *</span></label>
                        <select
                            className='form-select'
                            id="size"
                            name="size"
                            onChange={handalChange}
                        >
                            <option value="">Free Size</option>
                            <option value="S">S</option>
                            <option value="L">L</option>
                            <option value="M">M</option>
                            <option value="Xl">XL</option>
                            <option value="2XL">2XL</option>
                        </select>
                    </div>
                    <div className="col-md-4"style={{float: 'left', paddingRight: '10px'}}>
                        <button className='btn btn-info' style={{marginTop: '30px'}} onClick={saveCartData}>BUY Item</button>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Categories