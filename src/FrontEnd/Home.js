import React, {useEffect, useState } from 'react'
import {Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../components/css/home.css';
import axios from "axios";
import Loader from '../components/Loader'
import global from "../components/global";


import {
    useNavigate,
    useLocation
  } from "react-router-dom";



const Home = () => {
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    // Get the value of the 'param' parameter from the URL
    const paramValue = new URLSearchParams(location.search);
    useEffect(() => {
        //console.log(localStorage.getItem('search'));
        console.log('Parameter changed:', paramValue);
        console.log(localStorage.getItem('search'))
    }, [paramValue]);
    const navigate = useNavigate();
    function productDetailsFn(id){
        navigate("items/"+id);
    }


    useEffect(() => {
        getproduct()
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
            console.log(response.data);
            setCatObj(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

        return (
            <div>
                {isLoading ? <Loader /> : ""}
                <Container className='HomeContainer'>
                    <Row>
                    {catObj.map((object, key) => (
                        <Col md={3}>
                            <div className='sareeList'>
                                <div className='product'>
                                    {object.cat_image &&
                                        <Image className='saree'
                                            style={{borderRadius: "50%"}}
                                            src={require(`../images/categories/${object.cat_image}`)} 
                                            onClick={(e) => { 
                                                productDetailsFn(object.category_name)
                                            }}
                                        />
                                    }
                                </div>
                                <div className='productDesc' title='Satrani Art Silk Saree with Blouse Piece' style={{height: '30px'}}>{object.category_name} </div>                             
                            </div>
                        </Col>
                    ))}
                       
                        <Col md={2}>
                            <div className='sareeList'>
                                <div className='product'>
                                    <Image className='saree'
                                        src={`${process.env.PUBLIC_URL}/assets/images/2.png`}
                                        onClick={(e) => { 
                                            productDetailsFn("2")
                                        }}
                                    />
                                    <div className='similarProducts'>
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/1.png`}
                                        />
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/3.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/4.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/5.png`}
                                        />
                                    </div>
                                </div>
                                <div className='productDesc' title='Satrani Art Silk Saree with Blouse Piece'>Satrani Art Silk Saree with Blouse Piece </div>
                                <div className='productRs'>Rs: 500/-</div> 
                                <div>
                                    <div className='buyNow'>BUY NOW</div>
                                </div> 
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className='sareeList'>
                                <div className='product'>
                                    <Image className='saree'
                                        src={`${process.env.PUBLIC_URL}/assets/images/5.png`}
                                    />
                                    <div className='similarProducts'>
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/1.png`}
                                        />
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/3.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/4.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/5.png`}
                                        />
                                    </div>
                                </div>
                                <div className='productDesc' title='Satrani Art Silk Saree with Blouse Piece'>Satrani Art Silk Saree with Blouse Piece </div>
                                <div className='productRs'>Rs: 500/-</div> 
                                <div>
                                    <div className='buyNow'>BUY NOW</div>
                                </div> 
                            </div>
                        </Col>
                    </Row>

                    <Row style={{marginTop: 5}}>
                        <Col md={2}>
                            <div className='sareeList'>
                                <div className='product'>
                                    <Image className='saree'
                                        src={`${process.env.PUBLIC_URL}/assets/images/9.png`}
                                    />
                                    <div className='similarProducts'>
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/2.png`}
                                        />
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/3.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/4.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/5.png`}
                                        />
                                    </div>
                                </div>
                                <div className='productDesc' title='Satrani Art Silk Saree with Blouse Piece'>Satrani Art Silk Saree with Blouse Piece </div>
                                <div className='productRs'>Rs: 500/-</div> 
                                <div>
                                    <div className='buyNow'>BUY NOW</div>
                                </div>                               
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className='sareeList'>
                                <div className='product'>
                                    <Image className='saree'
                                        src={`${process.env.PUBLIC_URL}/assets/images/8.png`}
                                    />
                                    <div className='similarProducts'>
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/2.png`}
                                        />
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/3.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/4.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/5.png`}
                                        />
                                    </div>
                                </div>
                                <div className='productDesc' title='Satrani Art Silk Saree with Blouse Piece'>Satrani Art Silk Saree with Blouse Piece </div>
                                <div className='productRs'>Rs: 500/-</div> 
                                <div>
                                    <div className='buyNow'>BUY NOW</div>
                                </div> 
                                
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className='sareeList'>
                                <div className='product'>
                                    <Image className='saree'
                                        src={`${process.env.PUBLIC_URL}/assets/images/6.png`}
                                    />
                                    <div className='similarProducts'>
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/2.png`}
                                        />
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/3.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/4.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/5.png`}
                                        />
                                    </div>
                                </div>
                                <div className='productDesc' title='Satrani Art Silk Saree with Blouse Piece'>Satrani Art Silk Saree with Blouse Piece </div>
                                <div className='productRs'>Rs: 500/-</div> 
                                <div>
                                    <div className='buyNow'>BUY NOW</div>
                                </div> 
                                
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className='sareeList'>
                                <div className='product'>
                                    <Image className='saree'
                                        src={`${process.env.PUBLIC_URL}/assets/images/5.png`}
                                    />
                                    <div className='similarProducts'>
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/2.png`}
                                        />
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/1.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/4.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/5.png`}
                                        />
                                    </div>
                                </div>
                                <div className='productDesc' title='Satrani Art Silk Saree with Blouse Piece'>Satrani Art Silk Saree with Blouse Piece </div>
                                <div className='productRs'>Rs: 500/-</div> 
                                <div>
                                    <div className='buyNow'>BUY NOW</div>
                                </div> 
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className='sareeList'>
                                <div className='product'>
                                    <Image className='saree'
                                        src={`${process.env.PUBLIC_URL}/assets/images/4.png`}
                                    />
                                    <div className='similarProducts'>
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/1.png`}
                                        />
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/3.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/4.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/5.png`}
                                        />
                                    </div>
                                </div>
                                <div className='productDesc' title='Satrani Art Silk Saree with Blouse Piece'>Satrani Art Silk Saree with Blouse Piece </div>
                                <div className='productRs'>Rs: 500/-</div> 
                                <div>
                                    <div className='buyNow'>BUY NOW</div>
                                </div> 
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className='sareeList'>
                                <div className='product'>
                                    <Image className='saree'
                                        src={`${process.env.PUBLIC_URL}/assets/images/10.png`}
                                    />
                                    <div className='similarProducts'>
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/1.png`}
                                        />
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/3.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/4.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/5.png`}
                                        />
                                    </div>
                                </div>
                                <div className='productDesc' title='Satrani Art Silk Saree with Blouse Piece'>Satrani Art Silk Saree with Blouse Piece </div>
                                <div className='productRs'>Rs: 500/-</div> 
                                <div>
                                    <div className='buyNow'>BUY NOW</div>
                                </div> 
                            </div>
                        </Col>
                    </Row>

                    <Row style={{marginTop: 5}}>
                        <Col md={2}>
                            <div className='sareeList'>
                                <div className='product'>
                                    <Image className='saree'
                                        src={`${process.env.PUBLIC_URL}/assets/images/1.png`}
                                    />
                                    <div className='similarProducts'>
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/2.png`}
                                        />
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/3.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/4.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/5.png`}
                                        />
                                    </div>
                                </div>
                                <div className='productDesc' title='Satrani Art Silk Saree with Blouse Piece'>Satrani Art Silk Saree with Blouse Piece </div>
                                <div className='productRs'>Rs: 500/-</div> 
                                <div>
                                    <div className='buyNow'>BUY NOW</div>
                                </div>                               
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className='sareeList'>
                                <div className='product'>
                                    <Image className='saree'
                                        src={`${process.env.PUBLIC_URL}/assets/images/6.png`}
                                    />
                                    <div className='similarProducts'>
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/2.png`}
                                        />
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/3.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/4.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/5.png`}
                                        />
                                    </div>
                                </div>
                                <div className='productDesc' title='Satrani Art Silk Saree with Blouse Piece'>Satrani Art Silk Saree with Blouse Piece </div>
                                <div className='productRs'>Rs: 500/-</div> 
                                <div>
                                    <div className='buyNow'>BUY NOW</div>
                                </div> 
                                
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className='sareeList'>
                                <div className='product'>
                                    <Image className='saree'
                                        src={`${process.env.PUBLIC_URL}/assets/images/8.png`}
                                    />
                                    <div className='similarProducts'>
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/2.png`}
                                        />
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/3.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/4.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/5.png`}
                                        />
                                    </div>
                                </div>
                                <div className='productDesc' title='Satrani Art Silk Saree with Blouse Piece'>Satrani Art Silk Saree with Blouse Piece </div>
                                <div className='productRs'>Rs: 500/-</div> 
                                <div>
                                    <div className='buyNow'>BUY NOW</div>
                                </div> 
                                
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className='sareeList'>
                                <div className='product'>
                                    <Image className='saree'
                                        src={`${process.env.PUBLIC_URL}/assets/images/3.png`}
                                    />
                                    <div className='similarProducts'>
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/2.png`}
                                        />
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/1.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/4.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/5.png`}
                                        />
                                    </div>
                                </div>
                                <div className='productDesc' title='Satrani Art Silk Saree with Blouse Piece'>Satrani Art Silk Saree with Blouse Piece </div>
                                <div className='productRs'>Rs: 500/-</div> 
                                <div>
                                    <div className='buyNow'>BUY NOW</div>
                                </div> 
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className='sareeList'>
                                <div className='product'>
                                    <Image className='saree'
                                        src={`${process.env.PUBLIC_URL}/assets/images/2.png`}
                                    />
                                    <div className='similarProducts'>
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/1.png`}
                                        />
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/3.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/4.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/5.png`}
                                        />
                                    </div>
                                </div>
                                <div className='productDesc' title='Satrani Art Silk Saree with Blouse Piece'>Satrani Art Silk Saree with Blouse Piece </div>
                                <div className='productRs'>Rs: 500/-</div> 
                                <div>
                                    <div className='buyNow'>BUY NOW</div>
                                </div> 
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className='sareeList'>
                                <div className='product'>
                                    <Image className='saree'
                                        src={`${process.env.PUBLIC_URL}/assets/images/5.png`}
                                    />
                                    <div className='similarProducts'>
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/1.png`}
                                        />
                                        <Image 
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/3.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/4.png`}
                                        />
                                        <Image
                                            className='similarProductsImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/5.png`}
                                        />
                                    </div>
                                </div>
                                <div className='productDesc' title='Satrani Art Silk Saree with Blouse Piece'>Satrani Art Silk Saree with Blouse Piece </div>
                                <div className='productRs'>Rs: 500/-</div> 
                                <div>
                                    <div className='buyNow'>BUY NOW</div>
                                </div> 
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    
}

export default Home
