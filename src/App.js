
import './App.css';

import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import CustomerEntry from './Pages/CustomerEntry';
import TechnicianEntry from './Pages/TechnicianEntry';






function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<CustomerEntry />} />
        <Route path="/TechnicianEntry" element={<TechnicianEntry />} />

      </Routes>
    </div>
  );
}

export default App;
