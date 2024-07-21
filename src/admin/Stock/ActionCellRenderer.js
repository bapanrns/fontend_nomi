import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import axiosInstance from '../../components/axiosInstance';
import { toast } from 'react-toastify';



const ActionCellRenderer = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  const updateProductStock=()=>{
    console.log(cellValue);
    setIsLoading(true);
      axiosInstance.post('/updateQuantity', {id: cellValue})
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
      })
  }

  const deleteProductStock = () =>{
    setIsLoading(true);
      axiosInstance.post('/deleteProductStock', {id: cellValue})
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
      })
  }

  return (
    <>
    {
      props.data.status === "Pending" &&
    
    <span>
        <button className="btn btn-success" style={{padding: '2px 9px 2px 9px', fontWeight: 'bold', fontSize: '12px', marginLeft: "5px"}} onClick={updateProductStock}>Update Quantity </button>

        <button className="btn btn-danger" style={{padding: '2px 9px 2px 9px', fontWeight: 'bold', fontSize: '12px', marginLeft: "5px"}} onClick={deleteProductStock}>Delete </button>
    </span>
  }
    </>
  );
}

export default ActionCellRenderer;