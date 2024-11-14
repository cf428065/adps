import React from 'react'
import './ListOrders/ListOrders.css'
//previous orders (reservation) for Client Order history

function Order({id, name, status, type, picture, quantity, price}) {

  function cancelOrder(){};
    
  return (

    <div className="order">
        <img src={picture} alt="orderImage" />
      <h2> {name} </h2>
      <p> {type}</p>
      <p> {quantity}</p>
      <p> {status}</p>
      <p>{price}</p>
      <button  id='cancelOrder' onClick={cancelOrder}>Cancel
      </button>
    </div>
  )
}

export default Order