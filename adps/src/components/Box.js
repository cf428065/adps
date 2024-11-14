import React from "react";
import { useState } from "react";
import { useHttpClient } from '../httpClient/HttpClientContext';
import RestaurantModal from "./ListBoxes/RestaurantModal";
import './ListBoxes/ListBoxes.css'
function Box({ id, restaurant_id, name, tags, quantity, price, box_image }) {
  // Handle ordering logic, e.g., adding item to cart or making HTTP requests

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    console.log(restaurant)
  };
  const closeModal = () => {
    setSelectedRestaurant(null);
  };


  const httpClient = useHttpClient();

  function handleOrder() {
    console.log(`Order placed for item ID: ${id} from restaurant ID: ${restaurant_id}`);
    const c_id = httpClient.get("/auth/me").id;
    const reservation = {
      box_id: id,
      number_of_boxes: quantity,
      pickup_time: "2024-01-15T12:30:45+02:00",
      client_id: c_id
    }
    httpClient.post("/reservation", reservation);
  }





  return (
   

  <article>
    
    <div class="article-wrapper">
      <figure>
       
      {box_image && box_image.url && ( <img src={box_image.url} alt="" />
      )}
      </figure>
      <div class="article-body">
        <h2>{name}</h2>
        
        <div className="box-price">${price}</div>
        <a href="#" onClick={() => handleRestaurantClick(restaurant_id)}>
              See Restaurant Details
            </a>
        <div className="box-quantity">quantity:  <input type="number" value  /> </div>
        <div className="box-tags">
          {tags && tags.length > 0 ? (
            tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))
          ) : (
            <span className="no-tags">No tags available</span>
          )}
        </div>
        <button href="#" class="read-more" onClick={handleOrder}>
          Order
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
    <RestaurantModal restaurant={selectedRestaurant} onClose={closeModal} />
  </article>





  );
}

export default Box;