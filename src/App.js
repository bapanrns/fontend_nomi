
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBars from './components/NavBars';
import AdminNavBars from './components/AdminNavBars';
import Home from './components/Home';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ItemDetails from './product/ItemDetails';
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

function App() {
  return (
      <>
      <BrowserRouter>
        {/*<NavBars />*/}
        <AdminNavBars />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="product-details/:id" element={<ItemDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="admin/product-add" element={<ProductAdd />} />
          <Route path="admin/product-add/:id" element={<ProductAdd />} />
          <Route path="admin/product" element={<Product />} />
          <Route path="admin/product_active/:id" element={<ProductActive />} />
          
          <Route path="admin/category" element={<Category />} />
          <Route path="admin/category-add" element={<AddCategory />} />
          <Route path="admin/category-add/:id" element={<AddCategory />} />
          
          <Route path="admin/sub_category" element={<SubCategory />} />
          <Route path="admin/sub_category_add" element={<AddSubCategory />} />
          <Route path="admin/sub_category_add/:id" element={<AddSubCategory />} />
          
          <Route path="admin/product_fabric" element={<ProductFabric />} />
          <Route path="admin/product_fabric_add" element={<AddProductFabric />} />
          <Route path="admin/product_fabric_add/:id" element={<AddProductFabric />} />

          <Route path="admin/buy_details_add" element={<BuyDetailsAdd />} />
          <Route path="admin/buy_details_add/:id" element={<BuyDetailsAdd />} />
          <Route path="admin/shop_details_add" element={<ShopDetailsAdd />} />
          <Route path="admin/shop_details_add/:id" element={<ShopDetailsAdd />} />
          <Route path="admin/shop" element={<ShopDetails />} />
          <Route path="admin/buy_details" element={<BuyDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
