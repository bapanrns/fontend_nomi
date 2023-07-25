
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


// Notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


let userRole = 'user';

if (localStorage.hasOwnProperty('ioc')) {
  const encodedData = localStorage.getItem('ioc');
  const jsonData = JSON.parse(window.atob(encodedData));
  userRole = jsonData.user_type;
}



// Custom function to check user authorization based on role
const isAuthorized = (roleRequired) => {
  return userRole === roleRequired;
};


function App() {
  return (
      <>
      <BrowserRouter>
        
        <NavBars />
        {
          (userRole === "Admin")?<AdminNavBars />:""
        }
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Home />} />
          <Route path="/:id/:id" element={<Home />} />
          <Route path="product-details/:id" element={<ItemDetails />} />
          <Route path="checkout" element={<Checkout />} />
          
          <Route path="items/:id" element={<Items />} />


          {/* -------------------------------- Admin --------------------------------- */}

          <Route
            path="admin/product-add"
            element={
              isAuthorized('Admin') ? (
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
              isAuthorized('Admin') ? (
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
              isAuthorized('Admin') ? (
                <Product />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/*<Route path="admin/product" element={<Product />} />*/}

          <Route
            path="admin/product_active/:id"
            element={
              isAuthorized('Admin') ? (
                <ProductActive />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/*<Route path="admin/product_active/:id" element={<ProductActive />} />*/}

          <Route
            path="admin/category"
            element={
              isAuthorized('Admin') ? (
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
              isAuthorized('Admin') ? (
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
              isAuthorized('Admin') ? (
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
              isAuthorized('Admin') ? (
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
              isAuthorized('Admin') ? (
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
              isAuthorized('Admin') ? (
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
              isAuthorized('Admin') ? (
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
              isAuthorized('Admin') ? (
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
              isAuthorized('Admin') ? (
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
              isAuthorized('Admin') ? (
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
              isAuthorized('Admin') ? (
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
              isAuthorized('Admin') ? (
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
              isAuthorized('Admin') ? (
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
              isAuthorized('Admin') ? (
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
              isAuthorized('Admin') ? (
                <BuyDetails />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/*<Route path="admin/buy_details" element={<BuyDetails />} />*/}
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
