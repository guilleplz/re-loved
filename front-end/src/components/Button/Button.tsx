import React from 'react'

interface props {
  text: String,
}

const Button = ({text}: props) => {
  return (
    <button className='text-3xl'>{text}</button>
  )
}

// background-color: #eaf4ff;
//   color: rgb(1, 0, 32);
//   padding: 0.5rem 1rem;
//   border: none;
//   border-radius: 5px;
//   text-decoration: none;
//   cursor: pointer;
//   transition: background-color 0.3s;

export default Button
