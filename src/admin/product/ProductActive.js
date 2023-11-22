import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-horizontal-scrolling-menu/dist/styles.css';
import axios from "axios";
import global from "../../components/global";
import {
    useParams,
    useNavigate
} from "react-router-dom";
import Loader from '../../components/Loader';
import axiosInstance from '../../components/axiosInstance';

const ProductAdd = () => {
    const colorObj = global['color'];

    const [isLoading, setIsLoading] = useState(false);

    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getCategory();
        getProductFebric();
        getBillDetails();
        if(id !== undefined){
            getProductById(id);
        }
    }, []);
    // For category
    const [categoryObj, setCategoryObj] = useState([]);
    async function getCategory(){
        const headers = {
            'Content-Type': 'application/json'
        }
        setIsLoading(true);
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
            console.log(error);
            setIsLoading(false);
        })
    }

    // For Product Febric
    const [productFebricObj, setProductFebricObj] = useState([]);
    async function getProductFebric(){
        const headers = {
            'Content-Type': 'application/json'
        }
        setIsLoading(true);
        let data = {};
        await axios.post(global["axios_url"]+'/AllProductFabric', data, {
            headers: headers
        })
        .then((response) => {
            if(response.data.length > 0){
                setProductFebricObj(response.data)
            }
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

    // getBillDetails
    const [billObj, setBillObj] = useState([]);
    async function getBillDetails(){
        const headers = {
            'Content-Type': 'application/json'
        }
        setIsLoading(true);
        let data = {};
        axiosInstance.post('/allBuyProduct', data)
       /* await axios.post(global["axios_url"]+'/allBuyProduct', data, {
            headers: headers
        })*/
        .then((response) => {
            if(response.data.length > 0){
                setBillObj(response.data);
            }
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
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
    // Edit 
    const [productObj, setProductObj] = useState({
        color: [],
        occasion: []
    });
    const [hideSareeQuantity, sethideQuantity] = useState({
        display: "none",
        float: 'left', 
        paddingRight: '10px'
    });
    const [hideKurtiQuantity, sethideQuantityType] = useState({
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

    const [hideJewellery, setHideJewellery] = useState({
        display: "none",
        float: 'left', 
        paddingRight: '10px'
    });

    const hideShowQuantity = (category_id) => {
        if(global.kurtiCatIds.includes(parseInt(category_id, 10))){
        //if(parseInt(category_id, 10) === 2){
            sethideQuantityType({
                ...hideKurtiQuantity,
                display: "block"
            });
            sethideQuantity({
                ...hideSareeQuantity,
                display: "none"
            });
            setHideBlouse({
                ...hideBlouse,
                display: "none"
            });
            setHideJewellery({
                ...hideJewellery,
                display: "none"
            });
        //}else if(global.blouseCatIds.includes(parseInt(category_id, 10))){
        }else if(global.blouseCatIds.includes(parseInt(category_id, 10))){
            //hideBlouse
            setHideBlouse({
                ...hideBlouse,
                display: "block"
            });
            sethideQuantityType({
                ...hideKurtiQuantity,
                display: "none"
            });
            sethideQuantity({
                ...hideSareeQuantity,
                display: "none"
            });
            setHideJewellery({
                ...hideJewellery,
                display: "none"
            });
        }else if(global.jewelleryCatIds.includes(parseInt(category_id, 10))){
            //hideBlouse
            setHideBlouse({
                ...hideBlouse,
                display: "none"
            });
            sethideQuantityType({
                ...hideKurtiQuantity,
                display: "none"
            });
            sethideQuantity({
                ...hideSareeQuantity,
                display: "block"
            });
            setHideJewellery({
                ...hideJewellery,
                display: "block"
            });
        }else{
            sethideQuantityType({
                ...hideKurtiQuantity,
                display: "none"
            });
            sethideQuantity({
                ...hideSareeQuantity,
                display: "block"
            });
            setHideBlouse({
                ...hideBlouse,
                display: "none"
            });
            setHideJewellery({
                ...hideJewellery,
                display: "none"
            });
        }
    };

    const [editData, setEditData] = useState({
        id: "",
        category_id: "",
        sub_category_id: "",
        product_name: "",
        active_status: "",
        company_name: "",
        year_month: "",
        product_offer_percentage: "",
        delivery_charges: "",
        quantity: "",
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
        // quantity id start
        quantity_id: "",
        quantity_Xs_id: "",
        quantity_S_id: "",
        quantity_L_id: "",
        quantity_M_id: "",
        quantity_Xl_id: "",
        quantity_2Xl_id: "",
        // quantity id end
        product_febric_id: "",
        product_febric: "",
        color: [],
        occasion: [],
        imageArray: [],
        images1: null,
        images2: null,
        images3: null,
        images4: null,
        images5: null,
        saree_length: 5.5,
        blouse: "No",
        blouse_length: ".8",
        weight:"",
        youtube_link: "",
        fabric_care: "",
        bill_id_and_shop_id: "",
        material: "",
        stone_type: ""
    }); 
    const [imageArray, setImageArray] = useState();
    async function getProductById(id){
        setIsLoading(true);
        /*const headers = {
            'Content-Type': 'application/json'
        }*/
        
        let data = {id: id};
        axiosInstance.post('/ProductFindById', data)
        /*await axios.post(global["axios_url"]+'/ProductFindById', data, {
            headers: headers
        })*/
        .then((response) => {
            // Show hide quantity
            hideShowQuantity(response.data.category_id);
            // Load category select option
            getSubCategory(response.data.category_id);
            // Set Edit record
            setEditData(response.data);
            setProductObj(response.data);
            // Set color checkbox
            setImageArray(response.data.imageArray);
            // Loader hide
            setIsLoading(false);

        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

    const activeInactiveProduct = (e) => {
        if(editData.active_status === 0){
            const x = quantityValidationFn();
            console.log("x", x.length);
            if(x.length === 0){
                // Active
                activeInactiveProductFn(e);
            }
        }else{
            activeInactiveProductFn(e);
        }
    }

    const activeInactiveProductFn = (event) =>{
        event.preventDefault();
        //console.log(productObj);
        let active_status = 0;
        if(editData.active_status === 0){
            active_status = 1;
        }
        setIsLoading(true);
        
        /*const headers = {
            'Content-Type': 'application/json'
        }*/
        axiosInstance.post('/productAactiveInactive', {id: editData.id, active_status: active_status})
        /*axios.post(global["axios_url"]+'/productAactiveInactive', {id: editData.id, active_status: active_status}, {
            headers: headers
        })*/
        .then((response) => {
            alert(response.data);
            // console.log(JSON.parse(JSON.stringify(response)))
            setIsLoading(false);
            navigate("../admin/product/");
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false);
            alert(error);
        })
    }

    const [quantityValidation, setQuantityValidation] = useState({
        quantity: false,
        quantityXs: false,
        quantityS: false,
        quantityL: false,
        quantityM: false,
        quantityXl: false,
        quantity2Xl: false
    });

    function validateQuantity(key, quantity, buy_price, selling_price){
        let returnFlag = false;
        if(quantity <= 0){
            setQuantityValidation({...quantityValidation, key: true})
            returnFlag = true;
        }
        console.log(key, "-------------", buy_price, ">=", selling_price);
        if(buy_price >= selling_price){
            setQuantityValidation({...quantityValidation, key: true})
            returnFlag = true;
        }
        return returnFlag;
    }

    const quantityValidationFn = () => {
        const returnArray = [];
        if(editData.quantity !=="" || editData.quantity_buy_price !=="" || editData.quantity_selling_price !==""){
            if( validateQuantity("quantity", editData.quantity, editData.quantity_buy_price, editData.quantity_selling_price)){
                alert("Error in quantity. Please edit before activation.");
                returnArray.push(true);
            }
        }

        if(editData.quantityXs !=="" || editData.quantityXs_buy_price !=="" || editData.quantityXs_selling_price !==""){
            if(validateQuantity("quantityXs", editData.quantityXs, editData.quantityXs_buy_price, editData.quantityXs_selling_price)){
                alert("Error in quantity xs. Please edit before activation.");
                returnArray.push(true);
            }
        }

        if(editData.quantityS !=="" || editData.quantityS_buy_price !=="" || editData.quantityS_selling_price !==""){
            if(validateQuantity("quantityS", editData.quantityS, editData.quantityS_buy_price, editData.quantityS_selling_price)){
                alert("Error in quantity S. Please edit before activation.");
                returnArray.push(true);
            }
        }

        if(editData.quantityL !=="" || editData.quantityL_buy_price !=="" || editData.quantityL_selling_price !==""){
            if(validateQuantity("quantityL", editData.quantityL, editData.quantityL_buy_price, editData.quantityL_selling_price)){
                alert("Error in quantity L. Please edit before activation.");
                returnArray.push(true);
            }
        }

        if(editData.quantityM !=="" || editData.quantityM_buy_price !=="" || editData.quantityM_selling_price !==""){
            if(validateQuantity("quantityM", editData.quantityM, editData.quantityM_buy_price, editData.quantityM_selling_price)){
                alert("Error in quantity M. Please edit before activation.");
                returnArray.push(true);
            }
        }

        if(editData.quantityXl !=="" || editData.quantityXl_buy_price !=="" || editData.quantityXl_selling_price !==""){
            if(validateQuantity("quantityXl", editData.quantityXl, editData.quantityXl_buy_price, editData.quantityXl_selling_price)){
                alert("Error in quantity XL. Please edit before activation.");
                returnArray.push(true);
            }
        }

        if(editData.quantity2Xl !=="" || editData.quantity2Xl_buy_price !=="" || editData.quantity2Xl_selling_price !==""){
            if(validateQuantity("quantity2Xl", editData.quantity2Xl, editData.quantity2Xl_buy_price, editData.quantity2Xl_selling_price)){
                alert("Error in quantity 2XL. Please edit before activation.");
                returnArray.push(true);
            }
        }

        return returnArray;
    }

    const editProduct = () =>{
        navigate("../admin/product-add/"+editData.id);
    }

    return (
        <>
            {isLoading ? <Loader /> : ""}
            <div className='addNewAddress' style={{padding: '10px'}}>
                <div className='col-md-12' style={{display: "inline-block"}}>
                    <button 
                        type="submit" 
                        className="signupButton btn btn-info" 
                        style={{float: 'left'}}
                        onClick={(e) => { 
                            editProduct(e)
                        }}
                    >Edit</button>
                    <button 
                        type="submit" 
                        className="signupButton btn btn-danger" 
                        onClick={(e) => { 
                            activeInactiveProduct(e)
                        }}
                    >Active/InActive</button>
                </div>
                
                <h3 style={{textAlign: 'center'}}>Product Details</h3>
                    <input type='hidden' name="id" value={editData.id} />
                    <div style={{width: '100%', backgroundColor: "#00cfff", textAlign: "center", padding: '10px'}}>Basic Details</div>
                    <div className='col-md-12' style={{padding: "5px", clear: 'both', display: 'inline-block'}}>
                        <div className="col-md-4" style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="category_id.ControlInput1">Category: </label>
                            <select
                                className='form-select'
                                id="category_id"
                                name="category_id"
                                value={editData.category_id}
                                disabled = {true}
                            >
                                <option value="">Select Category</option>
                                {
                                    categoryObj.length > 0  &&
                                    categoryObj.map((data, index)=>{
                                        return (<option key={index} value={data.id} >{data.category_name}</option>);
                                    })

                                }
                                
                            </select>
                        </div>
                        <div className="col-md-4" style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="sub_category_id.ControlInput1">Sub Category: </label>
                            <select
                                className='form-select'
                                id="sub_category_id"
                                name="sub_category_id"
                                value={editData.sub_category_id}
                                disabled = {true}
                                >
                                <option value="">Select Sub Category</option>
                                {
                                    
                                    subCategoryObj.map((data, index)=>{
                                        return (<option key={index} value={data.id} >{data.sub_category_name}</option>);
                                    })

                                }
                                
                            </select>
                        </div>
                        <div className="col-md-4" style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="bill_id_and_shop_id.ControlInput1">Bill: </label>
                            <select
                                className='form-select'
                                id="bill_id_and_shop_id"
                                name="bill_id_and_shop_id"
                                value={editData.bill_id_and_shop_id}
                                disabled = {true}
                                >
                                <option value="">Select Sub Category</option>
                                {
                                    
                                    billObj.map((data, index)=>{
                                        return (<option key={index} value={data.id+"@"+data.shop_id} >{data.shop_name} - {data.transition_date}</option>);
                                    })

                                }
                                
                            </select>
                        </div>
                    </div>
                    <div style={{width: '100%', backgroundColor: "#00cfff", textAlign: "center", padding: '10px', clear: 'both', marginTop: '5px'}}>Product Delivery</div>
                                    
                    <div className='col-md-12' style={{padding: "5px", display: 'inline-block'}}>
                        <div className="col-md-4"style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="product_offer_percentage.ControlInput1">Offer:(This is only show) </label>
                            <input 
                                type="text" 
                                name='product_offer_percentage'
                                id="product_offer_percentage.ControlInput1" 
                                className="form-control"
                                value={editData['product_offer_percentage']}
                                disabled = {true}
                            />
                        </div>
                        <div className="col-md-4"style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="delivery_charges.ControlInput1">Delivery Charges: </label>
                            <input 
                                type="text" 
                                name='delivery_charges'
                                id="delivery_charges.ControlInput1" 
                                className="form-control"
                                value={editData['delivery_charges']}
                                disabled = {true}
                            />
                        </div>

                        <div className="col-md-4"style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="delivery_charges.ControlInput1">Return: </label>
                            <select
                                className='form-select'
                                id="bill_id_and_shop_id"
                                name="bill_id_and_shop_id"
                                value={editData.return_avaliable}
                                disabled = {true}
                                >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>

                    <div style={{width: '100%', backgroundColor: "#00cfff", textAlign: "center", padding: '10px'}}>Product Price Information</div>

                    <div className='col-md-12' style={{padding: "5px", display: 'inline-block'}}>
                        {quantityValidation.quantity && <span className="error">Error in Quantity</span>}
                        <div className="col-md-4" style={hideSareeQuantity}>
                            <label className="form-label" htmlFor="quantity.ControlInput1">Quantity: </label>
                            <input 
                                type="text" 
                                name='quantity'
                                id="quantity.ControlInput1" 
                                className="form-control"
                                value={editData['quantity']}
                                disabled = {true}
                            />
                        </div>
                        <div className="col-md-4" style={hideSareeQuantity}>
                            <label className="form-label" htmlFor="quantity_buy_price.ControlInput1">Quantity Buy Price: </label>
                            <input 
                                type="text" 
                                name='quantity_buy_price'
                                id="quantity_buy_price.ControlInput1" 
                                className="form-control"
                                value={editData['quantity_buy_price']}
                                disabled = {true}
                            />
                        </div>
                        
                        <div className="col-md-4"style={hideSareeQuantity}>
                            <label className="form-label" htmlFor="quantity_selling_price.ControlInput1">Quantity Sell Price: </label>
                            <input 
                                type="text" 
                                name='quantity_selling_price'
                                id="quantity_selling_price.ControlInput1" 
                                className="form-control"
                                value={editData['quantity_selling_price']}
                                disabled = {true}
                            />
                        </div>
                        
                        <div className="col-md-4" style={hideKurtiQuantity}>
                            {quantityValidation.quantityXs && <span className="error">Error in Quantity</span>}
                            <label className="form-label" htmlFor="quantityXs.ControlInput1">Quantity: <b>XS</b> 75 cm = 28 Inches </label>
                            <input 
                                type="text" 
                                name='quantityXs'
                                id="quantityXs.ControlInput1" 
                                className="form-control"
                                value={editData['quantityXs']}
                                disabled = {true}
                            />
                        </div>

                        <div className="col-md-4" style={hideKurtiQuantity}>
                            <label className="form-label" htmlFor="quantityXs_buy_price.ControlInput1">Quantity <b>XS</b> Buy Price: </label>
                            <input 
                                type="text" 
                                name='quantityXs_buy_price'
                                id="quantityXs_buy_price.ControlInput1" 
                                className="form-control"
                                value={editData['quantityXs_buy_price']}
                                disabled = {true}
                            />
                        </div>
                        
                        <div className="col-md-4"style={hideKurtiQuantity}>
                            <label className="form-label" htmlFor="quantityXs_selling_price.ControlInput1">Quantity <b>XS</b> Sell Price: </label>
                            <input 
                                type="text" 
                                name='quantityXs_selling_price'
                                id="quantityXs_selling_price.ControlInput1" 
                                className="form-control"
                                value={editData['quantityXs_selling_price']}
                                disabled = {true}
                            />
                        </div>
                        
                        <div className="col-md-4" style={hideKurtiQuantity}>
                            {quantityValidation.quantityS && <span className="error">Error in Quantity <b>S</b></span>}
                            <label className="form-label" htmlFor="quantityS.ControlInput1">Quantity: <b>S</b> 80 cm = 30 Inches</label>
                            <input 
                                type="text" 
                                name='quantityS'
                                id="quantityS.ControlInput1" 
                                className="form-control"
                                value={editData['quantityS']}
                                disabled = {true}
                            />
                        </div>

                        <div className="col-md-4" style={hideKurtiQuantity}>
                            <label className="form-label" htmlFor="quantityS_buy_price.ControlInput1">Quantity <b>S</b> Buy Price: </label>
                            <input 
                                type="text" 
                                name='quantityS_buy_price'
                                id="quantityS_buy_price.ControlInput1" 
                                className="form-control"
                                value={editData['quantityS_buy_price']}
                                disabled = {true}
                            />
                        </div>
                        
                        <div className="col-md-4"style={hideKurtiQuantity}>
                            <label className="form-label" htmlFor="quantityS_selling_price.ControlInput1">Quantity <b>S</b> Sell Price: </label>
                            <input 
                                type="text" 
                                name='quantityS_selling_price'
                                id="quantityS_selling_price.ControlInput1" 
                                className="form-control"
                                value={editData['quantityS_selling_price']}
                                disabled = {true}
                            />
                        </div>
                        
                        <div className="col-md-4" style={hideKurtiQuantity}>
                            {quantityValidation.quantityL && <span className="error">Error in Quantity <b>L</b></span>}
                            <label className="form-label" htmlFor="quantityL.ControlInput1">Quantity: <b>L</b> 90 cm = 3 Inches</label>
                            <input 
                                type="text" 
                                name='quantityL'
                                id="quantityL.ControlInput1" 
                                className="form-control"
                                value={editData['quantityL']}
                                disabled = {true}
                            />
                        </div>

                        <div className="col-md-4" style={hideKurtiQuantity}>
                            <label className="form-label" htmlFor="quantityL_buy_price.ControlInput1">Quantity <b>L</b> Buy Price: </label>
                            <input 
                                type="text" 
                                name='quantityL_buy_price'
                                id="quantityL_buy_price.ControlInput1" 
                                className="form-control"
                                value={editData['quantityL_buy_price']}
                                disabled = {true}
                            />
                        </div>
                        
                        <div className="col-md-4"style={hideKurtiQuantity}>
                            <label className="form-label" htmlFor="quantityL_selling_price.ControlInput1">Quantity <b>L</b> Sell Price: </label>
                            <input 
                                type="text" 
                                name='quantityL_selling_price'
                                id="quantityL_selling_price.ControlInput1" 
                                className="form-control"
                                value={editData['quantityL_selling_price']}
                                disabled = {true}
                            />
                        </div>
                        
                        <div className="col-md-4" style={hideKurtiQuantity}>
                            {quantityValidation.quantityM && <span className="error">Error in Quantity <b>M</b></span>}
                            <label className="form-label" htmlFor="quantityM.ControlInput1">Quantity: <b>M</b> 85 cm = 32 Inches</label>
                            <input 
                                type="text" 
                                name='quantityM'
                                id="quantityM.ControlInput1" 
                                className="form-control"
                                value={editData['quantityM']}
                                disabled = {true}
                            />
                        </div>

                        <div className="col-md-4" style={hideKurtiQuantity}>
                            <label className="form-label" htmlFor="quantityM_buy_price.ControlInput1">Quantity <b>M</b> Buy Price: </label>
                            <input 
                                type="text" 
                                name='quantityM_buy_price'
                                id="quantityM_buy_price.ControlInput1" 
                                className="form-control"
                                value={editData['quantityM_buy_price']}
                                disabled = {true}
                            />
                        </div>
                        
                        <div className="col-md-4"style={hideKurtiQuantity}>
                            <label className="form-label" htmlFor="quantityM_selling_price.ControlInput1">Quantity <b>M</b> Sell Price: </label>
                            <input 
                                type="text" 
                                name='quantityM_selling_price'
                                id="quantityM_selling_price.ControlInput1" 
                                className="form-control"
                                value={editData['quantityM_selling_price']}
                                disabled = {true}
                            />
                        </div>
                        
                        <div className="col-md-4" style={hideKurtiQuantity}>
                            {quantityValidation.quantityXl && <span className="error">Error in Quantity <b>XL</b></span>}
                            <label className="form-label" htmlFor="quantityXl.ControlInput1">Quantity: <b>XL</b> 95 cm = 36 Inches</label>
                            <input 
                                type="text" 
                                name='quantityXl'
                                id="quantityXl.ControlInput1" 
                                className="form-control"
                                value={editData['quantityXl']}
                                disabled = {true}
                            />
                        </div>
                        <div className="col-md-4" style={hideKurtiQuantity}>
                            <label className="form-label" htmlFor="quantityXl_buy_price.ControlInput1">Quantity <b>XL</b> Buy Price: </label>
                            <input 
                                type="text" 
                                name='quantityXl_buy_price'
                                id="quantityXl_buy_price.ControlInput1" 
                                className="form-control"
                                value={editData['quantityXl_buy_price']}
                                disabled = {true}
                            />
                        </div>
                        
                        <div className="col-md-4"style={hideKurtiQuantity}>
                            <label className="form-label" htmlFor="quantityXl_selling_price.ControlInput1">Quantity <b>XL</b> Sell Price: </label>
                            <input 
                                type="text" 
                                name='quantityXl_selling_price'
                                id="quantityXl_selling_price.ControlInput1" 
                                className="form-control"
                                value={editData['quantityXl_selling_price']}
                                disabled = {true}
                            />
                        </div>
                        
                        <div className="col-md-4" style={hideKurtiQuantity}>
                            {quantityValidation.quantity2Xl && <span className="error">Error in Quantity <b>2XL</b></span>}
                            <label className="form-label" htmlFor="quantity2Xl.ControlInput1">Quantity: <b>2XL</b> 100 cm = 38 Inches</label>
                            <input 
                                type="text" 
                                name='quantity2Xl'
                                id="quantity2Xl.ControlInput1" 
                                className="form-control"
                                value={editData['quantity2Xl']}
                                disabled = {true}
                            />
                        </div>

                        <div className="col-md-4" style={hideKurtiQuantity}>
                            <label className="form-label" htmlFor="quantity2Xl_buy_price.ControlInput1">Quantity <b>2XL</b> Buy Price: </label>
                            <input 
                                type="text" 
                                name='quantity2Xl_buy_price'
                                id="quantity2Xl_buy_price.ControlInput1" 
                                className="form-control"
                                value={editData['quantity2Xl_buy_price']}
                                disabled = {true}
                            />
                        </div>
                        
                        <div className="col-md-4" style={hideKurtiQuantity}>
                            <label className="form-label" htmlFor="quantity2Xl_selling_price.ControlInput1">Quantity <b>2XL</b> Sell Price: </label>
                            <input 
                                type="text" 
                                name='quantity2Xl_selling_price'
                                id="quantity2Xl_selling_price.ControlInput1" 
                                className="form-control"
                                value={editData['quantity2Xl_selling_price']}
                                disabled = {true}
                            />
                        </div>


                        {/** Blouse */}

                        <div className="col-md-4" style={hideBlouse}>
                            <label className="form-label" htmlFor="quantity32.ControlInput1">Quantity: <b>32</b></label>
                            <input 
                                type="text" 
                                name='quantity32'
                                id="quantity32.ControlInput1" 
                                className="form-control"
                                value={editData['quantity32']}
                                disabled = {true}
                            />
                        </div>
                        <div className="col-md-4" style={hideBlouse}>
                            <label className="form-label" htmlFor="quantity32_buy_price.ControlInput1">Quantity <b>32</b> Buy Price: </label>
                            <input 
                                type="text" 
                                name='quantity32_buy_price'
                                id="quantity32_buy_price.ControlInput1" 
                                className="form-control"
                                value={editData['quantity32_buy_price']}
                                disabled = {true}
                            />
                        </div>
                        
                        <div className="col-md-4" style={hideBlouse}>
                            <label className="form-label" htmlFor="quantity32_selling_price.ControlInput1">Quantity <b>32</b> Sell Price: </label>
                            <input 
                                type="text" 
                                name='quantity32_selling_price'
                                id="quantity32_selling_price.ControlInput1" 
                                className="form-control"
                                value={editData['quantity32_selling_price']}
                                disabled = {true}
                            />
                        </div>

                        <div className="col-md-4" style={hideBlouse}>
                            <label className="form-label" htmlFor="quantity34.ControlInput1">Quantity: <b>34</b></label>
                            <input 
                                type="text" 
                                name='quantity34'
                                id="quantity34.ControlInput1" 
                                className="form-control"
                                value={editData['quantity34']}
                                disabled = {true}
                            />
                        </div>

                        <div className="col-md-4" style={hideBlouse}>
                            <label className="form-label" htmlFor="quantity34_buy_price.ControlInput1">Quantity <b>34</b> Buy Price: </label>
                            <input 
                                type="text" 
                                name='quantity34_buy_price'
                                id="quantity34_buy_price.ControlInput1" 
                                className="form-control"
                                value={editData['quantity34_buy_price']}
                                disabled = {true}
                            />
                        </div>
                        
                        <div className="col-md-4" style={hideBlouse}>
                            <label className="form-label" htmlFor="quantity34_selling_price.ControlInput1">Quantity <b>34</b> Sell Price: </label>
                            <input 
                                type="text" 
                                name='quantity34_selling_price'
                                id="quantity34_selling_price.ControlInput1" 
                                className="form-control"
                                value={editData['quantity34_selling_price']}
                                disabled = {true}
                            />
                        </div>

                        <div className="col-md-4" style={hideBlouse}>
                            <label className="form-label" htmlFor="quantity36.ControlInput1">Quantity: <b>36</b></label>
                            <input 
                                type="text" 
                                name='quantity36'
                                id="quantity36.ControlInput1" 
                                className="form-control"
                                value={editData['quantity36']}
                                disabled = {true}
                            />
                        </div>

                        <div className="col-md-4" style={hideBlouse}>
                            <label className="form-label" htmlFor="quantity36_buy_price.ControlInput1">Quantity <b>36</b> Buy Price: </label>
                            <input 
                                type="text" 
                                name='quantity36_buy_price'
                                id="quantity36_buy_price.ControlInput1" 
                                className="form-control"
                                value={editData['quantity36_buy_price']}
                                disabled = {true}
                            />
                        </div>
                        
                        <div className="col-md-4" style={hideBlouse}>
                            <label className="form-label" htmlFor="quantity36_selling_price.ControlInput1">Quantity <b>36</b> Sell Price: </label>
                            <input 
                                type="text" 
                                name='quantity36_selling_price'
                                id="quantity36_selling_price.ControlInput1" 
                                className="form-control"
                                value={editData['quantity36_selling_price']}
                                disabled = {true}
                            />
                        </div>
                    </div>

                    
                   

                    <div style={{width: '100%', backgroundColor: "#00cfff", textAlign: "center", padding: '10px', clear: 'both', marginTop: '5px'}}>Product Information</div>

                    <div className='col-md-12' style={{padding: "5px", display: 'inline-block'}}>
                        <div className="col-md-4" style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="product_name.ControlInput1">Product Name: </label>
                            <input 
                                placeholder="" 
                                type="text" 
                                name='product_name'
                                id="product_name.ControlInput1" 
                                className="form-control" 
                                value={editData['product_name']}
                                disabled = {true}
                                />
                        </div>
                        <div className="col-md-4" style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="company_name.ControlInput1">Company Name: </label>
                            <input 
                                placeholder="" 
                                type="text" 
                                name='company_name'
                                id="company_name.ControlInput1" 
                                className="form-control" 
                                value={editData['company_name']}
                                disabled = {true}
                                />
                        </div>
                        
                        <div className="col-md-4" style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="product_febric.ControlInput1">Product Fabric: </label>
                            <select
                                className='form-select'
                                id="product_febric"
                                name="product_febric"
                                value={editData['product_febric_id']+"@"+editData['product_febric']}
                                disabled = {true}
                                >
                                <option value="">Select Product Fabric</option> 
                                {
                                    productFebricObj.length > 0  &&
                                    productFebricObj.map((data, index)=>{
                                        return (<option key={index} value={data.id+"@"+data.product_fabric_name} >{data.product_fabric_name}</option>);
                                    })

                                }
                            </select>
                        </div>

                        <div className="col-md-4" style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="fabric_care.ControlInput1">Fabric Care: </label>
                            <select
                                className='form-select'
                                id="fabric_care"
                                name="fabric_care"
                                value={editData.fabric_care}
                                disabled = {true}
                            >   
                                <option value="">NULL</option>
                                    {global["careInstruction"].map((option, key) => (
                                        <option value={option.value} key={"care_"+key}>{option.label}</option>
                                    ))}
                            </select>
                        </div>

                        <div className="col-md-4" style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="year_month.ControlInput1">Year Month: </label>
                            <select
                                className='form-select'
                                id="year_month"
                                name="year_month"
                                value={editData.year_month}
                                disabled = {true}
                            >   
                                <option value="">NULL</option>
                                <option value="2023-04">2023-04</option>
                                <option value="2023-05">2023-05</option>
                            </select>
                        </div>
                        <div className="col-md-4" style={hideSareeQuantity}>
                            <label className="form-label" htmlFor="saree_length">Saree Length:</label>
                            <input 
                                type="text" 
                                name='saree_length'
                                id="saree_length" 
                                className="form-control"
                                value={editData['saree_length']}
                                disabled = {true}
                            />
                        </div>
                        <div className="col-md-4" style={hideSareeQuantity}>
                            <label className="form-label" htmlFor="blouse.ControlInput1">Blouse Piece:</label>
                            <select
                                className='form-select'
                                id="blouse"
                                name="blouse"
                                value={editData.blouse}
                                disabled = {true}
                            >   
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>
                        <div className="col-md-4" style={hideSareeQuantity}>
                            <label className="form-label" htmlFor="blouse_length">Blouse Length:</label>
                            <input 
                                type="text" 
                                name='blouse_length'
                                id="blouse_length" 
                                className="form-control"
                                value={editData['blouse_length']}
                                disabled = {true}
                            />
                        </div>
                        <div className="col-md-4" style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="weight">Weight:</label>
                            <input 
                                type="text" 
                                name='weight'
                                id="weight" 
                                className="form-control"
                                value={editData['weight']}
                                disabled = {true}
                            />
                        </div>
                        <div className="col-md-4" style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="youtube_link">Youtube Link:</label>
                            <input 
                                type="text" 
                                name='youtube_link'
                                id="youtube_link" 
                                className="form-control"
                                value={editData['youtube_link']}
                                disabled = {true}
                            />
                        </div>
                        <div className="col-md-4" style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="youtube_link">Occasion:</label>
                            
                            <br></br>

                            {
                                global.occasion.length > 0  &&
                                global.occasion.map((obj, index)=>{
                                    return (
                                        <div className='form-check' style={{background: obj.code, float: 'left', marginLeft: '5px', minWidth: '100px'}} key={index}>
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                value={obj.value} 
                                                id={"flexCheckDefaul"+index} 
                                                style={{marginTop: '10px', marginLeft: '-15px'}} 
                                                /*checked={checkedValues.includes(obj.color)}*/
                                                checked={productObj['occasion'].includes(obj.value)}
                                                disabled = {true}
                                                />
                                            <label 
                                                className="form-check-label" 
                                                htmlFor={"flexCheckDefaul"+index} 
                                                style={{padding: '5px', cursor: 'pointer'}}
                                                >
                                                {obj.label}
                                            </label>
                                        </div>
                                    );
                                })

                            }
                        </div>

                        <div className="col-md-4" style={hideJewellery}>
                            <label className="form-label" htmlFor="material.ControlInput1">Material:</label>
                            <select
                                className='form-select'
                                id="material"
                                name="material"
                                value={editData.material}
                            >   
                                <option value="">NULL</option>
                                <option value="2023-04">2023-04</option>
                                <option value="2023-05">2023-05</option>
                            </select>
                        </div>

                        <div className="col-md-4" style={hideJewellery}>
                            <label className="form-label" htmlFor="stone_type.ControlInput1">Stone Type:</label>
                            <select
                                className='form-select'
                                id="stone_type"
                                name="stone_type"
                                value={editData.stone_type}
                            >   
                                <option value="">NULL</option>
                                <option value="2023-04">2023-04</option>
                                <option value="2023-05">2023-05</option>
                            </select>
                        </div>
                    </div>
                    
                    <div style={{width: '100%', backgroundColor: "#00cfff", textAlign: "center", padding: '10px', clear: 'both', marginTop: '5px'}}>Product Color</div>
                    
                    <div className='col-md-12' style={{padding: "5px", display: 'inline-block'}}>
                        <div className="mb-3 formValidation">
                            <label className="form-label" htmlFor="color.ControlInput1">Color: </label>
                            <br></br>

                            {
                                colorObj.length > 0  &&
                                colorObj.map((obj, index)=>{
                                    return (
                                        <div className='form-check' style={{background: obj.code, float: 'left', marginLeft: '5px', minWidth: '100px', color: obj.color}} key={index}>
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                value={obj.color} 
                                                id={"flexCheckDefaul"+index} 
                                                style={{marginTop: '10px', marginLeft: '-15px'}} 
                                                /*checked={checkedValues.includes(obj.color)}*/
                                                checked={productObj['color'].includes(obj.label)}
                                                disabled = {true}
                                                />
                                            <label 
                                                className="form-check-label" 
                                                htmlFor={"flexCheckDefaul"+index} 
                                                style={{padding: '5px', cursor: 'pointer'}}
                                                >
                                                {obj.label}
                                            </label>
                                        </div>
                                    );
                                })

                            }
                        </div>
                    </div>


                    <div style={{width: '100%', backgroundColor: "#00cfff", textAlign: "center", padding: '10px', clear: 'both', marginTop: '5px'}}>Product Image[<span style={{fontSize: '15px', color: '#fff', fontWeight: 'bold'}}>Maximum Upload: 5 Images. If you have uploaded any, please remove them before uploading again.</span>]</div>
                    
                    <div className='col-md-12' style={{padding: "5px", display: 'inline-block'}}>
                        {
                            editData.id > 0  &&
                            imageArray.map((obj, index)=>{
                                return (
                                    <div style={{float: 'left', paddingRight: '10px', height: '250px', position: 'relative'}} key={"imageDiv"+index}>
                                        <div style={{border: "1px dashed"}}>
                                            <img 
                                                //src={require("../../images/product/"+obj)} 
                                                src={`${global.productImageUrl}${obj}`}
                                                alt="No Image" 
                                                style={{ width: '200px', height: '200px'}}
                                                ></img>
                                        </div>
                                    </div>
                                );
                            })

                        }    
                    </div>
            </div>
        </>
    )
}
export default ProductAdd