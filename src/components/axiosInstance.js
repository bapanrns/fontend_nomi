// axiosInstance.js
import axios from 'axios';

import global from "./global";
import { ToastContainer, toast } from 'react-toastify';

const instance = axios.create({
  baseURL: global["axios_url"], // Replace with your API base URL
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    // Add any headers or modifications to the request before it is sent
    // For example, you can add an authorization token from localStorage here
    let token = null;
    console.log(localStorage);
    if (localStorage.hasOwnProperty('ioc')) {
        const encodedData = localStorage.getItem('ioc');
        const jsonData = JSON.parse(window.atob(encodedData));
        token = jsonData.token;
    }

    if (token) {
      config.headers['Authorization'] = token;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response;
  },
  (error) => {
    console.log(error);
    //alert();
    // Handle response error
    if (error.response && error.response.status === 401) {
      // Redirect to login or perform any action you want for unauthorized requests
      // For example, you can clear the token from localStorage and redirect to the login page
        toast.error('Your session has expired. Please log in to continue.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
        if(localStorage.getItem("login")){
          localStorage.setItem("cart","[]");
        }
        localStorage.setItem("login", false);
        //localStorage.removeItem('ioc');
         // Redirect to login page
    }else if(error.response && error.response.status === 403){
        toast.error('Unauthorized: Insufficient privileges.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
        localStorage.clear();
        localStorage.setItem("login", false);
        localStorage.setItem("cart","[]");
    }
    //localStorage.removeItem('ioc');
    //localStorage.clear();
    setTimeout(() => {
      //  window.location.href = '/';
    }, 3500);
    

    return Promise.reject(error);
  }
);

export default instance;
