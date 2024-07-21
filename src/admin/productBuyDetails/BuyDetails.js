import React, { useCallback, useState } from 'react'
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import ActionCellRenderer from './BuyProductActionCellRenderer';
import global from "../../components/global";
import Loader from '../../components/Loader'
import axiosInstance from '../../components/axiosInstance';


import axios from "axios";

const checkboxSelection = function (params) {
    if (!params.columnApi) {
        return false;
    }
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
};
  
const headerCheckboxSelection = function (params) {
    if (!params.columnApi) {
        return false;
    }
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
};

const ShopDetails = () => {
    const [rowData, setRowData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [ editData, setEditData] = useState({
        shop_id: "",
        transition_type: ""
    });

    const handalChange = (e) =>{
        setEditData({...editData, [e.target.name]: e.target.value});
    }

    function productSearch(){
        getShopData();
    }

    function getShopData(){
        setIsLoading(true);
        /*const headers = {
            'Content-Type': 'application/json'
        }*/
        axiosInstance.post('/allBuyProduct', editData)
        /*axios.post(global["axios_url"]+'/allBuyProduct', editData, {
            headers: headers
        })*/
        .then((response) => {
            setRowData(response.data);
            setIsLoading(false);
           // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    function deleteG(){
        alert();
    }


    const onGridReady = useCallback((params) => {
            getShopData();
            getShopList();
    }, []);

    function ImageRenderer(value){
        if(value.data.bill !==""){
            return (<img 
                //src={require("../../images/bill/"+value.data.bill)} 
                src={`${global.billImageUrl}${value.data.bill}`}
                alt="No bill to show" 
                style={{ height: '90px', width: '100%', cursor: 'pointer' }} 
                onClick={(e) => { 
                    setImageLink(value.data.bill);
                    handleShowModal(true);
                }}
            />);
        }
    }
    
    const [columnDefs] = useState([
        {
            field: 'id',
            width: 50,
            checkboxSelection: checkboxSelection,
            headerCheckboxSelection: headerCheckboxSelection,
        },
        { field: 'shop_name', headerName: "Shope Name", minWidth: 250, sortable: true },
        { field: 'buy_price', headerName: "Buy Price", width: 100, sortable: true },
        { field: 'discount_amount', headerName: "Discount Amount", width: 150, sortable: true },
        { field: 'transport_amount', headerName: "Transport Amount", width: 150, sortable: true },
        { field: 'no_of_product', headerName: "No fo Products", width: 150, sortable: true },
        { field: 'transition_type', headerName: "Transition Type", width: 150, sortable: true },
        { field: 'transition_date', headerName: "Transition Date", width: 150, sortable: true },
        { field: 'bill', headerName: "Bill", cellRendererFramework: ImageRenderer },
        { field: 'id', headerName: "Action", cellRenderer: ActionCellRenderer }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [imageLink, setImageLink] = useState();

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const [shopList, getShops] = useState([]);

    const getShopList = async () => {
        setIsLoading(true);
        /*const headers = {
            'Content-Type': 'application/json'
        }*/
        
        let data = {};
        axiosInstance.post('/allShopList', data)
        /*axios.post(global["axios_url"]+'/allShopList', data, {
            headers: headers
        })*/
        .then((response) => {
            setIsLoading(false);
            getShops(response.data)
           // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    

    return (
        <>
            {isLoading ? <Loader /> : ""}
            <div style={{textAlign: 'center', fontWeight: "bold"}}>Buy Details</div>
            <table style={{marginBottom: '10px'}}>
                    <tbody>
                        <tr>
                            <td>
                                <select
                                    className='form-select'
                                    id="shop_id"
                                    name="shop_id"
                                    onChange={handalChange}
                                >
                                    <option value="">Select Shope</option>
                                    {
                                        shopList.length > 0  &&
                                        shopList.map((data, index)=>{
                                            return (<option key={index} value={data.id} >{data.shop_name}</option>);
                                        })

                                    }
                                    
                                </select>
                            </td>
                            <td style={{width: "10px"}}></td>
                            <td>
                                <select
                                    className='form-select'
                                    id="transition_type"
                                    name="transition_type"
                                    onChange={handalChange}
                                >
                                    <option value="">Select Transition</option>
                                    <option value="Buy">Buy</option>
                                    <option value="Payment">Payment</option>
                                </select>
                            </td>
                            <td style={{width: "10px"}}></td>
                            <td>
                                <button className='btn btn-info' onClick={productSearch}>Search</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
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

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Bill</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                    imageLink &&
                    (<img 
                        //src={require("../../images/bill/"+imageLink)} 
                        src={`${global.billImageUrl}${imageLink}`}
                        alt="No bill to show" 
                        style={{ height: '100%', width: '100%' }} 
                    />)}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ShopDetails