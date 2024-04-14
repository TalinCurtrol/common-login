
import './App.css';
import { Amplify } from 'aws-amplify';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import CustomerEntry from './Pages/CustomerEntry';
import TechnicianEntry from './Pages/TechnicianEntry';
import AdminEntry from './Pages/AdminEntry';

import config from './amplifyconfiguration.json';
Amplify.configure(config);


function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>

        <Route path="/" element={<CustomerEntry />} />
        <Route path="/TechnicianEntry" element={<TechnicianEntry />} />
        <Route path="/AdminEntry" element={<AdminEntry />} />
      </Routes>
    </div>
  );
}

export default App;
