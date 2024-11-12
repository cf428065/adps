import React from 'react';
import { useState,useEffect } from 'react';

import Box from '../Box';
import { useHttpClient } from '../../httpClient/HttpClientContext'

function ListBoxes() { 
  
  const httpClient = useHttpClient();
  const [boxes,setBoxes] = useState([]);
  const [featuredBoxes,setfeaturedBoxes] = useState([]);

  useEffect (() => {
    httpClient.get("/box").then(res => {
      setBoxes(res);});
    httpClient.get("/featured-box").then(res => {
      setfeaturedBoxes(res);});
  },[]);
  

  function createOrder(e){
  e.preventDefault();
  if (alert("you want to confirm the order")) {
    const data = {
      //TO-DO fill with correct values when page is finished
      box_id: 0,
      number_of_boxes: 0,
      pickup_time: 0,
      client_id: 0
    }
    const reservation = httpClient.post('/reservation', data);
    
  } 
  
}

  return (
    
    <div>
    {boxes.length>0 && boxes.map(box=><Box {...box} key={box.id}/>)}

    </div>

  )
}

/*
"name": "string",
  "tags": [
    "string"
  ],
  "price": 0,
  "box_image": {
    "access": "public",
    "path": "string",
    "name": "string",
    "type": "string",
    "size": 0,
    "mime": "string",
    "meta": {}

*/ 

export default ListBoxes
