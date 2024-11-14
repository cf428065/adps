import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HttpClientProvider } from '../httpClient/HttpClientContext';

import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import CreateOffer from '../components/CreateOffer/CreateOffer';  
import ListOffer from '../components/ListOffer/ListOffer';
import ListOrders from '../components/ListOrders/ListOrders';
import ListBoxes from '../components/ListBoxes/ListBoxes';
import NavBar from '../components/NavBar/NavBar';
import EditProfile from '../components/Profile/EditProfile';



function App() {

 
  return (
    <HttpClientProvider>
      
      <BrowserRouter>
      <NavBar />
        <Routes>
            <Route index path="/" element={<Home />} />
            <Route  path="/login" element={<Login />} />
            <Route  path="/signup" element={<Signup />} />
            <Route  path="/boxes" element={<ListBoxes />} /> 
            <Route  path="/offers" element={<ListOffer />} />
            <Route  path="/order" element={<ListOrders />} />
            <Route  path="/profile" element={<EditProfile/>} />
            <Route  path="/createoffer" element={<CreateOffer />} />
            
        </Routes>
      </BrowserRouter>
    </HttpClientProvider>
  );
}

export default App;