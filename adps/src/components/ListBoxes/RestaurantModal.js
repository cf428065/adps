import React, { useState } from "react";
import './ListBoxes.css'
import { useHttpClient } from '../../httpClient/HttpClientContext'

function RestaurantModal({ restaurant, onClose }) {
/*get restaurant info by id === restaurant  and store it in info*/
const httpClient = useHttpClient();

const [restaurantName, setRestaurantName] = useState("");
const [restaurantPhone, setRestaurantPhone] = useState("");
const [restaurantAddress, setRestaurantAddress] = useState("");
const [restaurantInfo, setRestaurantInfo] = useState("");
      /*
async function getRestaurantById(restaurant) {
      const restaurantData = await httpClient.getWithId("restaurant", restaurant);
      console.log(restaurantData)
      return restaurantData;
   
  }*/

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
        <h2>{restaurantInfo.name}asf</h2>
        <p>{restaurantInfo.description}asf</p>
        <p>Address: {restaurantInfo.address}</p>
        <p>Working Hours: {restaurant.rating}</p>
        
      </div>
    </div>
  );
}

export default RestaurantModal;