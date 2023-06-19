import React, { useCallback, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import ActionCellRenderer from './ActionCellRenderer'

import axios from "axios";
import Loader from '../../components/Loader';
import global from "../../components/global";


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
    const [isLoading, setIsLoading] = useState(false);
    // {category_name: "", active_status: "", id: 1}
    function getCategoryData(category_id = ""){
        setIsLoading(true);
        const headers = {
            'Content-Type': 'application/json'
        }
        
        let data = {category_id: category_id};
        axios.post(global["axios_url"]+'/AllSubCategory', data, {
            headers: headers
        })
        .then((response) => {
            setRowData(response.data)
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false);
        })

        console.log(rowData);
    }


    const onGridReady = useCallback((params) => {
          getCategoryData();
          getCategory();
    }, []);

    
    
    const [columnDefs] = useState([
        {
            field: 'id',
            minWidth: 50,
            checkboxSelection: checkboxSelection,
            headerCheckboxSelection: headerCheckboxSelection,
        },
        { field: 'category_name', headerName: "Category" },
        { field: 'sub_category_name', headerName: "Sub Category" },
        { field: 'active_status', headerName: "Status", cellRenderer: StatusCellRenderer },
        { field: 'id', headerName: "Action", cellRenderer: ActionCellRenderer }
    ])

    // For category
    const [categoryObj, setCategoryObj] = useState([]);
    async function getCategory(){
        setIsLoading(true);
        const headers = {
            'Content-Type': 'application/json'
        }
        
        let data = {};
        await axios.post(global["axios_url"]+'/AllCategory', data, {
            headers: headers
        })
        .then((response) => {
            if(response.data.length > 0){
                setCategoryObj(response.data)
            }
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false);
        })
    }

    const handalChange = (e) =>{
        getCategoryData(e.target.value)
    }

    return (
        <>
            {isLoading ? <Loader /> : ""}
            <div style={{textAlign: 'center', fontWeight: "bold"}}>Sub Category</div>
            <table style={{marginBottom: '10px'}}>
                <tbody>
                    <tr>
                        <td>
                            <select
                                className='form-select'
                                id="category_id"
                                name="category_id"
                                onChange={handalChange}
                            >
                                <option value="">All Category</option>
                                {
                                    categoryObj.length > 0  &&
                                    categoryObj.map((data, index)=>{
                                        return (<option key={index} value={data.id} >{data.category_name}</option>);
                                    })

                                }
                                
                            </select>
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
        </>
    );
}

export default SubCategories