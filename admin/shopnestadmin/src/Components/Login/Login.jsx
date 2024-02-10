import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        username: "",
        password: "",
        email: ""
    })

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [Choice, setChoice] = useState("login");

    const handlechange = (e) => {
        // console.log(e.target);
        const { name, value } = e.target;
        // console.log(name,value);

        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }))
    }

    const handleLogin = async () => {
        try {
            console.log(userDetails);
            const response = await axios.post("http://localhost:3000/login", userDetails, { withCredentials: true });
            console.log(response.data.token);

            // Check if login was successful
            if (response.data.token !== null) {
                console.log(response.data, "aaya");
                localStorage.setItem("token", response.data.token)
                navigate("/main");
            }
            else {
                console.log("error login");
            }
        } catch (error) {
            // Handle error
            console.error("Error during login:", error);
        }
    };


    const handleSignup = async () => {
        console.log(userDetails);
        try {
            const response = await axios.post("http://localhost:3000/register", userDetails);

            console.log(response);

            if (response.status === 200) {
                setUserDetails({
                    username: "",
                    password: "",
                    email: ""
                })
                navigate("/");
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    const handlechoice = () => {
        if (Choice === "login") {
            setChoice("signup");
        }
        else {
            setChoice("login");
        }

    }

    if (Choice === "login") {

        return (
            <div className='Login-container'>

                <div className="login-wrapper">
                    <div className="login-form">
                        <p>Admin Panel</p>
                        <input type="text" required placeholder='Username' name='username' onChange={handlechange} value={userDetails.username} />
                        <input type="text" placeholder='email' required name='email' onChange={handlechange} value={userDetails.email} />
                        <input type="password" placeholder='password' required name='password' onChange={handlechange} value={userDetails.password} />
                        <button onClick={handleLogin}>Login</button>
                        <button onClick={handlechoice}>New Admin? SignUp</button>
                    </div>
                </div>

            </div>
        );
    }
    else {

        return (
            <div className='Login-container'>

                <div className="login-wrapper">
                    <div className="login-form">
                        <p>Admin Panel</p>
                        <input type="text" required placeholder='Username' name='username' onChange={handlechange} />
                        <input type="text" placeholder='email' required name='email' onChange={handlechange} />
                        <input type="password" placeholder='password' required name='password' onChange={handlechange} />
                        <button onClick={handleSignup}>Signup</button>
                        <button onClick={handlechoice}>Existing Admin? Login</button>
                    </div>
                </div>

            </div>
        );

    }
};

export default Login;
