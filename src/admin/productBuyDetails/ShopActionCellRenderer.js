import React, { Component } from 'react';

import {
    useNavigate
  } from "react-router-dom";



const ActionCellRenderer = (props) => {

    const navigate = useNavigate();
function productDetailsFn(pid){
    navigate("../admin/shop_details_add/"+pid);
}


    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
    const EditHandleClick = (e) => {
        console.log("Edit", cellValue);
        productDetailsFn(cellValue)
    };
    const DeleteHandleClick = (e) => {
        console.log("Delete", cellValue);
    };

  return (
    <span>
        <button className="btn btn-primary" onClick={EditHandleClick}> Edit </button>
        <button className="btn btn-danger" onClick={DeleteHandleClick}> Delete </button>
    </span>
  );
}

export default ActionCellRenderer;