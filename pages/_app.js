// pages/_app.js

import NavBar from '@/app/component/navBar/navbar';
import React from 'react';
import { ShopContextProvider } from '../app/component/Context/ShopContext'; // Adjust the path accordingly
import '../app/globals.css'; // Include your global styles here



function MyApp({ Component, pageProps }) {
  return (
    <ShopContextProvider>
      <NavBar/>
      <Component {...pageProps} />
    </ShopContextProvider>
  );
}

export default MyApp;