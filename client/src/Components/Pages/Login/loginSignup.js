import React, { useEffect } from 'react'
import "./loginSignup.scss"

function LoginSignup() {
    let container;
    useEffect(() => {
        container = document.getElementsByClassName("login-container")[0];
    }, [])
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
                            <input type="text" placeholder='Username' />
                        </div>
                        <div className="login-input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder='Password' />
                        </div>
                        <input type="submit" value="Login" className="login-btn solid" />

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
                            <input type="text" placeholder='Username' />
                        </div>
                        <div className="login-input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder='Email' />
                        </div>
                        <div className="login-input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder='Password' />
                        </div>
                        <input type="submit" value="Sign up" className="login-btn solid" />

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