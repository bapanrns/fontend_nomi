import React, {  useEffect, useState } from 'react'
import { Container, Row, Col, Accordion, Form, Image } from 'react-bootstrap';
import { Lang, useFormInputValidation } from "react-form-input-validation";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/css/checkout.css';
import Select from 'react-select';
import axios from "axios";

import {
    useNavigate
  } from "react-router-dom";


 
const Checkout = () => {

    const navigate = useNavigate();
    function productDetailsFn(id){
        navigate("product-details/"+id);
    }
    const [itemCount, setItemCount] = useState({"x": 1, "y": 1, "z": 1});

    function productAddRemoveImgFn(action, id){
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
    }

    const [fields, errors, form] = useFormInputValidation(
        {
          customer_name: "",
          phone_number: "",
          pincode: "",
          alternativeMobileNo: "",
          cityTown: "",
          landmark: ""
        },
        {
          customer_name: "required|username_available",
          phone_number: "required|numeric|digits_between:10,12",
          pincode: "required",
          alternativeMobileNo: "numeric|digits_between:10,12",
          cityTown: "required",
          landmark: "required"
        }
      );
    
      useEffect(() => {
        form.registerAsync("username_available", function (
          username,
          attribute,
          req,
          passes
        ) {
          setTimeout(() => {
            if (username === "foo")
              passes(false, "Username has already been taken.");
            // if username is not available
            else passes();
          }, 1000);
        });
      }, []);
    
      form.useLang(Lang.en);
    
      // let messages = form.getMessages(Lang.en);
      // console.log(messages);
    
      const onSubmit = async (event) => {
        const isValid = await form.validate(event);
        if (isValid) {
            setOpenNewAddress("none");
           // console.log("MAKE AN API CALL", fields);
            const name = fields.customer_name
            event.preventDefault();

            console.log(fields);

            const headers = {
                'Content-Type': 'application/json'
            }

            let data = {};
            data["name"] = fields.customer_name;
            data["phone_number"] = fields.phone_number;
            data["alternativeMobileNo"] = fields.alternativeMobileNo;
            data["pincode"] = fields.pincode;
            data["landmark"] = fields.landmark;
            data["cityTown"] = fields.cityTown;
              
            axios.post('http://localhost:8081/api/new_address', data, {
                headers: headers
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error)
            })

        }
      };
      const [data, setData] = useState([]);
/*
      useEffect(() => {
          
            axios.get('http://localhost:8081/api/users').then((response) => {
                setData(response.data);
                console.log(response.data);
            });



            console.log(data);

        if (form.isValidForm) {
           console.log("MAKE AN API CALL ==> useEffect", fields, errors, form, openNewAddress);
           
        }
      }, []);

*/



    const [openNewAddress, setOpenNewAddress] = useState("none");

    function addNewAddress(){
        setOpenNewAddress("block");
    }

    function editAddress(){
        setOpenNewAddress("block");
    }

    function deliverHere(){
        alert()
    }

    function removeBuyItem(id){
        alert(id);
    }
