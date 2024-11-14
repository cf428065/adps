import React, { useEffect, useState } from "react";
import './ListBoxes.css'
import { useHttpClient } from '../../httpClient/HttpClientContext'

function RestaurantModal({ res, onClose }) {
/*get restaurant info by id === restaurant  and store it in info*/
const httpClient = useHttpClient();

const [restaurantName, setRestaurantName] = useState("");
const [restaurantPhone, setRestaurantPhone] = useState("");
const [restaurantAddress, setRestaurantAddress] = useState("");
const [restaurantInfo, setRestaurantInfo] = useState("");
      
  
function openModal(){
  setRestaurantName(res.name);
  setRestaurantPhone(res.phone);
  setRestaurantAddress(res.restaurantAddress);
  setRestaurantInfo(res.restaurantInfo);
}



   
  

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




  if (!res) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} style={{color:'red'}}>X</button>
        <h2>{restaurantName}</h2>
        <p>{restaurantInfo}</p>
        <p>Address: {restaurantAddress}</p>
        <p>phone: {restaurantPhone}</p>
        
      </div>
    </div>
  );
}

export default RestaurantModal;