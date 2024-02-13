import React, { useEffect, useState } from 'react'
import "./Cart.css";
import Navbar from '../Navbar';
import p1 from "../Images/p1.jpg";
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cart() {
    const authToken = localStorage.getItem('logintoken');
    const [cartData, setCartData] = useState(null);
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const[cartId,setCartId] = useState(null);


    useEffect(() => {

        const getcart = async () => {

            try {
                if (!authToken) {
                    toast("Please Login to get your cart Items");
                    // setShowmodal(true)
                    return;
                }

                const response = await axios.get("http://localhost:3000/cart", {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                })
                console.log(response);
                setCartData(response.data.cart.items);
                setCartId(response.data.cart._id);
                let subTotal = 0;
                response.data.cart.items.forEach(item => {
                    subTotal += item.product.price * item.quantity;
                });
                console.log(subTotal);
                setTotal(subTotal);
            } catch (error) {
                toast(error);
            }
        }


        getcart();
    }, [])

    const handleQuantityChange = async (itemId, newQuantity) => {
        try {
            if (!authToken) {
                toast("Please Login to update your cart");
                return;
            }
            if (newQuantity < 1) {
                toast("Please Remove The Item");
                return;
            }

            // Update quantity in the backend
            await axios.put(`http://localhost:3000/cart/update/${itemId}`, {
                quantity: newQuantity
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            // Update quantity in the local state
            const response = await axios.get("http://localhost:3000/cart", {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            console.log(response);
            setCartData(response.data.cart.items);
            setCartId(response.data.cart._id);
            let subTotal = 0;
            response.data.cart.items.forEach(item => {
                subTotal += item.product.price * item.quantity;
            });
            console.log(subTotal);
            setTotal(subTotal);


        } catch (error) {
            toast(error);
        }
    }

    const handleRemoveItem = async (itemId) => {
        try {
            if (!authToken) {
                toast("Please Login to update your cart");
                return;
            }

            // Remove item from the backend
            await axios.delete(`http://localhost:3000/cart/remove/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            // Fetch updated cart data from the backend
            const response = await axios.get("http://localhost:3000/cart", {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            // Update cart data in the local state
            setCartData(response.data.cart.items);
            setCartId(response.data.cart._id);
            let subTotal = 0;
            response.data.cart.items.forEach(item => {
                subTotal += item.product.price * item.quantity;
            });
            setTotal(subTotal);

            toast("Item removed from cart successfully");
        } catch (error) {
            toast.error(error);
        }
    }

    const handleCheckout = async () => {
        const response = await axios.post("http://localhost:3000/checkout", { total: total,cartId: cartId },{headers:{
            Authorization: `Bearer ${authToken}`
        }});
        console.log(response, "checkout");
        const order_id = response.data.order.id;

        var options = {
            key: "rzp_test_dxWr7puwaxDajl", // Enter the Key ID generated from the Dashboard
            amount: total * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Shopnest",
            description: "Test Transaction",
            // image: "https://example.com/your_logo",
            order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: "http://localhost:3000/paymentverification",
            // "prefill": {
            //     "name": "Gaurav Kumar",
            //     "email": "gaurav.kumar@example.com",
            //     "contact": "9000090000"
            // },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }
            
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    return (
        <>
            <Navbar />
            <div className='cart-page'>
                <h2>#Save More</h2>
                <p>Save more with coupons & upto 70% off!</p>
            </div>
            <div className="cart-items-container">
                {cartData &&
                    <table>
                        <thead>
                            <tr>
                                <td>Image</td>
                                <td>Product</td>
                                <td>Price</td>
                                <td>Quantity</td>
                                <td>Subtotal</td>
                                <td>Remove</td>
                            </tr>
                        </thead>
                        {cartData.map((item) => (
                            <tbody>
                                <tr>
                                    <td><img src={item.product.image} alt="#" /></td>
                                    <td>{item.product.BrandNames}</td>
                                    <td>$ {item.product.price}</td>
                                    <td><input type="number" name="price" id="price" value={item.quantity} onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))} /></td>
                                    <td>$ {item.product.price * item.quantity}</td>
                                    <td><button onClick={() => { handleRemoveItem(item._id) }}>Remove</button></td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                }
            </div>
            <div className="coupon-checkout-container">
                <div className="apply-coupon-container">
                    <h3>Apply Coupon</h3>
                    <input type="text" placeholder='Enter Your Coupon' />
                    <button>Apply</button>
                </div>
                <div className="checkout-container">
                    <h3>Cart Total</h3>
                    <table>
                        <tr>
                            <td>Cart SubTotals</td>
                            <td>$ {total}</td>
                        </tr>
                        <tr>
                            <td>Shipping</td>
                            <td>Free</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>$ {total}</td>
                        </tr>
                    </table>
                    <button onClick={handleCheckout}>Proceed To checkout</button>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}
