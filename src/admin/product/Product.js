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
    const [gridApi, setGridApi] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [rowData, setRowData] = useState([]);

    const onSelectionChanged = () => {
        const selectedRows = gridApi.getSelectedRows();
        const ids = selectedRows.map(row => row.id);
        setSelectedIds(ids);
        console.log("selectedIds", selectedIds);
    };

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
        setGridApi(params.api);
        getProductData();
    }, []);
    
    const [columnDefs] = useState([
        {
            field: 'id',
            width: 30,
            checkboxSelection: checkboxSelection,
            headerCheckboxSelection: headerCheckboxSelection,
        },
        { field: 'category_id', headerName: "Category", width: 150 },
        { field: 'sub_category_id', headerName: "Sub Category", width: 150 },
        { field: 'active_status', headerName: "Status", cellRenderer: StatusCellRenderer, width: 100 },
        { field: 'color', headerName: "Color", width: 150 },
        { field: 'no_of_product', headerName: "Total Quantity", width: 130 },
        { field: 'quantity_xs', headerName: "Size XS", width: 90 },
        { field: 'quantity_s', headerName: "S", width: 90 },
        { field: 'quantity_l', headerName: "L", width: 90 },
        { field: 'quantity_m', headerName: "M", width: 90 },
        { field: 'quantity_xl', headerName: "XL", width: 90 },
        { field: 'quantity_2xl', headerName: "2XL", width: 90 },
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
                onSelectionChanged={onSelectionChanged}
                >
                    
            </AgGridReact>
        </div>
    );
}

export default Products