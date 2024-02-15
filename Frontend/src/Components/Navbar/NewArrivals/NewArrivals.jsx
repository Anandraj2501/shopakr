import React, { useEffect, useState } from 'react'
// import "./FeaturedProduct.css"
import p1 from "../Images/p1.jpg"
import { IoIosStar } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa6";
import { collection, getDocs } from "firebase/firestore";
import db from '../../../Firebase';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function NewArrivals() {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const product = await axios.get("https://shopnest2.onrender.com/products");
                
                console.log(product.data,"aagya");
                const slicedproduct = product.data.slice(0,8);
                setFeaturedProducts(slicedproduct);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    return (
        <div className='featuredproduct-container'>
            <h3>New Arrivals</h3>
            <p className='featuredproduct_p'>Summer Collection New Modern Design</p>

            <div className="product-container">
                {
                    featuredProducts.map((products) => (
                        <Link to={`/product/${products._id}`} className="product-card">
                            <img src={products.image} alt="" />
                            <div className="desc">
                                <span className='product-name'>{products.BrandNames}</span>
                                <h5 className='product-desc'>{products.productDescription}</h5>
                                <div className="rating">
                                    <IoIosStar className='stars' /><IoIosStar className='stars' /><IoIosStar className='stars' /><IoIosStar className='stars' /><IoIosStar className='stars' />
                                </div>
                                <h4 className='price'>&#x20b9{products.price}</h4>
                            </div>
                            <div className="cart"><FaCartPlus /></div>

                        </Link>
                    ))
                }

            </div>
        </div>
    )
}
