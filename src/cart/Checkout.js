import React, {  useEffect, useState } from 'react'
import { Container, Row, Col, Accordion, Form, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/css/checkout.css';
import global from "../components/global";
// Notification
import { toast } from 'react-toastify';
import Joi from 'joi';

import {
    useNavigate
  } from "react-router-dom";

import axiosInstance from '../components/axiosInstance';


 
const Checkout = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [cartData, setCartData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [grossTotal, setGrossTotal] = useState(0);
    useEffect(() => {
        getCartData();
        getAddress();
    }, []);
    
    const getCartData=()=>{
        setIsLoading(true);
        
        let itemIds = localStorage.getItem('cart') || "[]"
        let data = {itemIds: itemIds};
        axiosInstance.post('/getCartData', data)
        .then((response) => {
            setCartData(response.data.itemListHash);
            setTotalPrice(response.data.total_price);
            setDeliveryCharge(response.data.deliveryCharge);
            setGrossTotal(response.data.grossTotal);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

    const navigate = useNavigate();
    function productDetailsFn(id){
        navigate("product-details/"+id);
    }
    const [itemCount, setItemCount] = useState({"x": 1, "y": 1, "z": 1});

    /*function productAddRemoveImgFn(action, id){
        if(action === "add"){
            setItemCount(prevState => ({
                ...prevState,
                [id]: itemCount[id] + 1,
            }))
        }else{
            if(itemCount[id] - 1 > 0){
                setItemCount(prevState => ({
                    ...prevState,
                    [id]: itemCount[id] - 1,
                }))
            }else{
                alert('Only one product left');
            }
        }
        console.log(itemCount);
    }*/

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        mobile_no: '',
        pincode: '',
        alternative_mobile_no: '',
        village: '',
        city: '',
        landmark: ''
    });

    const schema = Joi.object({
        name: Joi.string().required(),
        mobile_no: Joi.number().required(),
        pincode: Joi.string().required(),
        alternative_mobile_no: Joi.number().required(),
        village: Joi.string().required(),
        city: Joi.string().required(),
        landmark: Joi.string().required()
    });

    const handalChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setSaveData({
            ...saveData,
            [e.target.name]: e.target.value,
        });
    }
    
    const onSubmit = async (event) => {
        const validationResult = schema.validate(formData, { abortEarly: false });
        //console.log(validationResult.error);
        if (validationResult.error) {
            const validationErrors = {};
            validationResult.error.details.forEach((error) => {
                validationErrors[error.path[0]] = error.message;
            });
            setErrors(validationErrors);

            console.log(errors)
        } else {
            if(["721648", "721636"].includes(saveData.pincode)){
            // console.log("MAKE AN API CALL", fields);
                event.preventDefault();
                
                axiosInstance.post('/new_address', saveData)
                .then((response) => {
                    if(response.data.success > 0){
                        toast.success('Delivery address save successfully.', {
                            position: toast.POSITION.TOP_CENTER,
                        });
                        setOpenNewAddress("none");
                        getAddress();
                    }else{
                        toast.error('Error.', {
                            position: toast.POSITION.TOP_CENTER,
                        });
                    }
                })
                .catch((error) => {
                    console.log('Error:', error);
                });
            }else{
                toast.warn('We are not available in the '+saveData.pincode+' postal code.', {
                    position: toast.POSITION.TOP_CENTER,
                });
            }

        }
    };


    const [openNewAddress, setOpenNewAddress] = useState("none");

    function addNewAddress(){
        setSaveData({
            id: 0,
            name: "",
            mobile_no: "",
            alternative_mobile_no: "",
            pincode: "",
            landmark: "",
            city: "",
            village: ""
        });
        setOpenNewAddress("block");
    }

     
    const [saveData, setSaveData] = useState({
        id: 0,
        name: "",
        mobile_no: "",
        alternative_mobile_no: "",
        pincode: "",
        landmark: "",
        city: "",
        village: ""
    });
    function editAddress(id){
        setOpenNewAddress("block");
        setIsLoading(true);
        let data = {addressId: id};
        axiosInstance.post('/getAddressById', data)
        .then((response) => {
            setIsLoading(false);

            setSaveData({
                id: response.data.id,
                name: response.data.name,
                mobile_no: response.data.mobile_no,
                alternative_mobile_no: response.data.alternative_mobile_no,
                pincode: response.data.pincode,
                landmark: response.data.landmark,
                city: response.data.city,
                village: response.data.village
            });
            setFormData({
                ...formData,
                name: response.data.name,
                mobile_no: response.data.mobile_no,
                alternative_mobile_no: response.data.alternative_mobile_no,
                pincode: response.data.pincode,
                landmark: response.data.landmark,
                city: response.data.city,
                village: response.data.village
            });
        })
        .catch((error) => {
            console.log('Error:', error);
        });

    }

    const deleteAddress = (id) =>{
        let data = {addressId: id};
        setIsLoading(true);
        axiosInstance.post('/deleteAddress', data)
        .then((response) => {
            setIsLoading(false);
            toast.success('Deleted successfully.', {
                position: toast.POSITION.TOP_CENTER,
            });
            getAddress();
        })
        .catch((error) => {
            console.log('Error:', error);
        });
    }
    const removeItem = (keyToDeleteId, size) =>{
        const confirmed = window.confirm('Are you sure you want to removed this item?');
        if (confirmed) {
            let data = {itemIds: keyToDeleteId};
            axiosInstance.post('/removeCartData', data)
            .then((response) => {
                setIsLoading(false);
                if(response.data.success){
                props.removeCartItem(keyToDeleteId+"@"+size);
                getCartData();
                }else{
                alert('Not removed');
                }
            })
            .catch((error) => {
                console.log('Error:', error);
            });
        }
    }

  
    const [showAddress, setShowAddress] = useState([]);
    const getAddress = () =>{
        let data = {};
        axiosInstance.post('/getAddress', data)
        .then((response) => {
            setIsLoading(false);
            setShowAddress(response.data);
        })
        .catch((error) => {
            console.log('Error:', error);
        });
    }

    const [deliveryAddress, setDeliveryAddress] = useState("");
    const continueToBuy =()=>{
        const total_items = Object.keys(cartData) || [];
        console.log(total_items.length);
        if(total_items.length === 0){
            toast.warn('There are no items in the cart. Please add items to your cart.', {
                position: toast.POSITION.TOP_CENTER,
            });
        }else if(deliveryAddress !== ""){
            console.log(total_items);

            let data = {deliveryAddress: deliveryAddress, items: JSON.parse(localStorage.getItem("cart"))};
            //console.log(data);
            console.log("===", data.items.length)
            setIsLoading(true);
            axiosInstance.post('/continueToBuy', data)
            .then((response) => {
                setIsLoading(false);
                if(parseInt(data.items.length) === parseInt(response.data.outOfStockItemArray.length)){
                    toast.warn('All items are out of stack.', {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }else{
                    for(let i=0; i<response.data.buy_item.length; i++){
                        props.removeCartItem(response.data.buy_item[i], true);
                    }
                    toast.success('Order place successfully.', {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    navigate("../my-order/");
                }
            })
            .catch((error) => {
                console.log('Error:', error);
                setIsLoading(false);
            });
        }else{
            toast.warn('Please select a delivery address.', {
                position: toast.POSITION.TOP_CENTER,
            });
            setActiveKey("1")
        }
    }

/*
    function productDetailsFn(pid){
        navigate("../product-details/"+pid);
    }
    */

    let myStyle = {
        display: "block",
        backgroundColor: "#cccc"
    };
    const [activeKey, setActiveKey] = useState(0);

    return (
        <>
            <Container className='HomeContainer'>
                <Row>
                    <Col md={9}>
                        <Accordion defaultActiveKey={activeKey.toString()}>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header><b>1 &nbsp;&nbsp;&nbsp; Item Details</b></Accordion.Header>
                                <Accordion.Body>
                                    {Object.keys(cartData).map((product_id, key) => (
                                    <div className='col-md-12 buyOderDetails' key={"buyOderDetails-"+key}>
                                        <div className={(cartData[product_id].quantity === 0)?"outOfStockItem":""}>
                                            <span>{(cartData[product_id].quantity === 0)?"Out OF Stock":""}</span>
                                        </div>
                                        <div style={{float: 'left', position: "relative"}}>
                                            <Image 
                                                style={{width: '130px', height: '130px'}}
                                                //src={require(`../images/product/${cartData[product_id].image_name}`)} 
                                                src={`${global.productImageUrl}${cartData[product_id].image_name}`}
                                                alt='No Image found'
                                            />
                                            <span className='nId'>N{product_id}</span>
                                        </div>
                                        <div className='buyProductInfo'>
                                            <div className='productName' onClick={() => productDetailsFn(cartData[product_id].item_id)}>{cartData[product_id].company_name}</div>
                                            <div className='productNoPack'>Pack of 1</div>
                                            <div className='productDeliveryOn'>Delivery by Fri Apr 28 | ₹61</div>
                                            <div className='productPrice'><span>₹{cartData[product_id].offerPrice}</span><span>₹{cartData[product_id].price}</span><span>{(cartData[product_id].newPercentage >0)?cartData[product_id].newPercentage:""}{(cartData[product_id].newPercentage)>0?"% OFF":""}</span></div>
                                        </div>
                                        <div style={{ clear: 'both', marginTop: '135px'}}>
                                            { cartData[product_id].quantity > 0 &&
                                            
                                            <div>
                                               {/* <div className='productAddRemoveImg' onClick={() => productAddRemoveImgFn('remove', 'x')}>
                                                    <Image 
                                                        src={`${process.env.PUBLIC_URL}/assets/images/negative.png`}
                                                        
                                                    />
                                                </div>
                                                <div className='itemCartCount'>
                                                    {itemCount["x"]}
                                                </div>
                                                <div className='productAddRemoveImg' onClick={() => productAddRemoveImgFn('add', 'x')}>
                                                    <Image 
                                                        src={`${process.env.PUBLIC_URL}/assets/images/posative.png`}
                                                    />
                                                </div>*/}
                                            </div>
                                            }
                                            <div style={{marginLeft: '160px', fontWeight: 'bold', color: 'red', cursor: 'pointer'}} onClick={() => removeItem(product_id, cartData[product_id].size)}>REMOVE</div>
                                            
                                        </div>

                                    </div>

                                    ))}
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1" disabled>
                                <Accordion.Header><b>2 &nbsp;&nbsp;&nbsp; Enter Delivery Address</b></Accordion.Header>
                                <Accordion.Body>
                                    <h5>Address</h5>
                                    {showAddress.length > 0 &&
                                    showAddress.map((addressObj, key) => (
                                        <div className='deliveryAddress' key={key+"-deliveryAddress"}>
                                            <label>
                                                <Form.Check
                                                    label=""
                                                    name="deleveryAddress"
                                                    type="radio"
                                                    id="deleveryAddress1"
                                                    value={addressObj.id}
                                                    onChange={(e) => { 
                                                        setDeliveryAddress(addressObj.id+"-"+addressObj.pincode)
                                                    }}
                                                />
                                              
                                                <span className='fullAddressDetails'>{addressObj.name}, {addressObj.village}, {addressObj.landmark}, {addressObj.pincode}, {addressObj.mobile_no}, {addressObj.alternative_mobile_no}</span>
                                            </label>
                                            <span 
                                                className='addressEdit'
                                                onClick={(e) => { 
                                                    editAddress(addressObj.id)
                                                }}>Edit Address</span>

                                            <span 
                                                className='addressDelete'
                                                onClick={(e) => { 
                                                    deleteAddress(addressObj.id)
                                                }}>Delete Address</span>
                                            
                                        </div>
                                    ))}
                                    
                                    <div className='addNewAddressLink' onClick={addNewAddress}>+ Add a new address </div>
                                    <div className='addNewAddress' style={{display: openNewAddress, marginBottom: '70px'}}>
                                        <div role="dialog" aria-modal="true" className="fade modal show" style={myStyle}>
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header modalHeader">
                                                        <div className="modal-title h4">Delivery Address</div>
                                                        <button type="button" className="btn-close closeBtn" aria-label="Close"
                                                        onClick={(e) => { 
                                                            setOpenNewAddress("none")
                                                        }}
                                                        ></button>
                                                    </div>
                                                    <div className="modal-body" style={{paddingBottom: 0}}>  
                                                        <div className="mb-3 formValidation">
                                                            <label className="form-label" htmlFor="name.ControlInput1">Name: <span className='requiredfield'> *</span></label>
                                                            <input 
                                                                placeholder="" 
                                                                type="text" 
                                                                name='name'
                                                                id="name.ControlInput1" 
                                                                className="form-control" 
                                                                onChange={handalChange}
                                                                value={saveData.name}
                                                                maxLength={255}
                                                                // To override the attribute name
                                                            data-attribute-name="Customer Name"
                                                            data-async
                                                                />
                                                                {errors.name ? <label className="error"> {errors.name} </label> : ""}
                                                        </div>

                                                        <div className="mb-3 formValidation">
                                                            <label className="form-label" htmlFor="mobile_no.ControlInput1">Mobile No: <span className='requiredfield'> *</span></label>
                                                            <input 
                                                                placeholder="" 
                                                                type="tel" 
                                                                name='mobile_no'
                                                                id="mobile_no.ControlInput1" 
                                                                className="form-control" 
                                                                onChange={handalChange}
                                                                value={saveData.mobile_no}
                                                                maxLength={10}
                                                                // To override the attribute name
                                                            data-attribute-name="Mobile No."
                                                            data-async
                                                                />
                                                                {errors.mobile_no ? <label className="error"> {errors.mobile_no} </label> : ""}
                                                        </div>

                                                        <div className="mb-3 formValidation">
                                                            <label className="form-label" htmlFor="alternative_mobile_no.ControlInput1">Alternative Mobile No.<span style={{fontSize: "10px", fontWeight: 'bold'}}>( or Whatsapp No.)</span>: </label>
                                                            <input 
                                                                placeholder="" 
                                                                type="tel" 
                                                                name='alternative_mobile_no'
                                                                id="alternative_mobile_no.ControlInput1" 
                                                                className="form-control" 
                                                                
                                                                onChange={handalChange}
                                                                value={saveData.alternative_mobile_no}
                                                                maxLength={10}
                                                                // To override the attribute name
                                                            data-attribute-name="Alternative Mobile No."
                                                            data-async
                                                                />
                                                                {errors.alternative_mobile_no ? <label className="error"> {errors.alternative_mobile_no} </label> : ""}
                                                        </div>
                                                        
                                                        <div className="mb-3 formValidation">
                                                            <label className="form-label" htmlFor="landmark.village">Village/Ward no.: <span className='requiredfield'> *</span></label>
                                                            <input 
                                                                placeholder="" 
                                                                type="text" 
                                                                name='village'
                                                                id="landmark.village" 
                                                                className="form-control"  
                                                                
                                                                onChange={handalChange}
                                                                value={saveData.village}
                                                                // To override the attribute name
                                                                maxLength={255}
                                                                />
                                                            {errors.village ? <label className="error"> {errors.village} </label> : ""}
                                                        </div>

                                                        <div className="mb-3 formValidation">
                                                            <label className="form-label" htmlFor="pincode.ControlInput1">Pincode: <span className='requiredfield'> *</span></label>
                                                            <input 
                                                                placeholder="" 
                                                                type="text" 
                                                                name='pincode'
                                                                id="pincode.ControlInput1" 
                                                                className="form-control" 
                                                                
                                                                onChange={handalChange}
                                                                value={saveData.pincode}
                                                                maxLength={6}
                                                                // To override the attribute name
                                                                />
                                                                {errors.pincode ? <label className="error"> {errors.pincode} </label> : ""}
                                                        </div>

                                                        <div className="mb-3 formValidation">
                                                            <label className="form-label" htmlFor="landmark.ControlInput1">Landmark: <span className='requiredfield'> *</span></label>
                                                            <input 
                                                                placeholder="" 
                                                                type="text" 
                                                                name='landmark'
                                                                id="landmark.ControlInput1" 
                                                                className="form-control"  
                                                                
                                                                onChange={handalChange}
                                                                value={saveData.landmark}
                                                                // To override the attribute name
                                                                maxLength={255}
                                                                />

                                                                {errors.landmark ? <label className="error"> {errors.landmark} </label> : ""}
                                                                
                                                        </div>
                                                        <div className="mb-3 formValidation">
                                                            <label className="form-label" htmlFor="city.ControlInput1">City / Town: <span className='requiredfield'> *</span></label>
                                                            <input 
                                                                placeholder="" 
                                                                type="text" 
                                                                name='city'
                                                                id="city.ControlInput1" 
                                                                className="form-control"  
                                                                
                                                                onChange={handalChange}
                                                                value={saveData.city}
                                                                maxLength={255}
                                                                // To override the attribute name
                                                                />
                                                                {errors.city ? <label className="error"> {errors.city} </label> : ""}
                                                        </div>
                                                        
                                                        <div className="mb-3 formValidation">
                                                            <button type="button" onClick={onSubmit} className="signupButton btn btn-primary">Save Address</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            
                            
                            <Accordion.Item eventKey="2">
                                <Accordion.Header><b>3 &nbsp;&nbsp;&nbsp;Payment Option</b></Accordion.Header>
                                <Accordion.Body>
                                <div className='deliveryAddress'>
                                    <label>
                                        <Form.Check
                                            label=""
                                            name="payment"
                                            type="radio"
                                            id="payment"
                                            value="1"
                                            defaultChecked
                                        />
                                        
                                        <span className='fullAddressDetails'>Cash on Delivery</span>
                                    </label>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                    <Col md={3}>
                        <div className='PriceDetails'>
                            <div className='orderPriceDetails'>Order Price Details</div>
                            <div className='PriceDetailsItemCount'>
                                <div className='PriceDetailsLeft'>Items: </div>
                                <div className='PriceDetailsRight'>Rs: {totalPrice}/-</div>
                            </div>
                            
                            <div className='PriceDetailsDeliveryCharge'>
                                <div className='PriceDetailsLeft'>Delivery Charges: </div>
                                <div className='PriceDetailsRight'>Rs: {deliveryCharge}/-</div>
                            </div>

                            <div className='PriceDetailsTotalAmount'>
                                <div className='PriceDetailsLeft'>Total Amount: </div>
                                <div className='PriceDetailsRight'>Rs: {grossTotal}/-</div>
                            </div>

                            <div className='continueToBuy' onClick={continueToBuy}>
                                Continue To Buy
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Checkout
