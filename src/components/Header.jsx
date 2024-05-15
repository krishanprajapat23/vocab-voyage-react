import React from 'react'

function Header({logo, title}) {
  return (
   <header className='py-2 mb-1'>
    <div className="container-md container-fluid">
        <div className='text-center logo-wrapper'>
            <img src={logo} alt={title} className='img-fluid' />
        </div>
    </div>
   </header>
  )
}

export default Header