/*
    function productDetailsFn(pid){
        navigate("../product-details/"+pid);
    }
    */

    return (
        <>
            <Container className='HomeContainer'>
                <Row>
                    <Col md={9}>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header><b>1 &nbsp;&nbsp;&nbsp; Delivery Address</b></Accordion.Header>
                                <Accordion.Body>
                                    <h5>Address</h5>
                                    <div className='deliveryAddress'>
                                        <label>
                                            <Form.Check
                                                label=""
                                                name="deleveryAddress"
                                                type="radio"
                                                id="deleveryAddress1"
                                                value="1"
                                                defaultChecked
                                            />
                                            <span>Bapan Samanta Vi+po: mirpur, Dhonipur bazar, TAMLUK, WEST BENGAL, 721648, India, Phone number: 8240916332 </span>
                                        </label>
                                        <span style={{color: '#00cfff', cursor: 'pointer', paddingLeft: '5px'}} onClick={editAddress}>Edit Address</span>
                                        <label>
                                            <Form.Check
                                                label=""
                                                name="deleveryAddress"
                                                type="radio"
                                                id="deleveryAddress1"
                                                value="1"
                                            />
                                            <span>Tapas Vi+po: mirpur, Dhonipur bazar, TAMLUK, WEST BENGAL, 721648, India, Phone number: 8240916332 </span>
                                        </label>
                                        <label>
                                            <Form.Check
                                                label=""
                                                name="deleveryAddress"
                                                type="radio"
                                                id="deleveryAddress1"
                                                value="1"
                                            />
                                            <span>Rofic Vi+po: mirpur, Dhonipur bazar, TAMLUK, WEST BENGAL, 721648, India, Phone number: 8240916332 </span>
                                        </label>
                                        
                                    </div>
                                    <button type="button" style={{float: 'left'}} className="signupButton btn btn-primary" onClick={deliverHere}>Deliver Here</button>
                                    <div className='addNewAddressLink' onClick={addNewAddress}>+ Add a new address </div>
                                    <div className='addNewAddress' style={{display: openNewAddress, marginBottom: '70px'}}>
                                        <form
                                            className="myForm"
                                            noValidate
                                            autoComplete="off"
                                            onSubmit={onSubmit}
                                        >
                                            <div className="mb-3 formValidation">
                                                <label className="form-label" htmlFor="customer_name.ControlInput1">Name: <span className='requiredfield'> *</span></label>
                                                <input 
                                                    placeholder="" 
                                                    type="text" 
                                                    name='customer_name'
                                                    id="customer_name.ControlInput1" 
                                                    className="form-control" 
                                                    onBlur={form.handleBlurEvent}
                                                    onChange={form.handleChangeEvent}
                                                    value={fields.customer_name}
                                                    // To override the attribute name
                                                data-attribute-name="Customer Name"
                                                data-async
                                                    />
                                                    {errors.customer_name ? <label className="error"> {errors.customer_name} </label> : ""}
                                            </div>

                                            <div className="mb-3 formValidation">
                                                <label className="form-label" htmlFor="phone_number.ControlInput1">Mobile No: <span className='requiredfield'> *</span></label>
                                                <input 
                                                    placeholder="" 
                                                    type="tel" 
                                                    name='phone_number'
                                                    id="phone_number.ControlInput1" 
                                                    className="form-control" 
                                                    onBlur={form.handleBlurEvent}
                                                    onChange={form.handleChangeEvent}
                                                    value={fields.phone_number}
                                                    // To override the attribute name
                                                data-attribute-name="Mobile No."
                                                data-async
                                                    />
                                                    {errors.phone_number ? <label className="error"> {errors.phone_number} </label> : ""}
                                            </div>

                                            <div className="mb-3 formValidation">
                                                <label className="form-label" htmlFor="alternativeMobileNo.ControlInput1">Alternative Mobile No.<span style={{fontSize: "10px", fontWeight: 'bold'}}>( or Whatsapp No.)</span>: </label>
                                                <input 
                                                    placeholder="" 
                                                    type="tel" 
                                                    name='alternativeMobileNo'
                                                    id="alternativeMobileNo.ControlInput1" 
                                                    className="form-control" 
                                                    onBlur={form.handleBlurEvent}
                                                    onChange={form.handleChangeEvent}
                                                    value={fields.alternativeMobileNo}
                                                    // To override the attribute name
                                                data-attribute-name="Alternative Mobile No."
                                                data-async
                                                    />
                                                    {errors.alternativeMobileNo ? <label className="error"> {errors.alternativeMobileNo} </label> : ""}
                                            </div>

                                            <div className="mb-3 formValidation">
                                                <label className="form-label" htmlFor="pincode.ControlInput1">Pincode: <span className='requiredfield'> *</span></label>
                                                <input 
                                                    placeholder="" 
                                                    type="text" 
                                                    name='pincode'
                                                    id="pincode.ControlInput1" 
                                                    className="form-control" 
                                                    onBlur={form.handleBlurEvent}
                                                    onChange={form.handleChangeEvent}
                                                    value={fields.pincode}
                                                    // To override the attribute name
                                                    />
                                                    {errors.pincode ? <label className="error"> {errors.pincode} </label> : ""}
                                            </div>

                                            <div className="mb-3 formValidation">
                                                <label className="form-label" htmlFor="landmark.ControlInput1">Landmark: </label>
                                                <input 
                                                    placeholder="" 
                                                    type="text" 
                                                    name='landmark'
                                                    id="landmark.ControlInput1" 
                                                    className="form-control"  
                                                    onBlur={form.handleBlurEvent}
                                                    onChange={form.handleChangeEvent}
                                                    value={fields.landmark}
                                                    // To override the attribute name
                                                    />

                                                    {errors.landmark ? <label className="error"> {errors.landmark} </label> : ""}
                                                    
                                            </div>
                                            <div className="mb-3 formValidation">
                                                <label className="form-label" htmlFor="cityTown.ControlInput1">City / Town: </label>
                                                <input 
                                                    placeholder="" 
                                                    type="text" 
                                                    name='cityTown'
                                                    id="cityTown.ControlInput1" 
                                                    className="form-control"  
                                                    onBlur={form.handleBlurEvent}
                                                    onChange={form.handleChangeEvent}
                                                    value={fields.cityTown}
                                                    // To override the attribute name
                                                    />
                                                     {errors.cityTown ? <label className="error"> {errors.cityTown} </label> : ""}
                                            </div>
                                            {/*
                                            <div className="mb-3 formValidation">
                                                <label className="form-label" htmlFor="address.ControlInput1">Address<span style={{fontSize: "10px", fontWeight: 'bold'}}>(Area, Street, Sector, Village)</span>: </label>
                                                <textarea 
                                                    className="form-control" 
                                                    id="address.ControlInput1" 
                                                    rows="3"
                                                    name="address"
                                                    value={fields.address}
                                                    onChange={form.handleChangeEvent}
                                                    onBlur={form.handleBlurEvent}
                                                    ></textarea>
                                                    {errors.address ? <label className="error"> {errors.address} </label> : ""}
                                            </div>

                                            <div className="mb-3 formValidation">
                                                <label className="form-label" htmlFor="pickup_place.ControlInput1">Street: </label>
                                                <select
                                                className='form-select'
                                                id="pickup_place"
                                                name="pickup_place"
                                                value={fields.pickup_place}
                                                onChange={form.handleChangeEvent}
                                                onBlur={form.handleBlurEvent}
                                                >
                                                    <option value="">Select One</option>
                                                    <option value="office">Taxi Office</option>
                                                    <option value="town_hall">Town Hall</option>
                                                    <option value="telepathy">We'll Guess!</option>
                                                </select>

                                                {errors.pickup_place ? <label className="error"> {errors.pickup_place} </label> : ""}
                                            </div>
                                        */}
                                            <div className="mb-3 formValidation">
                                                <button type="submit" className="signupButton btn btn-primary">Save Address</button>
                                            </div>
                                        </form>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header><b>2 &nbsp;&nbsp;&nbsp; Item Details</b></Accordion.Header>
                                <Accordion.Body>
                                    <div className='col-md-12 buyOderDetails'>
                                        <div style={{float: 'left'}}>
                                            <Image 
                                                style={{width: '130px', height: '130px'}}
                                                src={`${process.env.PUBLIC_URL}/assets/images/3.png`}
                                            />
                                        </div>
                                        <div className='buyProductInfo'>
                                            <div className='productName' onClick={() => productDetailsFn(1)}>Huggies Dry Pant Diapers with Bubble Bed Technology - S</div>
                                            <div className='productNoPack'>Pack of 1</div>
                                            <div className='productDeliveryOn'>Delivery by Fri Apr 28 | ₹61</div>
                                            <div className='productPrice'><span>₹500</span><span>₹400</span><span>20% OFF</span></div>
                                        </div>
                                        <div style={{ clear: 'both', marginTop: '135px'}}>
                                            <div className='productAddRemoveImg' onClick={() => productAddRemoveImgFn('remove', 'x')}>
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
                                            </div>
                                            <div style={{marginLeft: '160px', fontWeight: 'bold', color: 'red', cursor: 'pointer'}} onClick={() => removeBuyItem('x')}>REMOVE</div>
                                            
                                        </div>

                                    </div>
                                    
                                    <div className='col-md-12 buyOderDetails'>
                                        <Image 
                                            style={{width: '130px', height: '130px'}}
                                            src={`${process.env.PUBLIC_URL}/assets/images/3.png`}
                                        />
                                        <div style={{marginTop: '5px'}}>
                                            <div className='productAddRemoveImg' onClick={() => productAddRemoveImgFn('remove', 'y')}>
                                                <Image 
                                                    src={`${process.env.PUBLIC_URL}/assets/images/negative.png`}
                                                />
                                            </div>
                                            <div className='itemCartCount'>
                                             {itemCount["y"]}
                                            </div>
                                            <div className='productAddRemoveImg' onClick={() => productAddRemoveImgFn('add', 'y')}>
                                                <Image 
                                                    src={`${process.env.PUBLIC_URL}/assets/images/posative.png`}
                                                />
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                    <div className='col-md-12 buyOderDetails'>
                                        <Image 
                                            style={{width: '130px', height: '130px'}}
                                            src={`${process.env.PUBLIC_URL}/assets/images/3.png`}
                                        />
                                        <div style={{marginTop: '5px'}}>
                                            <div className='productAddRemoveImg' onClick={() => productAddRemoveImgFn('remove', 'z')}>
                                                <Image 
                                                    src={`${process.env.PUBLIC_URL}/assets/images/negative.png`}
                                                />
                                            </div>
                                            <div className='itemCartCount'>
                                            {itemCount["z"]}
                                            </div>
                                            <div className='productAddRemoveImg' onClick={() => productAddRemoveImgFn('add', 'z')}>
                                                <Image 
                                                    src={`${process.env.PUBLIC_URL}/assets/images/posative.png`}
                                                />
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            
                            <Accordion.Item eventKey="2">
                                <Accordion.Header><b>3 &nbsp;&nbsp;&nbsp;Payment Option</b></Accordion.Header>
                                <Accordion.Body>
                                Option
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                    <Col md={3}>
                        <div className='PriceDetails'>
                            <div className='orderPriceDetails'>Order Price Details</div>
                            <div className='PriceDetailsItemCount'>
                                <div className='PriceDetailsLeft'>Items: </div>
                                <div className='PriceDetailsRight'>Rs: 3000/-</div>
                            </div>
                            
                            <div className='PriceDetailsDeliveryCharge'>
                                <div className='PriceDetailsLeft'>Delivery Charges: </div>
                                <div className='PriceDetailsRight'>Rs: 0/-</div>
                            </div>

                            <div className='PriceDetailsTotalAmount'>
                                <div className='PriceDetailsLeft'>Total Amount: </div>
                                <div className='PriceDetailsRight'>Rs: 3000/-</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Checkout
