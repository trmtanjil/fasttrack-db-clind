import React from 'react'
import { Outlet } from 'react-router'
import authImage from '../assets/authImage.png'
import Fasttracklogo from '../page/sheared/FastTrackLogo/Fasttracklogo'

function AthenticationLayOut() {
  return (
    <div className="bg-base-200">
        <div>
            <Fasttracklogo></Fasttracklogo>
        </div>
      
  <div className="hero-content flex-col lg:flex-row-reverse ">
      <div className='flex-1'>
            <img src={authImage} alt="" />
        </div>
    <div className='flex-1'>
      <Outlet></Outlet>
    </div>
  </div>
</div>
  )
}

export default AthenticationLayOut