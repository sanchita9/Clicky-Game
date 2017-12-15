import React from "react";
import "./ResetButton.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
// const ResetButton = ({ btnDisplay, onClick })) => (
//   <button 
//     className="btn btn-danger text-white mt-4 reset-btn" 
//     style={{ display: btnDisplay }}
//     onClick={onClick}
//   >
//     Reset Game
//   </button>
// );

const ResetButton = ({type, className, children, btnDisplay, onClick }) => (
  <button
    onClick={onClick}
      className={`btn btn-${type ? type : "default"} ${className
      ? " " + className
      : ""}`}
            style={{ display: btnDisplay}}
  >
    {children}
  </button>
);

export default ResetButton;