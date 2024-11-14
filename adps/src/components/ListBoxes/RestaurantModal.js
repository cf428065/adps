import React, { useState } from "react";
import './ListBoxes.css'
import { useHttpClient } from '../../httpClient/HttpClientContext'

function RestaurantModal({ restaurant, onClose }) {
/*get restaurant info by id === restaurant  and store it in info*/
const httpClient = useHttpClient();
const [restaurantInfo , setRestaurantInfo]=useState("");






  if (!restaurant) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} style={{color:'red'}}>X</button>
        <h2>Restaurant name</h2>
        <p>Get some leftovers from the All-You-Can-Eat Buffet</p>
        <p>Address: Azenes Ieala 12, LV-1010</p>
        
      </div>
    </div>
  );
}

export default RestaurantModal;