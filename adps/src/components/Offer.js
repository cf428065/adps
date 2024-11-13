import React from "react";
import { useHttpClient } from '../httpClient/HttpClientContext';

//what restaurant creates, a box from restuarant point of view
function Offer({ id, name, status, type, picture, quantity, price }) {
     // Function, to Change status to Picked-up
     const httpClient = useHttpClient();

     const orderPickedUp = () => {
      status = "picked-up";
      const data ={
        reservation_id: id,
      };
      httpClient.post('/reservation/pick-up', data)
     };
    
  //status need to be visible
  return (
    <div className="offer">
      <img src={picture} alt="offerImage" />
      <h2> {name} </h2>
      <p> {type}</p>
      <p> {quantity}</p>
      <p>{price}</p>
      <button onClick={orderPickedUp}>
      </button>
    </div>
  );
}

export default Offer;
