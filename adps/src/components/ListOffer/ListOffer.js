import React from 'react'
import { useState,useEffect } from 'react'
import './ListOffer.css'
import Offer from '../Offer'
import { useHttpClient } from '../../httpClient/HttpClientContext';

function ListOffer() {
  const [offers,setOffers] = useState([]);

    //Context-object
    const httpClient = useHttpClient();

  useEffect (() => {
    const r_id = httpClient.get(`/me`).id;
    httpClient.getWithId('/reservation', 'restaurant_id', r_id).then(res => {
        setOffers(res);});
  },[]);


  return (
    <div>ListOffers
{offers.length>0 && offers.map(offer=><Offer {...offer} key={offer.id}/>)}


    </div>
  )
}

export default ListOffer