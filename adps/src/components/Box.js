import React from "react";
import { useHttpClient } from '../httpClient/HttpClientContext';

function Box({ id, restaurant_id, name, tags, quantity, price, box_image }) {
  // Handle ordering logic, e.g., adding item to cart or making HTTP requests
  function handleOrder() {
    console.log(`Order placed for item ID: ${id} from restaurant ID: ${restaurant_id}`);
    // Additional ordering logic can go here
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
        <p className="box-quantity">Quantity: {quantity}</p>

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

        <button className="order-button" onClick={handleOrder}>
          Order Now
        </button>
      </div>
    </div>
  );
}

export default Box;
