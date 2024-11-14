import React from 'react'
import { useState,useEffect } from 'react'
import './ListOffer.css'
import Offer from '../Offer'
import { useHttpClient } from '../../httpClient/HttpClientContext';

function ListOffer() {
  const [offers,setOffers] = useState([{}]);

    //Context-object
    const httpClient = useHttpClient();
    const [id, setid] = useState();

    async function getRestaurantId(){
      const res = await httpClient.get("/auth/me");
      console.log(res.id);
      setid(res.id);
      httpClient.getWithParam('/reservation', 'restaurant_id', id).then(res => {
      setOffers(res);});
    }



  useEffect (() => {
getRestaurantId();
  },[httpClient]);


  return (
    <div>ListOffers
{offers.length>0 && offers.map(offer=><Offer {...offer} key={offer.id}/>)}


    </div>
  )
}

export default ListOffer