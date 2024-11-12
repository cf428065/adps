import React from 'react';
import { useHttpClient } from '../../httpClient/HttpClientContext';

function EditProfile(name, phone, country,tags) {
  const httpClient = useHttpClient();
  const saveChanges = (e) => {
    e.preventDefault();
    const clientData = {
      //email: "clientEmail",
      //password: "clientPassword",
      name: name,
      phone: phone,
      country: country,
      tags: tags
    };
    const c_id = httpClient.get("/me").id;
    const result =  httpClient.put("/client/signup", c_id, clientData);

  }

  return (
    <div>EditProfile
<input type="text" value={name}/>
<input type="number"  value={phone} />
<input type="text " value={country} />
<input type="text " value={tags} />
<button onclick={saveChanges}>Save</button>
    </div>
    )
}

export default EditProfile