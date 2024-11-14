import React from 'react'
import { useState,useEffect } from 'react'
import './ListOffer.css'
import Offer from '../Offer'
import { useHttpClient } from '../../httpClient/HttpClientContext';

function ListOffer() {
  const [offers,setOffers] = useState([]);

    //Context-object
    const httpClient = useHttpClient();
    const [id, setid] = useState();

  useEffect (() => {
    httpClient.get(`auth/me`)
      .then(res => {setid(res.id); })
      .then(res => {
        httpClient.getWithParam('/reservation', 'restaurant_id', id)
          .then(res => {setOffers(res);});});
    
  },[httpClient]);


  return (
    <div>ListOffers
{offers.length>0 && offers.map(offer=><Offer {...offer} key={offer.id}/>)}


    </div>
  )
}

export default ListOffer