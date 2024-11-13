import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../httpClient/HttpClientContext';

function EditProfile() {
  const httpClient = useHttpClient();
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantPhone, setRestaurantPhone] = useState("");
  const [restaurantEmail, setRestaurantEmail] = useState("");
  const [restaurantPassword, setRestaurantPassword] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [restaurantInfo, setRestaurantInfo] = useState("");

  /* Restaurant form end */

  /* Client form */
  const [role, setRole] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [clientfoodPreference, setClientFoodPreference] = useState([]);
  /*Client Form end */

  useEffect(() => {
    const datastring = sessionStorage.getItem('data');
    const response = JSON.parse(datastring);
        
        setRestaurantName(response.name);
        setRestaurantPhone(response.phone);
        setRestaurantAddress(response.restaurantAddress);
        setRestaurantInfo(response.restaurantInfo);

        setRole(response.role);
        setClientName(response.clientName);
        setClientPhone(response.clientPhone);
        setClientCountry(response.clientCountry);
        setClientFoodPreference(response.clientfoodPreference);
  }, []);

  const saveChangesClient = (e) => {
    e.preventDefault();
    const clientData = {
      //email: "clientEmail",
      //password: "clientPassword",
      name: clientName,
      phone: clientPhone,
      country: clientCountry,
      tags: clientfoodPreference
    };
    const c_id = httpClient.get("/me").id;
    httpClient.put("/client/signup", c_id, clientData);
  }

  const saveChangesRestaurant = (e) => {
    e.preventDefault();
    const Data = {
      //email: "clientEmail",
      //password: "clientPassword",
      name: restaurantName,
      phone: restaurantPhone,
      adress: restaurantAddress,
      information: restaurantInfo
    };
    const r_id = httpClient.get("/me").id;
    httpClient.put("/client/signup", r_id, Data);

  }

  return (
  //TODO: Add form for client and restaurant
  <div></div>
  )
}

export default EditProfile