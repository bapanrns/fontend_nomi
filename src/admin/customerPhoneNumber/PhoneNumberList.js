import React, { useCallback, useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Loader from '../../components/Loader'
import Select from 'react-select';
import axiosInstance from '../../components/axiosInstance';

const checkboxSelection = function (params) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
};
  
const headerCheckboxSelection = function (params) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
};

const PhoneNumberList = () => {
    const [rowData, setRowData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [colourOptions, setColourOptions] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(0);


    let jsonData = {}
    if (localStorage.hasOwnProperty('ioc')) {
        const encodedData = localStorage.getItem('ioc');
        jsonData = JSON.parse(window.atob(encodedData));
    }

    useEffect(() => {
        getNewNumberData();
    }, [selectedUserId])
    // {category_name: "", active_status: "", id: 1}
    function getNewNumberData(){
        setIsLoading(true);
        
        axiosInstance.post('/allPhoneNumber', {user_id: jsonData.user_id, user_type: jsonData.user_type, selectedUserId: selectedUserId})
        .then((response) => {
            setRowData(response.data);
            setIsLoading(false);
        })
    }

    function getDeliveryBoyData() {
        setIsLoading(true);
        
        axiosInstance.get('/alldeliveryBoy', {})
        .then((response) => {
            setIsLoading(false);
            let DeliveryOboyArray = [];
            response.data.forEach((obj, key) => { // Changed map to forEach
                let innerHash = {
                    value: obj.user_id,
                    label: obj.name + " " + obj.mobile_no
                };
                DeliveryOboyArray.push(innerHash);
            });
            setColourOptions(DeliveryOboyArray); // Assign DeliveryOboyArray to state
        })
        .catch((error) => {
            setIsLoading(false);
            console.error("Error fetching delivery boy data:", error);
            // Handle error
        });
    }
    
    const onGridReady = useCallback(() => {
        if(jsonData.user_type === "Admin"){
            getDeliveryBoyData();
        }
        getNewNumberData();
    }, []);

    const adminColDef = [
        {
            field: 'checkBox',
            headerName: "",
            minWidth: 40,
            checkboxSelection: checkboxSelection,
            headerCheckboxSelection: headerCheckboxSelection,
            width: 40
        },
        { field: 'id', headerName: "Id", width: 50, hide: true },
        { field: 'mobile_no', headerName: "Mobile No", width: 120 },
        { field: 'name', headerName: "Name", width: 250 },
        { field: 'add_date', headerName: "Add Date", width: 190 },
        { field: 'is_whatsapp', headerName: "Is Whatsapp No.", width: 200 },
        { field: 'last_message_date', headerName: "Last Message Date", width: 190 },
       // { field: 'id', headerName: "Action", cellRenderer: ActionCellRenderer, width: 450 }
    ]

    const deliveryBoyColDef = [
        {
            field: 'checkBox',
            headerName: "",
            minWidth: 50,
            checkboxSelection: checkboxSelection,
            headerCheckboxSelection: headerCheckboxSelection,
            width: 40
        },
        { field: 'id', headerName: "Id", width: 50, hide: true },
        { field: 'mobile_no', headerName: "Mobile No", width: 120 },
        { field: 'name', headerName: "Name", width: 250 },
        { field: 'add_date', headerName: "Add Date", width: 190 }
    ]

    const colDef = (jsonData.user_type === "Admin")?adminColDef:deliveryBoyColDef;
    
    const [columnDefs] = useState(colDef);

    const handalChange = (event) => {
        console.log(event);
        setSelectedUserId(event.value);
    }

    return (
        <>
            {isLoading ? <Loader /> : ""}
            <div style={{textAlign: 'center', fontWeight: "bold"}}>New Customer Phone Number</div>
            { (jsonData.user_type === "Admin") &&
                <div className="col-md-12" style={{float: "left"}}>
                    <div className="col-md-3" style={{float: "left", marginBottom: '10px'}}>
                        <Select
                            defaultValue={[]}
                        /*  isMulti*/
                            name="colors"
                            options={colourOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handalChange}
                        />
                    </div>
                </div>
            }
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

export default PhoneNumberList