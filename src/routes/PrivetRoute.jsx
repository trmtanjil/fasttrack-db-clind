import React from 'react';
import useAuth from '../hoocks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({children}) => {
 const {user, loading} = useAuth();
 const location = useLocation()


 if(loading){
  return <p>loading.....</p>
 }
 if(!user){
  return <Navigate to='/login' state={{from: location.pathname}} replace ></Navigate>
 }


  return  children;
};

export default PrivetRoute;