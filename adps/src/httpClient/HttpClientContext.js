// Author: Charlotte Fehlhauer
// HttpClientContext.js
import React, { createContext, useContext } from 'react';
import { HttpClient } from './http-client'; 

//Create a context for the HttpClient
const HttpClientContext = createContext(null);

///Create a provider for the HttpClient
export const HttpClientProvider = ({ children }) => {
    const httpClient = new HttpClient();
    httpClient.init('https://x8ki-letl-twmt.n7.xano.io/api:1wVJCKYF'); 
  
  return (
    <HttpClientContext.Provider value={httpClient}>
      {children}
    </HttpClientContext.Provider>
  );
};

// Exportiere den Hook, um den Kontext zu konsumieren
export const useHttpClient = () => {
  return useContext(HttpClientContext);
};
