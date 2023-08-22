import React, {useEffect, useState } from 'react'
import {Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../components/css/home.css';
import axios from "axios";
import Loader from '../components/Loader'
import global from "../components/global";
import axiosInstance from '../components/axiosInstance';

import { Carousel as ImageCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import 'react-horizontal-scrolling-menu/dist/styles.css';


import {
    useNavigate,
    useLocation
  } from "react-router-dom";



const Home = ({data2}) => {
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    // Get the value of the 'param' parameter from the URL
    const paramValue = new URLSearchParams(location.search);
    useEffect(() => {
        //console.log(localStorage.getItem('search'));
        //console.log('Parameter changed:', paramValue);
        //console.log(localStorage.getItem('search'))
    }, [paramValue]);
    const navigate = useNavigate();
    function productDetailsFn(id){
        navigate("items/"+id);
        //window.open("items/"+id, "_blank");
        console.log("productDetailsFn", id);
    }


    useEffect(() => {
        getproduct();
        // Get saree list
        getSareeListForHomePage();
    }, []);

    const [catObj, setCatObj] = useState([]);
    const getproduct = () => {
        setIsLoading(true);
        const headers = {
            'Content-Type': 'application/json'
        }
        
        let data = {};
        axios.post(global["axios_url"]+'/getCategoryList', data, {
            headers: headers
        })
        .then((response) => {
            //console.log(response.data);
            setCatObj(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

    const [sareeListObj, setSareeList] = useState([]);
    const [kurtiListObj, setKurtiListObj] = useState([]);
    const [JewelleryListObj, setJewelleryListObj] = useState([]);

    const [xxx, setxxx] = useState({});

    const getSareeListForHomePage = () =>{
        setIsLoading(true);

        axiosInstance.post('/getSareeListForHomePage', {})
        .then((response) => {
            setIsLoading(false);
            setSareeList(response.data["1"]);
            setKurtiListObj(response.data["2"]);

            setxxx(response.data);
        })
        .catch((error) => {
            console.log('Error:', error);
        });
    }

        return (
            <div>
                {isLoading ? <Loader /> : ""}
                <Container className='HomeContainer'>
                    <Row>
                    {catObj.map((object, key) => (
                        <Col md={2} key={"div-"+key}>
                            <div className='categoriesImgDiv'>
                                <div className='product'>
                                    {object.cat_image &&
                                        <Image className='categoriesImg'
                                            key={object.cat_image}
                                            style={{borderRadius: "50%"}}
                                            src={require(`../images/categories/${object.cat_image}`)} 
                                            onClick={(e) => { 
                                                productDetailsFn(object.category_name);
                                                localStorage.removeItem("searchTermForType")
                                            }}
                                        />
                                    }
                                </div>
                                <div className='categoriesDesc' title='Satrani Art Silk Saree with Blouse Piece' style={{height: '30px'}}>All {object.category_name} </div>                             
                            </div>
                        </Col>
                    ))}
                       
                        
                        <Row>
                            
                            {Object.keys(xxx).length > 0 && 
                            Object.keys(xxx).map((mainObj, key) => (
                                <>
                                {/* For Desktop */}
                                <Col md={12} className='homePageitemList homePageitemListForDesktop' key={"homePageitemList"+key}>
                                    <div className='SimilarProducts'>
                                        <div id="SimilarProductsScrollMenu">
                                        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                                        {xxx[mainObj].map((obj, index) => (
                                            <div key={"Jewellery-"+index}>
                                                <Image
                                                    className='similarTypeProductImg'
                                                    src={require(`../images/product/${obj.image_name}`)} 
                                                    onClick={(e) => { 
                                                        productDetailsFn(obj.category_name);
                                                        localStorage.setItem("searchTermForType", obj.sub_category_id);
                                                    }}
                                                />
                                                <div>{obj.sub_category_name}</div>
                                                <div id={index} className='productPrice'>
                                                    <span className='offerPrice'>₹{obj.price}</span>
                                                    <span className='actualPrice'>₹{obj.offerPrice}</span>
                                                    <span className='offerPercentage'>20% OFF</span>
                                                </div>
                                            </div>
                                        ))}
                                        </ScrollMenu>
                                        </div>
                                    </div>
                                </Col>
                                <React.StrictMode>
                                    <div className="scroll-container">
                                     {xxx[mainObj].map((obj, index) => (
                                            <div key={"Jewellery-scroll-container-"+index}>
                                                <Image
                                                    className='similarTypeProductImg'
                                                    src={require(`../images/product/${obj.image_name}`)} 
                                                    onClick={(e) => { 
                                                        productDetailsFn(obj.category_name);
                                                        localStorage.setItem("searchTermForType", obj.sub_category_id);
                                                    }}
                                                />
                                                <div>{obj.sub_category_name}</div>
                                                <div id={index} className='productPrice'>
                                                    <span className='offerPrice'>₹{obj.price}</span>
                                                    <span className='actualPrice'>₹{obj.offerPrice}</span>
                                                    <span className='offerPercentage'>20% OFF</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </React.StrictMode>
                                
                                {/** For Mobile */}

                               {/* <Col md={12} className='homePageitemListForMobile' key={"homePageitemListMobile_"+key}>
                                
                                    
                                    <ImageCarousel
                                        showThumbs={false}
                                        showStatus={false}
                                        infiniteLoop
                                        autoPlay
                                        interval={3000}
                                        stopOnHover
                                        showArrows={false}
                                    >
                                        {xxx[mainObj].map((obj, index) => (
                                            <div>
                                                <Image 
                                                    style={{ marginBottom: '10px' }}
                                                    className="img-fluid"
                                                    src={require(`../images/product/${obj.image_name}`)} 
                                                    alt={`Image ${index + 1}`}
                                                    onClick={(e) => { 
                                                        productDetailsFn(obj.category_name);
                                                        localStorage.setItem("searchTermForType", obj.sub_category_id);
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </ImageCarousel>
                                </Col>*/}
                                </>
                            ))
                            }
                        </Row>
                        
                    </Row>
                </Container>
            </div>
        )
    
}

export default Home


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
}