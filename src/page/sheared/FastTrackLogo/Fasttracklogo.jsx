import React from 'react'
import logo from '../../../assets/logo.png'
import { Link } from 'react-router'

function Fasttracklogo() {
  return (
       <Link to='/'>
    <span className='flex  items-center'>
        <img src={logo} alt="" />
        <span className='font-semibold text-2xl -ml-2 pt-4'>FastTrack</span>
    </span>
       </Link>
  )
}

export default Fasttracklogo