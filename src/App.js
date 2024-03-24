
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBars from './components/NavBars';
import AdminNavBars from './components/AdminNavBars';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from './FrontEnd/Home';
import Items from './FrontEnd/Items';
import ItemDetails from './FrontEnd/ItemDetails';
import Checkout from './cart/Checkout';
import Product from './admin/product/Product';
import ProductAdd from './admin/product/ProductAdd';
import ProductActive from './admin/product/ProductActive';
import AdminBuy from "./admin/product/AdminBuy";

import StocksAdd from './admin/Stock/StocksAdd';
import Stocks from './admin/Stock/Stocks';

import MyOrder from './cart/Order';


import Category from './admin/category/Category';
import AddCategory from './admin/category/AddCategory';

import SubCategory from './admin/subCategory/SubCategory';
import AddSubCategory from './admin/subCategory/AddSubCategory';

import ProductFabric from './admin/productFabric/ProductFabric';
import AddProductFabric from './admin/productFabric/AddProductFabric';

import BuyDetailsAdd from "./admin/productBuyDetails/BuyDetailsAdd";
import ShopDetailsAdd from "./admin/productBuyDetails/ShopAdd";
import ShopDetails from "./admin/productBuyDetails/ShopDetails";
import BuyDetails from "./admin/productBuyDetails/BuyDetails";
import DeliveryBoy from "./admin/deliveryBoy/DeliveryBoy";
import AddDeliveryBoy from "./admin/deliveryBoy/AddDeliveryBoy";
import PhoneNumberList from "./admin/customerPhoneNumber/PhoneNumberList";
import AddPhoneNumber from "./admin/customerPhoneNumber/AddPhoneNumber";

import Order from "./admin/order/order";

import UserList from "./admin/user/UserList";


// Notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

import axiosInstance from './components/axiosInstance';

import Footer from './components/Footer';

import ReactGA from 'react-ga';

ReactGA.initialize('UA-288720205-1');


let userRole = 'user';

if (localStorage.hasOwnProperty('ioc')) {
  const encodedData = localStorage.getItem('ioc');
  const jsonData = JSON.parse(window.atob(encodedData));
  userRole = jsonData.user_type;
}

