import React, { useState } from 'react'
import './login_signup.css'

export const LoginSignup = ({ open, onClose }) => {
  if (!open) return null
  return (
    <div className="overlay" onClick={onClose}>
      <div className="container" onClick={(e) => e.stopPropagation()}>

      </div>
    </div>
  )
}
