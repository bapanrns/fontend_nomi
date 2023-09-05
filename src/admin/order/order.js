import React, { useCallback, useState } from 'react'
import {Container, Row, Col, Image, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import ActionCellRenderer from './ActionCellRenderer';
import global from "../../components/global";
import Loader from '../../components/Loader'


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
    function getCategoryData(){
        setIsLoading(true);
        
        axiosInstance.post('/allOrderDetails', {})
        .then((response) => {
            setRowData(response.data);
            setIsLoading(false);
        })
    }


    const onGridReady = useCallback(() => {
        getCategoryData();
    }, []);

    
    
    const [columnDefs] = useState([
        {
            field: 'id',
            minWidth: 50,
            checkboxSelection: checkboxSelection,
            headerCheckboxSelection: headerCheckboxSelection,
             width: 100
        },
        { field: 'total_amount', headerName: "Total amount", width: 120 },
        { field: 'delivery_pincode', headerName: "delivery pincode", width: 150 }
    ]);

    return (
        <>
            {isLoading ? <Loader /> : ""}
            <div style={{textAlign: 'center', fontWeight: "bold"}}>Order Details</div>
            
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
        </>
    );
}

export default Order