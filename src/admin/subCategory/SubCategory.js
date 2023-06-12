import React, { useCallback, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import ActionCellRenderer from './ActionCellRenderer'

import axios from "axios";


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

const SubCategories = () => {
    const [rowData, setRowData] = useState([]);

    // {category_name: "", active_status: "", id: 1}
    function getCategoryData(){
        
        const headers = {
            'Content-Type': 'application/json'
        }
        
        let data = {};
        axios.post('http://localhost:8081/api/AllSubCategory', data, {
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
        { field: 'sub_category_name', headerName: "Category" },
        { field: 'sub_category_name', headerName: "Sub Category" },
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

export default SubCategories