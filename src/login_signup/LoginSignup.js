import React, { useState } from 'react'
import './login_signup.css'
import GoogleIcon from '../assets/google_icon.png'

export const LoginSignup = ({ open, onClose, firstStep }) => {
  function getSignUpTitle () {
    if (firstStep === 1) {
      return "Sign-up"
    } else if (firstStep === 2) {
      return "Log into your account"
    } else {
      return "Need additional info - [placeholder]"
    }
  }

  const signUpText = "We're thrilled that you're here and excited to help you discover the power of deep, mindful breathing.  " +
  "\n We offer a variety of breathing exercises that are designed to help you reduce stress, increase your focus, and find a sense " +
  "of calm in your busy day.  Rake a deep breath, and let's get started on your journey to a more centered, peaceful life. Thank you " + 
  "for choosing Unplugg to be your companion on this path."

  if (!open) return null
  return (
    <div className="overlay" onClick={onClose}>
      <div className="container text-center light-text" onClick={(e) => e.stopPropagation()}>
        <div className="inner-sign-up">
          <span className="sign-up-title">{ getSignUpTitle() }</span>
        </div>
        <div hidden={ firstStep === 1 ? false : true }>
          <div className="sign-up-sub-title">
            <span>
              Welcome to Unplugg!
            </span>
          </div>
          <div className="sign-up-text">
            <div>
              { signUpText }
            </div>
          </div>
          <div className="input-container">
            <input type="search" placeholder="First Name">
            </input>
          </div>
          <div className="input-container">
            <input type="search" placeholder="Surname">
            </input>
          </div>
          <div className="input-container">
            <input type="search" placeholder="Email">
            </input>
          </div>
          <div className="google-container">
            <button className="google-button">
              <div className="inner-button">
                <div className="icon-container"><img src={ GoogleIcon } alt="google-icon" className="google-icon"></img></div>
                <div className="button-text-container">Sign in with Google</div>
                <div className="right"></div>
              </div>
            </button>
          </div>
          <div className="login-text-area">
            <span>Already have an account?  <a className="login-text">Log in</a></span>
          </div>
        </div>
      </div>
    </div>
  )
}
