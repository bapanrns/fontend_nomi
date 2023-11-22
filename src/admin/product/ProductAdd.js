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
import Joi from 'joi';

import axiosInstance from '../../components/axiosInstance';

const ProductAdd = () => {
    const colorObj = global['color'];

    const [isLoading, setIsLoading] = useState(false);
    
    const [previewImage, setPreviewImage] = useState({
        images1: null,
        images2: null,
        images3: null,
        images4: null,
        images5: null 
    });

    const navigate = useNavigate();
    
    const handelFile = (e) =>{
        const file = e.target.files[0];
        //console.log(file);
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result;
            
            setProductObj({...productObj, [e.target.name]: base64String})
            setPreviewImage({...previewImage, [e.target.name]: reader.result});
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        category_id: '',
        sub_category_id: '',
        bill_id_and_shop_id: '',
        product_name: '',
        company_name: '',
        product_febric: '',
        year_month: ''
    });

    const schema = Joi.object({
        category_id: Joi.number().required(),
        sub_category_id: Joi.number().required(),
        bill_id_and_shop_id: Joi.string().required(),
        product_name: Joi.string().required(),
        company_name: Joi.string().required(),
        product_febric: Joi.string().required(),
        year_month: Joi.string().required()
    });
   
    const saveProduct = async (event) => {
        // console.log("MAKE AN API CALL", fields);
        const validationResult = schema.validate(formData, { abortEarly: false });
        //console.log(validationResult.error);
        //console.log("editData: ", editData);
        if (validationResult.error) {
            const validationErrors = {};
            validationResult.error.details.forEach((error) => {
                validationErrors[error.path[0]] = error.message;
            });
            setErrors(validationErrors);
        } else {
            const x = quantityValidationFn();
            if(x.length === 0){
                event.preventDefault();
                //console.log(productObj);
                setIsLoading(true);
                
               /* const headers = {
                    'Content-Type': 'application/json'
                }*/
                axiosInstance.post('/productAdd', productObj)
                /*axios.post(global["axios_url"]+'/productAdd', productObj, {
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
        }
    };

    const AcceptNumericValue = e => {
        var key = e.key;
        var regex = /[0-9]|\./;
        if( !regex.test(key) ) {
            e.preventDefault();
        }
    }

    function validateQuantity(key, quantity, buy_price, selling_price){
        console.log(key, quantity, buy_price, selling_price);
        let returnFlag = false;
        if(parseInt(quantity) <= 0){
            returnFlag = true;
        }

        if(parseInt(buy_price) >= parseInt(selling_price)){
            returnFlag = true;
        }
        console.log("returnFlag", returnFlag);
        return returnFlag;
    }

    const quantityValidationFn = () => {
        const returnArray = [];
        if(editData.quantity !=="" || editData.quantity_buy_price !=="" || editData.quantity_selling_price !==""){
            if( validateQuantity("quantity", editData.quantity, editData.quantity_buy_price, editData.quantity_selling_price)){
                alert("Error in quantity. Please enter the quantity, buy price, and sell price.");
                returnArray.push(true);
            }
        }

        if(editData.quantityXs !=="" || editData.quantityXs_buy_price !=="" || editData.quantityXs_selling_price !==""){
            if(validateQuantity("quantityXs", editData.quantityXs, editData.quantityXs_buy_price, editData.quantityXs_selling_price)){
                alert("Error in quantity xs. Please enter the quantity, buy price, and sell price.");
                returnArray.push(true);
            }
        }

        if(editData.quantityS !=="" || editData.quantityS_buy_price !=="" || editData.quantityS_selling_price !==""){
            if(validateQuantity("quantityS", editData.quantityS, editData.quantityS_buy_price, editData.quantityS_selling_price)){
                alert("Error in quantity S. Please enter the quantity, buy price, and sell price.");
                returnArray.push(true);
            }
        }

        if(editData.quantityL !=="" || editData.quantityL_buy_price !=="" || editData.quantityL_selling_price !==""){
            if(validateQuantity("quantityL", editData.quantityL, editData.quantityL_buy_price, editData.quantityL_selling_price)){
                alert("Error in quantity L. Please enter the quantity, buy price, and sell price.");
                returnArray.push(true);
            }
        }

        if(editData.quantityM !=="" || editData.quantityM_buy_price !=="" || editData.quantityM_selling_price !==""){
            if(validateQuantity("quantityM", editData.quantityM, editData.quantityM_buy_price, editData.quantityM_selling_price)){
                alert("Error in quantity M. Please enter the quantity, buy price, and sell price.");
                returnArray.push(true);
            }
        }

        if(editData.quantityXl !=="" || editData.quantityXl_buy_price !=="" || editData.quantityXl_selling_price !==""){
            if(validateQuantity("quantityXl", editData.quantityXl, editData.quantityXl_buy_price, editData.quantityXl_selling_price)){
                alert("Error in quantity XL. Please enter the quantity, buy price, and sell price.");
                returnArray.push(true);
            }
        }

        if(editData.quantity2Xl !=="" || editData.quantity2Xl_buy_price !=="" || editData.quantity2Xl_selling_price !==""){
            if(validateQuantity("quantity2Xl", editData.quantity2Xl, editData.quantity2Xl_buy_price, editData.quantity2Xl_selling_price)){
                alert("Error in quantity 2XL. Please enter the quantity, buy price, and sell price.");
                returnArray.push(true);
            }
        }

        return returnArray;
    }

    const {id} = useParams();
    useEffect(() => {
        getCategory();
        getProductFebric();
        getBillDetails();
        if(id !== undefined){
            getProductById(id);
        }else{
            setUploadImageLength(5);
            
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
        await axiosInstance.post('/allBuyProduct', data)
        /*await axios.post(global["axios_url"]+'/allBuyProduct', data, {
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
        id: "",
        category_id: "",
        sub_category_id: "",
        product_name: "",
        active_status: 0,
        company_name: "",
        year_month: "",
        product_offer_percentage: "",
        delivery_charges: "",
        return_avaliable: "",
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

        quantity32: "",
        quantity32_buy_price: "",
        quantity32_selling_price: "",

        quantity34: "",
        quantity34_buy_price: "",
        quantity34_selling_price: "",

        quantity36: "",
        quantity36_buy_price: "",
        quantity36_selling_price: "",

        product_febric_id: "",
        product_febric: "",
        color: [],
        occasion: [],
        images1: "",
        images2: "",
        images3: "",
        images4: "",
        images5: "",
        saree_length: 5.5,
        blouse: "No",
        blouse_length: ".8",
        weight:"",
        youtube_link: "",
        // quantity id start
        quantity_id: "",
        quantity_Xs_id: "",
        quantity_S_id: "",
        quantity_L_id: "",
        quantity_M_id: "",
        quantity_Xl_id: "",
        quantity_2Xl_id: "",
        // quantity id end
        fabric_care: "",
        bill_id_and_shop_id: "",
        primary: "",
        material: "",
        stone_type: ""
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
    // 
    const [hideJewellery, setHideJewellery] = useState({
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

    const handalChange = (e) =>{
        if(e.target.name === "product_febric"){
            //console.log(e.target.value.split("@"));
            setProductObj({...productObj, 
                product_febric_id: e.target.value.split("@")[0], 
                product_febric: e.target.value.split("@")[1]
            })
            setEditData({...editData, 
                product_febric_id: e.target.value.split("@")[0], 
                product_febric: e.target.value.split("@")[1]
            })
        }else{
            setProductObj({...productObj, [e.target.name]:e.target.value})
            setEditData({...editData, [e.target.name]:e.target.value});
        }

        if (e.target.name === "category_id"){
            hideShowQuantity(e.target.value);
            getSubCategory(e.target.value);
        }

        // For validation
        if (Object.keys(formData).includes(e.target.name)) {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    }

    const hideShowQuantity = (category_id) => {
        console.log("category_id: ", category_id);
        // Kurti, Tops, Kurta Sets & Salwar Suits
        if(global.kurtiCatIds.includes(parseInt(category_id, 10))){
            // For Kurti
            sethideQuantityType({
                ...hideKurtiQuantity,
                display: "block"
            });
            sethideQuantity({
                ...hideSareeQuantity,
                display: "none"
            });
            setHideJewellery({
                ...hideJewellery,
                display: "none"
            });

            setHideBlouse({
                ...hideBlouse,
                display: "none"
            });
        }else if(global.sareeCatIds.includes(parseInt(category_id, 10))){
            // For Saree 
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
                display: "none"
            });
            setHideBlouse({
                ...hideBlouse,
                display: "none"
            });
        }else if(global.jewelleryCatIds.includes(parseInt(category_id, 10))){
            //setHideJewellery
            sethideQuantity({
                ...hideSareeQuantity,
                display: "block"
            });
            setHideJewellery({
                ...hideJewellery,
                display: "block"
            });
            sethideQuantityType({
                ...hideKurtiQuantity,
                display: "none"
            });
            setHideBlouse({
                ...hideBlouse,
                display: "none"
            });
        }else if(global.blouseCatIds.includes(parseInt(category_id, 10))){
            //hideBlouse
            setHideBlouse({
                ...hideBlouse,
                display: "block"
            });
            setHideJewellery({
                ...hideJewellery,
                display: "none"
            });
            sethideQuantityType({
                ...hideKurtiQuantity,
                display: "none"
            });
        }
    };

    const [checkedValues, setCheckedValues] = useState([]);
    
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setCheckedValues([...checkedValues, value]);
            //setProductObj({...productObj, ['color']: [...productObj['color'], value]})
            setProductObj({...productObj, color: [...productObj['color'], value]})
        } else {
            setCheckedValues(checkedValues.filter((item) => item !== value));
            //setProductObj({...productObj, ['color']: productObj['color'].filter((item) => item !== value)})
            setProductObj({...productObj, color: productObj['color'].filter((item) => item !== value)})
        }
    };

    //const [checkedValuesOccasion, setCheckedValuesOccasion] = useState([]);
    const handleCheckboxChangeOccasion = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            //setCheckedValuesOccasion([...checkedValuesOccasion, value]);
            if(productObj['occasion'].length > 0){
                setProductObj({...productObj, occasion: [...productObj['occasion'], value]})
            }else{
                setProductObj({...productObj, occasion: [ value]})
            }
        } else {
            //setCheckedValuesOccasion(checkedValuesOccasion.filter((item) => item !== value));
            setProductObj({...productObj, occasion: productObj['occasion'].filter((item) => item !== value)})
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
        return_avaliable: "",
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

        quantity32: "",
        quantity32_buy_price: "",
        quantity32_selling_price: "",

        quantity34: "",
        quantity34_buy_price: "",
        quantity34_selling_price: "",

        quantity36: "",
        quantity36_buy_price: "",
        quantity36_selling_price: "",
        // quantity id start
        quantity_id: "",
        quantity_Xs_id: "",
        quantity_S_id: "",
        quantity_L_id: "",
        quantity_M_id: "",
        quantity_Xl_id: "",
        quantity_2Xl_id: "",

        quantity32_id: "",
        quantity34_id: "",
        quantity36_id: "",

        // quantity id end
        product_febric_id: "",
        product_febric: "",
        color: [],
        occasion: [],
        imageArray: [],
        images1: "",
        images2: "",
        images3: "",
        images4: "",
        images5: "",
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
    const [uploadImageLength, setUploadImageLength] = useState(0);
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
            //setProductObj({...productObj, ['color']: response.data.color.split(", ")});
            // Show hide quantity
            hideShowQuantity(response.data.category_id);
            // Load category select option
            getSubCategory(response.data.category_id);
            // Set Edit record
            setEditData(response.data);
            setProductObj(response.data);
            // Set color checkbox
            //setProductObj({...productObj, color: response.data.color.split(", "), id: response.data.id});
            setUploadImageLength(5 - response.data.imageArray.length);
            setImageArray(response.data.imageArray);

            setFormData({
                category_id: response.data.category_id,
                sub_category_id: response.data.sub_category_id,
                bill_id_and_shop_id: response.data.bill_id_and_shop_id,
                product_name: response.data.product_name,
                company_name: response.data.company_name,
                product_febric: response.data.product_febric,
                year_month: response.data.year_month
            });

            // Loader hide
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

    async function deleteProductImage(id, image_name, image_id, product_id){
        //console.log("deleteProductImage", id);
        if(window.confirm('Are you sure you want to delete?')){
            setIsLoading(true);
           /* const headers = {
                'Content-Type': 'application/json'
            }*/
            
            let data = {image: image_name, image_id: image_id, product_id: product_id};
            axiosInstance.post('/deleteProductImage', data)
            /*await axios.post(global["axios_url"]+'/deleteProductImage', data, {
                headers: headers
            })*/
            .then((response) => {
                //console.log(response.data);
                //setProductObj({...productObj, ['color']: response.data.color.split(", ")});
                setIsLoading(false);
                alert("Image deleted successfully");
                //setEditData({...editData, ['images'+id]: ""});
                const updatedArray = imageArray.filter(item => item !== image_name);
                //console.log("updatedArray", updatedArray);
                setImageArray(updatedArray);
                //setUploadImageLength(uploadImageLength + 1);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            })
        }
    }

    const setPrimary = (id, product_id="")=>{
        if(product_id !==""){
            setIsLoading(true);
           /* const headers = {
                'Content-Type': 'application/json'
            }*/
            
            axiosInstance.post('/setPrimaryImage', {id: id, product_id: product_id})
            /*axios.post(global["axios_url"]+'/setPrimaryImage', {id: id, product_id: product_id}, {
                headers: headers
            })*/
            .then((response) => {
                alert("Set Primary image. Please Refresh");
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false);
            })
        }else{
            setProductObj({...productObj, primary: id})
        }
    }

    return (
        <>
            {isLoading ? <Loader /> : ""}
            <div className='addNewAddress' style={{padding: '10px'}}>
                <h3 style={{textAlign: 'center'}}>Product {editData.id === ""?"Add":"Edit"}</h3>
                
                    <input type='hidden' name="id" value={editData.id} />
                    <div style={{width: '100%', backgroundColor: "#00cfff", textAlign: "center", padding: '10px'}}>Basic Details</div>
                    <div className='col-md-12' style={{padding: "5px", clear: 'both', display: 'inline-block'}}>
                        <div className="col-md-4" style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="category_id.ControlInput1">Category: <span className='requiredfield'> *</span></label>
                            <select
                                className='form-select'
                                id="category_id"
                                name="category_id"
                                onChange={handalChange}
                                value={editData.category_id}
                                disabled = {editData.id === ""?"":true}
                            >
                                <option value="">Select Category</option>
                                {
                                    categoryObj.length > 0  &&
                                    categoryObj.map((data, index)=>{
                                        return (<option key={index} value={data.id} >{data.category_name}</option>);
                                    })

                                }
                                
                            </select>
                            {errors.category_id && <span className="error">This is a required field.</span>}
                        </div>
                        <div className="col-md-4" style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="sub_category_id.ControlInput1">Sub Category: <span className='requiredfield'> *</span></label>
                            <select
                                className='form-select'
                                id="sub_category_id"
                                name="sub_category_id"
                                onChange={handalChange}
                                value={editData.sub_category_id}
                                >
                                <option value="">Select Sub Category</option>
                                {
                                    
                                    subCategoryObj.map((data, index)=>{
                                        return (<option key={index} value={data.id} >{data.sub_category_name}</option>);
                                    })

                                }
                                
                            </select>
                            {errors.sub_category_id && <span className="error">This is a required field.</span>}
                        </div>
                        <div className="col-md-4" style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="bill_id_and_shop_id.ControlInput1">Bill: <span className='requiredfield'> *</span></label>
                            <select
                                className='form-select'
                                id="bill_id_and_shop_id"
                                name="bill_id_and_shop_id"
                                onChange={handalChange}
                                value={editData.bill_id_and_shop_id}
                                >
                                <option value="">Select Sub Category</option>
                                {
                                    
                                    billObj.map((data, index)=>{
                                        return (<option key={index} value={data.id+"@"+data.shop_id} >{data.shop_name} - {data.transition_date} Rs: {data.buy_price}</option>);
                                    })

                                }
                                
                            </select>
                            {errors.bill_id_and_shop_id && <span className="error">This is a required field.</span>}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                            />
                        </div>

                        <div className="col-md-4"style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="delivery_charges.ControlInput1">Return Avaliable: </label>
                            <select
                                className='form-select'
                                id="return_avaliable"
                                name="return_avaliable"
                                onChange={handalChange}
                                value={editData.return_avaliable}
                                >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>

                    <div style={{width: '100%', backgroundColor: "#00cfff", textAlign: "center", padding: '10px'}}>Product Price Information</div>

                    <div className='col-md-12' style={{padding: "5px", display: 'inline-block'}}>
                        <div className="col-md-4" style={hideSareeQuantity}>
                            <label className="form-label" htmlFor="quantity.ControlInput1">Quantity:</label>
                            <input 
                                type="text" 
                                name='quantity'
                                id="quantity.ControlInput1" 
                                className="form-control"
                                value={editData['quantity']}
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
                            />
                        </div>
                        
                        <div className="col-md-4" style={hideKurtiQuantity}>
                            <label className="form-label" htmlFor="quantityXs.ControlInput1">Quantity: <b>XS</b> 75 cm = 28 Inches </label>
                            <input 
                                type="text" 
                                name='quantityXs'
                                id="quantityXs.ControlInput1" 
                                className="form-control"
                                value={editData['quantityXs']}
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
                            />
                        </div>
                        
                        <div className="col-md-4" style={hideKurtiQuantity}>
                            <label className="form-label" htmlFor="quantityS.ControlInput1">Quantity: <b>S</b> 80 cm = 30 Inches</label>
                            <input 
                                type="text" 
                                name='quantityS'
                                id="quantityS.ControlInput1" 
                                className="form-control"
                                value={editData['quantityS']}
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
                            />
                        </div>
                        
                        <div className="col-md-4" style={hideKurtiQuantity}>
                            <label className="form-label" htmlFor="quantityL.ControlInput1">Quantity: <b>L</b> 90 cm = 3 Inches</label>
                            <input 
                                type="text" 
                                name='quantityL'
                                id="quantityL.ControlInput1" 
                                className="form-control"
                                value={editData['quantityL']}
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
                            />
                        </div>
                        
                        <div className="col-md-4" style={hideKurtiQuantity}>
                            <label className="form-label" htmlFor="quantityM.ControlInput1">Quantity: <b>M</b> 85 cm = 32 Inches</label>
                            <input 
                                type="text" 
                                name='quantityM'
                                id="quantityM.ControlInput1" 
                                className="form-control"
                                value={editData['quantityM']}
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
                            />
                        </div>
                        
                        <div className="col-md-4" style={hideKurtiQuantity}>
                            <label className="form-label" htmlFor="quantityXl.ControlInput1">Quantity: <b>XL</b> 95 cm = 36 Inches</label>
                            <input 
                                type="text" 
                                name='quantityXl'
                                id="quantityXl.ControlInput1" 
                                className="form-control"
                                value={editData['quantityXl']}
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
                            />
                        </div>
                        
                        <div className="col-md-4" style={hideKurtiQuantity}>
                            <label className="form-label" htmlFor="quantity2Xl.ControlInput1">Quantity: <b>2XL</b> 100 cm = 38 Inches</label>
                            <input 
                                type="text" 
                                name='quantity2Xl'
                                id="quantity2Xl.ControlInput1" 
                                className="form-control"
                                value={editData['quantity2Xl']}
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                                disabled = {id !== undefined?true:false}
                            />
                        </div>
                    </div>

                    <div style={{width: '100%', backgroundColor: "#00cfff", textAlign: "center", padding: '10px', clear: 'both', marginTop: '5px'}}>Product Information</div>

                    <div className='col-md-12' style={{padding: "5px", display: 'inline-block'}}>
                        <div className="col-md-4" style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="product_name.ControlInput1">Product Name: <span className='requiredfield'> *</span></label>
                            <input 
                                placeholder="" 
                                type="text" 
                                name='product_name'
                                id="product_name.ControlInput1" 
                                className="form-control" 
                                value={editData['product_name']}
                                onChange={handalChange}
                                />
                            {errors.product_name && <span className="error">This is a required field.</span>}
                        </div>
                        <div className="col-md-4" style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="company_name.ControlInput1">Company Name: <span className='requiredfield'> *</span></label>
                            <input 
                                placeholder="" 
                                type="text" 
                                name='company_name'
                                id="company_name.ControlInput1" 
                                className="form-control" 
                                value={editData['company_name']}
                                onChange={handalChange}
                                />
                            {errors.company_name && <span className="error">This is a required field.</span>}
                        </div>
                        
                        <div className="col-md-4" style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="product_febric.ControlInput1">Product Fabric: <span className='requiredfield'> *</span></label>
                            <select
                                className='form-select'
                                id="product_febric"
                                name="product_febric"
                                onChange={handalChange}
                                value={editData['product_febric_id']+"@"+editData['product_febric']}
                                >
                                <option value="">Select Product Fabric</option> 
                                {
                                    productFebricObj.length > 0  &&
                                    productFebricObj.map((data, index)=>{
                                        return (<option key={index} value={data.id+"@"+data.product_fabric_name} >{data.product_fabric_name}</option>);
                                    })

                                }
                            </select>
                            {errors.product_febric && <span className="error">This is a required field.</span>}
                        </div>

                        <div className="col-md-4" style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="fabric_care.ControlInput1">Fabric Care: </label>
                           
                                <select
                                    className='form-select'
                                    id="fabric_care"
                                    name="fabric_care"
                                    onChange={handalChange}
                                    value={editData.fabric_care}
                                >   
                                    <option value="">NULL</option>
                                    {global["careInstruction"].map((option, key) => (
                                        <option value={option.value} key={"care_"+key}>{option.label}</option>
                                    ))}
                                </select>
                           
                        </div>

                        <div className="col-md-4" style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="year_month.ControlInput1">Year Month: <span className='requiredfield'> *</span></label>
                            <select
                                className='form-select'
                                id="year_month"
                                name="year_month"
                                onChange={handalChange}
                                value={editData.year_month}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                            />
                        </div>
                        <div className="col-md-4" style={hideSareeQuantity}>
                            <label className="form-label" htmlFor="blouse.ControlInput1">Blouse Piece:</label>
                            <select
                                className='form-select'
                                id="blouse"
                                name="blouse"
                                onChange={handalChange}
                                value={editData.blouse}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
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
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                            />
                        </div>
                        <div className="col-md-4" style={{float: 'left', paddingRight: '10px'}}>
                            <label className="form-label" htmlFor="occasion">Occasion:</label>
                            <br />
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
                                                checked={productObj['occasion'].includes(obj.value)}
                                                onChange={handleCheckboxChangeOccasion}
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
                                onChange={handalChange}
                                value={editData.material}
                            >   
                                <option value="">NULL</option>
                                <option value="Brass & Copper">Brass & Copper</option>
                                <option value="Alloy">Alloy</option>
                                <option value="Brass">Brass</option>
                                <option value="Vitreous enamel">Vitreous enamel</option>
                                <option value="Pearl">Pearl</option>
                            </select>
                        </div>

                        <div className="col-md-4" style={hideJewellery}>
                            <label className="form-label" htmlFor="stone_type.ControlInput1">Stone Type:</label>
                            <select
                                className='form-select'
                                id="stone_type"
                                name="stone_type"
                                onChange={handalChange}
                                value={editData.stone_type}
                            >   
                                <option value="">NULL</option>
                                <option value="Artificial stone and beads">Artificial stone and beads</option>
                                <option value="Crystals">Crystals</option>
                                <option value="Artificial Stones">Artificial Stones</option>
                            </select>
                        </div>
                    </div>
                    
                    <div style={{width: '100%', backgroundColor: "#00cfff", textAlign: "center", padding: '10px', clear: 'both', marginTop: '5px'}}>Product Color</div>
                    
                    <div className='col-md-12' style={{padding: "5px", display: 'inline-block'}}>
                        <div className="mb-3 formValidation">
                            <label className="form-label" htmlFor="color.ControlInput1">Color: <span className='requiredfield'> *</span></label>
                            <br></br>

                            {
                                colorObj.length > 0  &&
                                colorObj.map((obj, index)=>{
                                    return (
                                        <div className='form-check' style={{background: obj.code, float: 'left', marginLeft: '5px', minWidth: '100px', color: obj.color}} key={index}>
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                value={obj.label} 
                                                id={"flexCheckDefaul"+index} 
                                                style={{marginTop: '10px', marginLeft: '-15px'}} 
                                                /*checked={checkedValues.includes(obj.color)}*/
                                                checked={productObj['color'].includes(obj.label)}
                                                onChange={handleCheckboxChange}
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
                                        <div style={{border: editData["imageHash"][obj].primary === 1?"3px #00cfff dashed":"3px #000 dashed"}}>
                                        {editData["imageHash"][obj].primary === 1 && <><label style={{fontWeight: 'bold', width: '100%', textAlign: 'center', background: '#00cfff', color: '#fff'}}>Primary Image</label> <br></br></>}
                                            <img 
                                                src={require("../../images/delete.png")} 
                                                style={{
                                                    width: '20px',
                                                    position: 'absolute',
                                                    float: 'right',
                                                    right: '20px',
                                                    cursor: 'pointer',
                                                    top: '10px'
                                                }}
                                                alt='delete'
                                                onClick={(e) => { 
                                                    deleteProductImage(obj, obj.toString(), editData["imageHash"][obj].id, editData["imageHash"][obj].product_id)
                                                }}
                                                >

                                            </img>
                                            <img 
                                               // src={require("../../images/product/"+obj)} 
                                                src={`${global.productImageUrl}${obj}`}
                                                alt="No Image" 
                                                style={{ width: '200px', height: '200px'}}
                                                ></img>

                                            {
                                                editData["imageHash"][obj].primary === 0 &&
                                                <label style={{cursor: 'pointer', fontWeight: 'bold', padding: '5px', width: "100%"}}>
                                                    <input
                                                    type="radio"
                                                    id={editData["imageHash"][obj].id}
                                                    name='productImage'
                                                    value="1"
                                                    onClick={(e) => { 
                                                        setPrimary(editData["imageHash"][obj].id, editData["imageHash"][obj].product_id)
                                                    }}
                                                    />
                                                    Set Primary
                                                </label>
                                            }
                                        </div>
                                    </div>
                                );
                            })
                        }    
                    </div>

                    <div className='col-md-12' style={{padding: "5px", display: 'inline-block'}}>
                    {
                    Array.from({ length: uploadImageLength }, (_, index) => (
                        <>
                        <div className="col-md-4" style={{float: 'left', paddingRight: '10px', height: '280px', position: 'relative'}} key={"imageDiv"+(parseInt(index, 10) + 1)}>
                            <label className="form-label" htmlFor="images1.ControlInput">Images: </label>
                            <input type="file" name={"images"+(parseInt(index, 10) + 1)} onChange={handelFile}></input>
                            <div>
                                {previewImage['images'+(parseInt(index, 10) + 1)] && (
                                    <>
                                        <img src={previewImage['images'+(parseInt(index, 10) + 1)]} alt="Selected" style={{ width: '200px', height: '200px', float: 'left' }} />
                                        
                                        <label style={{cursor: 'pointer', fontWeight: 'bold', padding: '5px', width: "100%"}}>
                                            <input
                                            type="radio"
                                            name='productImage'
                                            value="1"
                                            onClick={(e) => { 
                                                setPrimary('images'+(parseInt(index, 10) + 1))
                                            }}
                                            />
                                            Set Primary
                                        </label>
                                  </>
                                    
                                )}
                            </div>
                        </div>
                        </>
                    ))
                    }
                    </div>
                    
                    <div className="mb-3 formValidation">
                        <button 
                            type="submit" 
                            className="signupButton btn btn-primary"
                            onClick={(e) => { 
                                saveProduct(e)
                            }}
                        >Save Product</button>
                    </div>
            </div>
        </>
    )
}
export default ProductAdd