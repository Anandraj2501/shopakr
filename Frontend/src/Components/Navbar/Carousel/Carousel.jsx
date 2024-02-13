import React from 'react'
import hero from "../Images/hero.png";
import "./Carousel.css";

export default function Carousel() {
  return (
    <div className='carousel-container'>
      <h4>Trade-in-offers</h4>
      <h2>Super Value Deals</h2>
      <h1>On all products</h1>
      <p className='carousel_p'>Save more with coupons & upto 70% off!</p>
      <button>Shop Now</button>
        {/* <img src={hero} alt="hero image"/> */}
      
    </div>
  )
}
