import React from 'react'
import "./Feature.css"
import f1 from "../Images/f1.png"
import f2 from "../Images/f2.png"
import f3 from "../Images/f3.png"
import f4 from "../Images/f4.png"
import f5 from "../Images/f5.png"
import f6 from "../Images/f6.png"

export default function FeatureSection() {
    return (
        <div className='fetaure-section'>
            <div className="feature-card">
                <img src={f1} alt="feature" />
                <h6>Free Shipping</h6>
            </div>
            <div className="feature-card">
                <img src={f2} alt="feature" />
                <h6>Online Order</h6>
            </div>
            <div className="feature-card">
                <img src={f3} alt="feature" />
                <h6>Save Money</h6>
            </div>
            <div className="feature-card">
                <img src={f4} alt="feature" />
                <h6>Promotions</h6>
            </div>
            <div className="feature-card">
                <img src={f5} alt="feature" />
                <h6>Happy Sell</h6>
            </div>
            <div className="feature-card">
                <img src={f6} alt="feature" />
                <h6>24*7 Support</h6>
            </div>
        </div>
    )
}
