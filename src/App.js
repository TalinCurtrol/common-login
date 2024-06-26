
import './App.css';

import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import NavBar from './components/NavBar';
import CustomerEntry from './Pages/CustomerEntry';
import TechnicianEntry from './Pages/TechnicianEntry';
import { CURRENT_BASE_URL } from './components/urls';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from "react-google-recaptcha-v3";






function App() {
  const [token, setToken] = useState("");
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const setTokenFunc = (getToken) => {
    setToken(getToken);
  };

  useEffect(() => {
    localStorage.removeItem('tech')
    localStorage.removeItem('user')
  }, [])


  return (
    <div className="App">
      <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_SITE_KEY}>
        <GoogleReCaptcha
          className="google-recaptcha-custom-class"
          onVerify={setTokenFunc}
          refreshReCaptcha={refreshReCaptcha}
        />
      </GoogleReCaptchaProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<CustomerEntry />} />
        <Route path="/TechnicianEntry" element={<TechnicianEntry />} />


      </Routes>


    </div>
  );
}

export default App;
