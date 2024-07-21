import React, { useState, useEffect } from 'react'
import {Container, Row, Col, Image, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../components/css/itemDetails.css';

import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import 'react-horizontal-scrolling-menu/dist/styles.css';

import {
    useNavigate,
    useParams
  } from "react-router-dom";



const ItemDetails = () => {
    const {id} = useParams();
    const [imageUrl, setImageUrl] = useState(process.env.PUBLIC_URL+"/assets/images/"+id+".png");
    console.log(id);
    console.log(imageUrl);

    useEffect(() => {
        console.log("------------", imageUrl);
      }, [imageUrl]);

    function showImage(img){
        const imgUrl = process.env.PUBLIC_URL+"/assets/images/"+img
        setImageUrl( imgUrl );
    }

    const navigate = useNavigate();
    function productDetailsFn(pid){
        navigate("../product-details/"+pid);
        window.scrollTo(0, 0)
    }

    const setWindowHeight = {
        height: window.innerHeight - 160
    }

    const [items, setItems] = useState(["1", "2", "3", "4", "5", "6", "8", "9", "1", "2","1", "2", "3", "4", "5", "6", "8", "9", "1", "2"]);

    const [selected, setSelected] = React.useState([]);
    const [position, setPosition] = React.useState(0);
 
    const isItemSelected = (id) => !!selected.find((el) => el === id);
 
    const handleClick = (id) =>
        ({ getItemById, scrollToItem }) => {
        const itemSelected = isItemSelected(id);
 
        setSelected((currentSelected) =>
            itemSelected
            ? currentSelected.filter((el) => el !== id)
            : currentSelected.concat(id)
        );
    };

   
    function Checkout(id){
        navigate("../checkout");
    }

    return (
        <div>
            <Container className='HomeContainer'>
                    <Row>
                        <Col md={5}>
                            <div className='productDetailsList'>
                                <div className='product after450'>
                                    {/** Same product Image */}
                                    <div className='productLeftImgList' style={setWindowHeight}>
                                        <Image 
                                            className='otherImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/2.png`}
                                            onClick={(e) => { 
                                                showImage("2.png")
                                            }}
                                            onMouseOver = {(e) => { 
                                                showImage("2.png")
                                            }}
                                        />
                                        <Image 
                                            className='otherImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/3.png`}
                                            onClick={(e) => { 
                                                showImage("3.png")
                                            }}
                                            onMouseOver = {(e) => { 
                                                showImage("3.png")
                                            }}
                                        />
                                        <Image
                                            className='otherImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/4.png`}
                                            onClick={(e) => { 
                                                showImage("4.png")
                                            }}
                                            onMouseOver = {(e) => { 
                                                showImage("4.png")
                                            }}
                                        />
                                        <Image
                                            className='otherImg'
                                            src={`${process.env.PUBLIC_URL}/assets/images/5.png`}
                                            onClick={(e) => { 
                                                showImage("5.png")
                                            }}
                                            onMouseOver = {(e) => { 
                                                showImage("5.png")
                                            }}
                                        />
                                    </div>

                                    <Image className='itemDetailsMainImg'
                                        style={setWindowHeight}
                                        src={imageUrl}
                                    />
                                </div>
                                <div className='product below450'>
                                    <Carousel interval={13000}>
                                        <Carousel.Item style={setWindowHeight}>
                                            <Image
                                            className="d-block w-100"
                                            src={imageUrl}
                                            alt="First slide"
                                            />
                                            <Carousel.Caption>
                                                <h3>First slide label</h3>
                                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        <Carousel.Item style={setWindowHeight}>
                                            <Image
                                            className="d-block w-100"
                                            src={`${process.env.PUBLIC_URL}/assets/images/6.png`}
                                            alt="Second slide"
                                            />

                                            <Carousel.Caption>
                                                <h3>Second slide label</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        <Carousel.Item style={setWindowHeight}>
                                            <Image
                                            className="d-block w-100"
                                            src={`${process.env.PUBLIC_URL}/assets/images/8.png`}
                                            alt="Third slide"
                                            />

                                            <Carousel.Caption>
                                                <h3>Third slide label</h3>
                                                <p>
                                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                                </p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        <Carousel.Item style={setWindowHeight}>
                                            <Image
                                            className="d-block w-100"
                                            src={`${process.env.PUBLIC_URL}/assets/images/2.png`}
                                            alt="Third slide"
                                            />

                                            <Carousel.Caption>
                                                <h3>Third slide label</h3>
                                                <p>
                                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                                </p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    </Carousel>
                                </div>
                                
                                <div style={{marginTop: '3px'}}>
                                    <h5>Rs: <b>500/-</b></h5>
                                    <div className='addToCartItemDetails'>ADD TO CART</div>
                                    <div 
                                        className='buyNowItemDetails'
                                        onClick={(e) => { 
                                            Checkout("2")
                                        }}
                                        >BUY NOW</div>
                                </div>                               
                            </div>
                        </Col>
                        <Col md={7}>
                            <div>
                                <h4>
                                fospy <br></br>Unstitched Cotton Silk Multipurpose Running Fabric Self Design
                                </h4>
                                <div><b>Length: </b> 6.5 meters</div>
                                <div><b>Width: </b> 47 inches</div>
                                <div><b>Blouse Piece: </b> Yes, the saree comes with a running blouse piece</div>
                                <div><b>Wash care: </b> Dry Wash</div>
                                <div><b>Fabric: </b> Cotton and Acrylic</div>
                            </div>
                            <div>
                                <div><b>Services: </b> Cash on Delivery available</div>
                                <div><b>Return: </b>5 Days Return Policy</div>
                                <h5 style={{color: '#00cfff', fontWeight: 'bold'}}>Spacial Price: </h5>
                                
                                <h5>Rs: <b>500/-</b></h5>
                                <div className='buyNow'>BUY NOW</div>
                            </div>
                            <div>
                                <h5>Color: </h5>
                                <div className='sameTypeProduct'>
                                    <Image 
                                        className='sameTypeProductImg'
                                        src={`${process.env.PUBLIC_URL}/assets/images/2.png`}
                                        onClick={(e) => { 
                                            productDetailsFn("2")
                                        }}
                                        onMouseOver = {(e) => { 
                                            showImage("2.png")
                                        }}
                                        onMouseOut = {(e) => { 
                                            showImage(id+".png")
                                        }}
                                    />
                                    <Image 
                                        className='sameTypeProductImg'
                                        src={`${process.env.PUBLIC_URL}/assets/images/3.png`}
                                        onClick={(e) => { 
                                            productDetailsFn("3")
                                        }}
                                        onMouseOver = {(e) => { 
                                            showImage("3.png")
                                        }}
                                        onMouseOut = {(e) => { 
                                            showImage(id+".png")
                                        }}
                                    />
                                    <Image
                                        className='sameTypeProductImg'
                                        src={`${process.env.PUBLIC_URL}/assets/images/4.png`}
                                        onClick={(e) => { 
                                            productDetailsFn("4")
                                        }}
                                        onMouseOver = {(e) => { 
                                            showImage("4.png")
                                        }}
                                        onMouseOut = {(e) => { 
                                            showImage(id+".png")
                                        }}
                                    />
                                    <Image
                                        className='sameTypeProductImg'
                                        src={`${process.env.PUBLIC_URL}/assets/images/5.png`}
                                        onClick={(e) => { 
                                            productDetailsFn("5")
                                        }}
                                        onMouseOver = {(e) => { 
                                            showImage("5.png")
                                        }}
                                        onMouseOut = {(e) => { 
                                            showImage(id+".png")
                                        }}
                                    /> 
                                    <Image
                                        className='sameTypeProductImg'
                                        src={`${process.env.PUBLIC_URL}/assets/images/5.png`}
                                        onClick={(e) => { 
                                            productDetailsFn("5")
                                        }}
                                        onMouseOver = {(e) => { 
                                            showImage("5.png")
                                        }}
                                        onMouseOut = {(e) => { 
                                            showImage(id+".png")
                                        }}
                                    /> 
                                    <Image
                                        className='sameTypeProductImg'
                                        src={`${process.env.PUBLIC_URL}/assets/images/9.png`}
                                        onClick={(e) => { 
                                            productDetailsFn("9")
                                        }}
                                        onMouseOver = {(e) => { 
                                            showImage("9.png")
                                        }}
                                        onMouseOut = {(e) => { 
                                            showImage(id+".png")
                                        }}
                                    /> 
                                    <Image
                                        className='sameTypeProductImg'
                                        src={`${process.env.PUBLIC_URL}/assets/images/3.png`}
                                        onClick={(e) => { 
                                            productDetailsFn("3")
                                        }}
                                        onMouseOver = {(e) => { 
                                            showImage("3.png")
                                        }}
                                        onMouseOut = {(e) => { 
                                            showImage(id+".png")
                                        }}
                                    /> 
                                    <Image
                                        className='sameTypeProductImg'
                                        src={`${process.env.PUBLIC_URL}/assets/images/5.png`}
                                        onClick={(e) => { 
                                            productDetailsFn("5")
                                        }}
                                        onMouseOver = {(e) => { 
                                            showImage("5.png")
                                        }}
                                        onMouseOut = {(e) => { 
                                            showImage(id+".png")
                                        }}
                                    /> 
                                    <Image
                                        className='sameTypeProductImg'
                                        src={`${process.env.PUBLIC_URL}/assets/images/1.png`}
                                        onClick={(e) => { 
                                            productDetailsFn("1")
                                        }}
                                        onMouseOver = {(e) => { 
                                            showImage("1.png")
                                        }}
                                        onMouseOut = {(e) => { 
                                            showImage(id+".png")
                                        }}
                                    /> 
                                    <Image
                                        className='sameTypeProductImg'
                                        src={`${process.env.PUBLIC_URL}/assets/images/9.png`}
                                        onClick={(e) => { 
                                            productDetailsFn("9")
                                        }}
                                        onMouseOver = {(e) => { 
                                            showImage("9.png")
                                        }}
                                        onMouseOut = {(e) => { 
                                            showImage(id+".png")
                                        }}
                                    /> 
                                    <Image
                                        className='sameTypeProductImg'
                                        src={`${process.env.PUBLIC_URL}/assets/images/6.png`}
                                        onClick={(e) => { 
                                            productDetailsFn("6")
                                        }}
                                        onMouseOver = {(e) => { 
                                            showImage("6.png")
                                        }}
                                        onMouseOut = {(e) => { 
                                            showImage(id+".png")
                                        }}
                                    /> 
                                    <Image
                                        className='sameTypeProductImg'
                                        src={`${process.env.PUBLIC_URL}/assets/images/10.png`}
                                        onClick={(e) => { 
                                            productDetailsFn("10")
                                        }}
                                        onMouseOver = {(e) => { 
                                            showImage("10.png")
                                        }}
                                        onMouseOut = {(e) => { 
                                            showImage(id+".png")
                                        }}
                                    /> 
                                    <Image
                                        className='sameTypeProductImg'
                                        src={`${process.env.PUBLIC_URL}/assets/images/9.png`}
                                        onClick={(e) => { 
                                            productDetailsFn("9")
                                        }}
                                        onMouseOver = {(e) => { 
                                            showImage("9.png")
                                        }}
                                        onMouseOut = {(e) => { 
                                            showImage(id+".png")
                                        }}
                                    /> 
                                    <Image
                                        className='sameTypeProductImg'
                                        src={`${process.env.PUBLIC_URL}/assets/images/8.png`}
                                        onClick={(e) => { 
                                            productDetailsFn("8")
                                        }}
                                        onMouseOver = {(e) => { 
                                            showImage("8.png")
                                        }}
                                        onMouseOut = {(e) => { 
                                            showImage(id+".png")
                                        }}
                                    />          
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                    <iframe src='https://www.youtube.com/embed/2Gak0N86_E8'
                            frameborder='0'
                            allow='autoplay; encrypted-media'
                            allowfullscreen
                            title='video'
                    />
                    </Row>
                    <Row>
                        <Col md={12} style={{marginTop: '5px'}}>
                            <div className='SimilarProducts'>
                                <div style={{fontWeight: 'bold'}}>Similar Products</div>
                                <div id="SimilarProductsScrollMenu">
                                    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                                    {items.map(( id, index ) => (
                                        <div key={index}>
                                            <Image
                                                className='similarTypeProductImg'
                                                src={`${process.env.PUBLIC_URL}/assets/images/${id}.png`}
                                                onClick={(e) => { 
                                                    productDetailsFn(id)
                                                }}
                                            />
                                            <div id={index} className='productPrice'>
                                                <span className='actualPrice'>₹500</span>
                                                <span className='offerPrice'>₹400</span>
                                                <span className='offerPercentage'>20% OFF</span>
                                            </div>
                                        </div>
                                    ))}
                                    </ScrollMenu>
                                    
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
        </div>
    )
    
}

export default ItemDetails


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
