import React, { useEffect } from 'react'
import './NavBar.css'
import { useHttpClient } from '../../httpClient/HttpClientContext';
function NavBar() {
    //Context-object
    const httpClient = useHttpClient();
    const id = httpClient.get(`/me`).id;


    function logout(){
/* implement logout here (destroy the authtoken and reload the page) */ 
}
  return (
    <ul id='navbar'>
<li><a href='/'>Home</a> </li>
<li><a href='/login'>Login</a></li>
<li><a href='/signup'>Signup</a></li>

{/* require Login token to access*/ }
{sessionStorage.getItem('authToken') &&<>
<li><a href='/profile'>Profile</a></li>
<li><a href='/boxes'>Order</a></li>
<li><a href='/orders'> History</a></li>
<button id='navlogout' onClick={logout}>Logout </button>

</>
}

    {/* for restaurant only */}

   {sessionStorage.getItem('authToken')&& id ===2 && /* get the role id if its 2 this will display &&*/ 
   <><li><a href='/offers'>Offers</a></li>
    <li><a href='/createoffer'>Add Box </a></li>
    </>}
    </ul>
  )
}

export default NavBar