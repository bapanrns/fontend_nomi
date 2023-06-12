import React, { Component } from 'react';
import axios from "axios";

import {
    useNavigate,
    useHistory
  } from "react-router-dom";



const ActionCellRenderer = (props) => {

  const navigate = useNavigate();
  function productDetailsFn(pid){
      navigate("../admin/sub_category_add/"+pid);
  }


  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
  const EditHandleClick = (e) => {
      console.log("Edit", cellValue);
      productDetailsFn(cellValue)
  };

  const DeleteHandleClick = (e) => {
    console.log("Delete", cellValue);
    e.preventDefault();
    const headers = {
        'Content-Type': 'application/json'
    }
    axios.post('http://localhost:8081/api/deleteSubCategory', {id: cellValue}, {
        headers: headers
    })
    .then((response) => {
        alert(response.data);
        //navigate("../admin/sub_category/");
        navigate(0);
    })
    .catch((error) => {
        console.log(error)
        alert(error);
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