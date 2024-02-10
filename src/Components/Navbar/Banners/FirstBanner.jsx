import React from 'react'
import b2 from "../Images/b2.jpg"
import "./Banner.css";

export default function FirstBanner() {
    return (
        <div className='banner-container'>
            {/* <img src={b2} alt="banner"/> */}
            <h4>All Services</h4>
            <h2>Up to <span>70% Off</span> - All t-shirts & Accessories</h2>
            <button>Explore More</button>
        </div>
    )
}