// Custom function to check user authorization based on role
const isAuthorized = (roleRequired) => {
  return roleRequired.includes(userRole);
};


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [cartValue, setCartValu] = useState(
    (JSON.parse(localStorage.getItem('cart')) || []).length
  );
  const getCartValue = (itemIds, itemSize, buyNow) => {
    //localStorage.removeItem('cart');
    let cartArray = JSON.parse(localStorage.getItem('cart')) || []; // Initialize cartArray with the stored data or an empty array if nothing is stored
    if(cartArray.includes(itemIds+"@"+itemSize)){
      toast.warning('Items already in cart.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }else{

      if(localStorage.getItem("login") === "true"){
        setIsLoading(true);
        let data = {itemIds: itemIds, itemSize: itemSize};
        axiosInstance.post('/saveCartData', data)
        .then((response) => {
            setIsLoading(false);
            if(response.data.errorMessage !==""){
              // Items are not available.
              toast.warn(response.data.errorMessage, {
                position: toast.POSITION.TOP_CENTER,
              }); 
            }else{
              setAddToCartData(itemIds, cartArray, itemSize);
              toast.success('Item added to cart successfully.', {
                position: toast.POSITION.TOP_CENTER,
              }); 
              if (buyNow === 1){
                window.open("/checkout",'_blank');
              }
            }
        })
        .catch((error) => {
            console.log('Error:', error);
        });
      }else{
        setAddToCartData(itemIds, cartArray, itemSize);
        toast.success('Item added to cart successfully.', {
          position: toast.POSITION.TOP_CENTER,
        }); 
      }
    }
  }

  const setAddToCartData=(itemIds, cartArray, size)=>{
    cartArray.push(itemIds+"@"+size);
    setCartValu(cartArray.length);
    localStorage.setItem('cart', JSON.stringify(cartArray));     
  }

  const removeCartItem=(itemToRemove, buyCompleted=false)=>{
    
    if(localStorage.getItem("login")){
      removeAddToCartData(itemToRemove);
    }else{
      removeAddToCartData(itemToRemove);
    }
    if(!buyCompleted){
      toast.success('Item removed from cart successfully.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  const removeAddToCartData=(itemToRemove)=>{
    let cartArray = JSON.parse(localStorage.getItem('cart')) || []; // Initialize cartArray with the stored data or an empty array if nothing is stored
    cartArray = cartArray.filter((item) => item.toString() !== itemToRemove.toString());
    setCartValu(cartArray.length);
    localStorage.setItem('cart', JSON.stringify(cartArray));
  }
  return (
      <>
      <BrowserRouter>
        
        
        {
          (userRole === "Admin" || userRole === "delivery_boy")?<AdminNavBars userRole={userRole} />:<NavBars cartValue={cartValue}/>
        }
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Home />} />
          <Route path="/:id/:id" element={<Home />} />
          <Route path="product-details/:id" element={<ItemDetails  getCartValue={getCartValue} />} />
          <Route path="checkout" element={<Checkout removeCartItem={removeCartItem}/>} />
          
          <Route path="items/:id" element={<Items />} />

          <Route path="my-order" element={<MyOrder />} />

          {/* -------------------------------- Admin --------------------------------- */}

          <Route
            path="admin/product-add"
            element={
              isAuthorized(['Admin']) ? (
                <ProductAdd />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/*<Route path="admin/product-add" element={<ProductAdd />} />*/}
          <Route
            path="admin/product-add/:id"
            element={
              isAuthorized(['Admin']) ? (
                <ProductAdd />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/*<Route path="admin/product-add/:id" element={<ProductAdd />} />*/}

          <Route
            path="admin/product"
            element={
              isAuthorized(['Admin']) ? (
                <Product />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/*<Route path="admin/product" element={<Product />} />*/}

          <Route
            path="admin/stocks/:id"
            element={
              isAuthorized(['Admin']) ? (
                <Stocks />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          
          <Route
            path="admin/stocks_add/:id"
            element={
              isAuthorized(['Admin']) ? (
                <StocksAdd />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="admin/product_active/:id"
            element={
              isAuthorized(['Admin']) ? (
                <ProductActive />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          

          <Route
            path="admin/product_buy"
            element={
              isAuthorized(['Admin']) ? (
                <AdminBuy />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/*<Route path="admin/product_active/:id" element={<ProductActive />} />*/}

          <Route
            path="admin/category"
            element={
              isAuthorized(['Admin']) ? (
                <Category />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/*<Route path="admin/category" element={<Category />} />*/}

          <Route
            path="admin/category-add"
            element={
              isAuthorized(['Admin']) ? (
                <AddCategory />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/*<Route path="admin/category-add" element={<AddCategory />} />*/}

          <Route
            path="admin/category-add/:id"
            element={
              isAuthorized(['Admin']) ? (
                <AddCategory />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/*<Route path="admin/category-add/:id" element={<AddCategory />} />*/}

          <Route
            path="admin/sub_category"
            element={
              isAuthorized(['Admin']) ? (
                <SubCategory />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/*<Route path="admin/sub_category" element={<SubCategory />} />*/}

          <Route
            path="admin/sub_category_add"
            element={
              isAuthorized(['Admin']) ? (
                <AddSubCategory />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/*<Route path="admin/sub_category_add" element={<AddSubCategory />} />*/}

          <Route
            path="admin/sub_category_add/:id"
            element={
              isAuthorized(['Admin']) ? (
                <AddSubCategory />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/*<Route path="admin/sub_category_add/:id" element={<AddSubCategory />} />*/}
          
          <Route
            path="admin/product_fabric"
            element={
              isAuthorized(['Admin']) ? (
                <ProductFabric />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/*<Route path="admin/product_fabric" element={<ProductFabric />} />*/}

          <Route
            path="admin/product_fabric_add"
            element={
              isAuthorized(['Admin']) ? (
                <AddProductFabric />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/*<Route path="admin/product_fabric_add" element={<AddProductFabric />} />*/}

          <Route
            path="admin/product_fabric_add/:id"
            element={
              isAuthorized(['Admin']) ? (
                <AddProductFabric />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/*<Route path="admin/product_fabric_add/:id" element={<AddProductFabric />} />*/}

          <Route
            path="admin/buy_details_add"
            element={
              isAuthorized(['Admin']) ? (
                <BuyDetailsAdd />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/*<Route path="admin/buy_details_add" element={<BuyDetailsAdd />} />*/}

          <Route
            path="admin/buy_details_add/:id"
            element={
              isAuthorized(['Admin']) ? (
                <BuyDetailsAdd />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/*<Route path="admin/buy_details_add/:id" element={<BuyDetailsAdd />} />*/}

          <Route
            path="admin/shop_details_add"
            element={
              isAuthorized(['Admin']) ? (
                <ShopDetailsAdd />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/*<Route path="admin/shop_details_add" element={<ShopDetailsAdd />} />*/}

          <Route
            path="admin/shop_details_add/:id"
            element={
              isAuthorized(['Admin']) ? (
                <ShopDetailsAdd />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/*<Route path="admin/shop_details_add/:id" element={<ShopDetailsAdd />} />*/}

          <Route
            path="admin/shop"
            element={
              isAuthorized(['Admin']) ? (
                <ShopDetails />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/*<Route path="admin/shop" element={<ShopDetails />} />*/}

          <Route
            path="admin/buy_details"
            element={
              isAuthorized(['Admin']) ? (
                <BuyDetails />
              ) : (
                <Navigate to="/" replace />
              )
            }

            
          />
          
          <Route
            path="admin/order"
            element={
              isAuthorized(['Admin']) ? (
                <Order />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="admin/user_list"
            element={
              isAuthorized(['Admin']) ? (
                <UserList />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="admin/add_delivery_person"
            element={
              isAuthorized(['Admin']) ? (
                <AddDeliveryBoy />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="admin/phone_number"
            element={
              isAuthorized(['Admin', 'delivery_boy']) ? (
                <PhoneNumberList />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="admin/add_phone_number"
            element={
              isAuthorized(['Admin', 'delivery_boy']) ? (
                <AddPhoneNumber />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="admin/delivery_person"
            element={
              isAuthorized(['Admin']) ? (
                <DeliveryBoy />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/*<Route path="admin/buy_details" element={<BuyDetails />} />*/}
        </Routes>
      </BrowserRouter>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;
