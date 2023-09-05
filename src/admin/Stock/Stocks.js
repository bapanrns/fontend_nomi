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

const StatusCellRenderer = (p) =>{
    let status = <span >Active</span>;
    if (p.value === 0)
        status = <span style={{color: "red"}}>Inactive</span>;

    return <span>{status}</span>;
}

const Categories = () => {
    const [rowData, setRowData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {id} = useParams();
    // {category_name: "", active_status: "", id: 1}
    function getCategoryData(){
        setIsLoading(true);
        
        let data = {product_id: id};
        axiosInstance.post('/allProductStock', data)
        .then((response) => {
            setRowData(response.data);
            setIsLoading(false);
        })
    }


    const onGridReady = useCallback((params) => {
          getCategoryData();
          getProductDetails(id);
    }, []);

    
    
    const [columnDefs] = useState([
        {
            field: 'id',
            minWidth: 50,
            checkboxSelection: checkboxSelection,
            headerCheckboxSelection: headerCheckboxSelection,
             width: 100
        },
        { field: 'product_id', headerName: "Product Id", width: 120 },
        { field: 'no_of_product', headerName: "No. of Product", width: 150 },
        { field: 'buy_price', headerName: "Buy Price", width: 150 },
        { field: 'sell_price', headerName: "Sell Price", width: 150 },
        { field: 'size', headerName: "Size", width: 100 },
        { field: 'status', headerName: "Status", width: 100 },
        { field: 'id', headerName: "Action", cellRenderer: ActionCellRenderer, width: 300 }
    ]);

    const addStock = () => {
        window.open("../stocks_add/"+id, '_blank');
    }

    const [productDataImg, setProductDataImg] = useState();
    const [productData, setProductData] = useState();
    const getProductDetails = (id) => {
        setIsLoading(true);
        axiosInstance.post('/ProductFindById', {id: id})
        .then((response) => {
            setIsLoading(false);
            setProductDataImg(response.data.imageArray[0]);
            setProductData(response.data);
        })
    }

    return (
        <>
            {isLoading ? <Loader /> : ""}
            <div style={{textAlign: 'center', fontWeight: "bold"}}>Product Stocks</div>
            <div>
                {
                    productDataImg !==  undefined && 
                    <div className="col-md-12">
                        <div className="col-md-6" style={{float: "left"}}>
                            <div style={{textAlign: "center"}}>
                                <Image 
                                    className='itemDetailsMainImg'
                                    style={{width: "250px", height: "250px"}}
                                    src={require(`../../../src/images/product/${productDataImg}`)} 
                                />
                            </div>
                        </div>
                        <div className="col-md-6" style={{float: "left"}}>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Size</th>
                                        <th>Quantity</th>
                                        <th>Buy Price</th>
                                        <th>Sell Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Free Size</td>
                                        <td>{productData.quantity}</td>
                                        <td>{productData.quantity_buy_price}</td>
                                        <td>{productData.quantity_selling_price}</td>
                                    </tr>
                                    <tr>
                                        <td>XS</td>
                                        <td>{productData.quantityXs}</td>
                                        <td>{productData.quantityXs_buy_price}</td>
                                        <td>{productData.quantityXs_selling_price}</td>
                                    </tr>
                                    <tr>
                                        <td>S</td>
                                        <td>{productData.quantityS}</td>
                                        <td>{productData.quantityS_buy_price}</td>
                                        <td>{productData.quantityS_selling_price}</td>
                                    </tr>
                                    <tr>
                                        <td>L</td>
                                        <td>{productData.quantityL}</td>
                                        <td>{productData.quantityL_buy_price}</td>
                                        <td>{productData.quantityL_selling_price}</td>
                                    </tr>
                                    <tr>
                                        <td>M</td>
                                        <td>{productData.quantityM}</td>
                                        <td>{productData.quantityM_buy_price}</td>
                                        <td>{productData.quantityM_selling_price}</td>
                                    </tr>
                                    <tr>
                                        <td>XL</td>
                                        <td>{productData.quantityXl}</td>
                                        <td>{productData.quantityXl_buy_price}</td>
                                        <td>{productData.quantityXl_selling_price}</td>
                                    </tr>
                                    <tr>
                                        <td>2XL</td>
                                        <td>{productData.quantity2Xl}</td>
                                        <td>{productData.quantity2Xl_buy_price}</td>
                                        <td>{productData.quantity2Xl_selling_price}</td>
                                    </tr>
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                }
            </div>
            <div className="col-md-12" style={{float: "left"}}>
                <button className='btn btn-success' style={{marginBottom: "10px", marginLeft: "10px"}} onClick={addStock}>Stock Add</button>
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

export default Categories