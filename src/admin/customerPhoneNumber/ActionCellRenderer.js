import React, { useState } from 'react';

import {
    useNavigate
  } from "react-router-dom";

import axiosInstance from '../../components/axiosInstance';
import { toast } from 'react-toastify';



const ActionCellRenderer = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  function productDetailsFn(pid){
      navigate("../admin/category-add/"+pid);
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
      axiosInstance.post('/deleteCategory', {id: cellValue})
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