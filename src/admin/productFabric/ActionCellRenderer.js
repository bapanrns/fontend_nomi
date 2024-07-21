import React from 'react';
//import axios from "axios";

//import Loader from '../../components/Loader'
//import global from "../../components/global";
import axiosInstance from '../../components/axiosInstance';
// Notification
//import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    useNavigate,
    useHistory
  } from "react-router-dom";



const ActionCellRenderer = (props) => {

  const navigate = useNavigate();
  function productDetailsFn(pid){
      navigate("../admin/product_fabric_add/"+pid);
  }


  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
  const EditHandleClick = (e) => {
      console.log("Edit", cellValue);
      productDetailsFn(cellValue)
  };

  const DeleteHandleClick = (e) => {
    console.log("Delete", cellValue);
    e.preventDefault();

   /* const headers = {
        'Content-Type': 'application/json'
    }*/
    
    //let data = {};
    axiosInstance.post('/deleteProductFabric', {id: cellValue})
    /*axios.post(global["axios_url"]+'/deleteProductFabric', {id: cellValue}, {
        headers: headers
    })*/
    .then((response) => {
        //console.log(response.data);
        navigate(0);
    }).catch((error) => {
        console.log(error);
    })
  };

  return (
    <span>
        <button className="btn btn-primary" onClick={EditHandleClick}> Edit </button>
        <button className="btn btn-danger" onClick={DeleteHandleClick}> Delete </button>
    </span>
  );
}

export default ActionCellRenderer;