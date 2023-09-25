import React, { Component, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Image, Carousel } from 'react-bootstrap';
// Notification
import { toast } from 'react-toastify';
import axiosInstance from '../../components/axiosInstance';
import {
    useNavigate,
    useParams
  } from "react-router-dom";
  import global from "../../components/global";


const StockAdd = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(() => {
        getBillDetails();
        getProductDetails(id);
    }, []);

    const [hideQuantity, sethideQuantity] = useState({
        display: "none",
        float: 'left', 
        paddingRight: '10px'
    });

    const [hideQuantityType, sethideQuantityType] = useState({
        display: "none",
        float: 'left', 
        paddingRight: '10px'
    });

    // getBillDetails
    const [billObj, setBillObj] = useState([]);
    async function getBillDetails(){
        axiosInstance.post('/allBuyProduct', {})
        .then((response) => {
            if(response.data.length > 0){
                setBillObj(response.data);
            }
            setIsLoading(false);
        })
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
            if(response.data.category_id === 2){
                sethideQuantityType({
                    ...hideQuantityType,
                    ["display"]: "block",
                });

                sethideQuantity({
                    ...hideQuantity,
                    ["display"]: "none",
                });
            }else{
                sethideQuantity({
                    ...hideQuantity,
                    ["display"]: "block",
                });

                sethideQuantityType({
                    ...hideQuantityType,
                    ["display"]: "none",
                });
            }
        })
    }

    const [saveData, setSaveData] = useState({
        order_id: id,
        bill_id_and_shop_id: 0,
        quantity: 0,
        quantity_buy_price: "",
        quantity_selling_price: "",
        quantityXs: "",
        quantityXs_buy_price: "",
        quantityXs_selling_price: "",
        quantityS: "",
        quantityS_buy_price: "",
        quantityS_selling_price: "",
        quantityL: "",
        quantityL_buy_price: "",
        quantityL_selling_price: "",
        quantityM: "",
        quantityM_buy_price: "",
        quantityM_selling_price: "",
        quantityXl: "",
        quantityXl_buy_price: "",
        quantityXl_selling_price: "",
        quantity2Xl: "",
        quantity2Xl_buy_price: "",
        quantity2Xl_selling_price: ""
    });


    const handalChange = (e) =>{
        setSaveData({
            ...saveData,
            [e.target.name]: e.target.value,
        });

        if(saveData.order_id === 0 || saveData.order_id === undefined){
            setSaveData({
                ...saveData,
                ["order_id"]: id,
            });
        }
    }

    const AcceptNumericValue = e => {
        var key = e.key;
        var regex = /[0-9]|\./;
        if( !regex.test(key) ) {
            e.preventDefault();
        }
    }

    const saveStock = async (event) => {
        //console.log(saveData);
        if(quantityValid()){
            setIsLoading(true);
            axiosInstance.post('/saveProductStock', saveData)
            .then((response) => {
                setIsLoading(false);
                toast.success(response.data, {
                    position: toast.POSITION.TOP_CENTER,
                });
                alert(id);
                navigate("../admin/stocks/"+id);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            })
        }else{
            console.log(saveData);
            toast.error("Validation error", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }

    const quantityValid = () => {
        let returnFlag = true;
        let returnFlagValue = false;
        if(saveData.bill_id_and_shop_id === 0){
            returnFlag = false;
        }else if(saveData.quantity > 0 || saveData.quantity_buy_price > 0 || saveData.quantity_selling_price > 0){
            if(saveData.quantity > 0 && saveData.quantity_buy_price > 0 && saveData.quantity_selling_price > 0){
                if(saveData.quantity_buy_price > saveData.quantity_selling_price){
                    returnFlag = false;
                }
                returnFlagValue = true;
            }else{
                returnFlag = false;
            }
        }else if(saveData.quantityXs > 0 || saveData.quantityXs_buy_price > 0 || saveData.quantityXs_selling_price > 0){
            if(saveData.quantityXs > 0 && saveData.quantityXs_buy_price > 0 && saveData.quantityXs_selling_price > 0){
                if(saveData.quantityXs_buy_price > saveData.quantityXs_selling_price){
                    returnFlag = false;
                }
                returnFlagValue = true;
            }else{
                returnFlag = false;
            }
        }else if(saveData.quantityS > 0 || saveData.quantityS_buy_price > 0 || saveData.quantityS_selling_price > 0){
            if(saveData.quantityS > 0 && saveData.quantityS_buy_price > 0 && saveData.quantityS_selling_price > 0){
                if(saveData.quantityS_buy_price > saveData.quantityS_selling_price){
                    returnFlag = false;
                }
                returnFlagValue = true;
            }else{
                returnFlag = false;
            }
        }else if(saveData.quantityL > 0 || saveData.quantityL_buy_price > 0 || saveData.quantityL_selling_price > 0){
            if(saveData.quantityL > 0 && saveData.quantityL_buy_price > 0 && saveData.quantityL_selling_price > 0){
                if(saveData.quantityL_buy_price > saveData.quantityL_selling_price){
                    returnFlag = false;
                }
                returnFlagValue = true;
            }else{
                returnFlag = false;
            }
        }else if(saveData.quantityM > 0 || saveData.quantityM_buy_price > 0 || saveData.quantityM_selling_price > 0){
            if(saveData.quantityM > 0 && saveData.quantityM_buy_price > 0 && saveData.quantityM_selling_price > 0){
                if(saveData.quantityM_buy_price > saveData.quantityM_selling_price){
                    returnFlag = false;
                }
                returnFlagValue = true;
            }else{
                returnFlag = false;
            }
        }else if(saveData.quantityXl > 0 || saveData.quantityXl_buy_price > 0 || saveData.quantityXl_selling_price > 0){
            if(saveData.quantityXl > 0 && saveData.quantityXl_buy_price > 0 && saveData.quantityXl_selling_price > 0){
                if(saveData.quantityXl_buy_price > saveData.quantityXl_selling_price){
                    returnFlag = false;
                }
                returnFlagValue = true;
            }else{
                returnFlag = false;
            }
        }else if(saveData.quantity2Xl > 0 || saveData.quantity2Xl_buy_price > 0 || saveData.quantity2Xl_selling_price > 0){
            if(saveData.quantity2Xl > 0 && saveData.quantity2Xl_buy_price > 0 && saveData.quantity2Xl_selling_price > 0){
                if(saveData.quantity2Xl_buy_price > saveData.quantity2Xl_selling_price){
                    returnFlag = false;
                }
                returnFlagValue = true;
            }else{
                returnFlag = false;
            }
        }

        if(!returnFlagValue){
            returnFlag = false;
        }

        return returnFlag;
    }

    return (
        <div style={{padding: "10px"}}>
            {
                productDataImg !==  undefined && 
                <div className="col-md-12">
                    <div className="col-md-6" style={{float: "left"}}>
                        <div style={{textAlign: "center"}}>
                            <Image 
                                className='itemDetailsMainImg'
                                style={{width: "250px", height: "250px"}}
                                //src={require(`../../../src/images/product/${productDataImg}`)} 
                                src={`${global.productImageUrl}${productDataImg}`}
                                alt='No Image found'
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
            <div style={{clear: "both"}}></div>
            <div className="col-md-4" style={{float: 'left', paddingRight: '10px'}}>
                <label className="form-label" htmlFor="bill_id_and_shop_id.ControlInput1">Bill: <span className='requiredfield'> *</span></label>
                <select
                    className='form-select'
                    id="bill_id_and_shop_id"
                    name="bill_id_and_shop_id"
                    onChange={handalChange}
                    >
                    <option value="">Select Sub Category</option>
                    {
                        billObj.map((data, index)=>{
                            return (<option key={index} value={data.id+"@"+data.shop_id} >{data.shop_name} - {data.transition_date}</option>);
                        })
                    }
                </select>
                
            </div>
            <div style={{clear: "both"}}></div>
            <div className="col-md-4" style={hideQuantity}>
                <label className="form-label" htmlFor="quantity.ControlInput1">Quantity:</label>
                <input 
                    type="text" 
                    name='quantity'
                    id="quantity.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>
            <div className="col-md-4" style={hideQuantity}>
                <label className="form-label" htmlFor="quantity_buy_price.ControlInput1">Quantity Buy Price: </label>
                <input 
                    type="text" 
                    name='quantity_buy_price'
                    id="quantity_buy_price.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>
            
            <div className="col-md-4"style={hideQuantity}>
                <label className="form-label" htmlFor="quantity_selling_price.ControlInput1">Quantity Sell Price: </label>
                <input 
                    type="text" 
                    name='quantity_selling_price'
                    id="quantity_selling_price.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>
            
            <div className="col-md-4" style={hideQuantityType}>
                <label className="form-label" htmlFor="quantityXs.ControlInput1">Quantity: <b>XS</b> 75 cm = 28 Inches </label>
                <input 
                    type="text" 
                    name='quantityXs'
                    id="quantityXs.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>

            <div className="col-md-4" style={hideQuantityType}>
                <label className="form-label" htmlFor="quantityXs_buy_price.ControlInput1">Quantity <b>XS</b> Buy Price: </label>
                <input 
                    type="text" 
                    name='quantityXs_buy_price'
                    id="quantityXs_buy_price.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>
            
            <div className="col-md-4"style={hideQuantityType}>
                <label className="form-label" htmlFor="quantityXs_selling_price.ControlInput1">Quantity <b>XS</b> Sell Price: </label>
                <input 
                    type="text" 
                    name='quantityXs_selling_price'
                    id="quantityXs_selling_price.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>
            
            <div className="col-md-4" style={hideQuantityType}>
                <label className="form-label" htmlFor="quantityS.ControlInput1">Quantity: <b>S</b> 80 cm = 30 Inches</label>
                <input 
                    type="text" 
                    name='quantityS'
                    id="quantityS.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>

            <div className="col-md-4" style={hideQuantityType}>
                <label className="form-label" htmlFor="quantityS_buy_price.ControlInput1">Quantity <b>S</b> Buy Price: </label>
                <input 
                    type="text" 
                    name='quantityS_buy_price'
                    id="quantityS_buy_price.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>
            
            <div className="col-md-4"style={hideQuantityType}>
                <label className="form-label" htmlFor="quantityS_selling_price.ControlInput1">Quantity <b>S</b> Sell Price: </label>
                <input 
                    type="text" 
                    name='quantityS_selling_price'
                    id="quantityS_selling_price.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>
            
            <div className="col-md-4" style={hideQuantityType}>
                <label className="form-label" htmlFor="quantityL.ControlInput1">Quantity: <b>L</b> 90 cm = 3 Inches</label>
                <input 
                    type="text" 
                    name='quantityL'
                    id="quantityL.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>

            <div className="col-md-4" style={hideQuantityType}>
                <label className="form-label" htmlFor="quantityL_buy_price.ControlInput1">Quantity <b>L</b> Buy Price: </label>
                <input 
                    type="text" 
                    name='quantityL_buy_price'
                    id="quantityL_buy_price.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>
            
            <div className="col-md-4"style={hideQuantityType}>
                <label className="form-label" htmlFor="quantityL_selling_price.ControlInput1">Quantity <b>L</b> Sell Price: </label>
                <input 
                    type="text" 
                    name='quantityL_selling_price'
                    id="quantityL_selling_price.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>
            
            <div className="col-md-4" style={hideQuantityType}>
                <label className="form-label" htmlFor="quantityM.ControlInput1">Quantity: <b>M</b> 85 cm = 32 Inches</label>
                <input 
                    type="text" 
                    name='quantityM'
                    id="quantityM.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>

            <div className="col-md-4" style={hideQuantityType}>
                <label className="form-label" htmlFor="quantityM_buy_price.ControlInput1">Quantity <b>M</b> Buy Price: </label>
                <input 
                    type="text" 
                    name='quantityM_buy_price'
                    id="quantityM_buy_price.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>
            
            <div className="col-md-4"style={hideQuantityType}>
                <label className="form-label" htmlFor="quantityM_selling_price.ControlInput1">Quantity <b>M</b> Sell Price: </label>
                <input 
                    type="text" 
                    name='quantityM_selling_price'
                    id="quantityM_selling_price.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>
            
            <div className="col-md-4" style={hideQuantityType}>
                <label className="form-label" htmlFor="quantityXl.ControlInput1">Quantity: <b>XL</b> 95 cm = 36 Inches</label>
                <input 
                    type="text" 
                    name='quantityXl'
                    id="quantityXl.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>
            <div className="col-md-4" style={hideQuantityType}>
                <label className="form-label" htmlFor="quantityXl_buy_price.ControlInput1">Quantity <b>XL</b> Buy Price: </label>
                <input 
                    type="text" 
                    name='quantityXl_buy_price'
                    id="quantityXl_buy_price.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>
            
            <div className="col-md-4"style={hideQuantityType}>
                <label className="form-label" htmlFor="quantityXl_selling_price.ControlInput1">Quantity <b>XL</b> Sell Price: </label>
                <input 
                    type="text" 
                    name='quantityXl_selling_price'
                    id="quantityXl_selling_price.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>
            
            <div className="col-md-4" style={hideQuantityType}>
                <label className="form-label" htmlFor="quantity2Xl.ControlInput1">Quantity: <b>2XL</b> 100 cm = 38 Inches</label>
                <input 
                    type="text" 
                    name='quantity2Xl'
                    id="quantity2Xl.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>

            <div className="col-md-4" style={hideQuantityType}>
                <label className="form-label" htmlFor="quantity2Xl_buy_price.ControlInput1">Quantity <b>2XL</b> Buy Price: </label>
                <input 
                    type="text" 
                    name='quantity2Xl_buy_price'
                    id="quantity2Xl_buy_price.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>
            
            <div className="col-md-4" style={hideQuantityType}>
                <label className="form-label" htmlFor="quantity2Xl_selling_price.ControlInput1">Quantity <b>2XL</b> Sell Price: </label>
                <input 
                    type="text" 
                    name='quantity2Xl_selling_price'
                    id="quantity2Xl_selling_price.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>

            <div className="col-md-12" style={{textAlign: "center"}}>
                <button className='btn btn-success' style={{marginTop: "10px"}} onClick={saveStock}>Save Stock</button>
            </div>
        </div>
            
    );
}

export default StockAdd;
