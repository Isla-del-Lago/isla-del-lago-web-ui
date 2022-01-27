import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './Pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
