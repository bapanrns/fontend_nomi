import React, { useState, useEffect } from 'react'
import {Container, Row, Col, Image, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../components/css/itemDetails.css';

import 'react-horizontal-scrolling-menu/dist/styles.css';
import Loader from '../components/Loader'
import global from "../components/global";
import axios from "axios";
// Notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Carousel as ImageCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import SubNavBars from '../components/SubNavBars';

import YoutubeEmbed from "../components/YoutubeEmbed";
import ShareLink from '../components/ShareLink'; 

import {
    useNavigate,
    useParams
  } from "react-router-dom";

const ItemDetails = (e) => {
    const [isLoading, setIsLoading] = useState(false);
    const {id} = useParams();
    //const [imageUrl, setImageUrl] = useState(process.env.PUBLIC_URL+"/assets/images/"+id+".png");
    
    const [delivaryPincode, setDelivaryPincode] = useState();
    const [itemSize, setItemSize] = useState("");

    useEffect(() => {
        getItemDetails(id);
        let pincode = localStorage.getItem("pincode") || "";
        if(pincode !==""){
            setDeliveryCodeValid(true);
            setDelivaryPincode(pincode);
        }
    }, [id]);
    const [itemsObj, setItemObj] = useState({
        itemImageArray: [],
        youtube_link: "",
        quantity: []
    }); 
    const [sellPrice, setSellPrice] = useState(0);
    const [offerPrice, setOfferPrice] = useState(0);
    const [newPercentage, setNewPercentage] = useState(0);
    const [itemWiseSize, setItemWiseSize] = useState([]);
    const getItemDetails = (id) => {
        setIsLoading(true);
        setItemSize("");
        const headers = {
            'Content-Type': 'application/json'
        }
        
        let data = {id: id};
        axios.post(global["axios_url"]+'/getItemsDetails', data, {
            headers: headers
        })
        .then((response) => {
            //console.log(response.data[0]);
            setItemObj(response.data[0]);
            setIsLoading(false);
            if([2, 6].includes(response.data[0]["category_id"])){
                setItemWiseSize(["M", "L", "XL", "2XL"]);
            }else{
                setItemWiseSize(["32", "34", "36"]);
            }
            // select size
            setItemSize(response.data[0]["quantity"][0]["size"]);
            setSellPrice(response.data[0]["quantity"][0]['sell_price']);
            setOfferPrice(response.data[0]["quantity"][0]['offerPrice']);
            setNewPercentage(response.data[0]["quantity"][0]['newPercentage']);
            if(response.data[0]["group_id"] > 0){
                getSameColorWiseItem( response.data[0]["group_id"]);
            }else{
                setSameImages([]);
            }

            
            getSimilarProducts(response.data[0]["sub_category_id"], response.data[0]["color"])
            
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

    const [sameImage, setSameImages] = useState([]);

    function getSameColorWiseItem( group_id){
        setIsLoading(true);
        const headers = {
            'Content-Type': 'application/json'
        }
        
        let data = {group_id: group_id};
        axios.post(global["axios_url"]+'/getSameColorWiseItem', data, {
            headers: headers
        })
        .then((response) => {
            //console.log(response.data);
            setSameImages(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

    const [similarProducts, setSimilarProducts] = useState([])
    const getSimilarProducts = (sub_category_id, color) =>{
        const headers = {
            'Content-Type': 'application/json'
        }
        
        let data = {sub_category_id: sub_category_id, color: color};
        axios.post(global["axios_url"]+'/getSimilarProducts', data, {
            headers: headers
        })
        .then((response) => {
            //console.log(response.data);
            setSimilarProducts(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    //function showImage(img){
       // const imgUrl = process.env.PUBLIC_URL+"/assets/images/"+img
       // setImageUrl( imgUrl );
    //}

    const navigate = useNavigate();
    function productDetailsFn(pid){
        navigate("../product-details/"+pid);
        window.scrollTo(0, 0)
    }

    const setWindowHeight = {
        height: window.innerHeight - 160
    }

    const [selected, setSelected] = React.useState([]);
    //const [position, setPosition] = React.useState(0);
 
    const isItemSelected = (id) => !!selected.find((el) => el === id);
 
   /* const handleClick = (id) =>
        ({ getItemById, scrollToItem }) => {
        const itemSelected = isItemSelected(id);
 
        setSelected((currentSelected) =>
            itemSelected
            ? currentSelected.filter((el) => el !== id)
            : currentSelected.concat(id)
        );
    };*/

   
   /* function Checkout(id){
        navigate("../checkout");
    }*/

    const [deliveryCode, setDeliveryCode] = useState("");
    const AcceptNumericValue = e => {
        var key = e.key;
        var regex = /[0-9]|\./;
        if( !regex.test(key) ) {
            e.preventDefault();
        }
    }
    const [deliveryCodeValid, setDeliveryCodeValid] = useState(false);
    const [deliveryCodeValidMessage, setDeliveryCodeValidMessage] = useState("");
    const checkDeliveryCode = () =>{
        if(!isNaN(deliveryCode) && deliveryCode.length === 6){
            setIsLoading(true);
            const headers = {
                'Content-Type': 'application/json'
            }
            
            let data = {deliveryCode: deliveryCode};
            axios.post(global["axios_url"]+'/checkDeliveryCode', data, {
                headers: headers
            })
            .then((response) => {
                //console.log(response.data);
                setIsLoading(false);
                if(response.data === "Valid code"){
                    toast.success('Pay on delivery available.', {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    setDeliveryCodeValid(true);
                    setDeliveryCodeValidMessage("");
                    localStorage.setItem("pincode", deliveryCode);
                    setDelivaryPincode(deliveryCode);
                    setdelivaryPincodeError("")
                }else{
                    toast.error('Sorry, we do not ship to your pincode.', {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    setDeliveryCodeValid(false);
                    setDeliveryCodeValidMessage("Sorry, we do not ship to your pincode.")
                    localStorage.setItem("pincode", "");
                    setDelivaryPincode("");
                }
            }).catch((error) => {
                console.log(error);
                setIsLoading(false);
                setDeliveryCodeValid(false);
            })
        }else{
            toast.warning('Accept only numbers with 6 digits.', {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }
    const [selectSize, setSelectSize] = useState("");
    const [delivaryPincodeError, setdelivaryPincodeError] = useState("");
    async function addToCart(item_id, category_id, buyNow=0){
        if(deliveryCodeValid){
            if(global.kurtiCatIds.includes(category_id)){
                if(itemSize === ""){
                    toast.error('Please select size.', {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    setSelectSize("sizeError");
                }else{
                   e.getCartValue(item_id, itemSize, buyNow);
                    setSelectSize("");
                    setdelivaryPincodeError("");
                }
            }else{
                e.getCartValue(item_id, itemSize, buyNow);
            }
        }else{
            toast.error('Please enter a valid pincode number.', {
                position: toast.POSITION.TOP_CENTER,
            });
            setdelivaryPincodeError("delivaryPincodeError");
        }
    }

    const setItemSizeFn=(size, item_id)=>{
        setIsLoading(true);
        const headers = {
            'Content-Type': 'application/json'
        }
        
        let data = {item_id: item_id, size: size};
        axios.post(global["axios_url"]+'/checkProductAvailability', data, {
            headers: headers
        })
        .then((response) => {
            if(response.data.total_item > 0){
                setItemSize(size);
                //console.log(response.data);
                setSellPrice(response.data['price']);
                setOfferPrice(response.data['offerPrice']);
                setNewPercentage(response.data['newPercentage']);
            }else{
                setItemSize("");
                toast.error('Out of Stock', {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
            setIsLoading(false);
        }).catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

    const [showModal, setShowModal] = useState(false);
    const [imageLink, setImageLink] = useState();

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const getFilterOption = (items="", searchFor="", search="") =>{
        console.log('getFilterOption');
    }

    const SubNavBarsUrlChange = (items="") =>{
        navigate("../items/"+items);
        localStorage.removeItem('searchTermForType');
    }

    let windowHeight = window.innerHeight - 200;

    return (
        <div>
            {isLoading ? <Loader /> : ""}
            <SubNavBars getFilterOption={getFilterOption} parameter={0} SubNavBarsUrlChange={SubNavBarsUrlChange}/>
            <Container className='HomeContainer'>
                    <Row>
                        <Col md={7} >
                            <Row className='itemDetailsDesktopView'>
                                {itemsObj["itemImageArray"].length > 0 &&
                                itemsObj["itemImageArray"].map((imgName, key) => (
                                    <Col md={6} key={"itemImage"+key} className='itemDetailsMainImgDiv'>
                                        <Image 
                                            className='itemDetailsMainImg'
                                            src={require(`../${global.productImageUrl}${imgName}`)} 
                                            //src={`${global.productImageUrl}${imgName}`}
                                            alt='No image found'
                                            onClick={(e) => { 
                                                setImageLink(imgName);
                                                handleShowModal(true);
                                            }}
                                        />
                                    </Col>
                                ))
                                }
                                
                            </Row>
                            <Row>
                            <Col md={12} className='homePageitemListForMobile'>
                                    <ImageCarousel
                                        showThumbs={false}
                                        showStatus={false}
                                        infiniteLoop
                                        autoPlay
                                        interval={3000}
                                        stopOnHover
                                        showArrows={false}
                                    >
                                        {itemsObj["itemImageArray"].length > 0 &&
                                         itemsObj["itemImageArray"].map((imgName, key) => (
                                            <div
                                            onClick={(e) => { 
                                                setImageLink(imgName);
                                                handleShowModal(true);
                                            }}
                                            >
                                                <Image 
                                                    key={"ImageCarousel-"+key}
                                                    style={{ marginBottom: '10px', maxHeight: windowHeight }}
                                                    className="img-fluid"
                                                    src={require(`../${global.productImageUrl}${imgName}`)} 
                                                    //src={`${global.productImageUrl}${imgName}`}
                                                    alt={`Image ${key + 1}`}
                                                    
                                                />
                                            </div>
                                        ))}
                                    </ImageCarousel>
                                    
                                </Col>
                                {
                                    itemsObj["youtube_link"] !=="" &&
                                    <div style={{marginTop: "30px", marginBottom: "5px"}}>
                                        <p> Video </p>
                                        <YoutubeEmbed embedId={itemsObj["youtube_link"]} />
                                    </div>
                                }
                            </Row>
                        </Col>
                        <Col md={5}>
                            <div>
                                <p className='headdingP ProDetailssharelink'>{itemsObj.product_name}  <ShareLink title={itemsObj.product_name} text={itemsObj.company_name} url={`https://www.bskart.com/product-details/${itemsObj.item_id}`}></ShareLink></p>
                                <p className='subHeaddingP'>{itemsObj.company_name}</p>
                            </div>
                            <div style={{marginTop: "25px", marginBottom: "25px"}}>
                                <p className='headdingP' style={{color: '#00cfff', fontWeight: 'bold'}}>Spacial Price: </p>
                                
                                
                                    {itemsObj["quantity"].length > 0 &&
                                    
                                    
                                    <div id="123" className='productPrice'>
                                        <span className='offerPrice' style={{fontSize: "18px"}}>₹{sellPrice}</span>
                                        <span className='actualPrice' style={{fontSize: "18px"}}>₹{offerPrice}</span>
                                        <span className='offerPercentage' style={{fontSize: "18px"}}>{newPercentage} {newPercentage>0?"% OFF":""}</span>
                                    </div>
                                    
                                    }


                                    
                            </div>
                            <div style={{marginBottom: "25px"}}>
                                <p className='headdingP'>More Colors: </p>
                                <div className='sameTypeProduct'>
                                    {sameImage.length > 0 &&
                                    sameImage.map((imgName, key) => (
                                        <Image 
                                            key={"sameImage"+key}
                                            className='sameTypeProductImg'
                                            src={require(`../${global.productImageUrl}${imgName.image_name}`)}
                                            //src={`${global.productImageUrl}${imgName.image_name}`}
                                            alt='No image found' 
                                            style={(imgName.item_id.toString() === id.toString()) ? { border: "3px solid red"} : {}}

                                            onClick={(e) => { 
                                                productDetailsFn(`${imgName['item_id']}`)
                                            }}
                                    />
                                    ))}   
                                </div>
                            </div>
                            
                            <div style={{ marginBottom: "25px"}}>
                                <p className={'headdingP '+delivaryPincodeError}>Delivery Options 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-truck" viewBox="0 0 16 16" style={{marginLeft: "20px"}}>
                                        <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                                    </svg>
                                </p>
                                <div className="input-group mb-3">
                                    <div className="input-group mb-3 deliveryOptionDiv">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Pincode" 
                                            aria-label="Recipient's username" 
                                            aria-describedby="basic-addon2" 
                                            maxLength={6} 
                                            onKeyPress={(e) => AcceptNumericValue(e)}
                                            readOnly={deliveryCodeValid}
                                            style={deliveryCodeValid?{background: "#00cfff"}:{}}
                                            onChange={(e) => { 
                                                setDeliveryCode(e.target.value)
                                                setDelivaryPincode(e.target.value)
                                            }}
                                            value={delivaryPincode}
                                            />
                                        <div className="input-group-append" style={{cursor: 'pointer'}}>
                                            {deliveryCodeValid === true ?<span className="input-group-text" id="basic-addon2" style={{borderRadius: "0px", background: 'green', color: '#fff'}} onClick={(e)=>{setDeliveryCodeValid(false); setDeliveryCodeValidMessage("")}}>Change</span>:<span className="input-group-text" id="basic-addon2" style={{borderRadius: "0px"}} onClick={checkDeliveryCode}>Check</span>}
                                            
                                        </div>
                                    </div>
                                    <div className={(deliveryCodeValid === true)?"deliveryAvalible":"deliveryNotAvalible"}>{deliveryCodeValidMessage}</div>
                                    {
                                        deliveryCodeValid &&
                                        <>
                                        <div style={{width: '100%'}}>
                                            <Image 
                                                key={"cash-on-delivery"}
                                                className='payOnDelivery'
                                                src={require(`../images/cash-on-delivery.png`)} ></Image>
                                            <span style={{marginLeft: '10px'}}>Pay on delivery available</span>
                                        </div>
                                        {
                                        itemsObj["return_avaliable"]=== "yes"?
                                            <div style={{width: '100%'}}>
                                                <Image 
                                                    key={"exchange"}
                                                    className='payOnDelivery'
                                                    src={require(`../images/exchange.png`)} ></Image>
                                                <span style={{marginLeft: '10px'}}>Easy 5 days return & exchange available</span>
                                            </div>
                                            : <div style={{width: '100%'}}>Return Not Avaliable</div>
                                        }
                                        </>
                                    }
                                </div>
                            </div>
                            {/* Add category id which is needed size */}
                            {([2, 6, 8].includes(itemsObj.category_id)) ?(
                            <>
                                <div style={{ marginBottom: "5px"}}>
                                    <p className={'headdingP '+selectSize}>Select Size</p>
                                </div>
                                <div style={{width: "auto", display: "flex", marginBottom: "5px"}}>
                                    {
                                        itemWiseSize.map(( size, index ) => (
                                    
                                    <div className={(itemSize.toString() === size.toString())?"form-check check-size active-size":"form-check check-size"} key={"check-size-key-"+index}>
                                        <label className={itemsObj.productSize.includes(size.toString())?"form-check-label check-size-label":"form-check-label check-size-label check-size-label-desiabled"} htmlFor={size.toString()}>
                                            <input
                                            type="radio"
                                            className={(itemSize.toString() === size.toString())?"form-check-input check-size-input active-size":"form-check-input check-size-input"}
                                            id={size}
                                            name='size'
                                            value={size}
                                            onChange={(e)=>{
                                                setItemSizeFn(size.toString(), itemsObj.item_id)
                                            }}  
                                            disabled = {itemsObj.productSize.includes(size.toString())?false:true}
                                            />
                                        {size.toString()}</label>
                                    </div>
                                    ))}
                                   
                                </div>
                            </>
                            ):""}

                            <div style={{ marginBottom: "92px" }}>
                                <div 
                                    className="input-group mb-6 addToCartItemDetails"
                                    onClick={() => { 
                                        addToCart(itemsObj.item_id, itemsObj.category_id);
                                    }}
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{marginRight: '10px'}} width="17" height="17" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                                    </svg>
                                    ADD TO CART
                                </div>
                                <div 
                                    className="input-group mb-6 buyNowItemDetails" 
                                    onClick={() => { 
                                        addToCart(itemsObj.item_id, itemsObj.category_id, 1);
                                    }}>
                                    BUY NOW
                                </div>
                            </div>

                            <div style={{clear: "both"}}>
                                <h5>Product Details</h5>
                                {/* ------------------ For Saree -------------------------------- */}
                                {
                                    (global.sareeCatIds.includes(itemsObj.category_id)) &&
                                    <>
                                    <div style={{marginBottom: '6'}}><b>Occasion: </b> {itemsObj.occasion}</div>
                                    <div style={{marginBottom: '6'}}><b>Length: </b> {itemsObj.saree_length} meters</div>
                                    <div style={{marginBottom: '6'}}><b>Width: </b> 47 inches</div>
                                    <div style={{marginBottom: '6'}}><b>Blouse Piece: </b> {itemsObj.blouse}</div>
                                    <div style={{marginBottom: '6'}}><b>Wash care: </b> {itemsObj.fabric_care}</div>
                                    <div style={{marginBottom: '6'}}><b>Fabric: </b> {itemsObj.product_febric}</div>
                                    </>
                                }
                                {/* ------------------ For Kurti -------------------------------- */}
                                {
                                    (global.kurtiCatIds.includes(itemsObj.category_id)) &&
                                    <>
                                    <div style={{marginBottom: '6'}}><b>Occasion: </b> {itemsObj.occasion}</div>
                                    <div style={{marginBottom: '6'}}><b>Wash care: </b> {itemsObj.fabric_care}</div>
                                    <div style={{marginBottom: '6'}}><b>Fabric: </b> {itemsObj.product_febric}</div>
                                    <div style={{marginBottom: '6'}}><b>Type: </b> {itemsObj.type}</div>
                                    </>
                                }
                                
                                {/* ------------------ For Kurti -------------------------------- */}
                                {
                                    (global.jewelleryCatIds.includes(itemsObj.category_id)) &&
                                    <>
                                        <div style={{marginBottom: '6'}}><b>Occasion: </b> {itemsObj.occasion}</div>
                                        <div style={{marginBottom: '6'}}><b>Material: </b> {itemsObj.material}</div>
                                        <div style={{marginBottom: '6'}}><b>Stone Type: </b> {itemsObj.stone_type}</div>
                                        <div style={{marginBottom: '6'}}><b>Type: </b> {itemsObj.type}</div>
                                    </>
                                }

                                {/* ------------------ For Blouse -------------------------------- */}
                                {
                                    (global.blouseCatIds.includes(itemsObj.category_id)) &&
                                    <>
                                        <div style={{marginBottom: '6'}}><b>Occasion: </b> {itemsObj.occasion}</div>
                                        <div style={{marginBottom: '6'}}><b>Wash care: </b> {itemsObj.fabric_care}</div>
                                        <div style={{marginBottom: '6'}}><b>Fabric: </b> {itemsObj.product_febric}</div>
                                        <div style={{marginBottom: '6'}}><b>Type: </b> {itemsObj.type}</div>
                                    </>
                                }
                            </div>
                            
                        </Col>
                    </Row>
                    <Row>
                   
                    </Row>
                    <Row>
                        <Col md={12} style={{marginTop: '5px'}}>
                            <div className='SimilarProducts'>
                                <div style={{fontWeight: 'bold', marginTop: '10px'}}>Similar Products</div>
                                <div id="SimilarProductsScrollMenu">
                                   {/*
                                    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                                    {similarProducts.map(( obj, index ) => (
                                        <div key={index}>
                                            <div style={{position: "relative"}}>
                                                <Image
                                                    className='similarTypeProductImg'
                                                    //src={require(`../images/product/${obj.image_name}`)} 
                                                    src={`${global.productImageUrl}${obj.image_name}`}
                                                    alt='No image found'
                                                    onClick={(e) => { 
                                                        productDetailsFn(`${obj.item_id}`)
                                                    }}
                                                />
                                                <span className='nId'>N{obj.item_id}</span>
                                            </div>
                                            <div id={index} className='productPrice'>
                                                <span className='actualPrice'>₹{obj.offerPrice}</span>
                                                <span className='offerPrice'>₹{obj.price}</span>
                                                <span className='offerPercentage'>{obj.newPercentage} {obj.newPercentage>0?"% OFF":""}</span>
                                            </div>
                                        </div>
                                    ))}
                                    </ScrollMenu>
                                    */}
                                </div>
                            </div>




                        </Col>
                    </Row>

                    
                    <div className="row">
                        <div className="col-12">
                            <div
                                className="scrollable-div MoSubCatScrollable"
                                style={{
                                overflowX: 'auto',
                                whiteSpace: 'nowrap',
                                }}
                            >
                                {similarProducts.map(( obj, index ) => (
                                        <div key={index} className='d-inline-block px-3 similarTypeProductImgDiv' style={{padding: "0px"}}>
                                            <div style={{position: "relative"}}>
                                            { obj.hasOwnProperty('image_name') &&
                                                <Image
                                                    className='similarTypeProductImg'
                                                    src={require(`../images/product/${obj.image_name}`)} 
                                                    //src={`${global.productImageUrl}${obj.image_name}`}
                                                    alt='No image found'
                                                    onClick={(e) => { 
                                                        productDetailsFn(`${obj.item_id}`)
                                                    }}
                                                />
                                            }
                                                <span className='nId'>N{obj.item_id}</span>
                                                <ShareLink title={obj.product_name} text={obj.company_name} url={`https://www.bskart.com/product-details/${obj.item_id}`}></ShareLink>
                                            </div>
                                            <div id={index} className='productPrice'>
                                                <span className='actualPrice'>₹{obj.offerPrice}</span>
                                                <span className='offerPrice'>₹{obj.price}</span>
                                                <span className='offerPercentage'>{obj.newPercentage} {obj.newPercentage>0?"% OFF":""}</span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </Container>

                <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-90w">
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
        </div>
    )
    
}

export default ItemDetails
/*

function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } =
      React.useContext(VisibilityContext);
   
    return (
      <button disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
         <Image
        style={{width: '30px'}}
        src={`${process.env.PUBLIC_URL}/assets/images/left.svg`}
        />
      </button>
    );
}
   
function RightArrow() {
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);
   
    return (
      <button disabled={isLastItemVisible} onClick={() => scrollNext()}>
        <Image
        style={{width: '30px'}}
        src={`${process.env.PUBLIC_URL}/assets/images/right.svg`}
        />

      </button>
    );
}*/
