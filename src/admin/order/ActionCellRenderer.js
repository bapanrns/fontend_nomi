import React, { Component, useState } from 'react';

import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from '../../components/Loader';

import axiosInstance from '../../components/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';

import {
    useNavigate
  } from "react-router-dom";

  

const ActionCellRenderer = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
  
  const [orderStatusChange, setOrderStatus] = useState({
    OrderStatus: "",
    orderMessage: "",
    id: "",
  });
  const handalChange = (e) =>{
    setOrderStatus({...orderStatusChange, [e.target.name]: e.target.value});
  }

  const [useFor, setUseFor] = useState("");

  const updateOrderStatusFn = (e) => {
    //console.log(props.data.orderId);
    setOrderStatus({...orderStatusChange, ['id']: props.data.orderItemId, ['OrderStatus']: props.data.order_status, ['orderMessage']: props.data.orderId});
    setUseFor("OrderStatus");
    handleShow();
  };

  const UpdateOrderStatus =()=>{
    setIsLoading(true);
    if(orderStatusChange.OrderStatus !== ""){
      const shouldDelete = window.confirm('Are you sure you want to change status?');
      if (shouldDelete) {
        axiosInstance.post('/UpdateOrderStatus', orderStatusChange)
        .then((response) => {
            setIsLoading(false);
            if(!response.data.status){
              toast.success(response.data.message, {
                position: toast.POSITION.TOP_CENTER,
              });
            }else{
              toast.warn(response.data.message, {
                position: toast.POSITION.TOP_CENTER,
              });
            }
            window.location.reload(false);
        })
        .catch((error) => {
          toast.warn(error.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
            setIsLoading(false);
        })
      }
    }else{
      toast.warn("Please select Order Status", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }


  const [DeliveryBoy, setDeliveryBoy] = useState({
    itemId: "",
    boyId: ""
  });
  const handalChangeForBoy = (e) => {
    setDeliveryBoy({...orderStatusChange, ['itemId']: props.data.orderId});
    handleShow();
  };

  const assignDeliveryBoy = () =>{
    setDeliveryBoy({...orderStatusChange, ['itemId']: props.data.orderId});
    handleShow();
    setUseFor("assignBoy");
      /*setIsLoading(true);
      axiosInstance.post('/assignDeliveryBoy', {id: cellValue})
      .then((response) => {
          setIsLoading(false);
          toast.success(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
          });
          window.location.reload(false);
      })
      .catch((error) => {
          console.log(error);
          setIsLoading(false);
      })*/
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <span>
        <button className="btn btn-success" style={{padding: '2px 9px 2px 9px', fontWeight: 'bold', fontSize: '12px', marginLeft: "5px"}} onClick={updateOrderStatusFn}>Status Update </button>

        <button className="btn btn-danger" style={{padding: '2px 9px 2px 9px', fontWeight: 'bold', fontSize: '12px', marginLeft: "5px"}} onClick={assignDeliveryBoy}>Assign Delivery Boy </button>
      </span>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Product Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* For Order Status */}
          {useFor === "OrderStatus" &&
            <div className='col-md-12' style={{ padding: "5px", display: 'inline-block' }}>
              <div className="col-md-4" style={{float: "left", paddingRight: "10px"}}>
                <label className="form-label" htmlFor="OrderStatus.ControlInput1">Status: </label>
                <select 
                    className="form-select" 
                    id="OrderStatus" 
                    name="OrderStatus" 
                    onChange={handalChange} 
                    value={orderStatusChange.OrderStatus}
                >
                    <option value="Reject">Reject</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirm">Confirm</option>
                    <option value="On the way">On the way</option>
                    <option value="Complete">Complete</option>
                    <option value="Return">Return</option>
                </select>
              </div>
            
              <div className="col-md-4" style={{float: "left", paddingRight: "10px"}}>
                <label className="form-label" htmlFor="orderMessage.ControlInput1">Status Meaasge: </label>
                <select 
                    className="form-select" 
                    id="orderMessage" 
                    name="orderMessage" 
                    onChange={handalChange} 
                    value={orderStatusChange.orderMessage}
                >
                    <option value="">Null</option>
                    <option value="Your address information is incorrect">Your address information is incorrect.</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="We are not delivering to your address">We are not delivering to your address.</option>
                </select>
              </div>

              <div className="col-md-4" style={{float: "left", paddingRight: "10px"}}>
                <button 
                  className='btn btn-info' 
                  style={{marginTop: "32px"}} 
                  onClick={(e) => { 
                    UpdateOrderStatus();
                  }}>Update</button>
              </div>
            </div>
          }
          {/* For Order Status */}
          {/* For Delivery Boy */}
          {useFor === "assignBoy" &&
          <div className='col-md-12' style={{ padding: "5px", display: 'inline-block' }}>
              <div className="col-md-4" style={{float: "left", paddingRight: "10px"}}>
                <label className="form-label" htmlFor="OrderStatus.ControlInput1">Delivery Boy: </label>
                <select 
                    className="form-select" 
                    id="OrderStatus" 
                    name="OrderStatus" 
                    onChange={handalChangeForBoy} 
                    value={DeliveryBoy.Boy}
                >
                    <option value="Reject">Reject</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirm">Confirm</option>
                    <option value="On the way">On the way</option>
                    <option value="Complete">Complete</option>
                    <option value="Return">Return</option>
                </select>
              </div>
            
              <div className="col-md-4" style={{float: "left", paddingRight: "10px"}}>
                <label className="form-label" htmlFor="orderMessage.ControlInput1">Status Meaasge: </label>
                <select 
                    className="form-select" 
                    id="orderMessage" 
                    name="orderMessage" 
                    onChange={handalChange} 
                    value={orderStatusChange.orderMessage}
                >
                    <option value="">Null</option>
                    <option value="Your address information is incorrect">Your address information is incorrect.</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="We are not delivering to your address">We are not delivering to your address.</option>
                </select>
              </div>

              <div className="col-md-4" style={{float: "left", paddingRight: "10px"}}>
                <button 
                  className='btn btn-info' 
                  style={{marginTop: "32px"}} 
                  onClick={(e) => { 
                    UpdateOrderStatus();
                  }}>Update</button>
              </div>
            </div>
          }
          {/* For Delivery Boy */}
        </Modal.Body>
      </Modal>

    </>
  );
}

export default ActionCellRenderer;