import React from "react";
import "./FriendCard.css";

const FriendCard = ({id, opacity, name, image, status, onClick, font, viewable, gameStatus}) => (
  // style card if the game is over by darkening the opacity to the linear gradient of the background image
  <div className={`card d-flex ${gameStatus}`}
        onClick={() => onClick ? onClick(id): ""} 
        style={{ backgroundImage:
          `linear-gradient(rgba(0, 0, 0, ${opacity}), rgba(0, 0, 0, ${opacity})), 
          url(${image})`, 
          backgroundRepeat: 'no-repeat', 
          backgroundSize:'90% 90%', 
          backgroundPosition: 'calc(100% - 10px) calc(100% - 5px)'}}
        >
    <div className='card-body'/>
    <div className='card-footer text-center bg-white p-2 d-flex flex-row justify-content-center'>
      <p className='name p-0 my-0'>{name}</p>
      <p className={viewable}>
      <i className={font} aria-hidden="true"></i>
      </p>
    </div>
  </div>
);

export default FriendCard;