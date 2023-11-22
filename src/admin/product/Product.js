import React, { useCallback, useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import ActionCellRenderer from './ActionCellRenderer';
import Loader from '../../components/Loader';

import axios from "axios";
import global from "../../components/global";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import axiosInstance from '../../components/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';

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

const TooltipRenderer = ({ value }) => {
    return (
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>{value}</Tooltip>}
      >
        <div>{value}</div>
      </OverlayTrigger>
    );
  };

const Products = () => {
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
        /*const headers = {
            'Content-Type': 'application/json'
        }*/
        
        let data = searchObj;
        axiosInstance.post('/AllProduct', data)
       /* axios.post(global["axios_url"]+'/AllProduct', data, {
            headers: headers
        })*/
        .then((response) => {
            setRowData(response.data)
            setIsLoading(false);
           // console.log(response.data);
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false);
        })

        console.log(rowData);
    }

    
    const onGridReady = useCallback((params) => {
        setGridApi(params.api);
        getProductData();
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [imageLink, setImageLink] = useState();

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    
    function ImageRenderer(value){
        if(value.data.product_img !==""){
            return (<img 
                //src={require("../../images/bill/"+value.data.bill)} 
                src={`${global.productImageUrl}${value.data.product_img}`}
                alt="No Image" 
                style={{ height: '90px', width: '100%', cursor: 'pointer' }} 
                onClick={(e) => { 
                    setImageLink(value.data.product_img);
                    handleShowModal(true);
                }}
            />);
        }
    }

    const [columnDefs] = useState([
        {
            field: 'id',
            width: 30,
            checkboxSelection: checkboxSelection,
            headerCheckboxSelection: headerCheckboxSelection,
        },
        { field: 'id', headerName: "PID", width: 90 },
        { field: 'product_img', headerName: "Img", width: 150, cellRendererFramework: ImageRenderer },
        { field: 'youtube_link', headerName: "Video", width: 150},
        { field: 'category_id', headerName: "Category", width: 150, filter: 'agTextColumnFilter' },
        { field: 'sub_category_desc', headerName: "Sub Category", width: 150, filter: 'agTextColumnFilter' },
        { field: 'group_id', headerName: "Group Id", width: 90, editable: true, filter: 'agNumberColumnFilter' },
        { field: 'active_status', headerName: "Status", cellRenderer: StatusCellRenderer, width: 100 },
        { field: 'color', headerName: "Color", width: 150, cellRendererFramework: TooltipRenderer },
        { field: 'no_of_product', headerName: "Total Quantity", width: 125, cellRendererFramework: TooltipRenderer },
        { field: 'quantity', headerName: "Quantity [Q => B => S Price]", width: 190, cellRendererFramework: TooltipRenderer },
        { field: 'quantity_xs', headerName: "XS [Q => B => S Price]", width: 180, cellRendererFramework: TooltipRenderer },
        { field: 'quantity_s', headerName: "S", width: 150, cellRendererFramework: TooltipRenderer },
        { field: 'quantity_l', headerName: "L", width: 150, cellRendererFramework: TooltipRenderer },
        { field: 'quantity_m', headerName: "M", width: 150, cellRendererFramework: TooltipRenderer },
        { field: 'quantity_xl', headerName: "XL", width: 150, cellRendererFramework: TooltipRenderer },
        { field: 'quantity_2xl', headerName: "2XL", width: 150, cellRendererFramework: TooltipRenderer },
        { field: 'id', headerName: "Action", cellRenderer: ActionCellRenderer, width: 450 }
    ])

    function createGroupIdHandleClick(){
        if(selectedIds.length > 0){
            setIsLoading(true);
            console.log(selectedIds);
            /*const headers = {
                'Content-Type': 'application/json'
            }*/
            
            let data = {product_id: selectedIds};
            axiosInstance.post('/createGroupID', data)
            /*axios.post(global["axios_url"]+'/createGroupID', data, {
                headers: headers
            })*/
            .then((response) => {
                getProductData();
                alert(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error)
            })
        }else{
            alert("Please select at least one.");
        }
    }

    useEffect(() => {
        getCategory();
    }, []);
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

    // For Sub Category
    const [subCategoryObj, setSubCategoryObj] = useState([]);
    async function getSubCategory(id){
        setIsLoading(true);
        const headers = {
            'Content-Type': 'application/json'
        }
        
        let data = {id: id};
        await axios.post(global["axios_url"]+'/subCategoryFindCategoryId', data, {
            headers: headers
        })
        .then((response) => {
            if(response.data.length > 0){
                setSubCategoryObj(response.data)
                console.log(response.data)
            }
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }
    const [searchObj, setSerchObj] = useState({
        category_id: "",
        sub_category_id: "",
        active_status: ""
    });
    const handalChange = (e) =>{
        if (e.target.name === "category_id"){
            getSubCategory(e.target.value);
        }
        setSerchObj({...searchObj, [e.target.name]:e.target.value})
    }

    function productSearch(){
        getProductData();
    }

    const handleCellBlur = (event) => {
        // Your logic to handle the blur event here
        console.log('Cell blurred', event);
        console.log('Cell blurred', event.newValue, event.oldValue, event.data.id);
        if(event.newValue != event.oldValue){
            setIsLoading(true);
            axiosInstance.post('/UpdateGroupID', {product_id: event.data.id, group_id: event.newValue, sub_category_id: event.data.sub_category_id})
            .then((response) => {
                setIsLoading(false);
                if(response.data.msgFlag === "success"){
                    toast.success(response.data.message, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }else{
                    toast.warning(response.data.message, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
    };

    return (
        <div>
            {isLoading ? <Loader /> : ""}
            <div>
                <div style={{textAlign: 'center', fontWeight: "bold"}}>Products</div>
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
                                    <option value="">Select Category</option>
                                    {
                                        categoryObj.length > 0  &&
                                        categoryObj.map((data, index)=>{
                                            return (<option key={index} value={data.id} >{data.category_name}</option>);
                                        })

                                    }
                                    
                                </select>
                            </td>
                            <td style={{width: "10px"}}></td>
                            <td>
                                <select
                                    className='form-select'
                                    id="sub_category_id"
                                    name="sub_category_id"
                                    onChange={handalChange}
                                    >
                                    <option value="">Select Sub Category</option>
                                    {
                                        
                                        subCategoryObj.map((data, index)=>{
                                            return (<option key={index} value={data.id} >{data.sub_category_name}</option>);
                                        })

                                    }
                                    
                                </select>
                            </td>
                            <td style={{width: "10px"}}></td>
                            <td>
                                <select
                                    className='form-select'
                                    id="active_status"
                                    name="active_status"
                                    onChange={handalChange}
                                    >
                                    <option value="">Select Active Status</option>
                                    <option value="1">Active</option>
                                    <option value="0">In Active</option>
                                </select>
                            </td>
                            <td style={{width: "10px"}}></td>
                            <td><button className='btn btn-info' onClick={productSearch}>Search</button></td>
                            <td style={{width: "10px"}}></td>
                            <td>
                                <button className="btn btn-primary" onClick={createGroupIdHandleClick}> Create Group Id </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                


                

                
            
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                    imageLink &&
                    (<img 
                        //src={require("../../images/bill/"+imageLink)} 
                        src={`${global.productImageUrl}${imageLink}`}
                        alt="No bill to show" 
                        style={{ height: '100%', width: '100%' }} 
                    />)}
                </Modal.Body>
            </Modal>

            <div className="ag-theme-alpine" style={{height: 600}}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pagination={true}
                    rowSelection={'multiple'}
                    onGridReady={onGridReady}
                    onSelectionChanged={onSelectionChanged}
                    onCellValueChanged={handleCellBlur}
                    >
                        
                </AgGridReact>
            </div>
        </div>
    );
}

export default Products