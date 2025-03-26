import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Demo from './components/Demo';
import Api from './components/Api';
import ForgotApiKey from './components/ForgotApiKey';
import ResetApiKey from './components/ResetApiKey';
import ScrollToTop from './components/ScrollToTop'; 
import './App.css';

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/api-key-gen" element={<Api />} />
        <Route path="/forgot-api-key" element={<ForgotApiKey />} />
        <Route path="/reset-api-key" element={<ResetApiKey />} />
      </Routes>
      <Footer />
      <ScrollToTop /> 
    </Router>
  );
};

export default App;