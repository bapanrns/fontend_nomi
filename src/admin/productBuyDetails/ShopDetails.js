import React, { useCallback, useState } from 'react'
//import {Container, Row, Col, Image, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import ActionCellRenderer from './ShopActionCellRenderer';
//import global from "../../components/global";
import Loader from '../../components/Loader'
import axiosInstance from '../../components/axiosInstance';

//import axios from "axios";

const checkboxSelection = function (params) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
};
  
const headerCheckboxSelection = function (params) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
};

const StatusCellRenderer = (p) =>{
    let status = <span >{p.value}</span>;
    if (p.value < 0)
        status = <span style={{color: "red"}}>{p.value}</span>;

    return <span>{status}</span>;
}

const ShopDetails = () => {
    const [rowData, setRowData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // {category_name: "", active_status: "", id: 1}
    function getShopData(){
        setIsLoading(true);
        /*const headers = {
            'Content-Type': 'application/json'
        }*/
        
        let data = {};
        axiosInstance.post('/allShop', data)
        /*axios.post(global["axios_url"]+'/allShop', data, {
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


    const onGridReady = useCallback((params) => {
          getShopData();
    }, []);

    
    
    const [columnDefs] = useState([
        {
            field: 'id',
            width: 90,
            checkboxSelection: checkboxSelection,
            headerCheckboxSelection: headerCheckboxSelection,
        },
        { field: 'shop_name', headerName: "Shope Name", width: 150 },
        { field: 'shop_phone_no', headerName: "Phone Number", width: 130 },
        { field: 'shop_whatsapp_no', headerName: "Whatsapp Number", width: 150 },
        { field: 'calling_time', headerName: "Calling Time", width: 150 },
        { field: 'address', headerName: "Address" },
        { field: 'buy_price', headerName: "Buy Amount", width: 150, sortable: true},
        { field: 'payment_amount', headerName: "Payment Amount", width: 150, sortable: true},
        { field: 'due', headerName: "Due", cellRenderer: StatusCellRenderer, width: 100, sortable: true},
        { field: 'id', headerName: "Action", cellRenderer: ActionCellRenderer }
    ])

   
    return (
        <>
            {isLoading ? <Loader /> : ""}
            <div style={{textAlign: 'center', fontWeight: "bold"}}>Shop Details</div>
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
        </>
    );
}

export default ShopDetails