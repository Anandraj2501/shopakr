import React, { useEffect, useState } from 'react'
import "./ProductList.css"
import axios from 'axios'
const Page_Size = 8;
export default function ProductList() {
  console.log("product list");

  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        console.log('Response:', response); // Log the entire response
        console.log('Data:', response.data); // Log the data property
        setProducts(response.data);
        console.log(products.length);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handlePageChange = (newpage)=>{
    setCurrentPage(newpage)
  }

  const StartIndex = (currentPage - 1) * Page_Size;
  const LastIndex = StartIndex + Page_Size;
  const CurrentProducts = products.slice(StartIndex, LastIndex)

  return (
    <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th>Brand Name</th>
            <th>Product Description</th>
            <th>Price</th>
            <th>InStock</th>
            <th>Image</th>
          </tr>
        </thead>

        <tbody>
          {
            CurrentProducts?.map((product) => (
              <tr>
                <td>{product.BrandNames}</td>
                <td>{product.productDescription}</td>
                <td>$ {product.price}</td>
                <td> {product.inStock} </td>
                <td><img src={product.image} alt="" /></td>
              </tr>
            ))
          }

        </tbody>

      </table>
      <div className="pagination">
        {
          Array.from({ length: Math.ceil(products.length / Page_Size) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))
        }
      </div>
    </div>
  )
}
