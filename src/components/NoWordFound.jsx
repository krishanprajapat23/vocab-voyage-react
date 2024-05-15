// NoWordsFound.jsx
import React from 'react';

function NotFound({title, message, handleBackHome}) {
  return (
    <div className="not-found-wrapper text-center ">
      <h2 className='fw-bold text-uppercase'>{title}</h2>
      <p>{message}</p>
      <button className='btn theme-btn go-home-btn mt-2' onClick={handleBackHome}>Back to Home</button>
    </div>
  );
}

export default NotFound;
