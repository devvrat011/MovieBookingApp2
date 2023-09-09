import React, { useEffect } from 'react'
import "./loginSignup.scss"
import { useState } from 'react';

function LoginSignup() {
    let container;
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isusersignin,Setusersignin] = useState(false);
    async function registerUser(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });
        const data = await response.json();
        if(data.status==='ok'){
            // console.log("okk");
            onClickSignIn();
        }
        else{
            alert("Same email already exists direct login");
            onClickSignIn();
        }
        console.log(data);
    }
    async function LogInUser(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const data = await response.json();
        if(data.user) {
            console.log(data);
            localStorage.setItem('token', data.token);
            alert('login successful');
            Setusersignin(true);
            window.location.href = '/';
        }
        else{
            alert('Please check  your username and password');
        }
        console.log(data);
    }
    useEffect(() => {
        container = document.getElementsByClassName("login-container")[0];
    })
    const onClickSignUp = () => {
        container.classList.add("sign-up-mode");
    }
    const onClickSignIn = () => {
        container.classList.remove("sign-up-mode");
    }

    return (
        <div className="login-container">
            <div className="forms-container">
                <div className="signin-signup">
                    <form action="" className="sign-in-form">
                        <h2 className="login-title">Sign in</h2>
                        <div className="login-input-field">
                            <i className="fas fa-user"></i>
                            <input onChange={(e) => {setEmail(e.target.value)}} type="text" placeholder='Username' />
                        </div>
                        <div className="login-input-field">
                            <i className="fas fa-lock"></i>
                            <input onChange={(e) => {setPassword(e.target.value)}}  type="password" placeholder='Password' />
                        </div>
                        <button className="login-btn solid" onClick={LogInUser}>Log In</button>
                        <p className="social-text">Or Sign in with social platforms</p>
                        <div className="social-media">
                            <a href="/" className="social-icon">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="/" className="social-icon">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="/" className="social-icon">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="/" className="social-icon">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </form>
                    <form action="" className="sign-up-form">
                        <h2 className="login-title">Sign up</h2>
                        <div className="login-input-field">
                            <i className="fas fa-user"></i>
                            <input onChange={(e) => {setName(e.target.value)}} type="text" placeholder='Username' />
                        </div>
                        <div className="login-input-field">
                            <i className="fas fa-envelope"></i>
                            <input onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder='Email' />
                        </div>
                        <div className="login-input-field">
                            <i className="fas fa-lock"></i>
                            <input onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder='Password' />
                        </div>
                        <button className="login-btn solid" onClick={registerUser}>Sign Up</button>
                        <p className="social-text">Or Sign up with social platforms</p>
                        <div className="social-media">
                            <a href="/" className="social-icon">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="/" className="social-icon">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="/" className="social-icon">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="/" className="social-icon">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="login-content">
                        <h3>New here ?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, distinctio.</p>
                        <button className="login-btn transparent" id='sign-up-btn' onClick={onClickSignUp}>Sign up</button>
                    </div>

                    <img src="/teacher.svg" alt="" className="login-image" />
                </div>

                <div className="panel right-panel">
                    <div className="login-content">
                        <h3>One of us ?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, distinctio.</p>
                        <button className="login-btn transparent" id='sign-in-btn'onClick={onClickSignIn}>Sign in</button>
                    </div>
                    <img src="/register.svg" alt="" className="login-image" />
                </div>
            </div>
        </div>
    )
}

export default LoginSignup