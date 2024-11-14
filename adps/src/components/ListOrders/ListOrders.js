import React from 'react'
import './ListOrders.css'
import Order from '../Order'
import { useState,useEffect } from 'react'
import { useHttpClient } from '../../httpClient/HttpClientContext';

function ListOrders() {
    const [orders,setOrders] = useState([{ name: 'Order 1',status:'reserved',picture:'',pickuptime:'thursday 16:00', quantity:3 
    }, ]);
  const httpClient = useHttpClient();

  useEffect (() => {
    const me = JSON.parse(sessionStorage.getItem('me'));
    console.log(me)
    httpClient.getWithParam('/reservation', 'client_id', me.id)
        .then(res => {setOrders(res);});},[httpClient]);

  return (
    <div>ListOrders
{orders.length>0 && orders.map(order=><Order {...order} key={order.id}>
 <button> Order </button></Order> 
  )}


    </div>
  )
}

export default ListOrders