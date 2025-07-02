import React from 'react';
import useAuth from '../hoocks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({children}) => {
 const {user, loading} = useAuth();
 const location = useLocation()


 if(loading){
  return <P>loading.....</P>
 }
 if(!user){
  <Navigate to='/login' state={location.pathname} replace ></Navigate>
 }


  return  children;
};

export default PrivetRoute;