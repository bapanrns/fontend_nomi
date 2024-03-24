import React, { useCallback, useState } from 'react'
//import {Container, Row, Col, Image, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

//import ActionCellRenderer from './ActionCellRenderer';
//import global from "../../components/global";
import Loader from '../../components/Loader';
import axiosInstance from '../../components/axiosInstance';


//import axios from "axios";
/*
import {
    useNavigate,
    useParams
  } from "react-router-dom";*/

const checkboxSelection = function (params) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
};
  
const headerCheckboxSelection = function (params) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
};

/*const StatusCellRenderer = (p) =>{
    let status = <span >Active</span>;
    if (p.value === 0)
        status = <span style={{color: "red"}}>Inactive</span>;

    return <span>{status}</span>;
}*/

const UserList = () => {
    const [rowData, setRowData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // {category_name: "", active_status: "", id: 1}
    function getUserData(){
        setIsLoading(true);
        
        let data = {};
        axiosInstance.post('/userList', data)
        .then((response) => {
            setRowData(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error)
        })

        console.log(rowData);
    }


    const onGridReady = useCallback((params) => {
          getUserData();
    }, []);

    
    
    const [columnDefs] = useState([
        {
            field: 'id',
            minWidth: 50,
            checkboxSelection: checkboxSelection,
            headerCheckboxSelection: headerCheckboxSelection,
            width: 90
        },
        { field: 'name', headerName: "Name" },
        { field: 'email', headerName: "Email" },
        { field: 'phone', headerName: "Phone", width: 120 },
        { field: 'whatsapp', headerName: "Whatsapp", width: 120 },
        { field: 'gender', headerName: "Gender", width: 90 },
        { field: 'createdAt', headerName: "Created At" },
       // { field: 'id', headerName: "Action", cellRenderer: ActionCellRenderer }
    ])

    return (
        <>
            {isLoading ? <Loader /> : ""}
            <div style={{textAlign: 'center', fontWeight: "bold"}}>User List</div>
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

export default UserList