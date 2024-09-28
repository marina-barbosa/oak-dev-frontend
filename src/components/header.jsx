import logo from "../assets/logo-oakdev.jpeg"
import React from 'react';

export const Header = () => {
  return (
    <header className="shadow-md flex justify-center items-center">
      <img src={logo} alt="logo-oak" className="w-40" />
    </header>
  )
}