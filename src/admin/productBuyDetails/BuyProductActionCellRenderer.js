import React, { Component, useState } from 'react';
import Loader from '../../components/Loader'
import axiosInstance from '../../components/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';

import {
    useNavigate
  } from "react-router-dom";



const ActionCellRenderer = (props) => {
  const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    function productDetailsFn(pid){
        navigate("../admin/buy_details_add/"+pid);
    }


    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
    const EditHandleClick = (e) => {
        console.log("Edit", cellValue);
        productDetailsFn(cellValue)
    };
    const DeleteHandleClick = (e) => {
      const shouldDelete = window.confirm('Are you sure you want to delete this?');
      if (shouldDelete) {
        setIsLoading(true);
        axiosInstance.post('/deleteBuyProductDetails', {id: cellValue})
        .then((response) => {
            setIsLoading(false);
            if(response.data.success === true){
              toast.success('Delete successfully.', {
                position: toast.POSITION.TOP_CENTER,
              });
            }
            setTimeout(() => {
              window.location.reload();
            }, 2000);
        })
        .catch((error) => {
          toast.success('Delete error.', {
            position: toast.POSITION.TOP_CENTER,
          });
            console.log(error)
        })
      }
    };

  return (
    <span>
        <button className="btn btn-primary" onClick={EditHandleClick}> Edit </button>
        <button className="btn btn-danger" onClick={DeleteHandleClick}> Delete </button>
    </span>
  );
}

export default ActionCellRenderer;