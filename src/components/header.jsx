// import logo from "../assets/logo-oakdev.jpeg"
// import React from 'react';

// export const Header = () => {
//   return (
//     <header className="shadow-md flex justify-center items-center">
//       <img src={logo} alt="logo-oak" className="w-40" />
//     </header>
//   )
// }


import logo from "../assets/logo-oakdev.jpeg";
import React, { useEffect, useState, useRef } from 'react';
import './header.css';

export const Header = () => {
  const [stars, setStars] = useState([]);
  const headerRef = useRef(null);

  useEffect(() => {
    const starCount = Math.floor(Math.random() * 10) + 75;

    const newStars = Array.from({ length: starCount }).map(() => {
      const size = Math.floor(Math.random() * 3) + 1;
      return {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${size}px`,
        animationDelay: `${Math.random() * 2}s`,
      };
    });

    setStars(newStars);
  }, []);

  return (
    <header
      className="shadow-md flex justify-center items-center relative"
      ref={headerRef}
    >
      <img src={logo} alt="logo-oak" className="w-40 z-20" />
      {stars.map((star, index) => (
        <div
          key={index}
          className="star"
          style={{
            position: 'absolute',
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.animationDelay,
            transform: 'translate(-50%, -50%)'
          }}
        ></div>
      ))}
    </header>
  );
};