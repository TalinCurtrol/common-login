
import './App.css';

import { Routes, Route } from 'react-router-dom';
import React, { useState } from "react";
import NavBar from './components/NavBar';
import CustomerEntry from './Pages/CustomerEntry';
import TechnicianEntry from './Pages/TechnicianEntry';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from "react-google-recaptcha-v3";






function App() {
  const [token, setToken] = useState("");
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const setTokenFunc = (getToken) => {
    setToken(getToken);
  };

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
