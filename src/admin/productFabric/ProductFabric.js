import React, { useCallback, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import ActionCellRenderer from './ActionCellRenderer'

import axios from "axios";
import Loader from '../../components/Loader'
import global from "../../components/global";


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

const StatusCellRenderer = (p) =>{
    let status = <span >Active</span>;
    if (p.value === 0)
        status = <span style={{color: "red"}}>Inactive</span>;

    return <span>{status}</span>;
}

const SubCategories = () => {
    const [rowData, setRowData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // {category_name: "", active_status: "", id: 1}
    function getCategoryData(){
        setIsLoading(true);
        const headers = {
            'Content-Type': 'application/json'
        }
        
        let data = {};
        axios.post(global["axios_url"]+'/AllProductFabric', data, {
            headers: headers
        })
        .then((response) => {
            setRowData(response.data);
            setIsLoading(false);
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
        { field: 'product_fabric_name', headerName: "Product Fabric" },
        { field: 'active_status', headerName: "Status", cellRenderer: StatusCellRenderer },
        { field: 'id', headerName: "Action", cellRenderer: ActionCellRenderer }
    ])

    return (
        <>
            {isLoading ? <Loader /> : ""}
            <div className="ag-theme-alpine" style={{height: 600}}>
                <h3 style={{textAlign: 'center'}}>Product Fabric</h3>
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

export default SubCategories