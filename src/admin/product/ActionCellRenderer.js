import React, { useState } from 'react';

import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Loader from '../../components/Loader';

import axios from "axios";
import global from "../../components/global";

import axiosInstance from '../../components/axiosInstance';

import {
    useNavigate
  } from "react-router-dom";



const ActionCellRenderer = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  function productDetailsFn(pid){
    //navigate("../admin/product-add/"+pid);
    window.open("../admin/product-add/"+pid, '_blank');
  }

  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
  const EditHandleClick = (e) => {
      console.log("Edit", cellValue);
      productDetailsFn(cellValue)
  };

  const [imageArray, setImageArray] = useState([]);
  const showImages = (e) => {
    setIsLoading(true);
    const headers = {
        'Content-Type': 'application/json'
    }
    
    axios.post(global["axios_url"]+'/findProductImage', {product_id: cellValue}, {
        headers: headers
    })
    .then((response) => {
        console.log(response.data.length)
        setImageArray(response.data);
        setIsLoading(false);
        setShow(true);
        // console.log(response.data);
    })
    .catch((error) => {
        console.log(error)
        setIsLoading(false);
    })
  };

  const ActiveHandleClick = (e) => {
    //navigate("../admin/product_active/"+cellValue);
    window.open("../admin/product_active/"+cellValue, '_blank');
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  const setPrimary = (id, product_id) =>{
    console.log(id, product_id);
    setIsLoading(true);
    /*const headers = {
        'Content-Type': 'application/json'
    }*/
    
    axiosInstance.post('/setPrimaryImage', {id: id, product_id: product_id})
    /*axios.post(global["axios_url"]+'/setPrimaryImage', {id: id, product_id: product_id}, {
        headers: headers
    })*/
    .then((response) => {
        console.log(response);
        alert("Set Primary image.");
        setIsLoading(false);
        setShow(false);
    })
    .catch((error) => {
        console.log(error);
        alert('Error');
        setIsLoading(false);
    })
  }

  const productStock=()=>{
   // navigate("../admin/stocks_add/"+cellValue);
    window.open("../stocks/"+cellValue, '_blank');
  }

  const productDelete=()=>{
    const shouldDelete = window.confirm('Are you sure you want to delete this?');
    if (shouldDelete) {
      axiosInstance.post('/deleteProduct', {id: cellValue})
      .then((response) => {
          navigate(0);
          alert("Inactive");
      }).catch((error) => {
          console.log(error);
      })
    }
  }

  return (
    <>
    <span>
        <button className="btn btn-primary" style={{padding: '2px 9px 2px 9px', fontWeight: 'bold', fontSize: '12px'}} onClick={EditHandleClick}> Edit </button>
        <button className="btn btn-success" style={{padding: '2px 9px 2px 9px', margin: '5px', fontWeight: 'bold', fontSize: '12px'}} onClick={ActiveHandleClick}> Active/view </button>
        <button className="btn btn-danger" style={{padding: '2px 9px 2px 9px', fontWeight: 'bold', fontSize: '12px'}} onClick={showImages}>Set Primary Image </button>
        <button className={(props.data.stock > 0)?"btn btn-warning":"btn btn-success"} style={{padding: '2px 9px 2px 9px', fontWeight: 'bold', fontSize: '12px', marginLeft: "5px"}} onClick={productStock}>Stock </button>
        <button className={(props.data.stock > 0)?"btn btn-warning":"btn btn-danger"} style={{padding: '2px 9px 2px 9px', fontWeight: 'bold', fontSize: '12px', marginLeft: "5px"}} onClick={productDelete}>Delete </button>
    </span>

    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Product Images</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='col-md-12' style={{padding: "5px", display: 'inline-block'}}>
          {
              imageArray.map((obj, index)=>{
                  return (
                      <div style={{float: 'left', paddingRight: '10px', height: '250px', position: 'relative'}} key={"imageDiv"+index}>
                          <div style={{border: obj.primary === 1?"3px #00cfff dashed":"3px #000 dashed"}}>
                          {obj.primary === 1 && <><label style={{fontWeight: 'bold', width: '100%', textAlign: 'center', background: '#00cfff', color: '#fff'}}>Primary Image</label> <br></br></>}
                              <img 
                                //src={require("../../images/product/"+obj.image_name)} 
                                src={`${global.productImageUrl}${obj.image_name}`}
                                alt="No" 
                                style={{ width: '200px', height: '200px'}}></img>
                              <br></br>
                              
                                {
                                  obj.primary === 0 &&
                                  <label style={{cursor: 'pointer', fontWeight: 'bold', padding: '5px', width: "100%", textAlign: 'center'}}>
                                    <input
                                      type="radio"
                                      id={obj.id}
                                      name='productImage'
                                      value="1"
                                      onClick={(e) => { 
                                        setPrimary(obj.id, obj.product_id)
                                      }}
                                    />
                                    Set Primary
                                  </label>
                                }
                          </div>
                      </div>
                  );
              })

          }    
        </div>
      </Modal.Body>
    </Modal>
    </>
  );
}

export default ActionCellRenderer;