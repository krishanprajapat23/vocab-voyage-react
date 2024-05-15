import React from 'react'
import loadingImg from '../assets/img/loader.gif';

function Loading() {
  return (
    <div className='text-center loader'>
        <img src={loadingImg} className='img-fluid' alt="Loading..." />
    </div>
  )
}

export default Loading