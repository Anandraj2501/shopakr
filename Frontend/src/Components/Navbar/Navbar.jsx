import React, { useRef, useState } from 'react'
import "./Navbar.css"
import { IoBagOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { ToastContainer, toast } from 'react-toastify';


export default function Navbar() {
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


  const [showModal, setShowmodal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [userdetails, setUserdetais] = useState({
    email: "",
    username: "",
    password: ""
  })

  const handlechange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUserdetais(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleham_click = () => {
    console.log(ref.current);
    const currentWidth = ref.current.style.width;
    if (currentWidth === "250px") {
      ref.current.style.width = "0";
    } else {
      ref.current.style.width = "250px";
    }
  }
  const ref = useRef();

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

  const handleregister = async () => {

    try {
      const response = await axios.post("http://localhost:3000/user/register", userdetails, { withCredentials: true });
      console.log(response);
      toast("Signup Successfully");
    } catch (error) {
      console.log(error);
      toast("Failed");
    }
  }

  const handlelogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/user/login", userdetails, { withCredentials: true });
      console.log(response);
      localStorage.setItem("logintoken", response.data.token);
      toast("Login Successfully");
      setShowmodal(false);
    } catch (error) {
      console.log(error);
      toast("Wrong Credentials");
    }
  }

  return (
    <>
      <div className='navbar-container'>
        <div className="navbar-wrapper">
          <div className="brandname-container">Shopnest</div>
          <div className="links-conatiner">
            <Link to="/" className="links">Home</Link>
            <Link to="/shop" className="links">Shop</Link>
            <div className="links" onClick={()=>setShowmodal(true)}>Login</div>
            <div className="links">About</div>
            <div className="links">Contact</div>
            <Link to="/cart" className="links"><IoBagOutline /></Link>
            <div className="hamburger" onClick={handleham_click}><RxHamburgerMenu /></div>
            <div id="mySidenav" className="sidenav" ref={ref}>
              <div className="closebtn" onClick={handleham_click}>&times;</div>
              <Link to="/" className='mob-links'>Home</Link>
              <Link to="/shop" className='mob-links'>Shop</Link>
              <div className='mob-links' onClick={() => setShowmodal(true)}>Login</div>
              {/* <div className='mob-links'>About</div> */}
              <div className='mob-links'>Contact</div>
              <Link to="/cart" className='mob-links'><IoBagOutline /></Link>
            </div>
          </div>
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
              id="email"
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
