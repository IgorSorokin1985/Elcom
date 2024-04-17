import React, { useContext } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import Shop from "../pages/Shop";
import Moderator from "../pages/Moderator";
import Auth from "../pages/Auth";
import Cart from "../pages/Cart";
import ItemDetails from "../pages/ItemDetails";
import Context from "../index"
import Profile from "../pages/Profile";
import { CART_ROUTE, ITEM_ROUTE, LOGIN_ROUTE, MODERATOR_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, ADD_COMPANY_ROUTE, ORDER_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import Registration from "../pages/Registration";
import AddCompany from "../pages/AddCompany";
import OrderDetail from "../pages/OrderDetail";


const AppRouter = observer(() => {    
    const {user} = useContext(Context)

    return (
        <Routes>
          <Route path={SHOP_ROUTE} element={<Shop/>}/>          
          <Route path={LOGIN_ROUTE} element={<Auth/>}/>
          <Route path={REGISTRATION_ROUTE} element={<Registration/>}/>          
          { user.isAuth &&  <Route path={ITEM_ROUTE + "/:id"} element={<ItemDetails/>}/>}
          { user.isAuth &&  <Route path={CART_ROUTE} element={<Cart/>}/> }
          { user.isAuth &&  <Route path={PROFILE_ROUTE} element={<Profile/>}/>}
          { user.isAuth &&  <Route path={MODERATOR_ROUTE} element={<Moderator/>}/>}
          { user.isAuth &&  <Route path={ADD_COMPANY_ROUTE} element={<AddCompany/>}/>}
          { user.isAuth &&  <Route path={ORDER_ROUTE + '/:id'} element={<OrderDetail/>}/>}
        </Routes>
    );
  })
  
  export default AppRouter;
