import React, { useEffect, useState } from 'react'
import "./ProductDetails.css"
import Navbar from '../Navbar'
import axios from 'axios'
import { useParams } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import p2 from "../Images/p2.jpg";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const authToken = localStorage.getItem('logintoken');
    const [showModal, setShowmodal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [selectedsize, setSelectedSize] = useState("small");
    const [quantity,setQuantity] = useState(1);

    const [userdetails, setUserdetais] = useState({
        email: "",
        username: "",
        password: ""
    })

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    useEffect(() => {

        const fetchdata = async () => {
            const response = await axios.get(`https://shopnest2.onrender.com/products/${id}`)
            console.log(response.data);
            setProduct(response.data);
        }

        fetchdata();
    }, [])

    const addtocart = async () => {
        try {
            if (!authToken) {
                setShowmodal(true);
                return;
            }
            console.log(selectedsize,"size");
            const response = await axios.post("https://shopnest2.onrender.com/addtocart", { productId: id, size:selectedsize,quantity:quantity}, { headers: { Authorization: `Bearer ${authToken}` }, withCredentials:true}
            );
            toast("Product added to cart");
            console.log(response.data);
            // Handle success or update UI accordingly
        } catch (error) {
            console.error(error);
            toast(error);
            // Handle error or update UI accordingly
        }
    }


    const handleClose = () => {
        setShowmodal(false);
    }

    const handleSignupClick = () => {
        setShowmodal(false);
        setShowSignupModal(true);
    }

    const handleCloseSignupModal = () => {
        setShowSignupModal(false);
        setShowmodal(true);

    }

    const handlechange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setUserdetais(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleregister = async () => {

        try {
            const response = await axios.post("https://shopnest2.onrender.com/user/register", userdetails, { withCredentials: true });
            console.log(response);
            toast("Signup Successfully");
        } catch (error) {
            console.log(error);
            toast("Failed");
        }
    }

    const handlelogin = async () => {
        try {
            const response = await axios.post("https://shopnest2.onrender.com/user/login", userdetails, { withCredentials: true });
            console.log(response);
            localStorage.setItem("logintoken",response.data.token);
            toast("Login Successfully");
            setShowmodal(false);
        }catch(error){
            console.log(error);
            toast("Wrong Credentials");
        }
    }

    const handlequantity = (e) => {
        // Ensure quantity does not go below 1
        if (e.target.value < 1) {
            return;
        }
        setQuantity(e.target.value);
    };

    return (
        <>
            <Navbar />
            <div className='productdetails-container'>
                <div className="left-container">
                    <img src={product?.image} alt="" />
                </div>
                <div className="right-container">
                    <p className='right-p'>Home / T-shirts</p>
                    <h3 className='right-h3 h3'>Men's  Fashion T-shirt</h3>
                    <h3 className='right-h3 h3-2'>₹ {product?.price}</h3>
                    <select name="Sizes" className="Sizes" value={selectedsize} onChange={(e)=>setSelectedSize(e.target.value)}>
                        <option value="small">S</option>
                        <option value="medium">M</option>
                        <option value="large">L</option>
                        <option value="Extra-large">XL</option>
                    </select>
                    <input type="number" value={quantity} className='quantity' onChange={handlequantity} />
                    <button className='addcart' onClick={addtocart}>Add To Cart</button>
                    <h4 className='right-h4'>Product Details</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quae omnis doloribus sequi consequatur commodi corrupti temporibus odio optio ea repudiandae expedita harum qui deleniti soluta eos rem, voluptates natus debitis sed quas, est aliquam delectus esse. Voluptatem, quos voluptate. Omnis quasi quisquam rerum ab aspernatur, quia nam repellendus consectetur molestiae. Reiciendis, amet? Quam eos alias iure itaque sed atque nostrum non. Temporibus tempora non mollitia fuga laboriosam commodi iste cum officia praesentium modi molestiae tenetur, earum error nulla aperiam laudantium consectetur eligendi omnis? Aliquid atque explicabo pariatur voluptatum. Dolorum hic corporis eum facilis quas quaerat modi sint magnam assumenda?</p>
                </div>
            </div>

            <Modal
                open={showModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Login
                    </Typography>
                    <FormControl sx={{ mt: 2, width: '100%' }}>
                        <InputLabel htmlFor="username">Email</InputLabel>
                        <Input
                            id="username"
                            type="text"
                            name='email'
                            value={userdetails.email}
                            onChange={handlechange}
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2, width: '100%' }}>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input
                            id="username"
                            type="text"
                            name='username'
                            value={userdetails.username}
                            onChange={handlechange}
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2, width: '100%' }}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            type="password"
                            name='password'
                            value={userdetails.password}
                            onChange={handlechange}
                        />
                    </FormControl>
                    <Button sx={{ mt: 2 }} variant="contained" color="primary" onClick={handlelogin}>
                        Login
                    </Button>
                    <Typography variant="body2" onClick={handleSignupClick} style={{ cursor: 'pointer', color: 'blue' }}>
                        Don't have an account? Sign Up
                    </Typography>
                </Box>
            </Modal>


            <Modal
                open={showSignupModal}
                onClose={handleCloseSignupModal}
                aria-labelledby="signup-modal-title"
                aria-describedby="signup-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        SignUp
                    </Typography>

                    <FormControl sx={{ mt: 2, width: '100%' }}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            id="email"
                            type="text"
                            name="email"
                            value={userdetails.email}
                            onChange={handlechange}
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2, width: '100%' }}>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input
                            id="username"
                            type="text"
                            name="username"
                            value={userdetails.username}
                            onChange={handlechange}
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2, width: '100%' }}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={userdetails.password}
                            onChange={handlechange}
                        />
                    </FormControl>
                    <Button sx={{ mt: 2 }} variant="contained" color="primary" onClick={handleregister}>
                        SignUp
                    </Button>
                </Box>
            </Modal>
            <ToastContainer />
        </>

    )
}
