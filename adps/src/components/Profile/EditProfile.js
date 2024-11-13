import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../httpClient/HttpClientContext';

function EditProfile() {
  const httpClient = useHttpClient();

  const [role, setRole] = useState(0);
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantPhone, setRestaurantPhone] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [restaurantInfo, setRestaurantInfo] = useState("");

  /* Restaurant form end */

  /* Client form */
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [clientfoodPreference, setClientFoodPreference] = useState([]);
  /*Client Form end */

  useEffect(() => {
    const datastring = sessionStorage.getItem('data');
    const response = JSON.parse(datastring);
    const role = httpClient.get("auth/me").role_id;
    setRole(role);
    
        
        setRestaurantName(response.name);
        setRestaurantPhone(response.phone);
        setRestaurantAddress(response.restaurantAddress);
        setRestaurantInfo(response.restaurantInfo);

        setClientName(response.clientName);
        setClientPhone(response.clientPhone);
        setClientCountry(response.clientCountry);
        setClientFoodPreference(response.clientfoodPreference);
  }, [httpClient]);

  const saveChangesClient = (e) => {
    e.preventDefault();
    const clientData = {
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
      name: restaurantName,
      phone: restaurantPhone,
      adress: restaurantAddress,
      information: restaurantInfo
    };
    const r_id = httpClient.get("/me").id;
    httpClient.put("/client/signup", r_id, Data);

  }

  return (
/*--default page (no form)--*/
<div id="signupDefault">
<div className="dialoug">
  <div id="welcomeSection">
    <h1>Welcome to our site!</h1>
    <p>
      Already have an account? <a href="/login">Login</a>
    </p>
  </div>
  <div id="formSection">
    {/* Restaurant Form */}
    {role === 2 && (
    <form id="restaurantForm" onSubmit={saveChangesRestaurant}>
      <div className="inplabel-group">
        <label  className="signup-label">name  </label>
        <input input className='formInput'
        
          type="text"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
        />
      </div>
      <div className="inplabel-group">
        <label className="signup-label">phone  </label>
        <input  input className='formInput'
          type="number"
          value={restaurantPhone}
          onChange={(e) => setRestaurantPhone(e.target.value)}
        />
      </div>
      <div className="inplabel-group">
        <label className="signup-label">address  </label>
        <input  input className='formInput'
          type="text"
          value={restaurantAddress}
          onChange={(e) => setRestaurantAddress(e.target.value)}
        />
      </div>
      <div className="inplabel-group">
        <label className="signup-label">information  </label>
        <input  input className='formInput'
          type="text"
          value={restaurantInfo}
          onChange={(e) => setRestaurantInfo(e.target.value)}
        />
      </div>
      <input type="hidden" name="role" value="2" />
      <input type="submit" value="submit"  className="signup-submit" />
    </form>
  )}


    {/* Client Form */}
    {role === 1 && (
      <form id="clientForm" onSubmit={saveChangesClient}>
        <div className="inplabel-group">
          <label className="signup-label">name  </label>
          <input input className='formInput'
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>
        <div className="inplabel-group">
          <label className="signup-label">phone  </label>
          <input input className='formInput'
            type="number"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
          />
        </div>
        <div className="inplabel-group"> 
          <label className="signup-label">country  </label>
          <input input className='formInput'
            type="text"
            value={clientCountry}
            onChange={(e) => setClientCountry(e.target.value)}
          />
        </div>
        <input type="hidden" name="role" value="1" />
        <div className="inplabel-group">
        <label className="signup-label">food options  </label>
          <select 
          className="custom-select"
            name="preference"
            
            value={clientfoodPreference}
            onChange={(e) => setClientFoodPreference(e.target.value)}
          >
            <option>vegan</option>
            <option>vegetarian</option>
            <option>lactose intolerant</option>
            <option>omnivore</option>
          </select>
        </div>
        <input type="submit" className="signup-submit" value="submit" />
      </form>
    )}
  </div>
</div>
</div>
  )
}

export default EditProfile