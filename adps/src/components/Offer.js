import React from "react";
import { useHttpClient } from '../httpClient/HttpClientContext';

//what restaurant creates, a box from restuarant point of view
function Offer({ id, restaurant_id, name, tags, quantity, price, status, box_image }) {
     // Function, to Change status to Picked-up
     const httpClient = useHttpClient();

     const changeStatus = () => {
      status = "picked-up";
      const data ={
        reservation_id: id,
      };
      httpClient.post('/reservation/pick-up', data)
     };
    
  //status need to be visible
  return (
    // <div className="offer">
    //   <img src={picture} alt="offerImage" />
    //   <h2> {name} </h2>
    //   <p> {type}</p>
    //   <p> {quantity}</p>
    //   <p>{price}</p>
    //   <button onClick={orderPickedUp}>
    //   </button>
    // </div>
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
      <button className="status-button" onClick={changeStatus}>
        Order is picked-up
      </button>
    </div>
  </div>
  );
}

export default Offer;
