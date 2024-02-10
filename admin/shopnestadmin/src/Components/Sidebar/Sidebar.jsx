import React from 'react'
import "./Sidebar.css";
import {Link, Navigate, useNavigate} from "react-router-dom"
import axios from 'axios';

export default function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
   const response = await axios.get("http://localhost:3000/logout",{withCredentials:true})
   console.log(response);
   if(response.status === 200){
    localStorage.removeItem("token");
    navigate("/");
   }
  };
  return (
    <div className='sidebar-container'>
      <div className="sidebar-wrapper">
        <Link to="/main" className="add-product">Add Product</Link>
        <Link to="/product-list" className="Product-list">Product List</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}
