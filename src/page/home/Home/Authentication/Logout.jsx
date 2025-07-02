import React from 'react';
import useAuth from '../../../../hoocks/useAuth';
import { Link } from 'react-router';

const Logout = () => {
  const { user, logOut } = useAuth();

  

  return (
    <div className='flex'>
      {/* User avatar */}
      {user && (
        <div className='pr-3 flex items-center'>
          <div className="relative group">
            <div className='cursor-pointer w-9 mx-2 bg-gray-400 p-[3px] rounded-full flex items-center justify-center'>
              <img className='rounded-full' src={user.photoURL} alt="User" />
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded-lg px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                {user.displayName}
              </div>
            </div>
          </div>
        </div>
      )}

      {user ? (
        <Link onClick={logOut} className="btn btn-primary">LogOut</Link>
      ) : (
        <div className='flex'>
          <Link to='/register' className="btn btn-primary mx-3">Register</Link>
          <Link to='/login' className="btn btn-primary">Login</Link>
        </div>
      )}
    </div>
  );
};

export default Logout;
