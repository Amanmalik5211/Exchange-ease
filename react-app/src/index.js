import './index.css';
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Singup from './components/Signup';
import AddProduct from './components/AddProduct';
import LikedProduct from './components/LikedProduct';
import ProductDetail from './components/ProductDetail';
import CategoryPage from './components/CategoryPage';
import MyProducts from './components/MyProducts';
import MyProfile from './components/MyProfile';
import EditProduct from './components/EditProduct';
const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home/> ),
  },
  {
    path: "/login",
    element: (<Login/>)
  },
  {
    path: "/signup",
    element: (<Singup/>)
  },
  {
    path: "/add-product",
    element: (<AddProduct/>)
  },
  {
    path: "/liked-products",
    element: (<LikedProduct/>)
  },
  {
    path: "/product/:productid",
    element: (<ProductDetail/>)
  },
  {
    path: "/category/:catName",
    element: (<CategoryPage/>)
  },
  {
    path: "/my-products",
    element: (<MyProducts/>)
  },
  {
    path: "/my-profile",
    element: (<MyProfile/>)
  },
  {
    path: "/edit-product/:pid",
    element: (<EditProduct/>)
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
  );
