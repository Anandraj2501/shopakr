import React, { useRef } from 'react'
import "./Navbar.css"
import { IoBagOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';

export default function Navbar() {

  const handleham_click = () => {
    console.log(ref.current);
    const currentWidth = ref.current.style.width;
    if (currentWidth === "250px") {
      ref.current.style.width = "0";
    } else {
      ref.current.style.width = "250px";
    }
  }
  const ref = useRef();

  return (
    <div className='navbar-container'>
      <div className="navbar-wrapper">
        <div className="brandname-container">Shopnest</div>
        <div className="links-conatiner">
          <Link to="/" className="links">Home</Link>
          <Link to="/shop"  className="links">Shop</Link>
          <div className="links">Blog</div>
          <div className="links">About</div>
          <div className="links">Contact</div>
          <Link to="/cart" className="links"><IoBagOutline /></Link>
          <div className="hamburger" onClick={handleham_click}><RxHamburgerMenu /></div>
          <div id="mySidenav" className="sidenav" ref={ref}>
            <div className="closebtn" onClick={handleham_click}>&times;</div>
            <Link to="/" className='mob-links'>Home</Link>
            <Link to="/shop" className='mob-links'>Shop</Link>
            <div className='mob-links'>Blog</div>
            <div className='mob-links'>About</div>
            <div className='mob-links'>Contact</div>
            <Link to="/cart" className='mob-links'><IoBagOutline /></Link>
          </div>
        </div>
      </div>

    </div>
  )
}
