import React, { useEffect, useState } from 'react'
import "./Shop.css"
import Navbar from '../Navbar'
import axios from 'axios';
import { IoIosStar } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const Page_Size = 16;
export default function Shop() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);


  useEffect(() => {

    const fetchData = async () => {
      try {
        const product = await axios.get("https://shopnest2.onrender.com/products");

        console.log(product.data, "aagya");
        const slicedproduct = product.data;
        setFeaturedProducts(slicedproduct);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [])

  const startIndex = (currentpage - 1) * Page_Size;
  const LastIndex = startIndex + Page_Size;
  const CurrentProducts = featuredProducts.slice(startIndex,LastIndex);

  const handlePageChange = (newpage)=>{
    setCurrentpage(newpage)
  }

  return (
    <>
      <Navbar />
      <div className='Shop-container'>
        <h2>#StayHome</h2>
        <p>Save more with coupons & upto 70% off!</p>
      </div>
      <div className="shop-product product-container">
        {
          CurrentProducts.map((products) => (
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
      <div className="pagination">
        {
          Array.from({ length: Math.ceil(featuredProducts.length / Page_Size) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentpage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))
        }
      </div>
    </>
  )
}
