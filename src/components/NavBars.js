import React, { useState } from 'react'
import {Container, NavDropdown, Form, Button, Image } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";

import Login from '../login/Login';
import ForgotPassword from '../login/ForgotPassword';
import NewPasswordModal from '../login/NewPassword';
import SignUp from '../login/SignUp';

// Notification
import { toast } from 'react-toastify';


import '../components/css/profile.css';

  const NavBars = (props) => {
    const { cartValue } = props;
    /* --------------- For Login Modal start */
    const [loginModal, setLoginModal] = useState(false)
    function openLoginModal(){
        setLoginModal(true);
    }
    /* --------------- For Login Modal end */

    /* ---------------- For Forgot Password start */
    const [forgotPassModal, setForgotPassModal] = useState(false)
    function forgotPasswordOpen(){
        // First hide Login form
        setLoginModal(false);
        // Open Forgot password modal
        setForgotPassModal(true);
    }

    function hideForgotPasswordModal(){
        setForgotPassModal(false);
    }
    /* ---------------- For Forgot Password end */

    /* ---------------- For New Password start */
    const [newPassModal, setNewPassModal] = useState(false)
    function newPasswordOpen(){
        // Open New password modal
        setNewPassModal(true);
    }

    function hideNewPasswordModal(){
        // Close New password modal
        setNewPassModal(false);
    }
    /* ---------------- For New Password end */

    /* ---------------- For New Password start */
    const [signUpModal, setSignUpModal] = useState(false)
    function signUpModalOpen(){
        // First hide Login form
        setLoginModal(false);
        setSignUpModal(true);
    }
    /* ---------------- For New Password end */
    
    /** Log Out */
    const navigate = useNavigate();
    function loginOut(){
        localStorage.setItem("login", false);

        localStorage.removeItem('ioc');
        localStorage.removeItem('search');
        localStorage.removeItem('searchTermForType');
        localStorage.removeItem('pincode');
        localStorage.setItem("cart", "[]");

        //localStorage.clear();
        navigate("/");
        window.location.reload(false);
    }

    /** goToCheckout */

    const goToCheckout = () =>{
        if(localStorage.getItem("login") === "true"){
            if ((JSON.parse(localStorage.getItem('cart')) || []).length > 0){
                navigate("/checkout");
            }else{
                toast.error('Cart is empty.', {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        }else{
            toast.warn('Please log in to your account. After that, show your cart products.', {
                position: toast.POSITION.TOP_CENTER,
            });
            openLoginModal();
        }
    }

    const myOrder=()=>{
        navigate("/my-order");
    }

    const [serchString, setSerchString] = useState("");
    const globalSearch=()=>{
        if(serchString.trim() !==""){
            localStorage.removeItem('searchTermForType');
            localStorage.setItem("globalSearch", serchString);
            navigate(`/items/${serchString.trim()}`);
        }
    }

        return (
            <>
            <Navbar bg="light" expand="lg" className='navbarBg NBapan OnlyDesktop'>
                <Container fluid>
                    <Navbar.Brand href="/">BsKart</Navbar.Brand>
                    <Navbar.Brand className='anyQuery'><Image 
                            className='cartIcon'
                            style={{width: "20px"}}
                            src={require(`../images/whatsapp.png`)} 
                        /> Any Query: 7679215404</Navbar.Brand>
                    <Navbar.Toggle className='NavBarManMenu' aria-controls="navbarScroll" >
                        <img
                            className='NavBarManMenuImg'
                            src={require(`../images/user.png`)}
                            alt='No Men'
                            ></img>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '150px' }}
                        navbarScroll
                    >
                        
                        {localStorage.getItem('login') === "true" ? (
                            <>
                                <NavDropdown title="User Name" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="my-order" onClick={myOrder}>
                                        Orders
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#" onClick={loginOut}>
                                        <i class="bi bi-bag-heart-fill"></i> Logout
                                    </NavDropdown.Item>
                                </NavDropdown>

                                <Nav.Link href="#" onClick={myOrder}>Orders</Nav.Link>
                                <Nav.Link href="#" onClick={loginOut}>Logout</Nav.Link>
                            </>
                        ) : (
                           <> <Nav.Link href="#" onClick={openLoginModal}>Login</Nav.Link><Nav.Link href="#" onClick={signUpModalOpen}>Sign Up</Nav.Link></>
                        )}
                        
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        onChange={(e) => { 
                            setSerchString(e.target.value)
                        }}
                        />
                        <Button variant="outline-success" onClick={globalSearch}>Search</Button>
                    </Form>
                    </Navbar.Collapse>
                    <div 
                        className='cartIconDiv'
                        onClick={() => { 
                            goToCheckout();
                        }}
                        >
                        { cartValue > 0 && (
                        <div className='itemCount'>{cartValue}</div>
                        )}
                        <Image 
                            className='cartIcon'
                            src={require(`../images/cart.png`)} 
                        />
                    </div>
                </Container>
            </Navbar>
            {/** For Mobile */}
            <Navbar bg="light" expand="lg" className='navbarBg NBapan onlyMobile'>
                <Navbar.Brand className='anyQuery'><Image 
                            className='cartIcon'
                            style={{width: "20px"}}
                            src={require(`../images/whatsapp.png`)} 
                        /> Any Query: 7679215404</Navbar.Brand>
                <Container fluid>
                    <Navbar.Brand href="/">BsKart</Navbar.Brand>
                    
                    <Navbar.Brand 
                        className='cartIconDiv'
                        onClick={() => { 
                            goToCheckout();
                        }}
                        >
                        { cartValue > 0 && (
                        <div className='itemCount'>{cartValue}</div>
                        )}
                        <Image 
                            className='cartIcon'
                            src={require(`../images/cart.png`)} 
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle className='NavBarManMenu' aria-controls="navbarScroll" >
                        {
                            (localStorage.getItem('login') !== "true") ?
                            <span style={{fontSize: "12px", fontWeight: "bold", paddingRight: "5px"}}>Login / Sign Up</span>
                            : <img
                                className='NavBarManMenuImg'
                                src={require(`../images/user.png`)}
                                alt='No Men'
                                ></img>
                        }
                        
                    
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '150px' }}
                                navbarScroll
                            >
                                
                                {localStorage.getItem('login') === "true" ? (
                                    <>
                                        <Nav.Link href="#" onClick={myOrder}>Orders</Nav.Link>
                                        <Nav.Link href="#" onClick={loginOut}>Logout</Nav.Link>
                                    </>
                                ) : (
                                <> <Nav.Link href="#" onClick={openLoginModal}>Login</Nav.Link><Nav.Link href="#" onClick={signUpModalOpen}>Sign Up</Nav.Link></>
                                )}
                                
                            </Nav>
                            <Form className="d-flex">
                                <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e) => { 
                                    setSerchString(e.target.value)
                                }}
                                />
                                <Button variant="outline-success" onClick={globalSearch}>Search</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar.Toggle>
                    
                </Container>
            </Navbar>

                
                {
                    /* Login Modal */
                    loginModal === true ? <Login modalHide={()=>setLoginModal(false)} forgotPassword={forgotPasswordOpen} signUp={signUpModalOpen}/>:""
                }

                {
                    /* Forgot password modal */
                    forgotPassModal === true ? <ForgotPassword modalHide={ hideForgotPasswordModal } openNewPassword={newPasswordOpen}/> : ""
                }

                {
                    newPassModal === true ? <NewPasswordModal modalHide={hideNewPasswordModal} openLogin={()=>openLoginModal()} /> : ""
                }

                {
                    signUpModal === true ? <SignUp modalHide={()=>setSignUpModal(false)} /> : ""
                }

                </>

                
        )
    
}

export default NavBars
