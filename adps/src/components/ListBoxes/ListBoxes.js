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
      console.log(res);
      setBoxes(res);});
    httpClient.get("/featured-box").then(res => {
       setfeaturedBoxes(res);});
  },[httpClient]);
  

  return (
    
    <section class="articles">
    {boxes.length>0 && boxes.map(box=><Box {...box} key={box.id} />
    
    )}

    </section>
    
  )
}

export default ListBoxes
