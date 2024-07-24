import  { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/about';
import Home from './pages/home';
import Login from './components/login and Register/login';
import Contact from './pages/contact';
import Register from './components/login and Register/register';
import FAQ from './pages/faq';
import Collection from './pages/Collection';
import Event from './pages/Event';

import { getAuthStatus } from '../src/Utils/authUtils';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(getAuthStatus());

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/about" element={<About isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/contact" element={<Contact isLoggedIn={isLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/faq" element={<FAQ isLoggedIn={isLoggedIn} />} />
        <Route path="/collection" element={<Collection isLoggedIn={isLoggedIn} />} />
        <Route path="/event" element={<Event isLoggedIn={isLoggedIn} />} />


      </Routes>
    </Router>
  );
}

export default App;
