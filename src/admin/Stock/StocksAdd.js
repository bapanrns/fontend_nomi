import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Image } from 'react-bootstrap';
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

    const [hideSareeQuantity, sethideSareeQuantity] = useState({
        display: "none",
        float: 'left', 
        paddingRight: '10px'
    });

    const [hideKurtiQuantity, sethideKurtiQuantityType] = useState({
        display: "none",
        float: 'left', 
        paddingRight: '10px'
    });

    //hideBlouse
    const [hideBlouse, setHideBlouse] = useState({
        display: "none",
        float: 'left', 
        paddingRight: '10px'
    });

    const [productQuentityHash, setProductQuentityHash] = useState([]);
    const setQuantityHtml =(category_id)=>{
        console.log(global["productQuentityHash"][category_id]);
        setProductQuentityHash(global["productQuentityHash"][category_id])
    }

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
            setQuantityHtml(response.data.category_id);
            if(global.kurtiCatIds.includes(parseInt(response.data.category_id, 10))){
            //if(response.data.category_id === 2){
                sethideKurtiQuantityType({
                    ...hideKurtiQuantity,
                    ["display"]: "block",
                });

                sethideSareeQuantity({
                    ...hideSareeQuantity,
                    ["display"]: "none",
                });
                setHideBlouse({
                    ...hideBlouse,
                    display: "none"
                });
            }else if(global.sareeCatIds.includes(parseInt(response.data.category_id, 10))){
                sethideSareeQuantity({
                    ...hideSareeQuantity,
                    ["display"]: "block",
                });

                sethideKurtiQuantityType({
                    ...hideKurtiQuantity,
                    ["display"]: "none",
                });
                setHideBlouse({
                    ...hideBlouse,
                    display: "none"
                });
            }else if(global.jewelleryCatIds.includes(parseInt(response.data.category_id, 10))){
                sethideSareeQuantity({
                    ...hideSareeQuantity,
                    ["display"]: "block",
                });

                sethideKurtiQuantityType({
                    ...hideKurtiQuantity,
                    ["display"]: "none",
                });
                setHideBlouse({
                    ...hideBlouse,
                    display: "none"
                });
            }else if(global.blouseCatIds.includes(parseInt(response.data.category_id, 10))){
                setHideBlouse({
                    ...hideBlouse,
                    display: "block"
                });

                sethideKurtiQuantityType({
                    ...hideKurtiQuantity,
                    display: "none"
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
        quantity2Xl_selling_price: "",
        quantity32: "",
        quantity32_buy_price: "",
        quantity32_selling_price: "",
        quantity34: "",
        quantity34_buy_price: "",
        quantity34_selling_price: "",
        quantity36: "",
        quantity36_buy_price: "",
        quantity36_selling_price: ""
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
        console.log(saveData);
        if(saveData.bill_id_and_shop_id === ""){
            returnFlag = false;
        }else if(parseInt(saveData.quantity, 10) > 0 || parseInt(saveData.quantity_buy_price, 10) > 0 || parseInt(saveData.quantity_selling_price, 10) > 0){
            if(parseInt(saveData.quantity, 10) > 0 && parseInt(saveData.quantity_buy_price, 10) > 0 && parseInt(saveData.quantity_selling_price, 10) > 0){
                if(parseInt(saveData.quantity_buy_price, 10) > parseInt(saveData.quantity_selling_price, 10)){
                    returnFlag = false;
                }
                returnFlagValue = true;
            }else{
                returnFlag = false;
            }
        }else if(parseInt(saveData.quantityXs, 10) > 0 || parseInt(saveData.quantityXs_buy_price, 10) > 0 || parseInt(saveData.quantityXs_selling_price, 10) > 0){
            if(parseInt(saveData.quantityXs, 10) > 0 && parseInt(saveData.quantityXs_buy_price, 10) > 0 && parseInt(saveData.quantityXs_selling_price, 10) > 0){
                if(parseInt(saveData.quantityXs_buy_price, 10) > parseInt(saveData.quantityXs_selling_price, 10)){
                    returnFlag = false;
                }
                returnFlagValue = true;
            }else{
                returnFlag = false;
            }
        }else if(parseInt(saveData.quantityS, 10) > 0 || parseInt(saveData.quantityS_buy_price, 10) > 0 || parseInt(saveData.quantityS_selling_price, 10) > 0){
            if(parseInt(saveData.quantityS, 10) > 0 && parseInt(saveData.quantityS_buy_price, 10) > 0 && parseInt(saveData.quantityS_selling_price, 10) > 0){
                if(parseInt(saveData.quantityS_buy_price, 10) > parseInt(saveData.quantityS_selling_price, 10)){
                    returnFlag = false;
                }
                returnFlagValue = true;
            }else{
                returnFlag = false;
            }
        }else if(parseInt(saveData.quantityL, 10) > 0 || parseInt(saveData.quantityL_buy_price, 10) > 0 || parseInt(saveData.quantityL_selling_price, 10) > 0){
            if(parseInt(saveData.quantityL, 10) > 0 && parseInt(saveData.quantityL_buy_price, 10) > 0 && parseInt(saveData.quantityL_selling_price, 10) > 0){
                if(parseInt(saveData.quantityL_buy_price, 10) > parseInt(saveData.quantityL_selling_price, 10)){
                    returnFlag = false;
                }
                returnFlagValue = true;
            }else{
                returnFlag = false;
            }
        }else if(parseInt(saveData.quantityM, 10) > 0 || parseInt(saveData.quantityM_buy_price, 10) > 0 || parseInt(saveData.quantityM_selling_price, 10) > 0){
            if(parseInt(saveData.quantityM, 10) > 0 && parseInt(saveData.quantityM_buy_price, 10) > 0 && parseInt(saveData.quantityM_selling_price, 10) > 0){
                if(parseInt(saveData.quantityM_buy_price, 10) > parseInt(saveData.quantityM_selling_price, 10)){
                    returnFlag = false;
                }
                returnFlagValue = true;
            }else{
                returnFlag = false;
            }
        }else if(parseInt(saveData.quantityXl, 10) > 0 || parseInt(saveData.quantityXl_buy_price, 10) > 0 || parseInt(saveData.quantityXl_selling_price, 10) > 0){
            if(parseInt(saveData.quantityXl, 10) > 0 && parseInt(saveData.quantityXl_buy_price, 10) > 0 && parseInt(saveData.quantityXl_selling_price, 10) > 0){
                if(parseInt(saveData.quantityXl_buy_price, 10) > parseInt(saveData.quantityXl_selling_price, 10)){
                    returnFlag = false;
                }
                returnFlagValue = true;
            }else{
                returnFlag = false;
            }
        }else if(parseInt(saveData.quantity2Xl, 10) > 0 || parseInt(saveData.quantity2Xl_buy_price, 10) > 0 || parseInt(saveData.quantity2Xl_selling_price, 10) > 0){
            if(parseInt(saveData.quantity2Xl, 10) > 0 && parseInt(saveData.quantity2Xl_buy_price, 10) > 0 && parseInt(saveData.quantity2Xl_selling_price,10) > 0){
                if(parseInt(saveData.quantity2Xl_buy_price, 10) > parseInt(saveData.quantity2Xl_selling_price, 10)){
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
                                    <tr>
                                        <td>32</td>
                                        <td>{productData.quantity32}</td>
                                        <td>{productData.quantity32_buy_price}</td>
                                        <td>{productData.quantity32_selling_price}</td>
                                    </tr>
                                    <tr>
                                        <td>34</td>
                                        <td>{productData.quantity34}</td>
                                        <td>{productData.quantity34_buy_price}</td>
                                        <td>{productData.quantity34_selling_price}</td>
                                    </tr>
                                    <tr>
                                        <td>36</td>
                                        <td>{productData.quantity36}</td>
                                        <td>{productData.quantity36_buy_price}</td>
                                        <td>{productData.quantity36_selling_price}</td>
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

            {
            productQuentityHash.map((objHtml, index)=>{
                return(<>
                    {/* Quantity */}
                    <div className="col-md-3" style={{float: "left", paddingRight: "10px"}}>
                        <label className="form-label" htmlFor={objHtml.quantityName+"ControlInput1"}>{objHtml.quantityHeader}:</label>
                        <input 
                            type="text" 
                            name={objHtml.quantityName}
                            id={objHtml.quantityName+"ControlInput1"}
                            className="form-control"
                            onKeyPress={(e) => AcceptNumericValue(e)}
                            onChange={handalChange}
                        />
                    </div>
                    {/* Quantity Buy Price */}
                    <div className="col-md-3" style={{float: "left", paddingRight: "10px"}}>
                        <label className="form-label" htmlFor={objHtml.quantityBuyPriceName+"ControlInput1"}>{objHtml.quantityBuyPriceHeader}: </label>
                        <input 
                            type="text" 
                            name={objHtml.quantityBuyPriceName}
                            id={objHtml.quantityBuyPriceName+"ControlInput1"}
                            className="form-control"
                            onKeyPress={(e) => AcceptNumericValue(e)}
                            onChange={handalChange}
                        />
                    </div>
                    {/* Quantity MRP Price */}
                    <div className="col-md-3" style={{float: "left", paddingRight: "10px"}}>
                        <label className="form-label" htmlFor="quantity_mrp_price.ControlInput1">{objHtml.quantityMrpPriceHeader}: </label>
                        <input 
                            type="text" 
                            name='quantity_mrp_price'
                            id="quantity_mrp_price.ControlInput1" 
                            className="form-control"
                            onKeyPress={(e) => AcceptNumericValue(e)}
                            onChange={handalChange}
                        />
                    </div>
                    {/* Quantity Sell Price */}
                    <div className="col-md-3" style={{float: "left", paddingRight: "10px"}}>
                        <label className="form-label" htmlFor={objHtml.quantityName+"ControlInput1"}>{objHtml.quantitySellPriceHeader}: </label>
                        <input 
                            type="text" 
                            name={objHtml.quantitySellPriceName}
                            id={objHtml.quantitySellPriceName+"ControlInput1"} 
                            className="form-control"
                            onKeyPress={(e) => AcceptNumericValue(e)}
                            onChange={handalChange}
                        />
                    </div>
                </>);
            })
            }

{/*

            <div className="col-md-4" style={hideSareeQuantity}>
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
            <div className="col-md-4" style={hideSareeQuantity}>
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
            <div className="col-md-4" style={hideSareeQuantity}>
                <label className="form-label" htmlFor="quantity_buy_price.ControlInput1">Quantity MRP Price: </label>
                <input 
                    type="text" 
                    name='quantity_mrp_price'
                    id="quantity_mrp_price.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>
            
            <div className="col-md-4"style={hideSareeQuantity}>
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
            
            <div className="col-md-4" style={hideKurtiQuantity}>
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

            <div className="col-md-4" style={hideKurtiQuantity}>
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
            
            <div className="col-md-4"style={hideKurtiQuantity}>
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
            
            <div className="col-md-4" style={hideKurtiQuantity}>
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

            <div className="col-md-4" style={hideKurtiQuantity}>
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
            
            <div className="col-md-4"style={hideKurtiQuantity}>
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
            
            <div className="col-md-4" style={hideKurtiQuantity}>
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

            <div className="col-md-4" style={hideKurtiQuantity}>
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
            
            <div className="col-md-4"style={hideKurtiQuantity}>
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
            
            <div className="col-md-4" style={hideKurtiQuantity}>
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

            <div className="col-md-4" style={hideKurtiQuantity}>
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
            
            <div className="col-md-4"style={hideKurtiQuantity}>
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
            
            <div className="col-md-4" style={hideKurtiQuantity}>
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
            <div className="col-md-4" style={hideKurtiQuantity}>
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
            
            <div className="col-md-4"style={hideKurtiQuantity}>
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
            
            <div className="col-md-4" style={hideKurtiQuantity}>
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

            <div className="col-md-4" style={hideKurtiQuantity}>
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
            
            <div className="col-md-4" style={hideKurtiQuantity}>
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

*/}

            {/** Blouse */}
{/*
            <div className="col-md-4" style={hideBlouse}>
                <label className="form-label" htmlFor="quantity32.ControlInput1">Quantity: <b>32</b></label>
                <input 
                    type="text" 
                    name='quantity32'
                    id="quantity32.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>
            <div className="col-md-4" style={hideBlouse}>
                <label className="form-label" htmlFor="quantity32_buy_price.ControlInput1">Quantity <b>32</b> Buy Price: </label>
                <input 
                    type="text" 
                    name='quantity32_buy_price'
                    id="quantity32_buy_price.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>
            
            <div className="col-md-4" style={hideBlouse}>
                <label className="form-label" htmlFor="quantity32_selling_price.ControlInput1">Quantity <b>32</b> Sell Price: </label>
                <input 
                    type="text" 
                    name='quantity32_selling_price'
                    id="quantity32_selling_price.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>

            <div className="col-md-4" style={hideBlouse}>
                <label className="form-label" htmlFor="quantity34.ControlInput1">Quantity: <b>34</b></label>
                <input 
                    type="text" 
                    name='quantity34'
                    id="quantity34.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>

            <div className="col-md-4" style={hideBlouse}>
                <label className="form-label" htmlFor="quantity34_buy_price.ControlInput1">Quantity <b>34</b> Buy Price: </label>
                <input 
                    type="text" 
                    name='quantity34_buy_price'
                    id="quantity34_buy_price.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>
            
            <div className="col-md-4" style={hideBlouse}>
                <label className="form-label" htmlFor="quantity34_selling_price.ControlInput1">Quantity <b>34</b> Sell Price: </label>
                <input 
                    type="text" 
                    name='quantity34_selling_price'
                    id="quantity34_selling_price.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>

            <div className="col-md-4" style={hideBlouse}>
                <label className="form-label" htmlFor="quantity36.ControlInput1">Quantity: <b>36</b></label>
                <input 
                    type="text" 
                    name='quantity36'
                    id="quantity36.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>

            <div className="col-md-4" style={hideBlouse}>
                <label className="form-label" htmlFor="quantity36_buy_price.ControlInput1">Quantity <b>36</b> Buy Price: </label>
                <input 
                    type="text" 
                    name='quantity36_buy_price'
                    id="quantity36_buy_price.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>
            
            <div className="col-md-4" style={hideBlouse}>
                <label className="form-label" htmlFor="quantity36_selling_price.ControlInput1">Quantity <b>36</b> Sell Price: </label>
                <input 
                    type="text" 
                    name='quantity36_selling_price'
                    id="quantity36_selling_price.ControlInput1" 
                    className="form-control"
                    onKeyPress={(e) => AcceptNumericValue(e)}
                    onChange={handalChange}
                />
            </div>
*/}


            <div className="col-md-12" style={{textAlign: "center"}}>
                <button className='btn btn-success' style={{marginTop: "10px"}} onClick={saveStock}>Save Stock</button>
            </div>
        </div>
            
    );
}

export default StockAdd;
