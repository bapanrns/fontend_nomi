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

const Products = () => {
    const [rowData, setRowData] = useState([]);

    // {category_name: "", active_status: "", id: 1}
    function getProductData(){
        
        const headers = {
            'Content-Type': 'application/json'
        }
        
        let data = {};
        axios.post('http://localhost:8081/api/AllProduct', data, {
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
          getProductData();
    }, []);
    
    const [columnDefs] = useState([
        {
            field: 'id',
            width: 30,
            checkboxSelection: checkboxSelection,
            headerCheckboxSelection: headerCheckboxSelection,
        },
        { field: 'category_id', headerName: "Category" },
        { field: 'sub_category_id', headerName: "Sub Category" },
        { field: 'no_of_product', headerName: "Total Quantity", width: 130 },
        { field: 'quantity_xs', headerName: "Size XS", width: 100 },
        { field: 'quantity_s', headerName: "Size S", width: 100 },
        { field: 'quantity_l', headerName: "Size L", width: 100 },
        { field: 'quantity_m', headerName: "Size M", width: 100 },
        { field: 'quantity_xl', headerName: "Size XL", width: 100 },
        { field: 'quantity_2xl', headerName: "Size 2XL", width: 100 },
        { field: 'active_status', headerName: "Status", cellRenderer: StatusCellRenderer, width: 100 },
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

export default Products