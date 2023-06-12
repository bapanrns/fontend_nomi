import React from 'react'
import {Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './css/home.css';


import {
    useNavigate
  } from "react-router-dom";



  const Home = () => {

    const navigate = useNavigate();
    function productDetailsFn(id){
        navigate("product-details/"+id);
    }

        return (
            <div>
                <Container className='HomeContainer'>
                    <Row>
                        <Col md={2}>
                            <div className='sareeList'>
                                <div className='product'>
                                    <Image className='saree'
                                        src={`${process.env.PUBLIC_URL}/assets/images/1.png`}
                                        onClick={(e) => { 
                                            productDetailsFn("1")
                                        }}
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
                                    {/*<div className='addToCart'>ADD TO CART</div>*/}
                                    <div className='buyNow'>BUY NOW</div>
                                </div>                               
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className='sareeList'>
                                <div className='product'>
                                    <Image className='saree'
                                        src={`${process.env.PUBLIC_URL}/assets/images/6.png`}
                                        onClick={(e) => { 
                                            productDetailsFn("6")
                                        }}
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
                                        onClick={(e) => { 
                                            productDetailsFn("8")
                                        }}
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
                                        onClick={(e) => { 
                                            productDetailsFn("3")
                                        }}
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
