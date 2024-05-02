import React, { useRef, useState } from 'react';
import "./Chatbot.css";
import axios from "axios";
import ChatIcon from '@mui/icons-material/Chat';
import ClearIcon from '@mui/icons-material/Clear';
import { ToastContainer, toast } from 'react-toastify';
export default function Chatbot() {
    const chatbot = useRef();
    const chatRef = useRef();
    const clearRef = useRef();
    const [isOpen, setIsopen] = useState(false);
    const [cartProducts, setcartProducts] = useState([])
    let authToken = localStorage.getItem('logintoken');

    const open_chat = () => {
        setIsopen((prevstate) => !prevstate);
    }
    const close_chat = () => {
        setIsopen(false);
    }

    const [message, setMessage] = useState([
        { text: "hello i am bot how can i help you", sender: "bot" }
    ])

    const handleMessage = async (option) => {
        // Logic to handle user's option selection
        let mssg;
        try {
            if(!authToken){
                toast("Please Login");
            }
            switch (option) {
                case 'cart':
                    console.log(authToken, "aaya");
                    const response = await axios("http://localhost:3000/cart-details", {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    })
                    console.log(response);
                    if(response.data.cart.items.length==0){
                        setMessage([...message, { text: "Cart is Empty", sender: "bot" }]);
                        return;
                    }
                    
                    const products = response.data.cart.items.map(item => ({
                        name: item.product.BrandNames,
                        description: item.product.productDescription,
                        price: item.product.price
                    }));
                    
                    setcartProducts(products);
                    console.log(products);
                    break;
                case 'order':
                    mssg = "You selected order details.";
                    break;
                case 'products':
                    mssg = "You selected products.";
                    break;
                default:
                    mssg = "I'm sorry, I didn't understand your selection.";
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
            // Handle unauthorized response (e.g., log user out, redirect to login page)
            // For example:
            // logoutUser();
            // redirectToLoginPage();
            toast("Unauthorized. Please log in again."); // Show message to the user
        } else {
            toast("An error occurred. Please try again later."); // Show generic error message
            console.error("Error:", error); // Log error to console for debugging
        }
        }
    };

    return (
        <>
            <div className='chatbot'>

                <ChatIcon className='chaticon' onClick={open_chat} ref={chatRef} style={{ display: isOpen ? "none" : "block" }} />
                
                {
                    isOpen &&
                    <div className="chatbot-container" ref={chatbot}>
                        <div className="chatbot-name" >
                            Shopnest Bot
                            <ClearIcon ref={clearRef} style={{ display: isOpen ? "block" : "none" }} onClick={close_chat} className='cross' />
                        </div>
                        <div className="message-field">

                            {
                                message.map((message, index) => (
                                    <div key={index} className={`${message.sender == "user" ? "user" : "bot"}`}>
                                        {message.text}
                                    </div>
                                ))
                            }
                            {cartProducts?.map((product, index) => (
                                <div key={index} className="bot">
                                    <p>Product number : {index+1}</p>
                                    <p>These Products are in your cart</p>
                                    <p>Name: {product.name}</p>
                                    <p>Description: {product.description}</p>
                                    <p>Price: {product.price}</p>
                                </div>
                            ))}
                            <div className="options">
                                <button onClick={() => handleMessage('cart')}>Cart Details</button>
                                <button onClick={() => handleMessage('order')}>Order Details</button>
                                <button onClick={() => handleMessage('products')}>Products</button>
                            </div>
                        </div>


                    </div>}
            </div>
            <ToastContainer />
        </>
    )

}
