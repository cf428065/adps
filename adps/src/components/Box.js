import React from "react";
import { useHttpClient } from '../httpClient/HttpClientContext';

function Box({ id, restaurant_id, name, tags, quantity, price, box_image }) {
  // Handle ordering logic, e.g., adding item to cart or making HTTP requests

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
    <div className="box">
      {/* Display the box image if available */}
      {box_image && box_image.url && (
        <img src={box_image.url} alt={name} className="box-image" />
      )}

      <div className="box-content">
        <h2 className="box-name">{name}</h2>
        <p className="box-price">${price}</p>
        <p className="box-quantity">Quantity: {quantity}</p> {/* add selector for quantity*/}
        {/* Display tags if they are available */}
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
        {/* Button should have different label depending on client or restaurant*/}
        <button className="order-button" onClick={handleOrder}>
          Order Now
        </button>
      </div>
    </div>
  );
}

export default Box;
