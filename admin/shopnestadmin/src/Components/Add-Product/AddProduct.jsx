import React, { useState } from 'react'
import "./AddProduct.css"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddProduct() {
  console.log("rendering addproduct")

  const [productData, setProductData] = useState({
    BrandNames: 'Nike',
    productDescription: '',
    price: '',
    inStock: 'True',
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target, name, value);


    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };

  const addbtnhandler = async() => {
    console.log(productData)
    if (!productData.productDescription || !productData.price || !productData.image) {
      // Display a toast or some form of error message
      toast.error("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append('BrandNames', productData.BrandNames);
    formData.append('productDescription', productData.productDescription);
    formData.append('price', productData.price);
    formData.append('inStock', productData.inStock);
    formData.append('image', productData.image);
    console.log(formData);


     const response = await axios.post("http://localhost:3000/addproduct", formData, {withCredentials: true});
     
      console.log("Product added successfully", response.data);
      toast("Product added successfully")
      setProductData({
        BrandNames: 'Nike',
        productDescription: '',
        price: '',
        inStock: 'True',
        image: null
      })
      
  }

  const handleImageChange = (e) => {
    console.log(e.target.files[0], "image");

    setProductData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }))

  }

  return (
    <div className='add-product-container'>
      <div className="add-product-wrapper">
        <div className="ProductName-container">
          <p>Select Brand</p>
          <select name="BrandNames" className="BrandName" onChange={handleInputChange} value={productData.BrandNames} >
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="Oneat">One8</option>
          </select>
        </div>

        <div className="ProductDesc">
          <p>Product Description</p>
          <input type="text" placeholder='Product Description...' onChange={handleInputChange}
            value={productData.productDescription} name='productDescription' required />
        </div>

        <div className="Rate">
          <p>Rate</p>
          <input type="number" name="price" className="Price" placeholder='Price in $...' onChange={handleInputChange}
            value={productData.price} required />
        </div>

        <div className="Instock-Container">
          <p>Instock</p>
          <select name="inStock" onChange={handleInputChange} value={productData.inStock}>
            <option value="True">True</option>
            <option value="False">False</option>
          </select>
        </div>

        <div className="image-container">
          <p>Upload Image</p>
          <input type="file" name="image" id="image" onChange={handleImageChange} required/>
        </div>

        <button onClick={addbtnhandler}>
          Add Product
        </button>

      </div>


      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}
