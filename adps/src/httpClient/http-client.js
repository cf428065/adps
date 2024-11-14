// Author: Charlotte Fehlhauer

// HttpClient Implementation
export class HttpClient {
  baseURL;

  init(baseURL) {
    this.baseURL = baseURL;
  }

  //GET-REQUESTS
  //Get Request, which require Authorization
  async get(link) {
    // Retrieve the authToken from localStorage
    const authToken = sessionStorage.getItem('authToken'); 
    const response = await fetch(`${this.baseURL}/${link}`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${authToken}`
      },
    });
    const responseData = await this.result(response);
    return responseData;
  }

  //Get Request, which don't require Authorization
  async getNoAuth(link) {
    const response = await fetch(`${this.baseURL}/${link}`, {
      method: 'GET',
    });
    const responseData = await this.result(response);
    return responseData;
  }

  //Get-Request containing a specific id but don't need Authentication
  async getWithIdNoAuth(link, id) {
    const response = await fetch(`${this.baseURL}/${link}/${id}`, {
      method: 'GET',
    });
    
    const responseData = await this.result(response);
    return responseData;
  }

  //Get-Request containing a specific id
  async getWithId(link, id) {
    // Retrieve the authToken from localStorage
    const authToken = sessionStorage.getItem('authToken'); 
  
    const response = await fetch(`${this.baseURL}/${link}/${id}`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${authToken}`
      },
    });
    
        const responseData = await this.result(response);
    return responseData;
  }

    //Get-Request containing a specific id
    async getWithParam(link, idname, id) {
      // Retrieve the authToken from localStorage
      const authToken = sessionStorage.getItem('authToken'); 
    
      const response = await fetch(`${this.baseURL}/${link}?${idname}=${id}`, {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${authToken}`
        },
      });
      
          const responseData = await this.result(response);
      return responseData;
    }

  //POST - Requests
  //Post Sign-Up/Login Data and retreive authToken
  async postAuth(link, data) {
    const response = await fetch(`${this.baseURL}/${link}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }); 

    const responseData = await this.result(response);
    sessionStorage.setItem('authToken', responseData.authToken);
    sessionStorage.setItem('data', JSON.stringify(data));
    await this.get('auth/me').then((me) =>{console.log(me);sessionStorage.setItem('me', JSON.stringify(me))});
    return responseData;
    
}
  //POST - Request
  async post(link, data) {
    // Retrieve the authToken from localStorage
    const authToken = sessionStorage.getItem('authToken'); 
  
    const response = await fetch(`${this.baseURL}/${link}`, {
      method: 'POST',
      headers: { 
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
         },
        body: JSON.stringify(data),
      },
    });
  
        const responseData = await this.result(response);
    return responseData;
  }

  //Post - Request with ID
  async postPicture(link, id, data) {
    // Retrieve the authToken from localStorage
    const authToken = sessionStorage.getItem('authToken'); 
  
    const response = await fetch(`${this.baseURL}/${link}/${id}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(data)
    });
    
        const responseData = await this.result(response);
    return responseData;
  }
  
  //Put - Request containing a specific id
  async put(link, id, data) {
    // Retrieve the authToken from localStorage
    const authToken = sessionStorage.getItem('authToken'); 
  
    const response = await fetch(`${this.baseURL}/${link}/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(data)
    });
    
        const responseData = await this.result(response);
    return responseData;
  }

  //Put - Request containing a specific id
  async delete(link, id) {
    // Retrieve the authToken from localStorage
    const authToken = sessionStorage.getItem('authToken'); 
  
    const response = await fetch(`${this.baseURL}/${link}/${id}`, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });
    
        const responseData = await this.result(response);
    return responseData;
  }

  

    async result(response) {

    if (response.ok) {
      return await response.json();}
    const message = await response.json();

    const errorMsg = JSON.parse(message)?.message || response.statusText;
    return Promise.reject({ message: errorMsg, statusCode: response.status });
  }
} 

