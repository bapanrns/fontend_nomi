import React, { useState } from 'react'
import {Container, NavDropdown, Form, Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, Link } from "react-router-dom";

import Login from '../login/Login';
import ForgotPassword from '../login/ForgotPassword';
import NewPasswordModal from '../login/NewPassword';
import SignUp from '../login/SignUp';


import './profile.css';

  const AdminNavBars = () => {

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
        localStorage.clear();
        navigate("/");
        window.location.reload(false);
    }

        return (
            <Navbar bg="light" expand="lg" className='navbarBg'>
                <Container fluid>
                    <Navbar.Brand href="/">MoreBuy</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '300px' }}
                        navbarScroll
                    >
                        
                        {localStorage.getItem('login') === "true" ? (
                            <>
                                <NavDropdown title="User Name" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="#action3">My Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action4">
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
                        <NavDropdown title="Category" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to="/admin/Category">Category</Link>
                            <Link className="dropdown-item" to="/admin/category-add">Add Category</Link>
                        </NavDropdown>
                        <NavDropdown title="Sub Category" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to="/admin/sub_category">Sub Category</Link>
                            <Link className="dropdown-item" to="/admin/sub_category_add">Add Sub Category</Link>
                        </NavDropdown>
                        <NavDropdown title="Product Fabric" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to="/admin/product_fabric">Product Fabric</Link>
                            <Link className="dropdown-item" to="/admin/product_fabric_add">Add Product Fabric</Link>
                        </NavDropdown>
                        
                        <NavDropdown title="Product" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to="/admin/product">Product</Link>
                            <Link className="dropdown-item" to="/admin/product-add">Add Product</Link>
                        </NavDropdown>

                        <NavDropdown title="Buy" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to="/admin/buy_details">Buy Details</Link>
                            <Link className="dropdown-item" to="/admin/buy_details_add">Add Buy Product Details</Link>
                            <Link className="dropdown-item" to="/admin/shop">Shop Details</Link>
                            <Link className="dropdown-item" to="/admin/shop_details_add">Add Shop Details</Link>
                        </NavDropdown>
                        
                        
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

export default AdminNavBars
