import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import './NavBar.css'
import { useHttpClient } from '../../httpClient/HttpClientContext';
function NavBar() {
     // Context object
  const httpClient = useHttpClient();
  const idRef = useRef(); // Using useRef to keep id mutable across renders

  const [cookie, setCookie] = useState("");
  setInterval(() => setCookie(/* call to the method */), 1000);

 
  useEffect(() => {
    if (sessionStorage.getItem('authToken')) {
        httpClient.get('/auth/me').then((reply) => {
          idRef.current = reply.role_id;
        }
        );
      };}, [httpClient]);

  function logout(){
    sessionStorage.removeItem('authToken');
    idRef.current = 0;
    window.location.href = '/home';
  }
  return (
    <ul id='navbar'>
    <li><a href='/'>Home</a> </li>
    {sessionStorage.getItem('authToken') ==null &&<>
    <li><a href='/login'>Login</a></li>
    <li><a href='/signup'>Signup</a></li>
</>}
    {/* require Login token to access*/ }
    {sessionStorage.getItem('authToken') &&<>
    <li><a href='/profile'>Profile</a></li>
    </>
    }

    {sessionStorage.getItem('authToken') && idRef.current === 1 &&<>
      <li><a href='/boxes'>Available Boxes</a></li>
      <li><a href='/orders'> Order History</a></li>
    </>
    }

  

   {sessionStorage.getItem('authToken')&& idRef.current ===2 && /* get the role id if its 2 this will display &&*/ 
   <><li><a href='/offers'>Offers</a></li>
    <li><a href='/createoffer'>Add Box </a></li>
    </>}

    {sessionStorage.getItem('authToken') &&<>
      <button id='navlogout' onClick={logout}>Logout </button>
    </>
    }
    </ul>
  )
}

export default NavBar