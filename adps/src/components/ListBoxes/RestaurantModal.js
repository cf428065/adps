import React, { useEffect, useState } from "react";
import './ListBoxes.css'
import { useHttpClient } from '../../httpClient/HttpClientContext'

function RestaurantModal({ restaurant, onClose }) {
/*get restaurant info by id === restaurant  and store it in info*/
const httpClient = useHttpClient();

const [restaurantName, setRestaurantName] = useState("");
const [restaurantPhone, setRestaurantPhone] = useState("");
const [restaurantAddress, setRestaurantAddress] = useState("");
const [restaurantInfo, setRestaurantInfo] = useState("");
      
  
useEffect(() => {
  httpClient.getWithId("restaurant", restaurant)
  .then(res => {
    setRestaurantName(res.name);
    setRestaurantPhone(res.phone);
    setRestaurantAddress(res.restaurantAddress);
    setRestaurantInfo(res.restaurantInfo);
  }) ;}, [httpClient]);


   
  

 //function getRestaurantById(id) {
 //  const response = httpClient.getWithId("/restaurant", id);
 //      
 //      setRestaurantName(response.name);
 //      setRestaurantPhone(response.phone);
 //      setRestaurantAddress(response.restaurantAddress);
 //      setRestaurantInfo(response.restaurantInfo);
 //    const restaurantData = 
 //    console.log(restaurantData)
 //    return restaurantData;
//}




  if (!restaurant) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} style={{color:'red'}}>X</button>
        <h2>{restaurantName}asf</h2>
        <p>{restaurantInfo}asf</p>
        <p>Address: {restaurantAddress}</p>
        <p>phone: {restaurantPhone}</p>
        
      </div>
    </div>
  );
}

export default RestaurantModal;