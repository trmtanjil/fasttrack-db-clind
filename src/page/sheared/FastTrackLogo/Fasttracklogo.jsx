import React from 'react'
import logo from '../../../assets/logo.png'
import { Link } from 'react-router'

function Fasttracklogo() {
  return (
       <Link to='/'>
    <div className='flex  items-center'>
        <img src={logo} alt="" />
        <p className='font-semibold text-2xl -ml-2 pt-4'>FastTrack</p>
    </div>
       </Link>
  )
}

export default Fasttracklogo