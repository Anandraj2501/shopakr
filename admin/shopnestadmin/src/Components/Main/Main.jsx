import React, { useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './Main.css';
import Navbar from '../Navbar/Navbar';
import AddProduct from '../Add-Product/AddProduct';
import ProductList from '../ProductList/ProductList';

export default function Main() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className='main-container'>
          <Sidebar />
          <Routes>
            <Route path='/main' element={<AddProduct />} />
            <Route path='/product-list' element={<ProductList />} />
          </Routes>
        </div>
      </>
    );
  }

  // You may want to return a loading spinner or another component if not authenticated.
  return null;
}
