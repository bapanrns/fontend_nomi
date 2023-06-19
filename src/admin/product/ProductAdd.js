import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-horizontal-scrolling-menu/dist/styles.css';
import axios from "axios";
import global from "../../components/global";



const ProductAdd = () => {
    const colorObj = [{"color": "Blue", "code": "#175195"},
    {"color": "Yellows", "code": "#feee2f"},
    {"color": "Black", "code": "#000"},
    {"color": "Greys", "code": "#848484"},
    {"color": "Browns", "code": "#744113"},
    {"color": "Beige", "code": "#c5bf9c"},
    {"color": "Reds", "code": "#be0000"},
    {"color": "Pinks", "code": "#f7007c"},
    {"color": "Oranges", "code": "#fba13e"},
    {"color": "Green", "code": "#66bf19"},
    {"color": "Blue", "code": "blue"},
    {"color": "Blue", "code": "blue"},
    {"color": "Blue", "code": "blue"},
    {"color": "Blue", "code": "blue"},
    {"color": "Blue", "code": "blue"},
    ];
    
    const [previewImage, setPreviewImage] = useState({
        images: null,
        images2: null,
        images3: null,
        images4: null,
        images5: null 
    });
    
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
   
    const onSubmit = async (event) => {
        // console.log("MAKE AN API CALL", fields);
        event.preventDefault();
        //console.log(productObj);

        const headers = {
            'Content-Type': 'application/json'
        }
        axios.post(global["axios_url"]+'/productAdd', productObj, {
            headers: headers
        })
        .then((response) => {
            alert(response.data);
           // console.log(JSON.parse(JSON.stringify(response)))
            //navigate("../admin/product_fabric/");
        })
        .catch((error) => {
            console.log(error)
            alert(error);
        })
    };

    const AcceptNumericValue = e => {
        var key = e.key;
        var regex = /[0-9]|\./;
        if( !regex.test(key) ) {
            e.preventDefault();
        }
       /* else {
            console.log( "You pressed a key: " + key );
        }*/
    }
    const [productPrice, setproductPrice] = useState(0);
    const sellProductPriceFn = (e) =>{
        setproductPrice(e.target.value);
    }

    const [offerPrice, setofferPrice] = useState(0);

    const calculateOfferprice = (e) =>{
        //console.log(e.target.value)
        if (e.target.value > 0){
            let price = parseInt(productPrice) + parseInt(productPrice * e.target.value/100);
            setofferPrice(price)
            // Set Offer Price
            setProductObj({...productObj, ["product_offer_price"]: price})
        }
    }

    useEffect(() => {
        getCategory();
        getProductFebric();
    }, []);
    // For category
    const [categoryObj, setCategoryObj] = useState([]);
    async function getCategory(){
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
        })
        .catch((error) => {
            console.log(error)
        })
    }

    // For Product Febric
    const [productFebricObj, setProductFebricObj] = useState([]);
    async function getProductFebric(){
        const headers = {
            'Content-Type': 'application/json'
        }
        
        let data = {};
        await axios.post(global["axios_url"]+'/AllProductFabric', data, {
            headers: headers
        })
        .then((response) => {
            if(response.data.length > 0){
                setProductFebricObj(response.data)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    // For Sub Category
    const [subCategoryObj, setSubCategoryObj] = useState([]);
    async function getSubCategory(id){
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
        })
        .catch((error) => {
            console.log(error)
        })
    }
    // Edit 
    const [productObj, setProductObj] = useState({
        id: "",
        category_id: "",
        sub_category_id: "",
        product_name: "",
        active_status: "",
        company_name: "",
        year_month: "",
        product_original_price: "",
        product_selling_price: "",
        product_offer_percentage: "",
        delivery_charges: "",
        quantity: "",
        quantityXs: "",
        quantityS: "",
        quantityL: "",
        quantityM: "",
        quantityXl: "",
        quantity2Xl: "",
        product_febric_id: "",
        product_febric: "",
        color: [],
        product_offer_price: "",
        images: null,
        images2: null,
        images3: null,
        images4: null,
        images5: null,
        saree_length: 5.5,
        blouse: "No",
        blouse_length: ".8",
        weight:""
    });
    const [hideQuantity, sethideQuantity] = useState({
        display: "none"
    });
    const [hideQuantityType, sethideQuantityType] = useState({
        display: "none"
    });
    const handalChange = (e) =>{
        if(e.target.name === "product_febric"){
            //console.log(e.target.value.split("@"));
            setProductObj({...productObj, 
                ["product_febric_id"]: e.target.value.split("@")[0], 
                ["product_febric"]: e.target.value.split("@")[1]
            })
        }else{
            setProductObj({...productObj, [e.target.name]:e.target.value})
        }

        if (e.target.name === "category_id"){
            if(e.target.value === "2"){
                sethideQuantityType({
                    display: "block"
                });
                sethideQuantity({
                    display: "none"
                });
            }else{
                sethideQuantityType({
                    display: "none"
                });
                sethideQuantity({
                    display: "block"
                });
            }
            getSubCategory(e.target.value);
        }
    }

    const [checkedValues, setCheckedValues] = useState([]);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setCheckedValues([...checkedValues, value]);
            setProductObj({...productObj, ['color']: [...productObj['color'], value]})
        } else {
            setCheckedValues(checkedValues.filter((item) => item !== value));
            
            setProductObj({...productObj, ['color']: productObj['color'].filter((item) => item !== value)})
        }
    };


    const [editData, setEditData] = useState({
        id: "",
        category_id: "",
        subCategory_id: "",
        sub_category_name: "",
        active_status: "",
        product_fabric_id: ""
    });

    return (
        <>
            <div className='addNewAddress' style={{padding: '10px'}}>
                <h3 style={{textAlign: 'center'}}>Product Add</h3>
                <form
                    className="myForm"
                    noValidate
                    autoComplete="off"
                    onSubmit={onSubmit}
                >
                    <div className='col-md-6' style={{float: 'left', padding: "5px"}}>
                    <div className="mb-3 formValidation">
                            <label className="form-label" htmlFor="category_id.ControlInput1">Category: <span className='requiredfield'> *</span></label>
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
                                        return (<option key={index} selected={editData.category_id === data.id?"selected":""} value={data.id} >{data.category_name}</option>);
                                    })

                                }
                                
                            </select>
                        </div>
                        <div className="mb-3 formValidation">
                            <label className="form-label" htmlFor="sub_category_id.ControlInput1">Sub Category: <span className='requiredfield'> *</span></label>
                            <select
                                className='form-select'
                                id="sub_category_id"
                                name="sub_category_id"
                                onChange={handalChange}
                                >
                                <option value="">Select Sub Category</option>
                                {
                                    
                                    subCategoryObj.map((data, index)=>{
                                        return (<option key={index} selected={editData.subCategory_id === data.id?"selected":""} value={data.id} >{data.sub_category_name}</option>);
                                    })

                                }
                                
                            </select>
                        </div>

                        <div className="mb-3 formValidation">
                            <label className="form-label" htmlFor="product_original_price.ControlInput1">Buy Price: <span className='requiredfield'> *</span></label>
                            <input 
                                type="text" 
                                name='product_original_price'
                                id="product_original_price.ControlInput1" 
                                className="form-control"
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                            />
                        </div>
                        
                        <div className="mb-3 formValidation">
                            <label className="form-label" htmlFor="product_selling_price.ControlInput1">Sell Price: <span className='requiredfield'> *</span></label>
                            <input 
                                type="text" 
                                name='product_selling_price'
                                id="product_selling_price.ControlInput1" 
                                className="form-control"
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onBlur={sellProductPriceFn}
                                onChange={handalChange}
                            />
                        </div>

                        <div className="mb-3 formValidation">
                            <label className="form-label" htmlFor="product_offer_percentage.ControlInput1">Offer: </label>
                            <input 
                                type="text" 
                                name='product_offer_percentage'
                                id="product_offer_percentage.ControlInput1" 
                                className="form-control"
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onBlur={(e) => calculateOfferprice(e)}
                                onChange={handalChange}
                            />
                        </div>
                        <div className="mb-3 formValidation">
                            <label className="form-label" htmlFor="product_offer_price.ControlInput1">Offer Price: </label>
                            <input 
                                type="text" 
                                value={offerPrice}
                                readOnly
                                name='product_offer_price'
                                id="product_offer_price.ControlInput1" 
                                className="form-control"
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                            />
                        </div>
                        <div className="mb-3 formValidation">
                            <label className="form-label" htmlFor="delivery_charges.ControlInput1">Delivery Charges: </label>
                            <input 
                                type="text" 
                                name='delivery_charges'
                                id="delivery_charges.ControlInput1" 
                                className="form-control"
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                            />
                        </div>
                        
                        <div className="mb-3 formValidation">
                            <label className="form-label" htmlFor="year_month.ControlInput1">Year Month: <span className='requiredfield'> *</span></label>
                            <select
                                className='form-select'
                                id="year_month"
                                name="year_month"
                                onChange={handalChange}
                            >   
                                <option value="">NULL</option>
                                <option value="2023-04">2023-04</option>
                                <option value="2023-05">2023-05</option>
                            </select>
                        </div>
                        <div className="mb-3 formValidation" style={hideQuantity}>
                            <label className="form-label" htmlFor="saree_length">Saree Length:</label>
                            <input 
                                type="text" 
                                name='saree_length'
                                id="saree_length" 
                                className="form-control"
                                value={5.5}
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                            />
                        </div>
                        <div className="mb-3 formValidation" style={hideQuantity}>
                            <label className="form-label" htmlFor="blouse.ControlInput1">Blouse Piece:</label>
                            <select
                                className='form-select'
                                id="blouse"
                                name="blouse"
                                onChange={handalChange}
                            >   
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>
                        <div className="mb-3 formValidation" style={hideQuantity}>
                            <label className="form-label" htmlFor="blouse_length">Blouse Length:</label>
                            <input 
                                type="text" 
                                name='blouse_length'
                                id="blouse_length" 
                                className="form-control"
                                value={.8}
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                            />
                        </div>
                        <div className="mb-3 formValidation" style={hideQuantity}>
                            <label className="form-label" htmlFor="weight">Weight:</label>
                            <input 
                                type="text" 
                                name='weight'
                                id="weight" 
                                className="form-control"
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                            />
                        </div>
                    </div>
                    <div className='col-md-6' style={{float: 'left', padding: "5px"}}>
                        <div className="mb-3 formValidation" style={hideQuantity}>
                            <label className="form-label" htmlFor="quantity.ControlInput1">Quantity: <span className='requiredfield'> *</span></label>
                            <input 
                                type="text" 
                                name='quantity'
                                id="quantity.ControlInput1" 
                                className="form-control"
                                onKeyPress={(e) => AcceptNumericValue(e)}
                                onChange={handalChange}
                            />
                        </div>
                        
                        <div className="mb-3 formValidation 1" style={hideQuantityType}>
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
                        
                        <div className="mb-3 formValidation" style={hideQuantityType}>
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
                        
                        <div className="mb-3 formValidation" style={hideQuantityType}>
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
                        
                        <div className="mb-3 formValidation" style={hideQuantityType}>
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
                        
                        <div className="mb-3 formValidation" style={hideQuantityType}>
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
                        
                        <div className="mb-3 formValidation" style={hideQuantityType}>
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
                        <div className="mb-3 formValidation">
                            <label className="form-label" htmlFor="product_name.ControlInput1">Product Name: <span className='requiredfield'> *</span></label>
                            <input 
                                placeholder="" 
                                type="text" 
                                name='product_name'
                                id="product_name.ControlInput1" 
                                className="form-control" 
                                onChange={handalChange}
                                />
                        </div>
                        <div className="mb-3 formValidation">
                            <label className="form-label" htmlFor="company_name.ControlInput1">Company Name: <span className='requiredfield'> *</span></label>
                            <input 
                                placeholder="" 
                                type="text" 
                                name='company_name'
                                id="company_name.ControlInput1" 
                                className="form-control" 
                                onChange={handalChange}
                                />
                        </div>
                        
                        <div className="mb-3 formValidation">
                            <label className="form-label" htmlFor="product_febric.ControlInput1">Product Fabric: <span className='requiredfield'> *</span></label>
                            <select
                                className='form-select'
                                id="product_febric"
                                name="product_febric"
                                onChange={handalChange}
                                >
                                <option value="">Select Product Fabric</option> 
                                {
                                    productFebricObj.length > 0  &&
                                    productFebricObj.map((data, index)=>{
                                        return (<option key={index} selected={editData.product_fabric_id === data.id?"selected":""} value={data.id+"@"+data.product_fabric_name} >{data.product_fabric_name}</option>);
                                    })

                                }
                            </select>
                        </div>

                        <div className="mb-3 formValidation">
                            <label className="form-label" htmlFor="color.ControlInput1">Color: <span className='requiredfield'> *</span></label>
                            <br></br>

                            {
                                colorObj.length > 0  &&
                                colorObj.map((obj, index)=>{
                                    return (
                                        <div className='form-check' style={{background: obj.code, float: 'left', width: 'auto', marginLeft: '5px', width: '100px', color: '#fff'}}>
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                value={obj.color} 
                                                id={"flexCheckDefaul"+index} 
                                                style={{marginTop: '10px', marginLeft: '-15px'}} 
                                                /*checked={checkedValues.includes(obj.color)}*/
                                                checked={productObj['color'].includes(obj.color)}
                                                onChange={handleCheckboxChange}
                                                />
                                            <label 
                                                className="form-check-label" 
                                                for={"flexCheckDefaul"+index} 
                                                style={{padding: '5px', cursor: 'pointer'}}
                                                >
                                                {obj.color}
                                            </label>
                                        </div>
                                    );
                                })

                            }
                        </div>
                        <br></br>
                        <div className="mb-3 formValidation" style={{clear: 'both'}}>
                            <label className="form-label" htmlFor="images1.ControlInput">Images: <span className='requiredfield'> *</span></label>
                            <input type="file" name="images" onChange={handelFile}></input>

                            {previewImage['images'] && (
                                <div style={{float: 'right'}}>
                                    <img src={previewImage['images']} alt="Selected" style={{ maxWidth: '100%', height: '100px' }} />
                                </div>
                            )}
                        </div>
                        <div className="mb-3 formValidation" style={{clear: 'both'}}>
                            <label className="form-label" htmlFor="images2.ControlInput">Images 2: <span className='requiredfield'> *</span></label>
                            <input type="file" name="images2" onChange={handelFile}></input>

                            {previewImage['images2'] && (
                                <div style={{float: 'right'}}>
                                    <img src={previewImage['images2']} alt="Selected" style={{ maxWidth: '100%', height: '100px' }} />
                                </div>
                            )}
                        </div>
                        <div className="mb-3 formValidation" style={{clear: 'both'}}>
                            <label className="form-label" htmlFor="images3.ControlInput">Images 3: <span className='requiredfield'> *</span></label>
                            <input type="file" name="images3" onChange={handelFile}></input>

                            {previewImage['images3'] && (
                                <div style={{float: 'right'}}>
                                    <img src={previewImage['images3']} alt="Selected" style={{ maxWidth: '100%', height: '100px' }} />
                                </div>
                            )}
                        </div>
                        <div className="mb-3 formValidation" style={{clear: 'both'}}>
                            <label className="form-label" htmlFor="images4.ControlInput">Images 4: <span className='requiredfield'> *</span></label>
                            <input type="file" name="images4" onChange={handelFile}></input>

                            {previewImage['images4'] && (
                                <div style={{float: 'right'}}>
                                    <img src={previewImage['images4']} alt="Selected" style={{ maxWidth: '100%', height: '100px' }} />
                                </div>
                            )}
                        </div>
                        <div className="mb-3 formValidation" style={{clear: 'both'}}>
                            <label className="form-label" htmlFor="images2.ControlInput">Images 5: <span className='requiredfield'> *</span></label>
                            <input type="file" name="images5" onChange={handelFile}></input>

                            {previewImage['images5'] && (
                                <div style={{float: 'right'}}>
                                    <img src={previewImage['images5']} alt="Selected" style={{ maxWidth: '100%', height: '100px' }} />
                                </div>
                            )}
                        </div>
                    </div>
                    

                    <div className="mb-3 formValidation">
                        <button type="submit" className="signupButton btn btn-primary">Save Product</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default ProductAdd