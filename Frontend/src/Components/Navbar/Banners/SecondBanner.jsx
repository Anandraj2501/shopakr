import React from 'react'
import "./SecondBanner.css"

export default function SecondBanner() {
    return (
        <>
            <div className='secondbanner-container'>
                <div className="banner">
                    <h4 className='secondbanner_h4'>Crazy deals</h4>
                    <h2 className='secondbanner_h2'>Buy 1 get 1 free</h2>
                    <p className='secondbanner_p'>The best classic dress is on sale on shopnest</p>
                    <button>Explore More</button>
                </div>
                <div className="banner banner2">
                    <h4 className='secondbanner_h4'>Crazy deals</h4>
                    <h2 className='secondbanner_h2'>Buy 1 get 1 free</h2>
                    <p className='secondbanner_p'>The best classic dress is on sale on shopnest</p>
                    <button>Explore More</button>
                </div>
            </div>
            <div className="thirdbanner-container">
                    <div className="thirdbanner">
                        <h3>SEASON SALE</h3>
                        <h2>Winter Collection - 50% OFF</h2>
                    </div>
                    <div className="thirdbanner thirdbanner2">
                        <h3>NEW FOOTWEAR COLLECTION</h3>
                        <h2>Spring / Summer 2024</h2>
                    </div>
                    <div className="thirdbanner thirdbanner3">
                        <h3>T-SHIRTS</h3>
                        <h2>New Trendy Prints</h2>
                    </div>
            </div>
        </>
    )
}
