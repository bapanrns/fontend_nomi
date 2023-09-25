import React, { useCallback, useState } from 'react'
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import ActionCellRenderer from './ActionCellRenderer';
import global from "../../components/global";
import Loader from '../../components/Loader'
import { ToastContainer, toast } from 'react-toastify';


import axiosInstance from '../../components/axiosInstance';

import {
    useNavigate,
    useParams
  } from "react-router-dom";

const checkboxSelection = function (params) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
};
  
const headerCheckboxSelection = function (params) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
};

const Order = () => {
    const [rowData, setRowData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // {category_name: "", active_status: "", id: 1}
    function getOrderData(){
        setIsLoading(true);
        
        axiosInstance.post('/allOrderDetails', searchObj)
        .then((response) => {
            setRowData(response.data);
            setIsLoading(false);
        })
    }


    const onGridReady = useCallback(() => {
        getOrderData();
        getPinCode();
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [imageLink, setImageLink] = useState();

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    
    function ImageRenderer(value){
        if(value.data.product_image !==""){
            return (<img 
                //src={require("../../images/bill/"+value.data.bill)} 
                src={`${global.productImageUrl}${value.data.product_image}`}
                alt="No Image" 
                style={{ height: '90px', width: '100%', cursor: 'pointer' }} 
                onClick={(e) => { 
                    setImageLink(value.data.product_image);
                    handleShowModal(true);
                }}
            />);
        }
    }
    
    const [columnDefs] = useState([
        {
            field: 'id',
            minWidth: 50,
            checkboxSelection: checkboxSelection,
            headerCheckboxSelection: headerCheckboxSelection,
            width: 90
        },
        { field: 'product_image', headerName: "Image", width: 120, cellRendererFramework: ImageRenderer },
        { field: 'pId', headerName: "P ID.", width: 100 },
        { field: 'orderId', headerName: "Order ID", width: 120 },
        { field: 'orderItemId', headerName: "Order Item Id", width: 120 },
        { field: 'quantity', headerName: "Quantity", width: 100 },
        { field: 'size', headerName: "Size", width: 80 },
        { field: 'delivery_pincode', headerName: "Delivery Pincode", width: 150 },
        { field: 'order_status', headerName: "Order Status", width: 150 },
        { field: 'price', headerName: "Total amount", width: 120 },
        { field: 'total_amount', headerName: "Total Amount", width: 150 },
        { field: 'orderId', headerName: "Action", cellRenderer: ActionCellRenderer, width: 450 }
    ]);

    const [pinCodeArray, setPincode] = useState([]);

    function getPinCode(){
        setIsLoading(true);
        axiosInstance.post('/getPinCode', {})
        .then((response) => {
            setIsLoading(false); 
            setPincode(response.data.pinCodes);
        })
        .catch((error) => {
            toast.warn(error.data.message, {
                position: toast.POSITION.TOP_CENTER,
            });
            setIsLoading(false);
        })
    }

    const [searchObj, setSerchObj] = useState({
        status: "",
        pincode: ""
    });

    const handalChange = (e) =>{
        setSerchObj({...searchObj, [e.target.name]:e.target.value})
    }

    const findOrderDetails=()=>{
        getOrderData();
    }

    return (
        <>
            {isLoading ? <Loader /> : ""}
            <div style={{textAlign: 'center', fontWeight: "bold"}}>Order Status</div>

            <table style={{marginBottom: '10px'}}>
                    <tbody>
                        <tr>
                            <td>
                                <select
                                    className='form-select'
                                    id="status"
                                    name="status"
                                    onChange={handalChange}
                                >
                                    <option value="">Select Status</option>
                                    <option value="Reject">Reject</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Confirm">Confirm</option>
                                    <option value="On the way">On the way</option>
                                    <option value="Complete">Complete</option>
                                    <option value="Return">Return</option>
                                    
                                </select>
                            </td>
                            <td style={{width: "10px"}}></td>
                            <td>
                                <select
                                    className='form-select'
                                    id="pincode"
                                    name="pincode"
                                    onChange={handalChange}
                                    >
                                    <option value="">Select Pincode</option>
                                    {
                                        pinCodeArray.length > 0  &&
                                        pinCodeArray.map((pinCode, index)=>{
                                            return (
                                                <option value={pinCode}>{pinCode}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            
                            <td style={{width: "10px"}}></td>
                            <td><button className='btn btn-info' onClick={findOrderDetails}>Search</button></td>
                            <td style={{width: "10px"}}></td>
                            
                        </tr>
                    </tbody>
                </table>
            
            <div className="col-md-12" style={{float: "left"}}>
                <div className="ag-theme-alpine" style={{height: 600}}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        pagination={true}
                        rowSelection={'multiple'}
                        onGridReady={onGridReady}
                        >
                            
                    </AgGridReact>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                    imageLink &&
                    (<img 
                        //src={require("../../images/bill/"+imageLink)} 
                        src={`${global.productImageUrl}${imageLink}`}
                        alt="No bill to show" 
                        style={{ height: '100%', width: '100%' }} 
                    />)}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Order