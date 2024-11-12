import React from "react";
import { useState } from "react";

import "./Signup.css";
import { useHttpClient } from '../../httpClient/HttpClientContext';
function Signup() {
  //Context-object
  const httpClient = useHttpClient();
  /* Restaurant form */
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantPhone, setRestaurantPhone] = useState("");
  const [restaurantEmail, setRestaurantEmail] = useState("");
  const [restaurantPassword, setRestaurantPassword] = useState("");
  const [foodOptions, setRestarantOptions] = useState([]);
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

  //CFe: Handle the form submissions
   const handleSubmitClient = (e) => {
    e.preventDefault();
    const clientData = {
      email: clientEmail,
      password: clientPassword,
      client_info: {
        name: clientName,
        phone: clientPhone,
        country: clientCountry,
        tags: clientfoodPreference
      },
      role_id : 1,
      restaurant_info: {}
    };
      const result =  httpClient.postAuth("/auth/signup", clientData);
      console.log(result);
       
    
  };
  
  const handleSubmitRestaurant = (e) => {
    e.preventDefault();
    const restaurantData = {
      email: restaurantEmail,
      password: restaurantPassword,
      client_info: {},
      role_id : 2,
      restaurant_info: {
        name: restaurantName,
        phone: restaurantPhone,
        info: restaurantInfo,
        adress: restaurantAddress,
        work_time: { "Mn": "08:30-20:30", "Tu": "08:30-20:30", "We": "08:30-20:30", "Th": "08:30-20:30", "Fr": "08:30-22:00", "Sa": "09:00-22:00", "Su": "09:00-18:00" } 
      }
    };
    httpClient.postAuth("/auth/signup", restaurantData);

    
  };

  /* code gives Rendering mistakes
  useEffect(() => {
    if (role === "restaurant") {
      document.getElementById("restaurantForm").style.display = "block";
      document.getElementById("clientForm").style.display = "none";
    } else if (role === "client") {
      document.getElementById("clientForm").style.display = "block";
      document.getElementById("restaurantForm").style.display = "none";
    }
  });*/

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
          <div id="roleRadios">
            <p>Are you signing up as a :</p>
            <div>
              <input
                type="radio"
                id="restaurant"
                name="role"
                value="restaurant"
                onClick={() => setRole("restaurant")}
              />
              <label>Restaurant</label>
            </div>
            <div>
              <input
                type="radio"
                id="client"
                name="role"
                value="client"
                onClick={() => setRole("client")}
              />
              <label>Client</label>
            </div>
          </div>
  
          {/* Restaurant Form */}
          {role === "restaurant" && (
          <form id="restaurantForm" onSubmit={handleSubmitRestaurant}>
            <div className="inplabel-group">
              <label  className="signup-label">name : </label>
              <input input className='formInput'
              
                type="text"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
              />
            </div>
            <div  className="inplabel-group">
              <label  className="signup-label">email : </label>
              <input input className='formInput'
              
                type="text"
                value={restaurantEmail}
                onChange={(e) => setRestaurantEmail(e.target.value)}
              />
            </div>
            <div className="inplabel-group">
              <label  className="signup-label">password : </label>
              <input  input className='formInput'
                type="password"
                value={restaurantPassword}
                onChange={(e) => setRestaurantPassword(e.target.value)}
              />
            </div>
            <div className="inplabel-group">
              <label className="signup-label">phone : </label>
              <input  input className='formInput'
                type="number"
                value={restaurantPhone}
                onChange={(e) => setRestaurantPhone(e.target.value)}
              />
            </div>
            <div className="inplabel-group">
              <label className="signup-label">address : </label>
              <input  input className='formInput'
                type="text"
                value={restaurantAddress}
                onChange={(e) => setRestaurantAddress(e.target.value)}
              />
            </div>
            <div className="inplabel-group">
              <label className="signup-label">information : </label>
              <input  input className='formInput'
                type="text"
                value={restaurantInfo}
                onChange={(e) => setRestaurantInfo(e.target.value)}
              />
            </div>
            <div className="inplabel-group">
              <label className="signup-label">food options : </label>
              <select 
              className="custom-select"
                name="foodOptions"
                
                value={foodOptions}
                onChange={(e) => setRestarantOptions(e.target.value)}
              >
                <option>vegan</option>
                <option>vegetarian</option>
                <option>lactose intolerant</option>
                <option>omnivore</option>
              </select>
            </div>
            <input type="hidden" name="role" value="2" />
            <input type="submit" value="submit"  className="signup-submit" />
          </form>
        )}

  
          {/* Client Form */}
          {role === "client" && (
            <form id="clientForm" onSubmit={handleSubmitClient}>
              <div className="inplabel-group">
                <label className="signup-label">name : </label>
                <input input className='formInput'
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>
              <div  className="inplabel-group">
                <label className="signup-label">email : </label>
                <input input className='formInput'
                  type="text"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                />
              </div>
              <div className="inplabel-group">
                <label className="signup-label">password : </label>
                <input input className='formInput'
                  type="password"
                  value={clientPassword}
                  onChange={(e) => setClientPassword(e.target.value)}
                />
              </div>
              <div className="inplabel-group">
                <label className="signup-label">phone : </label>
                <input input className='formInput'
                  type="number"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                />
              </div>
              <div className="inplabel-group"> 
                <label className="signup-label">country : </label>
                <input input className='formInput'
                  type="text"
                  value={clientCountry}
                  onChange={(e) => setClientCountry(e.target.value)}
                />
              </div>
              <input type="hidden" name="role" value="1" />
              <div className="inplabel-group">
              <label className="signup-label">food options : </label>
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
  );
  
}

export default Signup;
