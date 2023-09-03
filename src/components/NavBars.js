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
import { ToastContainer, toast } from 'react-toastify';


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
        if ((JSON.parse(localStorage.getItem('cart')) || []).length > 0){
            navigate("/checkout");
        }else{
            toast.error('Cart is empty.', {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }

    const myOrder=()=>{
        navigate("/my-order");
    }

        return (
            <Navbar bg="light" expand="lg" className='navbarBg'>
                <Container fluid>
                    <Navbar.Brand href="/">MoreBuy</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '150px' }}
                        navbarScroll
                    >
                        
                        {localStorage.getItem('login') === "true" ? (
                            <>
                                <NavDropdown title="User Name" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="#action3">My Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="my-order" onClick={myOrder}>
                                        Orders
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">
                                        <i class="bi bi-bag-heart-fill"></i> Wishlist
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#" onClick={loginOut}>
                                        <i class="bi bi-bag-heart-fill"></i> Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
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
                        />
                        <Button variant="outline-success">Search</Button>
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


                
                {
                    /* Login Modal */
                    loginModal === true ? <Login modalHide={()=>setLoginModal(false)} forgotPassword={forgotPasswordOpen} signUp={signUpModalOpen}/>:""
                }

                {
                    /* Forgot password modal */
                    forgotPassModal === true ? <ForgotPassword modalHide={ hideForgotPasswordModal } openNewPassword={newPasswordOpen}/> : ""
                }

                {
                    newPassModal === true ? <NewPasswordModal modalHide={hideNewPasswordModal}/> : ""
                }

                {
                    signUpModal === true ? <SignUp modalHide={()=>setSignUpModal(false)} /> : ""
                }



                </Navbar>
        )
    
}

export default NavBars
