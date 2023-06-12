import React, { useCallback, useState } from 'react'
import {Container, Row, Col, Image, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import ActionCellRenderer from './ActionCellRenderer'

import axios from "axios";

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

const StatusCellRenderer = (p) =>{
    let status = <span >Active</span>;
    if (p.value === 0)
        status = <span style={{color: "red"}}>Inactive</span>;

    return <span>{status}</span>;
}
/*
const ActionCellRenderer = (p) => {
    const btn = <>
        <span>Edit</span>
        <span>Delete</span>
    </>
    return btn;
}*/

const Categories = () => {
    const [rowData, setRowData] = useState([]);

    // {category_name: "", active_status: "", id: 1}
    function getCategoryData(){
        
        const headers = {
            'Content-Type': 'application/json'
        }
        
        let data = {};
        axios.post('http://localhost:8081/api/AllCategory', data, {
            headers: headers
        })
        .then((response) => {
            setRowData(response.data)
           // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
        })

        console.log(rowData);
    }


    const onGridReady = useCallback((params) => {
          getCategoryData();
    }, []);

    
    
    const [columnDefs] = useState([
        {
            field: 'id',
            minWidth: 50,
            checkboxSelection: checkboxSelection,
            headerCheckboxSelection: headerCheckboxSelection,
        },
        { field: 'category_name', headerName: "Category" },
        { field: 'active_status', headerName: "Status", cellRenderer: StatusCellRenderer },
        { field: 'id', headerName: "Action", cellRenderer: ActionCellRenderer }
    ])

    return (
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
    );
}

export default Categories