import React from 'react'
import logoImg from '../../assets/logo.png'

function Logo({width = '150px'}) {
  return (
    <div className='flex items-center'>
      <img src={logoImg}
      alt="Blogger.ai" style={{width:width}}

      className='object-contain'
      />
    </div>
  )
}

export default Logo
