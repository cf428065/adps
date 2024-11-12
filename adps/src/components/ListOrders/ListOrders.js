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
        const c_id = httpClient.get(`/me`).id;
        httpClient.getwithParam('/reservation', 'client_id', c_id).then(res => {
            setOrders(res);
        });},[]);
  return (
    <div>ListOrders
{orders.length>0 && orders.map(order=><Order {...order} key={order.id}>
 <button> Order </button></Order> 
  )}


    </div>
  )
}

export default ListOrders