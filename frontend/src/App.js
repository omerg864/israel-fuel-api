import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
    <ToastContainer theme="colored"/>
    <Router>
    <div className="container">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </div>
    </Router>
    </>
  );
}

export default App;