import React, {useContext, useEffect, useState} from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavbarPage from "./components/Navbar";
import {observer} from "mobx-react-lite";
import {check} from "./http/userAPI";
import {Context} from "./index";
import {Spinner} from "react-bootstrap";
import { login, userInfo } from "../src/http/userAPI";
import { fetchLastOrdeerID } from "../src/http/ordersAPI";
import CarouselInfo from './components/Carusel';
import Footer from './components/Footer';
import { fetchItems, fetchCategories } from "../src/http/itemsAPI";

const App = observer(() => {
  const {user} = useContext(Context)
  const {itemsData} = useContext(Context)
  const [loading, setLoading] = useState(true)

  const autoLogin = async () => {
    if (localStorage.getItem('login') && localStorage.getItem('password')) {
      await login (localStorage.getItem('login'), localStorage.getItem('password'))
      user.setUser(user);
      user.setIsAuth(true);
      const data = await fetchLastOrdeerID();
      user.setLastOrderID(data.order_id)
      user.setUserID(data.user_id)
    }
    else {
        return false
    }
  }

  useEffect(() => {
    autoLogin()
    if (itemsData.items.length == 0) {
      fetchItems().then(data => itemsData.setItems(data))
    }
    if (itemsData.category.length == 0) {
      fetchCategories().then(data => itemsData.setCategory(data))
    }
    }, [])

  return (
    <BrowserRouter>
      <NavbarPage />      
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
});

export default App;
