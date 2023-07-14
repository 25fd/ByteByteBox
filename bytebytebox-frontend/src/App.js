import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import Header from './components/header';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={[<LandingPage/>]} />
        <Route path="/register" element={[<Header/>,<RegistrationPage/>]} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
