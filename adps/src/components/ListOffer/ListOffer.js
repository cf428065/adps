import React from 'react'
import { useState,useEffect } from 'react'
import './ListOffer.css'
import Offer from '../Offer'
import { useHttpClient } from '../../httpClient/HttpClientContext';

function ListOffer() {

  const [offers,setOffers] = useState([{ name: 'Order 1',status:'reserved',picture:'',pickuptime:'thursday 16:00', quantity:3 
  }]);


    //Context-object
    const httpClient = useHttpClient();

    useEffect (() => {
      const me = JSON.parse(sessionStorage.getItem('me'));
      httpClient.getWithParam('/box', 'restaurant_id', me.id)
          .then(res => {setOffers(res);});
    },[httpClient]);


  return (
    <div>ListOffers
{offers.length>0 && offers.map(offer=><Offer {...offer} key={offer.id}/>)}


    </div>
  )
}

export default ListOffer